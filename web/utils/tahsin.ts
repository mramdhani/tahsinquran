// Tahsin Al-Qur'an Analyzer Utility
// Parses Arabic words to extract dynamic Tajwid rules and Sifat Huruf per letter.

export interface TajwidRule {
  id: string;
  name: string;
  name_arabic: string;
  color_code: string;
  description: string;
  example_arabic: string;
}

export interface SifatInfo {
  name: string;
  name_arabic: string;
  type: 'Berlawanan' | 'Tanpa Lawan';
  description: string;
  opposite?: string;
}

export interface LetterAnalysis {
  letter: string;
  name: string;
  sifat: SifatInfo[];
}

// Global Tajwid Master Database
export const TAJWID_DATABASE: Record<string, Omit<TajwidRule, 'id'>> = {
  idgham_syamsiyah: {
    name: 'Al-Syamsiyah (Idgham Syamsiyah)',
    name_arabic: 'إِدْغَامٌ شَمْسِيٌّ',
    color_code: '#e11d48',
    description: 'Alif lam bertemu salah satu huruf Syamsiyah. Alif lam dilebur langsung ke huruf berikutnya yang bertasydid.',
    example_arabic: 'ٱلصَّلَوٰةَ'
  },
  idzhar_qamariyah: {
    name: 'Al-Qamariyah (Idzhar Qamariyah)',
    name_arabic: 'إِظْهَارٌ قَمَرِيٌّ',
    color_code: '#2563eb',
    description: 'Alif lam bertemu salah satu huruf Qamariyah. Huruf Lam sukun dibaca jelas dan terang.',
    example_arabic: 'ٱلْكِتَـٰبُ'
  },
  ghunnah: {
    name: 'Ghunnah Musyaddadah',
    name_arabic: 'غُنَّةٌ مُشَدَّدَةٌ',
    color_code: '#16a34a',
    description: 'Huruf Nun atau Mim yang bertasydid. Dibaca berdengung ditahan 2-3 harakat dari rongga hidung.',
    example_arabic: 'ثُمَّ / إِنَّ'
  },
  mad_arid: {
    name: "Mad 'Aridh Lis-Sukun",
    name_arabic: 'مَدٌّ عَارِضٌ لِلسُّكُONِ',
    color_code: '#d97706',
    description: 'Huruf mad bertemu huruf hidup di akhir kalimat/waqaf. Dipanjangkan 2, 4, atau 6 harakat.',
    example_arabic: 'ٱلْمُتَّقِينَ'
  },
  mad_thabii: {
    name: "Mad Thabi'i",
    name_arabic: 'مَدٌّ طَبِيعِيٌّ',
    color_code: '#0d9488',
    description: 'Mad asli (Fathah diikuti Alif, Kasrah diikuti Ya sukun, Dhammah diikuti Waw sukun). Dipanjangkan 2 harakat.',
    example_arabic: 'قَالُواْ'
  },
  qalqalah_sughra: {
    name: 'Qalqalah Sughra',
    name_arabic: 'قَلْقَلَةٌ صُغْرَىٰ',
    color_code: '#9333ea',
    description: 'Huruf pantulan (ق ط ب ج د) sukun asli yang terletak di tengah kata. Dipantulkan tipis/ringan.',
    example_arabic: 'يَقْتُلُونَ'
  },
  qalqalah_kubra: {
    name: 'Qalqalah Kubra',
    name_arabic: 'قَلْقَلَةٌ كُبْرَىٰ',
    color_code: '#7c3aed',
    description: 'Huruf pantulan (ق ط ب ج د) yang disukunkan karena waqaf di akhir ayat. Dipantulkan secara kuat.',
    example_arabic: 'ٱلْفَلَقِ'
  },
  iqlab: {
    name: 'Iqlab',
    name_arabic: 'إِقْلَابٌ',
    color_code: '#db2777',
    description: 'Nun sukun atau tanwin bertemu huruf Ba. Suara nun dirubah menjadi Mim samar disertai dengung 2 harakat.',
    example_arabic: 'مِنۢ بَعْدِ'
  },
  idzhar_halqi: {
    name: 'Idzhar Halqi',
    name_arabic: 'إِظْهَارٌ حَلْقِيٌّ',
    color_code: '#059669',
    description: 'Nun sukun atau tanwin bertemu salah satu huruf tenggorokan (ء ه ع ح غ خ). Dibaca jelas tanpa berdengung.',
    example_arabic: 'مَنْ ءامَنَ'
  },
  idgham_bighunnah: {
    name: 'Idgham Bighunnah',
    name_arabic: 'إِدْغَامٌ بِغُنَّةٍ',
    color_code: '#ea580c',
    description: 'Nun sukun atau tanwin bertemu huruf (ي ن م و). Dimasukkan secara berdengung ditahan 2 harakat.',
    example_arabic: 'مَن يَقُولُ'
  },
  idgham_bilaghunnah: {
    name: 'Idgham Bilaghunnah',
    name_arabic: 'إِدْغَامٌ بِلَا غُنَّةٍ',
    color_code: '#dc2626',
    description: 'Nun sukun atau tanwin bertemu huruf Lam atau Ra. Dimasukkan sepenuhnya tanpa dengung.',
    example_arabic: 'مِن رَّبِّهِمْ'
  },
  ikhfa_haqiqi: {
    name: 'Ikhfa Haqiqi',
    name_arabic: 'إِخْفَاءٌ حَقِيقِيٌّ',
    color_code: '#4f46e5',
    description: 'Nun sukun atau tanwin bertemu salah satu dari 15 huruf ikhfa. Dibaca samar-samar disertai dengung 2 harakat.',
    example_arabic: 'مِن قَبْلُ'
  },
  lafadz_standar: {
    name: 'Dibaca Jelas (Lafadz Standar)',
    name_arabic: 'لَفْظٌ طَبِيعِيٌّ',
    color_code: '#6b7280',
    description: 'Huruf dibaca jelas sesuai dengan harakat fathah, kasrah, atau dhammah tanpa panjang atau dengung tambahan.',
    example_arabic: 'كَتَبَ'
  }
};

