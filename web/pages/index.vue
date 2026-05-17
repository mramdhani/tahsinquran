<template>
  <div class="min-h-screen bg-[#fdfcf9] text-[#1f2937] select-none pb-12 font-sans">
    <!-- Premium Banner & Welcome Header -->
    <header class="relative overflow-hidden bg-[#064e3b] border-b border-[#053e2f] py-16 px-6 text-center shadow-xl">
      <!-- Decorative Ornaments -->
      <div class="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
      
      <div class="max-w-4xl mx-auto relative z-10">
        <!-- Elegant Golden Logo Motif -->
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0b5e47] border-2 border-[#d4af37] text-[#d4af37] mb-6 shadow-lg">
          <span class="text-3xl font-bold font-uthmani">ق</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-[#d4af37] tracking-tight uppercase mb-4">
          Tahsin Al-Qur'an Interaktif
        </h1>
        <p class="text-[#d1fae5] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Platform interaktif bedah hukum tajwid, makhraj, dan sifatul huruf per kata dengan keindahan Rasm Utsmani kelas dunia.
        </p>
      </div>
    </header>

    <!-- Search & Quick Navigation Hub (Sleek Smart Search Only) -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div class="bg-white border border-[#e6e2d8] rounded-3xl p-6 sm:p-8 shadow-xl">
        
        <!-- Search bar input -->
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Cari nomor juz, halaman, nama surah, atau nomor surah (contoh: 2)..."
            class="w-full bg-[#f9fafb] border border-[#e5e7eb] hover:border-[#064e3b]/50 focus:border-[#064e3b] text-[#1f2937] rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 text-base font-medium placeholder-[#9ca3af] transition-all shadow-inner"
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#064e3b]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Autocomplete Suggestions Dropdown -->
          <div 
            v-if="searchQuery && smartSuggestions.length > 0" 
            class="absolute left-0 right-0 mt-2 bg-white border border-[#e5e7eb] rounded-2xl shadow-2xl z-30 max-h-80 overflow-y-auto divide-y divide-[#e5e7eb]"
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
    </section>

    <!-- Surah List Grid -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xs font-extrabold text-[#064e3b] uppercase tracking-widest">Daftar Surah Al-Qur'an</h2>
        <span class="text-xs text-[#064e3b] bg-white px-3 py-1 rounded-full border border-[#e6e2d8] font-bold">
          {{ filteredSurahs.length }} Surah Ditemukan
        </span>
      </div>

      <div v-if="filteredSurahs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="surah in filteredSurahs" 
          :key="surah.id" 
          :to="`/surah/${surah.id}`"
          class="group bg-white rounded-2xl border border-[#e6e2d8] hover:border-[#064e3b] p-5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-between gap-4 cursor-pointer"
        >
          <div class="flex items-center gap-4">
            <!-- Elegant Green/Gold Number Badge -->
            <div class="w-11 h-11 rounded-xl bg-[#f3f4f6] group-hover:bg-[#064e3b] text-[#064e3b] group-hover:text-white border border-[#e5e7eb] group-hover:border-[#064e3b] flex items-center justify-center font-extrabold text-sm transition-all shadow-inner shrink-0">
              {{ surah.id }}
            </div>
            
            <div>
              <h3 class="text-base font-bold text-[#1f2937] group-hover:text-[#064e3b] transition-colors leading-tight">
                {{ surah.name_latin }}
              </h3>
              <p class="text-xs text-[#6b7280] mt-1 italic font-medium leading-none">{{ surah.total_ayats }} Ayat</p>
            </div>
          </div>

          <div class="text-right">
            <!-- Calligraphy rendering -->
            <span class="font-uthmani text-2xl font-bold text-[#064e3b] block" dir="rtl">
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
