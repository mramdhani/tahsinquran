<template>
  <div class="min-h-screen bg-[#fdfcf9] text-[#1f2937] select-none pb-12 font-sans">
    <!-- Premium Banner & Welcome Header -->
    <header class="relative overflow-hidden bg-[#064e3b] border-b border-[#053e2f] py-14 sm:py-16 px-6 text-center shadow-xl">
      <!-- Decorative Ornaments -->
      <div class="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
      
      <div class="max-w-4xl mx-auto relative z-10">
        <!-- Elegant Premium Logo Motif -->
        <svg class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 drop-shadow-xl hover:scale-105 transition-transform duration-300 cursor-default" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M140 270C211.797 270 270 211.797 270 140C270 68.203 211.797 10 140 10C68.203 10 10 68.203 10 140C10 211.797 68.203 270 140 270Z" fill="url(#paint0_radial_14_10)"/>
          <path d="M139.455 83.9535C145.926 83.9258 151.149 78.6575 151.122 72.1865C151.094 65.7155 145.826 60.4922 139.355 60.5199C132.884 60.5476 127.66 65.8159 127.688 72.2869C127.716 78.7579 132.984 83.9812 139.455 83.9535Z" fill="url(#paint1_linear_14_10)"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M39.1348 110.329L97.7199 110.078L133.424 141.311L133.666 197.803C106.448 193.735 64.5474 181.361 39.3678 164.729L39.1348 110.329ZM51.7425 122.829L91.4967 122.659L120.897 147.641L121.049 183.211C98.0157 179.125 68.6783 168.789 51.8859 156.306L51.7425 122.829Z" fill="url(#paint2_linear_14_10)"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M239.998 109.469L181.413 109.719L145.978 141.257L146.22 197.75C173.402 193.448 215.195 180.715 240.231 163.869L239.998 109.469ZM227.498 122.076L187.744 122.247L158.559 147.48L158.711 183.049C181.709 178.766 210.956 168.179 227.641 155.553L227.498 122.076Z" fill="url(#paint3_linear_14_10)"/>
          <path d="M137.94 218.709C106.555 218.843 56.2409 196.043 18.4984 177.373C64.5833 189.73 106.493 204.197 133.702 206.173L137.94 218.709Z" fill="url(#paint4_linear_14_10)"/>
          <path d="M142.125 218.691C173.51 218.556 223.627 195.326 261.208 176.333C215.231 189.084 173.447 203.91 146.256 206.119L142.125 218.691Z" fill="url(#paint5_linear_14_10)"/>
          <defs>
            <radialGradient id="paint0_radial_14_10" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(140 88) scale(182)">
              <stop stop-color="#A4D160"/>
              <stop offset="0.45" stop-color="#55973E"/>
              <stop offset="1" stop-color="#1E4E20"/>
            </radialGradient>
            <linearGradient id="paint1_linear_14_10" x1="122.981" y1="67.6202" x2="155.788" y2="67.4797" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
            </linearGradient>
            <linearGradient id="paint2_linear_14_10" x1="20.4168" y1="136.773" x2="152.233" y2="136.208" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
            </linearGradient>
            <linearGradient id="paint3_linear_14_10" x1="127.125" y1="136.316" x2="258.942" y2="135.751" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
            </linearGradient>
            <linearGradient id="paint4_linear_14_10" x1="-5.30038" y1="190.029" x2="161.667" y2="189.314" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
            </linearGradient>
            <linearGradient id="paint5_linear_14_10" x1="118.147" y1="189.5" x2="285.114" y2="188.785" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
            </linearGradient>
          </defs>
        </svg>
        
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#d4af37] tracking-tight uppercase mb-3">
          Tahsin Al-Qur'an Interaktif
        </h1>
        <p class="text-[#d1fae5] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
          Platform interaktif bedah hukum tajwid, makhraj, dan sifatul huruf per kata dengan keindahan Rasm Utsmani kelas dunia.
        </p>

        <!-- Seamless Glassmorphism Search Bar -->
        <div class="max-w-xl mx-auto relative z-20">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Cari juz, halaman, nama atau nomor surah..."
              class="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 focus:border-[#d4af37] text-white rounded-2xl pl-11 pr-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 text-sm font-semibold placeholder-[#a7f3d0]/75 transition-all shadow-lg"
            />
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Autocomplete Suggestions Dropdown -->
            <div 
              v-if="searchQuery && smartSuggestions.length > 0" 
              class="absolute left-0 right-0 mt-2 bg-[#fdfcf9] border border-[#e6e2d8] rounded-2xl shadow-2xl z-30 max-h-80 overflow-y-auto divide-y divide-[#e5e7eb] text-left"
            >
              <div 
                v-for="item in smartSuggestions" 
                :key="item.id"
                @click="selectSuggestion(item)"
                class="flex justify-between items-center px-5 py-3.5 hover:bg-[#f3f4f6] cursor-pointer transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <!-- Smart Rounded Badge based on type -->
                  <span 
                    class="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs border border-[#e5e7eb] transition-all shadow-sm shrink-0"
                    :class="[
                      item.type === 'juz' ? 'bg-[#c29b38]/10 border-[#c29b38]/30 text-[#c29b38]' : '',
                      item.type === 'halaman' ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]' : '',
                      item.type === 'surah' ? 'bg-[#f3f4f6] group-hover:bg-[#064e3b] text-[#064e3b] group-hover:text-white group-hover:border-[#064e3b]' : ''
                    ]"
                  >
                    {{ item.icon }}
                  </span>
                  <div class="text-left">
                    <span class="text-sm font-bold text-[#1f2937] group-hover:text-[#064e3b] transition-colors block leading-snug">
                      {{ item.title }}
                    </span>
                    <span class="text-[10px] text-[#6b7280] block italic leading-none mt-0.5">{{ item.subtitle }}</span>
                  </div>
                </div>
                
                <!-- Arabic Calligraphy for Surahs -->
                <span v-if="item.type === 'surah'" class="font-uthmani text-xl text-[#064e3b] font-bold" dir="rtl">
                  {{ item.arabic }}
                </span>
                <!-- Action pill for Juz / Halaman -->
                <span 
                  v-else 
                  class="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border"
                  :class="[
                    item.type === 'juz' ? 'bg-[#c29b38]/10 text-[#8a6d1c] border-[#c29b38]/35' : '',
                    item.type === 'halaman' ? 'bg-[#3b82f6]/10 text-[#1d4ed8] border-[#3b82f6]/35' : ''
                  ]"
                >
                  Buka
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Surah List Grid -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
      <div class="flex justify-between items-center mb-5 px-1 sm:px-0">
        <h2 class="text-xs font-extrabold text-[#064e3b] uppercase tracking-widest">Daftar Surah</h2>
        <span class="text-xs text-[#064e3b] font-extrabold">
          {{ searchQuery ? `${filteredSurahs.length} Hasil Pencarian` : '114 Surah Lengkap' }}
        </span>
      </div>

      <div v-if="filteredSurahs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <NuxtLink 
          v-for="surah in filteredSurahs" 
          :key="surah.id" 
          :to="`/surah/${surah.id}`"
          class="group bg-white rounded-2xl border border-[#e6e2d8] hover:border-[#064e3b] p-3.5 sm:p-5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
        >
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- Elegant Green/Gold Number Badge -->
            <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#f3f4f6] group-hover:bg-[#064e3b] text-[#064e3b] group-hover:text-white border border-[#e5e7eb] group-hover:border-[#064e3b] flex items-center justify-center font-extrabold text-xs sm:text-sm transition-all shadow-inner shrink-0">
              {{ surah.id }}
            </div>
            
            <div>
              <h3 class="text-sm sm:text-base font-bold text-[#1f2937] group-hover:text-[#064e3b] transition-colors leading-tight">
                {{ surah.name_latin }}
              </h3>
              <p class="text-[10px] sm:text-xs text-[#6b7280] mt-1 sm:mt-1.5 italic font-medium leading-none">{{ surah.total_ayats }} Ayat</p>
            </div>
          </div>

          <div class="text-right">
            <!-- Calligraphy rendering -->
            <span class="font-uthmani text-xl sm:text-2xl font-bold text-[#064e3b] block" dir="rtl">
              {{ surah.name_arabic }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-16 bg-white rounded-3xl border border-dashed border-[#e6e2d8] p-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-[#6b7280] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-lg font-bold text-[#1f2937] mb-1">Surah Tidak Ditemukan</h3>
        <p class="text-sm text-[#6b7280]">Coba cari dengan kata kunci lain atau periksa ejaan Anda.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { surahsData } from '~/data/surahs'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Amiri+Quran&family=Outfit:wght@300;400;500;600;700;800&display=swap'
    }
  ]
})

