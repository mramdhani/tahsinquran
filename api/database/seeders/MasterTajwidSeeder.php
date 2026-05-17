<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterTajwidSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('master_tajwids')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $tajwids = [
            // === NUN SUKUN & TANWIN ===
            ['code' => 'izhar_halqi',     'name' => 'Idzhar Halqi',        'name_arabic' => 'إِظْهَارٌ حَلْقِيٌّ',   'category' => 'Nun Sukun & Tanwin', 'color_code' => '#4CAF50', 'description' => 'Dibaca jelas tanpa dengung. Terjadi jika nun sukun/tanwin bertemu huruf halqi (ء ه ع غ ح خ).', 'example_arabic' => 'مَنْ أَمَنَ'],
            ['code' => 'idgham_bighunnah','name' => 'Idgham Bighunnah',    'name_arabic' => 'إِدْغَامٌ بِغُنَّةٍ',   'category' => 'Nun Sukun & Tanwin', 'color_code' => '#FF9800', 'description' => 'Dimasukkan dengan dengung 2 harakat. Huruf: ي ن م و.', 'example_arabic' => 'مَنْ يَقُولُ'],
            ['code' => 'idgham_bilaghunnah','name' => 'Idgham Bilaghunnah','name_arabic' => 'إِدْغَامٌ بِلَا غُنَّةٍ','category' => 'Nun Sukun & Tanwin', 'color_code' => '#FF5722', 'description' => 'Dimasukkan tanpa dengung. Huruf: ل ر.', 'example_arabic' => 'مِنْ رَبِّهِمْ'],
            ['code' => 'iqlab',           'name' => 'Iqlab',               'name_arabic' => 'إِقْلَابٌ',             'category' => 'Nun Sukun & Tanwin', 'color_code' => '#E91E63', 'description' => 'Diubah menjadi mim dengan dengung 2 harakat. Huruf: ب.', 'example_arabic' => 'مِنْ بَعْدِ'],
            ['code' => 'ikhfa_haqiqi',   'name' => 'Ikhfa Haqiqi',        'name_arabic' => 'إِخْفَاءٌ حَقِيقِيٌّ', 'category' => 'Nun Sukun & Tanwin', 'color_code' => '#9C27B0', 'description' => 'Dibaca samar-samar dengan dengung 2 harakat. Huruf selain izhar, idgham, dan iqlab.', 'example_arabic' => 'مِنْ ثَمَرَةٍ'],

            // === MIM SUKUN ===
            ['code' => 'ikhfa_syafawi',   'name' => 'Ikhfa Syafawi',       'name_arabic' => 'إِخْفَاءٌ شَفَوِيٌّ',  'category' => 'Mim Sukun',          'color_code' => '#673AB7', 'description' => 'Mim sukun bertemu ب, dibaca samar dengan dengung 2 harakat.', 'example_arabic' => 'وَهُمْ بِالآخِرَةِ'],
            ['code' => 'idgham_mimi',     'name' => 'Idgham Mimi / Mutamatsilain','name_arabic' => 'إِدْغَامٌ مِيمِيٌّ','category' => 'Mim Sukun',     'color_code' => '#3F51B5', 'description' => 'Mim sukun bertemu م, dimasukkan dengan dengung 2 harakat.', 'example_arabic' => 'لَكُمْ مَا'],
            ['code' => 'izhar_syafawi',   'name' => 'Idzhar Syafawi',      'name_arabic' => 'إِظْهَارٌ شَفَوِيٌّ',  'category' => 'Mim Sukun',          'color_code' => '#2196F3', 'description' => 'Mim sukun bertemu selain م dan ب, dibaca jelas.', 'example_arabic' => 'عَلَيْهِمْ وَلَا'],

            // === MAD (PANJANG) ===
            ['code' => 'mad_thabii',      'name' => "Mad Thabi'i",         'name_arabic' => 'مَدٌّ طَبِيعِيٌّ',     'category' => 'Mad',                'color_code' => '#00BCD4', 'description' => "Mad asli, dipanjangkan 2 harakat. Terjadi jika ada huruf mad (ا و ي) tanpa sebab.", 'example_arabic' => 'قَالَ'],
            ['code' => 'mad_wajib',       'name' => "Mad Wajib Muttasil",  'name_arabic' => 'مَدٌّ وَاجِبٌ مُتَّصِلٌ','category' => 'Mad',             'color_code' => '#009688', 'description' => 'Huruf mad bertemu hamzah dalam satu kata, wajib dipanjangkan 4-5 harakat.', 'example_arabic' => 'جَاءَ'],
            ['code' => 'mad_jaiz',        'name' => "Mad Jaiz Munfasil",   'name_arabic' => 'مَدٌّ جَائِزٌ مُنْفَصِلٌ','category' => 'Mad',            'color_code' => '#4CAF50', 'description' => 'Huruf mad bertemu hamzah di lain kata, boleh dipanjangkan 2-5 harakat.', 'example_arabic' => 'يَا أَيُّهَا'],
            ['code' => 'mad_aridh',       'name' => "Mad 'Aridh Lissukun", 'name_arabic' => 'مَدٌّ عَارِضٌ لِلسُّكُونِ','category' => 'Mad',           'color_code' => '#8BC34A', 'description' => 'Huruf mad diikuti huruf hidup yang dibaca waqaf, dipanjangkan 2-6 harakat.', 'example_arabic' => 'نَسْتَعِيْنُ ﻫ'],
            ['code' => 'mad_lazim',       'name' => "Mad Lazim",           'name_arabic' => 'مَدٌّ لَازِمٌ',         'category' => 'Mad',                'color_code' => '#CDDC39', 'description' => 'Huruf mad diikuti sukun atau tasydid, wajib dipanjangkan 6 harakat.', 'example_arabic' => 'الۤمۤ'],
            ['code' => 'mad_lin',         'name' => "Mad Lin",             'name_arabic' => 'مَدٌّ لِيْنٌ',          'category' => 'Mad',                'color_code' => '#FFC107', 'description' => "Huruf waw/ya' sukun didahului fathah, bertemu sukun saat waqaf, 2-6 harakat.", 'example_arabic' => 'خَوْفٍ'],
            ['code' => 'mad_badal',       'name' => "Mad Badal",           'name_arabic' => 'مَدٌّ بَدَلٌ',          'category' => 'Mad',                'color_code' => '#FF9800', 'description' => "Hamzah bertemu huruf mad dalam satu kata (hamzah menggantikan huruf mad), 2 harakat.", 'example_arabic' => 'آمَنُوا'],
            ['code' => 'mad_silah',       'name' => "Mad Silah",           'name_arabic' => 'مَدٌّ صِلَةٌ',          'category' => 'Mad',                'color_code' => '#FF5722', 'description' => "Mad pada ha' dhamir jika dijepit dua huruf berharakat.", 'example_arabic' => 'إِنَّهُ'],

            // === QALQALAH ===
            ['code' => 'qalqalah_sughra', 'name' => "Qalqalah Sughra",     'name_arabic' => 'قَلْقَلَةٌ صُغْرَى',    'category' => 'Qalqalah',           'color_code' => '#795548', 'description' => 'Huruf qalqalah (ق ط ب ج د) sukun di tengah kata, memantul sedikit.', 'example_arabic' => 'يَقْتُلُونَ'],
            ['code' => 'qalqalah_kubra',  'name' => "Qalqalah Kubra",      'name_arabic' => 'قَلْقَلَةٌ كُبْرَى',    'category' => 'Qalqalah',           'color_code' => '#607D8B', 'description' => 'Huruf qalqalah sukun di akhir kata (waqaf), memantul lebih kuat.', 'example_arabic' => 'مِنْ رَبِّكَ ﻫ'],

            // === TARQIQ & TAFKHIM ===
            ['code' => 'tarqiq',          'name' => "Tarqiq (Tipis)",      'name_arabic' => 'تَرْقِيقٌ',             'category' => 'Tarqiq & Tafkhim',   'color_code' => '#00ACC1', 'description' => "Lafadz Allah dibaca tipis jika didahului kasrah.", 'example_arabic' => 'بِسْمِ اللَّهِ'],
            ['code' => 'tafkhim',         'name' => "Tafkhim (Tebal)",     'name_arabic' => 'تَفْخِيمٌ',             'category' => 'Tarqiq & Tafkhim',   'color_code' => '#F44336', 'description' => "Lafadz Allah dibaca tebal jika didahului fathah atau dhammah.", 'example_arabic' => 'قَالَ اللَّهُ'],

            // === WAQAF & IBTIDA ===
            ['code' => 'ghunnah',         'name' => "Ghunnah",             'name_arabic' => 'غُنَّةٌ',               'category' => 'Ghunnah',            'color_code' => '#AB47BC', 'description' => 'Dengung pada nun atau mim yang bertasydid, ditahan 2 harakat.', 'example_arabic' => 'إِنَّ / ثُمَّ'],
            ['code' => 'idgham_mutajanisain','name' => "Idgham Mutajanisain",'name_arabic' => 'إِدْغَامٌ مُتَجَانِسَيْنِ','category' => 'Idgham Umum',  'color_code' => '#26A69A', 'description' => 'Dua huruf sejenis makhraj dan sifat bertemu, huruf pertama dimasukkan ke huruf kedua.', 'example_arabic' => 'قُل رَّبِّ'],
            ['code' => 'idgham_mutaqaribain','name'=> "Idgham Mutaqaribain",'name_arabic' => 'إِدْغَامٌ مُتَقَارِبَيْنِ','category' => 'Idgham Umum',  'color_code' => '#EF5350', 'description' => 'Dua huruf berdekatan makhraj dan sifat bertemu.', 'example_arabic' => 'نَخْلُقكُّمْ'],
        ];

        foreach ($tajwids as $t) {
            DB::table('master_tajwids')->insert(array_merge($t, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        $this->command->info('✅ Master Tajwid: ' . count($tajwids) . ' hukum berhasil disimpan.');
    }
}