// Sifat Huruf definitions
export const SIFAT_DATABASE: Record<string, Omit<SifatInfo, 'name'>> = {
  hams: { name_arabic: 'هَمْسٌ', type: 'Berlawanan', description: 'Suara mengalir (disertai hembusan nafas).', opposite: 'Jahr' },
  jahr: { name_arabic: 'جَهْرٌ', type: 'Berlawanan', description: 'Suara tertahan (tidak ada nafas mengalir).', opposite: 'Hams' },
  syiddah: { name_arabic: 'شِدَّةٌ', type: 'Berlawanan', description: 'Suara tertahan kuat di makhraj.', opposite: 'Rakhawah' },
  tawassuth: { name_arabic: 'تَوَسُّطٌ', type: 'Berlawanan', description: 'Sedang (suara tidak mengalir sempurna & tidak tertahan penuh).', opposite: 'Syiddah / Rakhawah' },
  rakhawah: { name_arabic: 'رَخَاوَةٌ', type: 'Berlawanan', description: 'Suara mengalir lancar.', opposite: 'Syiddah' },
  istila: { name_arabic: 'اسْتِعْلَاءٌ', type: 'Berlawanan', description: 'Pangkal lidah terangkat ke langit-langit (suara tebal).', opposite: 'Istifal' },
  istifal: { name_arabic: 'اسْتِفَالٌ', type: 'Berlawanan', description: 'Pangkal lidah turun ke dasar mulut (suara tipis).', opposite: 'Isti\'la' },
  ithbaq: { name_arabic: 'إِطْبَاقٌ', type: 'Berlawanan', description: 'Lidah menempel rapat ke langit-langit atas.', opposite: 'Infitah' },
  infitah: { name_arabic: 'اِنْفِتَاحٌ', type: 'Berlawanan', description: 'Lidah merenggang dari langit-langit atas.', opposite: 'Ithbaq' },
  idzlaq: { name_arabic: 'إِذْلَاقٌ', type: 'Berlawanan', description: 'Keluar dengan mudah dan cepat dari ujung lidah/bibir.', opposite: 'Ishmat' },
  ishmat: { name_arabic: 'إِصْمَاتٌ', type: 'Berlawanan', description: 'Keluar dengan mantap dan agak berat.', opposite: 'Idzlaq' },
  
  // Tanpa Lawan
  shafir: { name_arabic: 'صَفِيرٌ', type: 'Tanpa Lawan', description: 'Desis suara yang kuat menyerupai siulan burung.' },
  qalqalah: { name_arabic: 'قَلْقَلَةٌ', type: 'Tanpa Lawan', description: 'Suara memantul kuat saat huruf dalam keadaan sukun/mati.' },
  lin: { name_arabic: 'لِيْنٌ', type: 'Tanpa Lawan', description: 'Diucapkan dengan lembut dan mudah (huruf Waw/Ya sukun didahului fathah).' },
  inhiraf: { name_arabic: 'اِنْحِرَافٌ', type: 'Tanpa Lawan', description: 'Makhraj huruf melenceng dari makhraj asalnya.' },
  takrir: { name_arabic: 'تَكْرِيرٌ', type: 'Tanpa Lawan', description: 'Ujung lidah bergetar tipis saat pengucapan.' },
  tafasysyi: { name_arabic: 'تَفَشِّيٌ', type: 'Tanpa Lawan', description: 'Udara menyebar luas di dalam mulut.' },
  istithalah: { name_arabic: 'اسْتِطَالَةٌ', type: 'Tanpa Lawan', description: 'Suara memanjang dari awal hingga akhir sisi lidah.' },
  ghunnah: { name_arabic: 'غُنَّةٌ', type: 'Tanpa Lawan', description: 'Suara dengung yang keluar dari pangkal hidung (Al-Khaysyum).' }
};