const router = useRouter()

const searchQuery = ref('')

const JUZ_PAGE_MAP = {
  1: 1, 2: 22, 3: 42, 4: 62, 5: 82, 6: 102, 7: 121, 8: 142, 9: 162, 10: 182,
  11: 201, 12: 222, 13: 242, 14: 262, 15: 282, 16: 302, 17: 322, 18: 342, 19: 362, 20: 382,
  21: 402, 22: 422, 23: 442, 24: 462, 25: 482, 26: 502, 27: 522, 28: 542, 29: 562, 30: 582
}

// Integrated Dynamic Search & Smart Suggestions (Surah, Juz, Halaman)
const smartSuggestions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []

  const results = []

  // 1. Check for page / juz numeric search (e.g. typing "2")
  const numMatch = query.match(/\d+/)
  if (numMatch) {
    const num = parseInt(numMatch[0])
    
    // Virtual Juz Match
    if (query.includes('juz') || (num >= 1 && num <= 30 && query === num.toString())) {
      results.push({
        type: 'juz',
        id: `juz-${num}`,
        number: num,
        title: `Juz ${num}`,
        subtitle: `Mulai Halaman ${JUZ_PAGE_MAP[num]}`,
        icon: 'J'
      })
    }

    // Virtual Halaman Match
    if (query.includes('hal') || query.includes('halaman') || (num >= 1 && num <= 604 && query === num.toString())) {
      results.push({
        type: 'halaman',
        id: `page-${num}`,
        number: num,
        title: `Halaman ${num}`,
        subtitle: `Mushaf Standar Dunia (1-604)`,
        icon: 'H'
      })
    }
  }

  // 2. Standard Surah searching
  const matchedSurahs = surahsData.filter(surah => {
    const idMatch = surah.id.toString() === query
    const latinMatch = surah.name_latin.toLowerCase().includes(query)
    const translationMatch = surah.translation_id?.toLowerCase().includes(query)
    const arabicMatch = surah.name_arabic.includes(query)
    
    return idMatch || latinMatch || translationMatch || arabicMatch
  }).map(surah => ({
    type: 'surah',
    id: `surah-${surah.id}`,
    surahData: surah,
    title: `${surah.id}. ${surah.name_latin}`,
    subtitle: `${surah.translation_id} • ${surah.total_ayats} Ayat`,
    arabic: surah.name_arabic,
    icon: surah.id
  }))

  return [...results, ...matchedSurahs]
})

