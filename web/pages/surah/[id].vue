<template>
  <div class="min-h-screen bg-[#fdfcf9] text-[#1f2937] pb-24 font-sans select-none relative">
    
    <!-- Top Floating Header Bar (Elegant Emerald & Gold Theme) -->
    <header class="hidden sm:flex sticky top-0 bg-[#064e3b]/95 backdrop-blur-md border-b border-[#053e2f] px-4 py-3.5 shadow-xl z-30 items-center justify-between gap-3 relative">
      <!-- Back Button (Hidden on Mobile) -->
      <NuxtLink to="/" class="hidden sm:flex p-2 rounded-xl bg-[#0b5e47] hover:bg-[#0c6b52] text-[#fdfaf3] border border-[#0d7d60] transition-all items-center justify-center cursor-pointer shadow-md active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </NuxtLink>

      <!-- Unified Location Pill (Comfortable Filtering Dialog) - Absolutely Centered -->
      <button 
        @click="isNavModalOpen = true" 
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0b5e47] border border-[#0d7d60] hover:border-[#d4af37]/60 text-[#fdfaf3] rounded-2xl focus:outline-none transition-all cursor-pointer shadow-md text-xs sm:text-sm font-bold active:scale-95 hover:bg-[#0c6b52] z-10"
      >
        <span class="hidden sm:inline max-w-[140px] sm:max-w-none truncate">Hal: {{ currentPageNum }} • Juz: {{ currentJuzNum }} • {{ surahInfo?.name_latin || 'Memuat...' }}</span>
        <span class="inline sm:hidden font-extrabold">{{ surahInfo?.name_latin || 'Memuat...' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#d4af37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Right Side Actions: Tajwid Toggle -->
      <div class="flex items-center gap-2">
        <button 
          @click="tahsinStore.toggleTajwidColors()"
          class="flex items-center justify-center w-9 h-9 md:w-auto md:px-3.5 md:py-2 rounded-xl transition-all text-xs font-bold border cursor-pointer active:scale-95 shadow-md shrink-0"
          :class="tahsinStore.showTajwidColors 
            ? 'bg-[#d4af37] text-[#064e3b] border-[#d4af37] hover:bg-[#e8c352]' 
            : 'bg-[#0b5e47] text-[#d4af37] border-[#0d7d60] hover:bg-[#0c6b52]'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span class="hidden md:inline ml-1.5">{{ tahsinStore.showTajwidColors ? 'Tajwid: Berwarna' : 'Tajwid: Polos' }}</span>
        </button>
      </div>
    </header>

    <!-- Main Content Reader Container (Optimized widths & paddings for mobile) -->
    <main class="w-full max-w-[530px] sm:max-w-[640px] md:max-w-[700px] mx-auto px-0 sm:px-6 py-4 sm:py-12 relative z-10">
      
      <div 
        ref="scrollContainer"
        class="flex flex-row sm:flex-col overflow-x-auto sm:overflow-x-visible scrollbar-hide w-full gap-4 sm:gap-0 sm:space-y-4 md:space-y-6 snap-x snap-mandatory"
        dir="rtl"
      >
        <div 
          v-for="page in surahPages" 
          :key="page.pageNumber"
          :id="`page-block-${page.pageNumber}`"
          @click="toggleControls"
          :style="getPageStyle(page)"
          class="relative w-full sm:w-auto shrink-0 snap-center snap-always bg-[#fdfcf7] rounded-none px-4 pt-2 pb-2 sm:px-8 sm:pt-4 sm:pb-4 mb-2 sm:mb-4 h-[calc(100dvh-80px)] sm:h-auto overflow-y-hidden sm:overflow-y-visible flex flex-col border-r border-[#e6e2d8] last:border-r-0 sm:border-r-0 sm:border-b sm:border-[#e6e2d8] sm:last:border-b-0 cursor-pointer"
        >
          <!-- Wrapper container that centers Surah Plate, Bismillah, and Verses together vertically on the card -->
          <div class="flex-1 flex flex-col justify-center w-full min-h-0 py-2 sm:py-4">
            <!-- 15 Fixed Lines of the standard Medina Mushaf page -->
            <div 
              v-for="line in page.lines" 
              :key="line.lineNumber"
              class="w-full flex items-center justify-center relative"
            >
              <!-- RENDER SURAH PLATE ON LINE 1 (If first page of Surah) -->
              <template v-if="page.pageNumber === firstPageOfSurah && line.lineNumber === 1">
                <div 
                  class="w-full bg-[#ffffff] px-0 mx-0 mb-1.5 sm:mb-3 rounded-none relative overflow-hidden flex flex-col items-center justify-center select-none h-[46px] sm:h-[64px] border border-[#c29b38] z-10"
                >
                  <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 80" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="596" height="76" rx="6" fill="#ffffff" stroke="#c29b38" stroke-width="2.2" />
                    <rect x="5" y="5" width="590" height="70" rx="4" fill="none" stroke="#14b8a6" stroke-width="0.8" stroke-dasharray="3,2" />
                    <g opacity="0.95">
                      <circle cx="80" cy="40" r="12" fill="#ffffff" stroke="#c29b38" stroke-width="1.2" />
                      <path d="M 80 26 L 80 54 M 66 40 L 94 40 M 70 30 L 90 50 M 70 50 L 90 30" stroke="#14b8a6" stroke-width="0.8" />
                      <circle cx="80" cy="40" r="6" fill="#c29b38" />
                      <circle cx="80" cy="40" r="3" fill="#ffffff" />
                      <path d="M 68 40 C 48 32, 33 48, 18 40" stroke="#c29b38" stroke-width="1.5" fill="none" />
                      <path d="M 92 40 C 112 32, 127 48, 142 40" stroke="#c29b38" stroke-width="1.5" fill="none" />
                      <path d="M 33 36 C 25 28, 20 40, 28 44 C 32 41, 36 38, 33 36 Z" fill="#14b8a6" stroke="#c29b38" stroke-width="0.6" opacity="0.9" />
                      <path d="M 127 36 C 119 28, 114 40, 122 44 C 126 41, 130 38, 127 36 Z" fill="#14b8a6" stroke="#c29b38" stroke-width="0.6" opacity="0.9" />
                      <path d="M 52 28 Q 66 16 80 26 Q 66 24 52 28 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                      <path d="M 52 52 Q 66 64 80 54 Q 66 56 52 52 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                      <path d="M 108 28 Q 94 16 80 26 Q 94 24 108 28 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                      <path d="M 108 52 Q 94 64 80 54 Q 94 56 108 52 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                    </g>
                    <g opacity="0.95" transform="translate(600,0) scale(-1,1)">
                      <circle cx="80" cy="40" r="12" fill="#ffffff" stroke="#c29b38" stroke-width="1.2" />
                      <path d="M 80 26 L 80 54 M 66 40 L 94 40 M 70 30 L 90 50 M 70 50 L 90 30" stroke="#14b8a6" stroke-width="0.8" />
                      <circle cx="80" cy="40" r="6" fill="#c29b38" />
                      <circle cx="80" cy="40" r="3" fill="#ffffff" />
                      <path d="M 68 40 C 48 32, 33 48, 18 40" stroke="#c29b38" stroke-width="1.5" fill="none" />
                      <path d="M 92 40 C 112 32, 127 48, 142 40" stroke="#c29b38" stroke-width="1.5" fill="none" />
                      <path d="M 33 36 C 25 28, 20 40, 28 44 C 32 41, 36 38, 33 36 Z" fill="#14b8a6" stroke="#c29b38" stroke-width="0.6" opacity="0.9" />
                      <path d="M 127 36 C 119 28, 114 40, 122 44 C 126 41, 130 38, 127 36 Z" fill="#14b8a6" stroke="#c29b38" stroke-width="0.6" opacity="0.9" />
                      <path d="M 52 28 Q 66 16 80 26 Q 66 24 52 28 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                      <path d="M 52 52 Q 66 64 80 54 Q 66 56 52 52 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                      <path d="M 108 28 Q 94 16 80 26 Q 94 24 108 28 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                      <path d="M 108 52 Q 94 64 80 54 Q 94 56 108 52 Z" fill="#ffffff" stroke="#c29b38" stroke-width="0.8" />
                    </g>
                    <path d="M 180 12 L 420 12 C 435 12, 435 20, 435 28 C 435 36, 442 40, 446 40 C 442 40, 435 44, 435 52 C 435 60, 435 68, 420 68 L 180 68 C 165 68, 165 60, 165 52 C 165 44, 158 40, 154 40 C 158 40, 165 36, 165 28 C 165 20, 165 12, 180 12 Z" fill="#ffffff" stroke="#c29b38" stroke-width="2.5" />
                    <path d="M 183 15 L 417 15 C 431 15, 431 23, 431 29 C 431 35, 438 39, 442 40 C 438 41, 431 45, 431 51 C 431 57, 431 65, 417 65 L 183 65 C 169 65, 169 57, 169 51 C 169 45, 162 41, 158 40 C 162 39, 169 35, 169 29 C 169 23, 169 15, 183 15 Z" fill="none" stroke="#14b8a6" stroke-width="0.8" stroke-dasharray="3,2" />
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <img 
                      v-if="selectedSurahId"
                      :src="`https://cdn.jsdelivr.net/gh/gyenabubakar/surah-name-glyphs@master/svg/${selectedSurahId}.svg`" 
                      :alt="surahInfo?.name_latin" 
                      class="h-[32px] sm:h-[42px] w-auto max-w-[170px] sm:max-w-[230px] object-contain filter select-none pointer-events-none"
                      style="filter: invert(18%) sepia(35%) saturate(2132%) hue-rotate(120deg) brightness(95%) contrast(98%);" 
                    />
                  </div>
                </div>
              </template>

              <!-- RENDER BISMILLAH PLATE ON LINE 2 (If first page of Surah and not Surah At-Tawbah) -->
              <template v-else-if="page.pageNumber === firstPageOfSurah && line.lineNumber === 2 && selectedSurahId !== 9">
                <div class="w-full text-center select-none relative z-10 flex items-center justify-center">
                  <!-- Special Interactive Bismillah for Al-Fatihah (Ayah 1 is Bismillah) -->
                  <div v-if="selectedSurahId === 1" class="font-uthmani text-[clamp(1.15rem,4.5vw,2rem)] sm:text-4xl text-[#064e3b] font-bold leading-normal select-none flex items-center justify-center text-center w-full relative z-10" dir="rtl" style="font-family: 'Amiri', serif !important;">
                    <div class="inline-flex items-center justify-center gap-x-1.5 sm:gap-x-2">
                      <span :id="`ayah-${selectedSurahId}-1`" class="transition-all duration-1000 rounded-xl px-1 py-0.5 inline flex items-center gap-1">
                        <template v-for="item in line.items" :key="item.id">
                          <QuranInteractiveWord 
                            v-if="item.type === 'word'" 
                            :word="item" 
                          />
                          <span 
                            v-else-if="item.type === 'medallion'"
                            class="relative inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 select-none align-middle cursor-default shrink-0 translate-y-[1px]"
                          >
                            <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full text-[#c29b38]">
                              <rect x="22" y="22" width="56" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="5" transform="rotate(45 50 50)" />
                              <rect x="22" y="22" width="56" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="5" />
                              <circle cx="50" cy="50" r="23" fill="#fdfcf7" stroke="currentColor" stroke-width="2.5" />
                              <circle cx="50" cy="50" r="19" fill="none" stroke="#064e3b" stroke-width="1.5" stroke-dasharray="3,2.5" />
                              <circle cx="50" cy="11" r="3.5" fill="#064e3b" />
                              <circle cx="50" cy="89" r="3.5" fill="#064e3b" />
                              <circle cx="11" cy="50" r="3.5" fill="#064e3b" />
                              <circle cx="89" cy="50" r="3.5" fill="#064e3b" />
                              <circle cx="22.5" cy="22.5" r="3.5" fill="#064e3b" />
                              <circle cx="77.5" cy="22.5" r="3.5" fill="#064e3b" />
                              <circle cx="22.5" cy="77.5" r="3.5" fill="#064e3b" />
                              <circle cx="77.5" cy="77.5" r="3.5" fill="#064e3b" />
                            </svg>
                            <span class="relative z-10 text-[9px] sm:text-[10px] font-black text-[#064e3b] select-none flex items-center justify-center leading-none" style="font-family: 'Outfit', sans-serif;">
                              {{ toArabicNumber(1) }}
                            </span>
                          </span>
                        </template>
                      </span>
                    </div>
                  </div>
                  
                  <div v-else class="font-uthmani text-[clamp(1.2rem,4vw,2rem)] sm:text-4xl text-[#064e3b] font-normal leading-normal select-none flex items-center justify-center text-center w-full" style="font-family: 'Amiri', serif !important;">
                    <span>بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</span>
                  </div>
                </div>
              </template>

              <!-- RENDER REGULAR QURAN LINE FOR ALL OTHER LINES -->
              <template v-else>
                <div 
                  class="font-uthmani block w-full select-none px-1.5 sm:px-2 whitespace-nowrap" 
                  dir="rtl" 
                  :style="{
                    'color': '#064e3b',
                    'text-align': (page.pageNumber === 1 || page.pageNumber === 2) ? 'center' : 'justify',
                    'text-justify': (page.pageNumber === 1 || page.pageNumber === 2) ? 'none' : 'auto',
                    'text-align-last': (page.pageNumber === 1 || page.pageNumber === 2) ? 'center' : 'justify'
                  }"
                >
                  <template v-for="(item, idx) in line.items" :key="item.id">
                    <!-- Render Word -->
                    <QuranInteractiveWord 
                      v-if="item.type === 'word'" 
                      :word="item" 
                    />
                    
                    <!-- Render Medallion -->
                    <span 
                      v-else-if="item.type === 'medallion'"
                      class="relative inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 mx-0.5 sm:mx-1 select-none align-middle cursor-default shrink-0 translate-y-[0px] sm:translate-y-[0px]"
                    >
                      <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full text-[#c29b38] transition-transform duration-300 hover:rotate-45">
                        <rect x="22" y="22" width="56" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="5" transform="rotate(45 50 50)" />
                        <rect x="22" y="22" width="56" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="5" />
                        <circle cx="50" cy="50" r="23" fill="#fdfcf7" stroke="currentColor" stroke-width="2.5" />
                        <circle cx="50" cy="50" r="19" fill="none" stroke="#064e3b" stroke-width="1.5" stroke-dasharray="3,2.5" />
                        <circle cx="50" cy="11" r="3.5" fill="#064e3b" />
                        <circle cx="50" cy="89" r="3.5" fill="#064e3b" />
                        <circle cx="11" cy="50" r="3.5" fill="#064e3b" />
                        <circle cx="89" cy="50" r="3.5" fill="#064e3b" />
                        <circle cx="22.5" cy="22.5" r="3.5" fill="#064e3b" />
                        <circle cx="77.5" cy="22.5" r="3.5" fill="#064e3b" />
                        <circle cx="22.5" cy="77.5" r="3.5" fill="#064e3b" />
                        <circle cx="77.5" cy="77.5" r="3.5" fill="#064e3b" />
                      </svg>
                      <span class="relative z-10 text-[8px] sm:text-[10px] font-black text-[#064e3b] select-none flex items-center justify-center leading-none" style="font-family: 'Outfit', sans-serif;">
                        {{ toArabicNumber(item.verse_number) }}
                      </span>
                    </span>
                    
                    <!-- Crucial explicit space to allow standard CSS text-align: justify to expand spacing correctly between inline elements -->
                    <span v-if="idx < line.items.length - 1">{{ ' ' }}</span>
                  </template>
                </div>
              </template>
            </div>
          </div>
 
          <!-- Page Number Indicator at bottom center (Pushed to bottom) -->
          <div class="flex items-center justify-center gap-4 mt-auto mb-3 sm:mb-4 text-[#6b7280] font-extrabold text-xs sm:text-sm tracking-wider">
            <span>{{ page.pageNumber }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation is handled beautifully by the bottom simplified controls dock -->

  </main>

    <!-- Bottom Sheet for Tajwid & Sifat -->
    <Transition name="slide-up">
      <div 
        v-if="tahsinStore.isBottomSheetOpen && tahsinStore.activeWord" 
        class="fixed inset-x-0 bottom-0 z-50 bg-[#fdfcf9] text-[#1f2937] shadow-[0_-15px_50px_rgba(6,78,59,0.15)] rounded-t-3xl border-t-4 border-[#064e3b] transition-transform duration-300 max-h-[85vh] flex flex-col overflow-hidden"
      >
        <!-- Sticky Header (Only Pins the Arabic Word box at the top of the scrollable content) -->
        <div class="sticky top-0 bg-[#fdfcf9] z-20 px-6 sm:px-8 pt-4 pb-3 border-b border-[#e5e7eb] shrink-0 w-full shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col items-center">
          <!-- Grab Handle -->
          <div class="w-16 h-1.5 bg-[#e2ded5] rounded-full mx-auto mb-3"></div>
          
          <div class="bg-[#064e3b]/5 border border-[#064e3b]/10 rounded-2xl px-6 sm:px-8 py-3.5 sm:py-4.5 flex items-center justify-center shadow-inner min-w-[140px] shrink-0 select-all overflow-visible">
            <h3 class="text-3xl sm:text-4xl font-uthmani text-[#064e3b] leading-[1.4] text-center overflow-visible transform translate-y-[6px] sm:translate-y-[7px]" dir="rtl" style="font-family: 'Amiri', serif !important;">
              {{ tahsinStore.activeWord.text_arabic }}
            </h3>
          </div>
        </div>

        <!-- Scrollable Content Body -->
        <div class="overflow-y-auto flex-1 p-6 sm:p-8 scrollbar-hide">
          <div class="max-w-4xl mx-auto">
            <!-- Metadata Badge & Description (Scrolls away naturally) -->
            <div class="mb-6 pb-6 border-b border-[#e5e7eb] flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-extrabold text-[#064e3b] uppercase tracking-wider bg-[#d4af37]/15 text-[#8a6d1c] px-2.5 py-0.5 rounded-lg border border-[#d4af37]/35 w-max">Analisis Kata</span>
              </div>
              <p class="text-[#4b5563] text-xs sm:text-sm">Bedah hukum tajwid dan sifat huruf hijaiyah pembentuk kata.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Tajwid Analysis -->
            <div class="lg:col-span-5">
              <h4 class="text-xs font-extrabold text-[#064e3b] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="w-1.5 h-3 bg-[#d4af37] rounded-full"></span>
                Hukum Tajwid Terdeteksi
              </h4>
              <div v-if="tahsinStore.activeWord.tajwids?.length" class="space-y-4">
                <div 
                  v-for="tajwid in tahsinStore.activeWord.tajwids" 
                  :key="tajwid.id" 
                  class="bg-white rounded-2xl p-5 border border-[#e5e7eb] border-l-4 shadow-sm hover:border-[#064e3b]/30 transition-all duration-300"
                  :style="{ borderLeftColor: tajwid.color_code }"
                >
                  <div class="flex items-center gap-3 mb-3">
                    <span class="w-3.5 h-3.5 rounded-full shadow-inner" :style="{ backgroundColor: tajwid.color_code }"></span>
                    <span class="font-bold text-[#1f2937] text-base">{{ tajwid.name }}</span>
                  </div>
                  <p class="text-[#4b5563] text-xs leading-relaxed mb-3">{{ tajwid.description }}</p>
                  <div v-if="tajwid.example_arabic" class="flex justify-between items-center bg-[#f9fafb] px-4 py-2.5 rounded-xl border border-[#e5e7eb]">
                    <span class="text-xs text-[#6b7280] font-bold">Contoh:</span>
                    <span class="font-uthmani text-xl text-[#064e3b]" dir="rtl" style="font-family: 'Amiri', serif !important;">{{ tajwid.example_arabic }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-[#4b5563] text-sm italic p-4 bg-white rounded-xl border border-dashed border-[#e5e7eb]">
                Belum ada data tajwid khusus untuk kata ini.
              </div>
            </div>

            <!-- Sifat Huruf Analysis -->
            <div class="lg:col-span-7">
              <h4 class="text-xs font-extrabold text-[#064e3b] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="w-1.5 h-3 bg-[#d4af37] rounded-full"></span>
                Bedah Sifat Huruf Hijaiyah
              </h4>
              <div v-if="tahsinStore.activeWord.sifatHurufs?.length" class="space-y-6">
                <!-- Interactive Letter Buttons -->
                <div class="flex flex-wrap justify-center gap-3 bg-white p-3.5 rounded-2xl border border-[#e5e7eb]" dir="rtl">
                  <button 
                    v-for="(letterAnalysis, idx) in tahsinStore.activeWord.sifatHurufs" 
                    :key="idx"
                    @click="selectedLetterIdx = idx"
                    class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-all active:scale-95 cursor-pointer font-extrabold select-none"
                    :class="selectedLetterIdx === idx 
                      ? 'bg-[#064e3b] text-[#fdfaf3] border-[#d4af37] ring-2 ring-[#d4af37]/35 shadow-lg font-black' 
                      : 'bg-[#f9fafb] text-[#064e3b] border-[#e5e7eb] hover:bg-[#0c6b52]/10 hover:border-[#064e3b]/30'"
                    style="font-family: 'Amiri', serif !important;"
                  >
                    {{ letterAnalysis.letter }}
                  </button>
                </div>

                <!-- Selected Letter properties -->
                <div v-if="activeLetterInfo" class="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm transition-all duration-300">
                  <div class="flex justify-between items-center border-b border-[#e5e7eb] pb-3 mb-4">
                    <span class="text-[#064e3b] font-extrabold text-sm flex items-center gap-2.5">
                      Sifat Huruf 
                      <span class="text-2xl font-bold bg-[#f9fafb] px-4 py-1.5 rounded-xl border border-[#e5e7eb] text-[#0a3625]" style="font-family: 'Amiri', serif !important;">
                        {{ activeLetterInfo.letter }}
                      </span>
                      <span class="text-xs text-[#4b5563] font-bold">({{ activeLetterInfo.name }})</span>
                    </span>
                  </div>

                  <!-- Contextual Info Card linking letter to clicked word -->
                  <div class="mb-5 bg-[#064e3b]/5 border border-[#064e3b]/10 rounded-xl p-3.5 text-xs text-[#064e3b] leading-relaxed">
                    Huruf <strong class="text-sm font-extrabold font-uthmani text-[#064e3b]" style="font-family: 'Amiri', serif !important;">{{ activeLetterInfo.letter }}</strong> 
                    pada kata <strong class="text-sm font-extrabold font-uthmani text-[#0c6b52]" style="font-family: 'Amiri', serif !important;">{{ tahsinStore.activeWord.text_arabic }}</strong> 
                    memiliki sifat-sifat pembentuk suara berikut saat diucapkan:
                  </div>

                  <div class="space-y-4">
                    <!-- Sifat Memiliki Lawan -->
                    <div>
                      <h5 class="text-[10px] font-extrabold text-[#4b5563] uppercase tracking-wider mb-2.5">Sifat yang Memiliki Lawan</h5>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div 
                          v-for="s in activeLetterInfo.sifat.filter(x => x.type === 'Berlawanan')" 
                          :key="s.name"
                          class="bg-[#059669]/5 text-[#1f2937] border-l-2 border-[#059669] rounded-xl p-3 text-xs flex flex-col gap-1 shadow-sm"
                        >
                          <span class="font-extrabold text-[#064e3b] flex items-center justify-between gap-1">
                            <span>{{ s.name }}</span>
                            <span class="text-base font-bold text-[#059669]" style="font-family: 'Amiri', serif !important;">{{ s.name_arabic }}</span>
                          </span>
                          <span class="text-[#4b5563] text-[10px] leading-relaxed">{{ s.description }}</span>
                          <span v-if="s.opposite" class="text-[9px] text-[#6b7280] mt-1.5 border-t border-[#e5e7eb] pt-1.5 italic">
                            Lawan: {{ s.opposite }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Sifat Khusus (Tanpa Lawan) -->
                    <div v-if="activeLetterInfo.sifat.some(x => x.type === 'Tanpa Lawan')">
                      <h5 class="text-[10px] font-extrabold text-[#4b5563] uppercase tracking-wider mb-2.5 mt-2">Sifat Khusus (Tanpa Lawan)</h5>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div 
                          v-for="s in activeLetterInfo.sifat.filter(x => x.type === 'Tanpa Lawan')" 
                          :key="s.name"
                          class="bg-[#d4af37]/5 text-[#1f2937] border-l-2 border-[#d4af37] rounded-xl p-3 text-xs flex flex-col gap-1 shadow-sm"
                        >
                          <span class="font-extrabold text-[#064e3b] flex items-center justify-between gap-1">
                            <span>{{ s.name }}</span>
                            <span class="text-base font-bold text-[#c29b38]" style="font-family: 'Amiri', serif !important;">{{ s.name_arabic }}</span>
                          </span>
                          <span class="text-[#4b5563] text-[10px] leading-relaxed">{{ s.description }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-[#6b7280] text-sm italic p-4 bg-white rounded-xl border border-dashed border-[#e5e7eb]">
                Belum ada data sifat huruf untuk kata ini.
              </div>
            </div>
          </div>
        </div> <!-- Closing max-w-4xl mx-auto -->
      </div> <!-- Closing overflow-y-auto flex-1 p-6 sm:p-8 scrollbar-hide -->
    </div> <!-- Closing Bottom Sheet Outer Container -->
  </Transition>
    
    <!-- Backdrop -->
    <Transition name="fade">
      <div 
        v-if="tahsinStore.isBottomSheetOpen" 
        @click="tahsinStore.closeBottomSheet" 
        class="fixed inset-0 bg-black/80 z-40 backdrop-blur-md"
      ></div>
    </Transition>

    <!-- Beautiful Quran Navigation Modal (Clean Unified Filtering) -->
    <Transition name="fade">
      <div v-if="isNavModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div @click="isNavModalOpen = false" class="absolute inset-0 bg-black/75 backdrop-blur-md"></div>
        
        <!-- Modal Card -->
        <div class="rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 transform scale-100 transition-all duration-300">
          <!-- Modal Header -->
          <div class="px-6 py-5 bg-[#064e3b] text-white">
            <h3 class="text-lg font-bold text-[#fdfaf3] flex items-center gap-2">
              <span>Navigasi Al-Qur'an</span>
            </h3>
          </div>

          <div class="bg-[#fdfcf9] ">
 <!-- Tabs Navigation -->
          <div class="flex border-b border-[#e6e2d8] bg-[#f3f4f6]">
            <button 
              @click="activeNavTab = 'surah'" 
              class="flex-1 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer text-center"
              :class="activeNavTab === 'surah' ? 'border-[#064e3b] text-[#064e3b]' : 'border-transparent text-[#6b7280] hover:text-[#1f2937]'"
            >
              Surah
            </button>
            <button 
              @click="activeNavTab = 'juz'" 
              class="flex-1 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer text-center"
              :class="activeNavTab === 'juz' ? 'border-[#064e3b] text-[#064e3b]' : 'border-transparent text-[#6b7280] hover:text-[#1f2937]'"
            >
              Juz
            </button>
            <button 
              @click="activeNavTab = 'halaman'" 
              class="flex-1 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer text-center"
              :class="activeNavTab === 'halaman' ? 'border-[#064e3b] text-[#064e3b]' : 'border-transparent text-[#6b7280] hover:text-[#1f2937]'"
            >
              Halaman
            </button>
          </div>
          
          <!-- Tab Contents -->
          <div class="p-6">
            <!-- TAB: SURAH -->
            <div v-if="activeNavTab === 'surah'" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-2">Pilih Surah</label>
                <div class="relative">
                  <select 
                    v-model="navSelectedSurahId" 
                    class="w-full bg-white border border-[#e5e7eb] text-[#1f2937] rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#064e3b] appearance-none transition-all cursor-pointer"
                  >
                    <option v-for="s in surahsData" :key="s.id" :value="s.id">
                      {{ s.id }}. {{ s.name_latin }}
                    </option>
                  </select>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#064e3b]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-2">
                  Masukkan nomor ayat (1 - {{ surahsData.find(s => s.id === navSelectedSurahId)?.total_ayats }})
                </label>
                <input 
                  type="number" 
                  v-model="navAyahNumber" 
                  placeholder="1, 2, 3..." 
                  class="w-full bg-white border border-[#e5e7eb] focus:border-[#064e3b] text-[#1f2937] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>
            
            <!-- TAB: JUZ -->
            <div v-if="activeNavTab === 'juz'" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-2">Pilih Juz (1 - 30)</label>
                <div class="relative">
                  <select 
                    v-model="navSelectedJuz" 
                    class="w-full bg-white border border-[#e5e7eb] text-[#1f2937] rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#064e3b] appearance-none transition-all cursor-pointer"
                  >
                    <option v-for="j in 30" :key="j" :value="j">Juz {{ j }}</option>
                  </select>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#064e3b]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- TAB: HALAMAN -->
            <div v-if="activeNavTab === 'halaman'" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-2">Masukkan Nomor Halaman (1 - 604)</label>
                <input 
                  type="number" 
                  v-model="navPageNum" 
                  placeholder="Contoh: 1, 45, 604" 
                  class="w-full bg-white border border-[#e5e7eb] focus:border-[#064e3b] text-[#1f2937] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
          
          <!-- Modal Actions Footer -->
          <div class="px-6 py-4 border-t border-[#e6e2d8] bg-[#f9fafb] flex items-center justify-end gap-3">
            <button 
              @click="isNavModalOpen = false" 
              class="px-5 py-2.5 bg-transparent border border-[#e5e7eb] hover:bg-[#f3f4f6] text-[#4b5563] rounded-xl text-sm font-bold active:scale-95 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button 
              @click="executeNavigation" 
              class="px-6 py-2.5 bg-[#064e3b] hover:bg-[#08664e] text-white rounded-xl text-sm font-extrabold active:scale-95 transition-all cursor-pointer shadow-md"
            >
              Oke
            </button>
          </div>

          </div>
          
         
        </div>
      </div>
    </Transition>

    <!-- Bottom Floating Dock on Mobile (Clean E-Reader Controls) -->
    <Transition name="slide-up">
      <div 
        v-if="isControlsVisible && !tahsinStore.isBottomSheetOpen"
        class="fixed bottom-4 inset-x-4 z-40 sm:hidden bg-[#064e3b]/95 backdrop-blur-md border border-[#0d7d60]/60 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-[0_10px_35px_rgba(6,78,59,0.35)]"
      >
        <!-- Back Button -->
        <NuxtLink to="/" class="p-2 rounded-xl bg-[#0b5e47] hover:bg-[#0c6b52] text-[#fdfaf3] border border-[#0d7d60] flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>

        <!-- Surah Selection (Simplified) -->
        <button 
          @click="isNavModalOpen = true" 
          class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0b5e47] border border-[#0d7d60] hover:border-[#d4af37]/60 text-[#fdfaf3] rounded-xl focus:outline-none transition-all cursor-pointer shadow-md text-xs font-extrabold active:scale-95"
        >
          <span>{{ surahInfo?.name_latin || 'Memuat...' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <!-- Tajwid Toggle -->
        <button 
          @click="tahsinStore.toggleTajwidColors()"
          class="flex items-center justify-center w-9 h-9 rounded-xl transition-all border cursor-pointer shadow-md shrink-0 active:scale-95"
          :class="tahsinStore.showTajwidColors 
            ? 'bg-[#d4af37] text-[#064e3b] border-[#d4af37]' 
            : 'bg-[#0b5e47] text-[#d4af37] border-[#0d7d60]'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </button>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { useTahsinStore } from '~/stores/tahsin'
import { ref, computed, watch, watchEffect, nextTick, onMounted, onUnmounted } from 'vue'
import { surahsData } from '~/data/surahs'
import { getPlainArabicLetters, analyzeLetter, analyzeWordTajwid } from '~/utils/tahsin'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Amiri+Quran&family=Outfit:wght@300;400;500;600;700;800&display=swap'
    }
  ]
})

const route = useRoute()
const router = useRouter()
const tahsinStore = useTahsinStore()

const toArabicNumber = (num) => {
  return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
}

// Interactive letter dissecting state
const selectedLetterIdx = ref(0)
const activeLetterInfo = computed(() => {
  if (!tahsinStore.activeWord || !tahsinStore.activeWord.sifatHurufs) return null
  return tahsinStore.activeWord.sifatHurufs[selectedLetterIdx.value] || null
})

// Reset selected letter when active word changes
watch(() => tahsinStore.activeWord, () => {
  selectedLetterIdx.value = 0
})

const selectedSurahId = ref(parseInt(route.params.id))
const surahInfo = ref(null)
const surahPages = ref([])

const firstPageOfSurah = computed(() => {
  return surahPages.value.length > 0 ? surahPages.value[0].pageNumber : null
})

// Dynamic page font size scaling helper based on plain character count density to guarantee exactly 15 lines on both mobile & desktop
const getPageCharCount = (page) => {
  if (!page || !page.lines) return 0
  return page.lines.reduce((sum, line) => {
    return sum + line.items.reduce((itemSum, item) => {
      if (item.type === 'word' && item.text_arabic) {
        const letters = getPlainArabicLetters(item.text_arabic)
        return itemSum + (letters ? letters.length : 0)
      }
      return itemSum
    }, 0)
  }, 0)
}

const getPageStyle = (page) => {
  if (!page || !page.lines) return { '--page-font-scale': 1.0 }
  
  // Calculate the physical horizontal length of the longest line by removing all diacritics (harakat/tashkeel)
  const maxLineLength = Math.max(
    ...page.lines.map(line => {
      if (!line.items) return 0
      return line.items.reduce((acc, item) => {
        if (item.type === 'word') {
          // Remove all diacritics/tashkeel to get the actual horizontal letter width count
          const cleanText = item.text_arabic ? item.text_arabic.replace(/[\u064B-\u065F\u0670]/g, '') : ''
          return acc + cleanText.length
        }
        return acc + 3 // Medallion weight
      }, 0)
    })
  )

  // Baseline physical length for 100% font size is ~35.5 Arabic letters.
  // We scale down dynamically and safely, keeping the font large and beautiful.
  const scale = Math.min(1.05, Math.max(0.865, 35.5 / maxLineLength))
  
  return {
    '--page-font-scale': scale
  }
}

// Scroll Container Ref binding
const scrollContainer = ref(null)

// Reading controls visibility (Full Screen Mode)
const isControlsVisible = ref(true)

const toggleControls = (e) => {
  // Prevent toggle if clicking interactive words, buttons, links, active bottom sheets, or navigation modals
  if (
    e.target.closest('.interactive-word-wrapper') ||
    e.target.closest('button') ||
    e.target.closest('a') ||
    e.target.closest('.fixed') ||
    e.target.closest('.z-40') ||
    e.target.closest('.z-50')
  ) return
  
  isControlsVisible.value = !isControlsVisible.value
}

// Page & Juz Tracking via Scroll Observer
const currentPageNum = ref(1)
const currentJuzNum = ref(1)

// Unified filtering modal state
const isNavModalOpen = ref(false)
const activeNavTab = ref('surah') // 'surah' | 'juz' | 'halaman'

const navSelectedSurahId = ref(selectedSurahId.value)
const navAyahNumber = ref('')
const navSelectedJuz = ref(1)
const navPageNum = ref('')

// Synchronize inputs on modal open
watch(isNavModalOpen, (isOpen) => {
  if (isOpen) {
    navSelectedSurahId.value = selectedSurahId.value
    navSelectedJuz.value = currentJuzNum.value
    navPageNum.value = currentPageNum.value
    navAyahNumber.value = ''
  }
})

// Navigation Execution
const executeNavigation = async () => {
  isNavModalOpen.value = false
  
  if (activeNavTab.value === 'surah') {
    const surahId = navSelectedSurahId.value
    const ayahNum = parseInt(navAyahNumber.value)
    
    if (surahId !== selectedSurahId.value) {
      selectedSurahId.value = surahId
      router.push(`/surah/${surahId}`)
      await fetchSurah()
    }
    
    if (ayahNum > 0) {
      await nextTick()
      setTimeout(() => {
        const el = document.getElementById(`ayah-${surahId}-${ayahNum}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.classList.add('bg-[#d4af37]/20', 'ring-2', 'ring-[#d4af37]/45')
          setTimeout(() => {
            el.classList.remove('bg-[#d4af37]/20', 'ring-2', 'ring-[#d4af37]/45')
          }, 3000)
        }
      }, 300)
    }
  } else if (activeNavTab.value === 'juz') {
    const JUZ_PAGE_MAP = {
      1: 1, 2: 22, 3: 42, 4: 62, 5: 82, 6: 102, 7: 121, 8: 142, 9: 162, 10: 182,
      11: 201, 12: 222, 13: 242, 14: 262, 15: 282, 16: 302, 17: 322, 18: 342, 19: 362, 20: 382,
      21: 402, 22: 422, 23: 442, 24: 462, 25: 482, 26: 502, 27: 522, 28: 542, 29: 562, 30: 582
    }
    const targetPage = JUZ_PAGE_MAP[navSelectedJuz.value]
    if (targetPage) {
      jumpToPage(targetPage)
    }
  } else if (activeNavTab.value === 'halaman') {
    const pageNum = parseInt(navPageNum.value)
    if (pageNum >= 1 && pageNum <= 604) {
      jumpToPage(pageNum)
    }
  }
}

// Intersection Observer for scroll tracking
let observer = null

const initScrollObserver = () => {
  if (typeof window === 'undefined') return
  
  if (observer) observer.disconnect()
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pageNum = parseInt(entry.target.id.replace('page-block-', ''))
        if (pageNum) {
          currentPageNum.value = pageNum
          const pageObj = surahPages.value.find(p => p.pageNumber === pageNum)
          if (pageObj && pageObj.juz) {
            currentJuzNum.value = pageObj.juz
          }
        }
      }
    })
  }, {
    root: null,
    rootMargin: '-20% 0px -50% 0px',
    threshold: 0
  })

  nextTick(() => {
    surahPages.value.forEach(page => {
      const el = document.getElementById(`page-block-${page.pageNumber}`)
      if (el) observer.observe(el)
    })
  })
}

const fetchSurah = async (pageNumToScroll = null) => {
  try {
    const res = await $fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahId.value}`)
    if (res && res.data) {
      const data = res.data;
      
      const localSurah = surahsData.find(s => s.id === data.number)
      surahInfo.value = {
        id: data.number,
        name_arabic: data.name,
        name_latin: data.englishName,
        name_translation: localSurah ? localSurah.translation_id : data.englishNameTranslation,
        total_ayats: data.numberOfAyahs,
        revelation_type: data.revelationType
      }

      // Fetch precise Medina layout mapping from Quran.com V4 API (using per_page=300 to fetch the entire Surah at once)
      const quranRes = await $fetch(`https://api.quran.com/api/v4/verses/by_chapter/${selectedSurahId.value}?words=true&word_fields=text_uthmani&per_page=300`)
      if (quranRes && quranRes.verses) {
        const pagesMap = {}

        quranRes.verses.forEach(verse => {
          verse.words.forEach((word, wIdx) => {
            if (word.char_type_name !== 'word' && word.char_type_name !== 'end') return

            const pageNum = word.page_number
            if (!pagesMap[pageNum]) {
              pagesMap[pageNum] = {
                pageNumber: pageNum,
                lines: Array.from({ length: 15 }, (_, i) => ({
                  lineNumber: i + 1,
                  items: []
                })),
                juz: verse.juz_number
              }
            }

            let targetLineIdx = word.line_number - 1
            
            // For Al-Fatihah, override Bismillah (Verse 1) to be on Line 2 (index 1) so it sits inside the Bismillah container
            if (selectedSurahId.value === 1 && verse.verse_number === 1) {
              targetLineIdx = 1
            }

            if (targetLineIdx >= 0 && targetLineIdx < 15) {
              if (word.char_type_name === 'word') {
                const w = word.text_uthmani
                
                const isLastWord = wIdx === verse.words.length - 2;
                const nextWord = isLastWord ? null : verse.words[wIdx + 1]?.text_uthmani;
                const tajwids = analyzeWordTajwid(w, nextWord, isLastWord);
                
                const plainLetters = getPlainArabicLetters(w);
                const sifatHurufs = plainLetters.map(char => analyzeLetter(char)).filter(x => x !== null);

                pagesMap[pageNum].lines[targetLineIdx].items.push({
                  type: 'word',
                  id: `${verse.verse_number}-${wIdx}`,
                  text_arabic: w,
                  tajwids,
                  sifatHurufs,
                  verse_number: verse.verse_number
                })
              } else if (word.char_type_name === 'end') {
                pagesMap[pageNum].lines[targetLineIdx].items.push({
                  type: 'medallion',
                  verse_number: verse.verse_number
                })
              }
            }
          })
        })

        surahPages.value = Object.values(pagesMap).sort((a, b) => a.pageNumber - b.pageNumber)
      }

      // Set initial page & juz
      if (surahPages.value.length > 0) {
        currentPageNum.value = surahPages.value[0].pageNumber
        if (surahPages.value[0].juz) {
          currentJuzNum.value = surahPages.value[0].juz
        }
      }

      // Scroll to page target if provided
      await nextTick()
      if (pageNumToScroll) {
        scrollToPage(pageNumToScroll)
      } else if (route.query.page) {
        scrollToPage(parseInt(route.query.page))
      }

      // Initialize scroll tracking observer
      initScrollObserver()
    }
  } catch (e) {
    console.error('Failed to fetch surah', e)
  }
}

const jumpToPage = async (pageNum) => {
  try {
    const res = await $fetch(`https://api.alquran.cloud/v1/page/${pageNum}`)
    if (res && res.data && res.data.ayahs.length > 0) {
      const firstAyah = res.data.ayahs[0]
      const targetSurahId = firstAyah.surah.number
      
      if (targetSurahId !== selectedSurahId.value) {
        selectedSurahId.value = targetSurahId
        router.push({ path: `/surah/${targetSurahId}`, query: { page: pageNum } })
        fetchSurah(pageNum)
      } else {
        scrollToPage(pageNum)
      }
    }
  } catch (err) {
    console.error('Error jumping page', err)
  }
}

const scrollToPage = (pageNum) => {
  if (typeof document === 'undefined') return
  const el = document.getElementById(`page-block-${pageNum}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    currentPageNum.value = pageNum
  }
}

const changeSurahDirect = (direction) => {
  const nextId = selectedSurahId.value + direction
  if (nextId >= 1 && nextId <= 114) {
    selectedSurahId.value = nextId
    router.push(`/surah/${nextId}`)
    fetchSurah()
  }
}

watchEffect(() => {
  selectedSurahId.value = parseInt(route.params.id)
  fetchSurah()
})

onMounted(() => {
  initScrollObserver()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }

/* Authentic King Fahd Quran Printing Complex Font with high-speed jsDelivr CDN and local fallback */
@font-face {
  font-family: 'Uthmanic Hafs';
  src: url('https://cdn.jsdelivr.net/gh/arriqaaq/ilm@main/frontend/static/fonts/UthmanicHafs.woff2') format('woff2'),
       url('/fonts/UthmanicHafs.woff2?v=4') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

body {
  font-family: 'Outfit', sans-serif;
  background-color: #14110e;
}

.font-uthmani {
  font-family: 'Amiri Quran', 'Amiri', 'Uthmanic Hafs', serif !important;
  letter-spacing: normal !important;
  word-spacing: -0.08em !important;
  font-feature-settings: "liga" on, "clig" on !important;
  font-variant-ligatures: common-ligatures !important;
  text-align: justify !important;
  text-justify: auto !important;
  line-height: 2.0 !important;
  
  /* Dynamic font-size using CSS custom property that automatically scales based on the page's word count! */
  font-size: calc(clamp(0.85rem, 2.15dvh, 1.25rem) * var(--page-font-scale, 1.0)) !important;
}

@media (min-width: 640px) {
  .font-uthmani {
    font-size: calc(clamp(1.5rem, 2vw + 1.5vh, 2.0rem) * var(--page-font-scale, 1.0)) !important;
    word-spacing: -0.05em !important;
    line-height: 2.0 !important;
  }
}

/* Chrome, Safari, Edge, Opera: Hide input number spin buttons */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox: Hide input number spin buttons */
input[type=number] {
  -moz-appearance: textfield;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
