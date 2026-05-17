<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterSifatHurufSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('master_sifat_hurufs')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        /**
         * Sifat Huruf terbagi atas:
         *  A. Sifat yang memiliki lawan (ada 5 pasang = 10 sifat)
         *  B. Sifat yang tidak memiliki lawan (7 sifat)
         * Total: 17 sifat utama
         */
        $sifat = [
            // ─── SIFAT BERLAWANAN ────────────────────────────────────────────────
            // 1. Jahr  ↔  Hams
            [
                'code' => 'jahr', 'name' => 'Jahr', 'name_arabic' => 'جَهْرٌ',
                'category' => 'Berlawanan',
                'opposite' => 'hams',
                'description' => 'Suara tertahan (tidak keluar hembusan nafas) ketika mengucapkan huruf. Huruf Jahr: ء ب ج د ذ ر ز ض ط ظ ع غ ق ل م ن و ي (18 huruf).',
                'letters_arabic' => 'ء ب ج د ذ ر ز ض ط ظ ع غ ق ل م ن و ي',
                'color_code' => '#1565C0',
            ],
            [
                'code' => 'hams', 'name' => 'Hams', 'name_arabic' => 'هَمْسٌ',
                'category' => 'Berlawanan',
                'opposite' => 'jahr',
                'description' => 'Suara mengalir (disertai hembusan nafas) ketika mengucapkan huruf. Huruf Hams (10 huruf): ف ح ث ه ش خ ص س ك ت (ingat: فَحَثَّهُ شَخْصٌ سَكَتَ).',
                'letters_arabic' => 'ف ح ث ه ش خ ص س ك ت',
                'color_code' => '#0288D1',
            ],
            // 2. Syiddah ↔ Rakhawah (tengah: Tawassuth/Bayniyyah)
            [
                'code' => 'syiddah', 'name' => 'Syiddah', 'name_arabic' => 'شِدَّةٌ',
                'category' => 'Berlawanan',
                'opposite' => 'rakhawah',
                'description' => 'Suara tertahan total saat makhraj. Huruf Syiddah (8): أ ج د ق ط ب ك ت (ingat: أَجِدُ قِطَّ بَكَتْ).',
                'letters_arabic' => 'أ ج د ق ط ب ك ت',
                'color_code' => '#B71C1C',
            ],
            [
                'code' => 'tawassuth', 'name' => "Tawassuth (Bayniyyah)", 'name_arabic' => 'تَوَسُّطٌ',
                'category' => 'Berlawanan',
                'opposite' => null,
                'description' => 'Antara syiddah dan rakhawah (suara tidak tertahan penuh dan tidak mengalir penuh). Huruf: ع ن م ل ر (ingat: لِنْ عُمَرَ).',
                'letters_arabic' => 'ع ن م ل ر',
                'color_code' => '#E53935',
            ],
            [
                'code' => 'rakhawah', 'name' => 'Rakhawah', 'name_arabic' => 'رَخَاوَةٌ',
                'category' => 'Berlawanan',
                'opposite' => 'syiddah',
                'description' => 'Suara mengalir sempurna saat makhraj karena tidak ada penutupan total. Semua huruf selain syiddah dan tawassuth.',
                'letters_arabic' => 'ف ح ث ه ش خ ص س ذ غ ز ظ و ي ض',
                'color_code' => '#EF5350',
            ],
            // 3. Isti'la ↔ Istifal
            [
                'code' => 'istila', 'name' => "Isti'la", 'name_arabic' => 'اسْتِعْلَاءٌ',
                'category' => 'Berlawanan',
                'opposite' => 'istifal',
                'description' => 'Pangkal lidah terangkat ke langit-langit (huruf tebal). Huruf Isti\'la (7): خ ص ض غ ط ق ظ (ingat: خُصَّ ضَغْطٍ قِظْ).',
                'letters_arabic' => 'خ ص ض غ ط ق ظ',
                'color_code' => '#E65100',
            ],
            [
                'code' => 'istifal', 'name' => 'Istifal', 'name_arabic' => 'اسْتِفَالٌ',
                'category' => 'Berlawanan',
                'opposite' => 'istila',
                'description' => 'Pangkal lidah turun (huruf tipis). Semua huruf selain huruf Isti\'la (22 huruf).',
                'letters_arabic' => 'ا ب ت ث ج ح د ذ ر ز س ش ع ف ك ل م ن ه و ي ء',
                'color_code' => '#EF6C00',
            ],
            // 4. Ithbaq ↔ Infitah
            [
                'code' => 'ithbaq', 'name' => "Ithbaq", 'name_arabic' => 'إِطْبَاقٌ',
                'category' => 'Berlawanan',
                'opposite' => 'infitah',
                'description' => 'Lidah menempel ke langit-langit atas ketika mengucapkan. Huruf Ithbaq (4): ص ض ط ظ.',
                'letters_arabic' => 'ص ض ط ظ',
                'color_code' => '#558B2F',
            ],
            [
                'code' => 'infitah', 'name' => "Infitah", 'name_arabic' => 'اِنْفِتَاحٌ',
                'category' => 'Berlawanan',
                'opposite' => 'ithbaq',
                'description' => 'Lidah tidak menempel ke langit-langit. Semua huruf selain huruf Ithbaq (25 huruf).',
                'letters_arabic' => 'ا ب ت ث ج ح خ د ذ ر ز س ش ع غ ف ق ك ل م ن ه و ي ء',
                'color_code' => '#7CB342',
            ],
            // 5. Idzlaq ↔ Ishmat
            [
                'code' => 'idzlaq', 'name' => "Idzlaq", 'name_arabic' => 'إِذْلَاقٌ',
                'category' => 'Berlawanan',
                'opposite' => 'ishmat',
                'description' => 'Huruf yang keluar dengan mudah dan lancar dari ujung lidah/bibir. Huruf Idzlaq (6): ف ر م ن ل ب (ingat: فِرَّ مِنْ لُبٍّ).',
                'letters_arabic' => 'ف ر م ن ل ب',
                'color_code' => '#00838F',
            ],
            [
                'code' => 'ishmat', 'name' => "Ishmat", 'name_arabic' => 'إِصْمَاتٌ',
                'category' => 'Berlawanan',
                'opposite' => 'idzlaq',
                'description' => 'Huruf yang keluar dengan agak berat (tidak selancar idzlaq). Semua huruf selain idzlaq (23 huruf).',
                'letters_arabic' => 'ا ت ث ج ح خ د ذ ز س ش ص ض ط ظ ع غ ق ك ه و ي ء',
                'color_code' => '#00695C',
            ],

            // ─── SIFAT TANPA LAWAN ────────────────────────────────────────────────
            [
                'code' => 'shafir', 'name' => "Shafir (Siulan)", 'name_arabic' => 'صَفِيرٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => 'Suara seperti siulan/desis yang kuat. Huruf Shafir (3): ص ز س.',
                'letters_arabic' => 'ص ز س',
                'color_code' => '#AD1457',
            ],
            [
                'code' => 'qalqalah', 'name' => "Qalqalah (Memantul)", 'name_arabic' => 'قَلْقَلَةٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => 'Suara memantul/bergetar saat huruf sukun. Huruf Qalqalah (5): ق ط ب ج د (ingat: قُطْبُ جَدٍّ).',
                'letters_arabic' => 'ق ط ب ج د',
                'color_code' => '#6A1B9A',
            ],
            [
                'code' => 'lin', 'name' => "Lin (Lunak)", 'name_arabic' => 'لِيْنٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => "Huruf waw/ya' sukun yang didahului fathah, diucapkan dengan lembut/lunak. Huruf Lin: و ي.",
                'letters_arabic' => 'و ي',
                'color_code' => '#1565C0',
            ],
            [
                'code' => 'inhiraf', 'name' => "Inhiraf (Condong)", 'name_arabic' => 'اِنْحِرَافٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => 'Lidah condong/miring saat pengucapan karena makhraj tidak sempurna tertutup. Huruf: ل ر.',
                'letters_arabic' => 'ل ر',
                'color_code' => '#283593',
            ],
            [
                'code' => 'takrir', 'name' => "Takrir (Bergetar)", 'name_arabic' => 'تَكْرِيرٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => 'Ujung lidah bergetar saat mengucapkan (getaran tipis, bukan berlebihan). Huruf: ر.',
                'letters_arabic' => 'ر',
                'color_code' => '#0D47A1',
            ],
            [
                'code' => 'tafasysyi', 'name' => "Tafasysyi (Menyebar)", 'name_arabic' => 'تَفَشِّيٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => 'Udara menyebar luas di dalam mulut saat pengucapan. Huruf: ش.',
                'letters_arabic' => 'ش',
                'color_code' => '#004D40',
            ],
            [
                'code' => 'istithalah', 'name' => "Istithalah (Memanjang)", 'name_arabic' => 'اسْتِطَالَةٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => 'Suara memanjang dari awal hingga akhir makhraj. Huruf: ض.',
                'letters_arabic' => 'ض',
                'color_code' => '#1B5E20',
            ],
            [
                'code' => 'ghunnah', 'name' => "Ghunnah (Dengung)", 'name_arabic' => 'غُنَّةٌ',
                'category' => 'Tanpa Lawan',
                'opposite' => null,
                'description' => 'Suara dengung yang keluar dari rongga hidung. Huruf: ن م (dan semua ikhfa/idgham).',
                'letters_arabic' => 'ن م',
                'color_code' => '#F57F17',
            ],
        ];

        foreach ($sifat as $s) {
            DB::table('master_sifat_hurufs')->insert(array_merge($s, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        $this->command->info('✅ Master Sifat Huruf: ' . count($sifat) . ' sifat berhasil disimpan.');
    }
}