// Fawatihah / Huruf Muqatta'ah Database for Opening Chapters of Surahs
export const MUQATTAAH_WORDS: Record<string, Omit<TajwidRule, 'id'>[]> = {
  'الم': [
    { name: 'Mad Lazim Harfi Mutsaqqal (Lam)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُثَقَّلٌ', color_code: '#7c3aed', description: 'Huruf Lam dibaca panjang 6 harakat disertai dengung peleburan (idgham) ke huruf berikutnya (Mim).', example_arabic: 'الٓمٓ' },
    { name: 'Mad Lazim Harfi Mukhaffaf (Mim)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Mim dibaca panjang 6 harakat tanpa dengung peleburan (jelas).', example_arabic: 'الٓمٓ' }
  ],
  'المص': [
    { name: 'Mad Lazim Harfi Mutsaqqal (Lam)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُثَقَّلٌ', color_code: '#7c3aed', description: 'Huruf Lam dibaca panjang 6 harakat disertai melebur ke huruf berikutnya (Mim).', example_arabic: 'الٓمَصٓ' },
    { name: 'Mad Lazim Harfi Mukhaffaf (Mim & Sad)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Mim dan Sad masing-masing dibaca panjang 6 harakat dengan jelas.', example_arabic: 'الٓمَصٓ' }
  ],
  'الr': {
    // Handling Alif Lam Ra
  } as any,
  'الر': [
    { name: 'Mad Lazim Harfi Mukhaffaf (Lam)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Lam dibaca panjang 6 harakat secara jelas.', example_arabic: 'الٓرَ' },
    { name: 'Mad Thabi\'i Harfi (Ra)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Ra dipanjangkan 2 harakat.', example_arabic: 'الٓرَ' }
  ],
  'المر': [
    { name: 'Mad Lazim Harfi Mutsaqqal (Lam)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُثَقَّلٌ', color_code: '#7c3aed', description: 'Huruf Lam dibaca panjang 6 harakat disertai idgham ke huruf berikutnya (Mim).', example_arabic: 'الٓمٓرَ' },
    { name: 'Mad Lazim Harfi Mukhaffaf (Mim)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Mim dibaca panjang 6 harakat.', example_arabic: 'الٓمٓرَ' },
    { name: 'Mad Thabi\'i Harfi (Ra)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Ra dipanjangkan 2 harakat.', example_arabic: 'الٓمٓرَ' }
  ],
  'كهيعص': [
    { name: 'Mad Lazim Harfi Mukhaffaf (Kaf, \'Ain, Sad)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Kaf, \'Ain, dan Sad masing-masing dipanjangkan 6 harakat secara jelas.', example_arabic: 'كَهيعَصٓ' },
    { name: 'Mad Thabi\'i Harfi (Ha & Ya)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Ha dan Ya masing-masing dipanjangkan 2 harakat.', example_arabic: 'كَهيعَصٓ' }
  ],
  'طه': [
    { name: 'Mad Thabi\'i Harfi (Tha & Ha)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Tha dan Ha masing-masing dipanjangkan 2 harakat.', example_arabic: 'طٰهٰ' }
  ],
  'طسم': [
    { name: 'Mad Thabi\'i Harfi (Tha)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Tha dipanjangkan 2 harakat.', example_arabic: 'طسٓمٓ' },
    { name: 'Mad Lazim Harfi Mutsaqqal (Sin)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُثَقَّلٌ', color_code: '#7c3aed', description: 'Huruf Sin dipanjangkan 6 harakat disertai melebur ke huruf berikutnya (Mim).', example_arabic: 'طسٓمٓ' },
    { name: 'Mad Lazim Harfi Mukhaffaf (Mim)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Mim dipanjangkan 6 harakat secara jelas.', example_arabic: 'طسٓمٓ' }
  ],
  'طس': [
    { name: 'Mad Thabi\'i Harfi (Tha)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Tha dipanjangkan 2 harakat.', example_arabic: 'طسٓ' },
    { name: 'Mad Lazim Harfi Mukhaffaf (Sin)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Sin dipanjangkan 6 harakat secara jelas.', example_arabic: 'طسٓ' }
  ],
  'يس': [
    { name: 'Mad Thabi\'i Harfi (Ya)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Ya dipanjangkan 2 harakat.', example_arabic: 'يٰسٓ' },
    { name: 'Mad Lazim Harfi Mukhaffaf (Sin)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Sin dipanjangkan 6 harakat secara jelas.', example_arabic: 'يٰسٓ' }
  ],
  'ص': [
    { name: 'Mad Lazim Harfi Mukhaffaf (Sad)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Sad dipanjangkan 6 harakat secara jelas.', example_arabic: 'صٓ' }
  ],
  'حم': [
    { name: 'Mad Thabi\'i Harfi (Ha)', name_arabic: 'مَدٌّ طَبِيعِيٌّ حَرْفِيٌّ', color_code: '#0d9488', description: 'Huruf Ha dipanjangkan 2 harakat.', example_arabic: 'حٰمٓ' },
    { name: 'Mad Lazim Harfi Mukhaffaf (Mim)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Mim dipanjangkan 6 harakat secara jelas.', example_arabic: 'حٰمٓ' }
  ],
  'ق': [
    { name: 'Mad Lazim Harfi Mukhaffaf (Qaf)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Qaf dipanjangkan 6 harakat secara jelas.', example_arabic: 'قٓ' }
  ],
  'ن': [
    { name: 'Mad Lazim Harfi Mukhaffaf (Nun)', name_arabic: 'مَدٌّ لَازِمٌ حَرْفِيٌّ مُخَفَّفٌ', color_code: '#9333ea', description: 'Huruf Nun dipanjangkan 6 harakat secara jelas.', example_arabic: 'نٓ' }
  ]
};