// Unified Filter for displaying Surahs grid
const filteredSurahs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return surahsData

  return surahsData.filter(surah => {
    const idMatch = surah.id.toString() === query
    const latinMatch = surah.name_latin.toLowerCase().includes(query)
    const translationMatch = surah.translation_id?.toLowerCase().includes(query)
    const arabicMatch = surah.name_arabic.includes(query)
    
    return idMatch || latinMatch || translationMatch || arabicMatch
  })
})

const selectSuggestion = async (item) => {
  searchQuery.value = ''
  if (item.type === 'surah') {
    router.push(`/surah/${item.surahData.id}`)
  } else {
    const targetPage = item.type === 'juz' ? JUZ_PAGE_MAP[item.number] : item.number
    await jumpToPageCoordinate(targetPage)
  }
}

const jumpToPageCoordinate = async (pageNum) => {
  if (pageNum >= 1 && pageNum <= 604) {
    try {
      const res = await $fetch(`https://api.alquran.cloud/v1/page/${pageNum}`)
      if (res && res.data && res.data.ayahs.length > 0) {
        const targetSurahId = res.data.ayahs[0].surah.number
        router.push(`/surah/${targetSurahId}?page=${pageNum}`)
      }
    } catch (e) {
      console.error('Error fetching page coordinate from Cloud API', e)
    }
  }
}
</script>

<style>
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
  font-feature-settings: "liga" on, "clig" on !important;
  font-variant-ligatures: common-ligatures !important;
}
</style>
