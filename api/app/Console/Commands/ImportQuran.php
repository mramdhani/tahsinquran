<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Surah;
use App\Models\Ayat;
use App\Models\Word;
use Illuminate\Support\Facades\DB;

class ImportQuran extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'quran:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import 114 Surahs, Ayats, and Words from Alquran Cloud API into Database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Memulai sinkronisasi data Al-Qur\'an (114 Surah, 6236 Ayat, ~77.000 Kata)...');
        $this->warn('Proses ini mungkin memakan waktu beberapa menit. Harap bersabar!');

        $surahsRes = Http::timeout(30)->get('https://api.alquran.cloud/v1/surah');
        if (!$surahsRes->successful()) {
            $this->error('Gagal mengambil daftar surah dari server pusat.');
            return;
        }

        $surahs = $surahsRes->json()['data'];
        $bar = $this->output->createProgressBar(count($surahs));
        $bar->start();

        foreach ($surahs as $s) {
            DB::transaction(function () use ($s) {
                // 1. Simpan Surah
                $surah = Surah::firstOrCreate(
                    ['id' => $s['number']],
                    [
                        'name_arabic' => $s['name'],
                        'name_latin' => $s['englishName'],
                        'translation_id' => $s['englishNameTranslation'],
                        'total_ayats' => $s['numberOfAyahs']
                    ]
                );

                // 2. Fetch Ayats
                $ayahsRes = Http::timeout(30)->get("https://api.alquran.cloud/v1/surah/{$s['number']}");
                if ($ayahsRes->successful()) {
                    $ayahs = $ayahsRes->json()['data']['ayahs'];
                    
                    foreach ($ayahs as $a) {
                        // Simpan Ayat
                        $ayat = Ayat::firstOrCreate(
                            [
                                'surah_id' => $surah->id,
                                'ayat_number' => $a['numberInSurah']
                            ],
                            [
                                'text_arabic' => $a['text'],
                                'translation_id' => null
                            ]
                        );

                        // 3. Pecah dan Simpan Kata per Kata
                        $text = $a['text'];
                        
                        // Hapus Bismillah jika bukan Al-Fatihah
                        if ($surah->id !== 1 && $a['numberInSurah'] === 1) {
                            $text = preg_replace('/^بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ\s*/', '', $text);
                            $text = preg_replace('/^بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ\s*/', '', $text);
                        }

                        $words = array_filter(explode(' ', $text), function($val) {
                            return trim($val) !== '';
                        });

                        $wordNumber = 1;
                        $wordInserts = [];
                        
                        foreach ($words as $w) {
                            $wordInserts[] = [
                                'ayat_id' => $ayat->id,
                                'word_number' => $wordNumber,
                                'text_arabic' => trim($w),
                                'created_at' => now(),
                                'updated_at' => now()
                            ];
                            $wordNumber++;
                        }
                        
                        // Insert batch kata untuk optimasi speed
                        if (count($wordInserts) > 0) {
                            // Untuk menghindari duplikasi, kita skip jika ayat_id & word_number sudah ada
                            // Tapi karena batch insert biasa tidak memiliki update_or_create otomatis di array biasa,
                            // kita gunakan insertOrIgnore.
                            Word::insertOrIgnore($wordInserts);
                        }
                    }
                }
            });
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info('Alhamdulillah! Seluruh 114 Surah berhasil tersimpan di MySQL lokal Anda.');
    }
}