// Sifat Huruf Mapping for each standard Arabic Letter
const LETTER_SIFAT_CODES: Record<string, { name: string; codes: string[] }> = {
  'ء': { name: 'Hamzah', codes: ['jahr', 'syiddah', 'istifal', 'infitah', 'ishmat'] },
  'أ': { name: 'Alif Hamzah', codes: ['jahr', 'syiddah', 'istifal', 'infitah', 'ishmat'] },
  'ا': { name: 'Alif', codes: ['jahr', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'ب': { name: 'Ba\'', codes: ['jahr', 'syiddah', 'istifal', 'infitah', 'idzlaq', 'qalqalah'] },
  'ت': { name: 'Ta\'', codes: ['hams', 'syiddah', 'istifal', 'infitah', 'ishmat'] },
  'ث': { name: 'Tsa\'', codes: ['hams', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'ج': { name: 'Jim', codes: ['jahr', 'syiddah', 'istifal', 'infitah', 'ishmat', 'qalqalah'] },
  'ح': { name: 'Ha\' (halus)', codes: ['hams', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'خ': { name: 'Kha\'', codes: ['hams', 'rakhawah', 'istila', 'infitah', 'ishmat'] },
  'د': { name: 'Dal', codes: ['jahr', 'syiddah', 'istifal', 'infitah', 'ishmat', 'qalqalah'] },
  'ذ': { name: 'Dzal', codes: ['jahr', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'ر': { name: 'Ra\'', codes: ['jahr', 'tawassuth', 'istifal', 'infitah', 'idzlaq', 'inhiraf', 'takrir'] },
  'ز': { name: 'Za\'', codes: ['jahr', 'rakhawah', 'istifal', 'infitah', 'ishmat', 'shafir'] },
  'س': { name: 'Sin', codes: ['hams', 'rakhawah', 'istifal', 'infitah', 'ishmat', 'shafir'] },
  'ش': { name: 'Syin', codes: ['hams', 'rakhawah', 'istifal', 'infitah', 'ishmat', 'tafasysyi'] },
  'ص': { name: 'Sad', codes: ['hams', 'rakhawah', 'istila', 'ithbaq', 'ishmat', 'shafir'] },
  'ض': { name: 'Dad', codes: ['jahr', 'rakhawah', 'istila', 'ithbaq', 'ishmat', 'istithalah'] },
  'ط': { name: 'Tha\'', codes: ['jahr', 'syiddah', 'istila', 'ithbaq', 'ishmat', 'qalqalah'] },
  'ظ': { name: 'Zha\'', codes: ['jahr', 'rakhawah', 'istila', 'ithbaq', 'ishmat'] },
  'ع': { name: '‘Ain', codes: ['jahr', 'tawassuth', 'istifal', 'infitah', 'ishmat'] },
  'غ': { name: 'Ghain', codes: ['jahr', 'rakhawah', 'istila', 'infitah', 'ishmat'] },
  'ف': { name: 'Fa\'', codes: ['hams', 'rakhawah', 'istifal', 'infitah', 'idzlaq'] },
  'ق': { name: 'Qaf', codes: ['jahr', 'syiddah', 'istila', 'infitah', 'ishmat', 'qalqalah'] },
  'ك': { name: 'Kaf', codes: ['hams', 'syiddah', 'istifal', 'infitah', 'ishmat'] },
  'ل': { name: 'Lam', codes: ['jahr', 'tawassuth', 'istifal', 'infitah', 'idzlaq', 'inhiraf'] },
  'م': { name: 'Mim', codes: ['jahr', 'tawassuth', 'istifal', 'infitah', 'idzlaq', 'ghunnah'] },
  'ن': { name: 'Nun', codes: ['jahr', 'tawassuth', 'istifal', 'infitah', 'idzlaq', 'ghunnah'] },
  'و': { name: 'Waw', codes: ['jahr', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'ه': { name: 'Ha\' (besar)', codes: ['hams', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'ي': { name: 'Ya\'', codes: ['jahr', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'ى': { name: 'Ya\' Maqshurah', codes: ['jahr', 'rakhawah', 'istifal', 'infitah', 'ishmat'] },
  'ة': { name: 'Ta\' Marbuthah', codes: ['hams', 'syiddah', 'istifal', 'infitah', 'ishmat'] }
};

// Strips diacritics to get plain letters and normalizes Uthmanic symbols
export function getPlainArabicLetters(text: string): string[] {
  // Strip all harakat/diacritics: Fathah, Kasrah, Dhammah, Sukun, Tasydid, Tanwin, and small high characters
  const diacritics = /[\u064B-\u0652\u0670\u0656\u0657\u0658\u06df-\u06ed]/g;
  const cleaned = text.replace(diacritics, '');
  
  // Normalization map to convert Uthmanic variants to standard hijaiyah characters
  const normalizationMap: Record<string, string> = {
    'ٱ': 'ا', // Alif Waslah -> Alif
    'أ': 'ا', // Alif Hamzah -> Alif
    'إ': 'ا', // Alif Kasrah -> Alif
    'آ': 'ا', // Alif Maddah -> Alif
    'ؤ': 'و', // Waw Hamzah -> Waw
    'ۥ': 'و', // Small High Waw -> Waw
    'ئ': 'ي', // Ya Hamzah -> Ya
    'ى': 'ي', // Alef Maksura -> Ya
    'ی': 'ي', // Farsi/Urdu Yeh -> Ya (CRITICAL FIX FOR ISOLATED YA DOTS)
    'ۦ': 'ي', // Small High Ya -> Ya
    'ة': 'ت', // Ta Marbutah -> Ta
  };

  const chars = Array.from(cleaned).map(char => {
    return normalizationMap[char] || char;
  });
  
  // Convert into individual characters, skipping spaces or non-arabic glyphs
  return chars.filter(char => {
    return LETTER_SIFAT_CODES[char] !== undefined;
  });
}

// Get Sifat Huruf for a single arabic character
export function analyzeLetter(char: string): LetterAnalysis | null {
  const mapping = LETTER_SIFAT_CODES[char];
  if (!mapping) return null;
  
  const sifatList: SifatInfo[] = mapping.codes.map(code => {
    const rawSifat = SIFAT_DATABASE[code];
    // Capitalize code for the name
    const name = code.charAt(0).toUpperCase() + code.slice(1);
    return {
      name,
      name_arabic: rawSifat.name_arabic,
      type: rawSifat.type,
      description: rawSifat.description,
      opposite: rawSifat.opposite
    };
  });
  
  return {
    letter: char,
    name: mapping.name,
    sifat: sifatList
  };
}

// Highly sophisticated Dynamic Arabic word Tajwid analyzer (Supports cross-word context)
export function analyzeWordTajwid(wordText: string, nextWordText: string | null = null, isLastWordOfAyah: boolean = false): TajwidRule[] {
  const rules: TajwidRule[] = [];
  
  // 1. Fawatihah / Opening Huruf Muqatta'ah Check
  const plainString = getPlainArabicLetters(wordText).join('');
  if (MUQATTAAH_WORDS[plainString]) {
    const muqattaahRules = MUQATTAAH_WORDS[plainString];
    return (Array.isArray(muqattaahRules) ? muqattaahRules : [muqattaahRules]).map((rule, idx) => ({
      id: `muqattaah_${plainString}_${idx}`,
      name: rule.name,
      name_arabic: rule.name_arabic,
      color_code: rule.color_code,
      description: rule.description,
      example_arabic: rule.example_arabic
    }));
  }

  // 2. Ghunnah Musyaddadah: Shaddah (ّ) on Nun (ن) or Mim (م)
  if (wordText.includes('نّ') || wordText.includes('مّ') || wordText.includes('نَّ') || wordText.includes('مَّ') || wordText.includes('نِّ') || wordText.includes('مِّ') || wordText.includes('نُّ') || wordText.includes('مُّ')) {
    rules.push({ id: 'ghunnah', ...TAJWID_DATABASE.ghunnah });
  }
  
  // 3. Al-Qamariyah vs Al-Syamsiyah
  if (wordText.startsWith('ٱلْ') || wordText.startsWith('الْ') || wordText.startsWith('لِلْ') || wordText.includes('ـلْ')) {
    rules.push({ id: 'idzhar_qamariyah', ...TAJWID_DATABASE.idzhar_qamariyah });
  } else if (wordText.startsWith('ٱل') || wordText.startsWith('ال') || wordText.startsWith('لَّ')) {
    const hasSyamsiyahTasydid = /[تثdذرزسشصضطظلن]ّ/.test(wordText) || /[تثdذرزسشصضطظلن][\u064E\u0650\u064F]ّ/.test(wordText) || wordText.startsWith('ٱلصَّ') || wordText.startsWith('ٱلتَّ') || wordText.startsWith('ٱلرَّ');
    if (hasSyamsiyahTasydid || wordText.startsWith('ٱلص') || wordText.startsWith('ٱلن') || wordText.startsWith('ٱلذ')) {
      rules.push({ id: 'idgham_syamsiyah', ...TAJWID_DATABASE.idgham_syamsiyah });
    }
  }

  // 4. Mad 'Aridh Lis-Sukun vs Mad Thabi'i
  if (isLastWordOfAyah) {
    const plain = getPlainArabicLetters(wordText);
    if (plain.length >= 3) {
      const penUltimate = plain[plain.length - 2];
      const finalLetter = plain[plain.length - 1];
      if ((penUltimate === 'ي' || penUltimate === 'و' || penUltimate === 'ا') && (finalLetter === 'ن' || finalLetter === 'م' || finalLetter === 'د' || finalLetter === 'ب')) {
        rules.push({ id: 'mad_arid', ...TAJWID_DATABASE.mad_arid });
      }
    }
  }

  // 5. Qalqalah: look for sukun on ق, ط, b, j, d
  const hasQalqalahSukun = /[قطبجد]ْ/.test(wordText) || /[قطبجد]\u0652/.test(wordText);
  if (hasQalqalahSukun) {
    rules.push({ id: 'qalqalah_sughra', ...TAJWID_DATABASE.qalqalah_sughra });
  }

  // 6. Nun Sukun & Tanwin rules (Supports cross-word contextual parsing)
  const plainLetters = getPlainArabicLetters(wordText);
  // Extremely robust sukun/tanwin checks that bypass trailing glyphs or layout artifacts
  const endsWithNunSukun = wordText.endsWith('ن') || wordText.endsWith('نْ') || wordText.endsWith('نْ ') || (plainLetters.length > 0 && plainLetters[plainLetters.length - 1] === 'ن' && !/[َُِ]/.test(wordText.slice(-3)));
  const endsWithTanwin = /[\u064B\u064C\u064D]/.test(wordText.slice(-3));

  if (endsWithNunSukun || endsWithTanwin) {
    if (nextWordText) {
      const nextPlain = getPlainArabicLetters(nextWordText);
      if (nextPlain.length > 0) {
        const firstLetterOfNext = nextPlain[0];
        if (/[ءهعحغخ]/.test(firstLetterOfNext)) {
          rules.push({ id: 'idzhar_halqi', ...TAJWID_DATABASE.idzhar_halqi });
        } else if (/[لر]/.test(firstLetterOfNext)) {
          rules.push({ id: 'idgham_bilaghunnah', ...TAJWID_DATABASE.idgham_bilaghunnah });
        } else if (/[ينمو]/.test(firstLetterOfNext) || firstLetterOfNext === 'ي' || firstLetterOfNext === 'ی') {
          rules.push({ id: 'idgham_bighunnah', ...TAJWID_DATABASE.idgham_bighunnah });
        } else if (firstLetterOfNext === 'ب') {
          rules.push({ id: 'iqlab', ...TAJWID_DATABASE.iqlab });
        } else if (/[تثجدذزسشصضطظفقك]/.test(firstLetterOfNext)) {
          rules.push({ id: 'ikhfa_haqiqi', ...TAJWID_DATABASE.ikhfa_haqiqi });
        }
      }
    }
  }

  // Internal word occurrences of Nun sukun or Tanwin
  if (wordText.includes('نْ') || /[\u064B\u064C\u064D]/.test(wordText)) {
    if (wordText.includes('نۢ') || wordText.includes('ۢ')) {
      if (!rules.some(r => r.id === 'iqlab')) {
        rules.push({ id: 'iqlab', ...TAJWID_DATABASE.iqlab });
      }
    }
  }

  // Fallback Mad Thabi'i: if no mad_arid is registered but long vowels are present
  const plain = getPlainArabicLetters(wordText);
  const hasDaggerAlif = wordText.includes('ٰ') || wordText.includes('\u0670');
  const hasLongVowel = plain.includes('ا') || plain.includes('ي') || plain.includes('و') || hasDaggerAlif;
  
  if (hasLongVowel && !rules.some(r => r.id === 'mad_arid')) {
    rules.push({ id: 'mad_thabii', ...TAJWID_DATABASE.mad_thabii });
  }

  // Default fallback to show Lafadz Standar instead of incorrectly claiming Mad Thabi'i
  if (rules.length === 0) {
    rules.push({
      id: 'lafadz_standar',
      ...TAJWID_DATABASE.lafadz_standar
    });
  }

  return rules;
}
