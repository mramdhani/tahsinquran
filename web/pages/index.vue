<template>
  <div class="min-h-screen bg-[#14110e] text-[#e8dcb8] select-none pb-12 font-sans">
    <!-- Premium Banner & Welcome Header -->
    <header class="relative overflow-hidden bg-[#1e1915] border-b border-[#4e3a28] py-16 px-6 text-center shadow-xl">
      <!-- Decorative Ornaments -->
      <div class="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c1a067_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
      
      <div class="max-w-4xl mx-auto relative z-10">
        <!-- Elegant Golden Logo Motif -->
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2d241d] border-2 border-[#d4af37] text-[#d4af37] mb-6 shadow-lg">
          <span class="text-3xl font-bold font-uthmani">ق</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-[#d4af37] tracking-tight uppercase mb-4">
          Tahsin Al-Qur'an Interaktif
        </h1>
        <p class="text-[#b09e8a] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Platform interaktif bedah hukum tajwid, makhraj, dan sifatul huruf per kata dengan keindahan Rasm Utsmani kelas dunia.
        </p>
      </div>
    </header>

    <!-- Search & Quick Navigation Hub -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div class="bg-[#1e1915] border border-[#4e3a28] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        
        <!-- Search bar input -->
        <div class="relative mb-6">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama surah, nomor surah, arti..."
            class="w-full bg-[#14110e] border border-[#5a4431] hover:border-[#d4af37]/50 focus:border-[#d4af37] text-[#fdfaf3] rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 text-base font-medium placeholder-[#5a4431] transition-all shadow-inner"
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Autocomplete Suggestions Dropdown -->
          <div 
            v-if="searchQuery && filteredSurahs.length > 0" 
            class="absolute left-0 right-0 mt-2 bg-[#1e1915] border border-[#4e3a28] rounded-2xl shadow-2xl z-30 max-h-60 overflow-y-auto divide-y divide-[#4e3a28]/40"
          >
            <div 
              v-for="surah in filteredSurahs" 
              :key="surah.id"
              @click="selectSurah(surah)"
              class="flex justify-between items-center px-5 py-3.5 hover:bg-[#2d241d] cursor-pointer transition-colors group"
            >
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-[#2d241d] group-hover:bg-[#d4af37] text-[#d4af37] group-hover:text-[#14110e] flex items-center justify-center font-bold text-xs border border-[#4e3a28] transition-all">
                  {{ surah.id }}
                </span>
                <div>
                  <span class="text-sm font-bold text-[#fdfaf3] group-hover:text-[#d4af37] transition-colors block leading-snug">
                    {{ surah.name_latin }}
                  </span>
                  <span class="text-[10px] text-[#8c7355] block italic leading-none">{{ surah.total_ayats }} Ayat</span>
                </div>
              </div>
              <span class="font-uthmani text-xl text-[#d4af37] font-bold" dir="rtl">
                {{ surah.name_arabic }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#4e3a28]/60">
          <!-- Quick Page Jump -->
          <div class="bg-[#2d241d]/50 border border-[#4e3a28]/80 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <h3 class="text-xs font-bold text-[#8c7355] uppercase tracking-wider mb-1">Lompat Langsung ke Halaman</h3>
              <p class="text-[#b09e8a] text-xs">Mendukung Halaman Mushaf Standar 1 hingga 604.</p>
            </div>
            <div class="flex items-center gap-2">
              <input 
                v-model="inputPage"
                type="number"
                min="1"
                max="604"
                placeholder="1-604"
                @keyup.enter="onPageJump"
                class="w-full bg-[#14110e] border border-[#5a4431] focus:border-[#d4af37] text-center text-[#fdfaf3] rounded-xl py-2 px-3 focus:outline-none text-sm font-extrabold"
              />
              <button 
                @click="onPageJump" 
                class="px-5 py-2 bg-[#d4af37] hover:bg-[#e8c352] text-[#14110e] rounded-xl transition-all font-bold text-sm shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
              >
                Buka Lembar
              </button>
            </div>
          </div>

          <!-- Quick Juz Select -->
          <div class="bg-[#2d241d]/50 border border-[#4e3a28]/80 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <h3 class="text-xs font-bold text-[#8c7355] uppercase tracking-wider mb-1">Pilih Juz Instan</h3>
              <p class="text-[#b09e8a] text-xs">Akses koordinat halaman Juz 1 sampai Juz 30.</p>
            </div>
            <div class="relative">
              <select 
                v-model="selectedJuz"
                @change="onJuzSelect"
                class="appearance-none w-full bg-[#14110e] border border-[#5a4431] hover:border-[#d4af37]/50 text-[#fdfaf3] rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 text-sm font-semibold transition-all cursor-pointer"
              >
                <option value="" disabled>Pilih Nomor Juz...</option>
                <option v-for="j in 30" :key="j" :value="j">Juz {{ j }}</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Surah List Grid -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xs font-extrabold text-[#8c7355] uppercase tracking-widest">Daftar Surah Al-Qur'an</h2>
        <span class="text-xs text-[#8c7355] bg-[#1e1915] px-3 py-1 rounded-full border border-[#4e3a28]">
          {{ filteredSurahs.length }} Surah Ditemukan
        </span>
      </div>

      <div v-if="filteredSurahs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="surah in filteredSurahs" 
          :key="surah.id" 
          :to="`/surah/${surah.id}`"
          class="group bg-[#1e1915] rounded-2xl border border-[#3b2e25] hover:border-[#d4af37]/50 p-5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 cursor-pointer"
        >
          <div class="flex items-center gap-4">
            <!-- Elegant Golden Number Badge -->
            <div class="w-11 h-11 rounded-xl bg-[#2d241d] group-hover:bg-[#d4af37] text-[#d4af37] group-hover:text-[#14110e] border border-[#5a4431] group-hover:border-[#d4af37] flex items-center justify-center font-extrabold text-sm transition-all shadow-inner shrink-0">
              {{ surah.id }}
            </div>
            
            <div>
              <h3 class="text-base font-bold text-[#fdfaf3] group-hover:text-[#d4af37] transition-colors leading-tight">
                {{ surah.name_latin }}
              </h3>
              <p class="text-xs text-[#8c7355] mt-1 italic font-medium leading-none">{{ surah.total_ayats }} Ayat</p>
            </div>
          </div>

          <div class="text-right">
            <!-- Caligraphy rendering -->
            <span class="font-uthmani text-2xl font-bold text-[#d4af37] block" dir="rtl">
              {{ surah.name_arabic }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-16 bg-[#1e1915] rounded-3xl border border-dashed border-[#4e3a28] p-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-[#8c7355] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-lg font-bold text-[#fdfaf3] mb-1">Surah Tidak Ditemukan</h3>
        <p class="text-sm text-[#b09e8a]">Coba cari dengan kata kunci lain atau periksa ejaan Anda.</p>
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
const inputPage = ref('')
const selectedJuz = ref('')

const selectSurah = (surah) => {
  searchQuery.value = ''
  router.push(`/surah/${surah.id}`)
}

const JUZ_PAGE_MAP = {
  1: 1, 2: 22, 3: 42, 4: 62, 5: 82, 6: 102, 7: 121, 8: 142, 9: 162, 10: 182,
  11: 201, 12: 222, 13: 242, 14: 262, 15: 282, 16: 302, 17: 322, 18: 342, 19: 362, 20: 382,
  21: 402, 22: 422, 23: 442, 24: 462, 25: 482, 26: 502, 27: 522, 28: 542, 29: 562, 30: 582
}

// Dynamic Filter
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

const onPageJump = async () => {
  const pageNum = parseInt(inputPage.value)
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

const onJuzSelect = async () => {
  const targetPage = JUZ_PAGE_MAP[selectedJuz.value]
  if (targetPage) {
    try {
      const res = await $fetch(`https://api.alquran.cloud/v1/page/${targetPage}`)
      if (res && res.data && res.data.ayahs.length > 0) {
        const targetSurahId = res.data.ayahs[0].surah.number
        router.push(`/surah/${targetSurahId}?page=${targetPage}`)
      }
    } catch (e) {
      console.error('Error fetching Juz coordinate', e)
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
