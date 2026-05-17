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

    <!-- Search & Quick Navigation Hub -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div class="bg-white border border-[#e6e2d8] rounded-3xl p-6 sm:p-8 shadow-xl">
        
        <!-- Search bar input -->
        <div class="relative mb-6">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama surah, nomor surah, arti..."
            class="w-full bg-[#f9fafb] border border-[#e5e7eb] hover:border-[#064e3b]/50 focus:border-[#064e3b] text-[#1f2937] rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 text-base font-medium placeholder-[#9ca3af] transition-all shadow-inner"
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#064e3b]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Autocomplete Suggestions Dropdown -->
          <div 
            v-if="searchQuery && filteredSurahs.length > 0" 
            class="absolute left-0 right-0 mt-2 bg-white border border-[#e5e7eb] rounded-2xl shadow-2xl z-30 max-h-60 overflow-y-auto divide-y divide-[#e5e7eb]"
          >
            <div 
              v-for="surah in filteredSurahs" 
              :key="surah.id"
              @click="selectSurah(surah)"
              class="flex justify-between items-center px-5 py-3.5 hover:bg-[#f3f4f6] cursor-pointer transition-colors group"
            >
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-[#f3f4f6] group-hover:bg-[#064e3b] text-[#064e3b] group-hover:text-white flex items-center justify-center font-bold text-xs border border-[#e5e7eb] transition-all">
                  {{ surah.id }}
                </span>
                <div>
                  <span class="text-sm font-bold text-[#1f2937] group-hover:text-[#064e3b] transition-colors block leading-snug">
                    {{ surah.name_latin }}
                  </span>
                  <span class="text-[10px] text-[#6b7280] block italic leading-none">{{ surah.total_ayats }} Ayat</span>
                </div>
              </div>
              <span class="font-uthmani text-xl text-[#064e3b] font-bold" dir="rtl">
                {{ surah.name_arabic }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e6e2d8]">
          <!-- Quick Page Jump -->
          <div class="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm">
            <div>
              <h3 class="text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-1">Lompat Langsung ke Halaman</h3>
              <p class="text-[#6b7280] text-xs">Mendukung Halaman Mushaf Standar 1 hingga 604.</p>
            </div>
            <div class="flex items-center gap-2">
              <input 
                v-model="inputPage"
                type="number"
                min="1"
                max="604"
                placeholder="1-604"
                @keyup.enter="onPageJump"
                class="w-full bg-white border border-[#e5e7eb] focus:border-[#064e3b] text-center text-[#1f2937] rounded-xl py-2 px-3 focus:outline-none text-sm font-extrabold focus:ring-2 focus:ring-[#064e3b]/20"
              />
              <button 
                @click="onPageJump" 
                class="px-5 py-2 bg-[#064e3b] hover:bg-[#08664e] text-white rounded-xl transition-all font-bold text-sm shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
              >
                Buka Lembar
              </button>
            </div>
          </div>

          <!-- Quick Juz Select -->
          <div class="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm">
            <div>
              <h3 class="text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-1">Pilih Juz Instan</h3>
              <p class="text-[#6b7280] text-xs">Akses koordinat halaman Juz 1 sampai Juz 30.</p>
            </div>
            <div class="relative">
              <select 
                v-model="selectedJuz"
                @change="onJuzSelect"
                class="appearance-none w-full bg-white border border-[#e5e7eb] hover:border-[#064e3b]/50 text-[#1f2937] rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#064e3b]/20 text-sm font-semibold transition-all cursor-pointer"
              >
                <option value="" disabled>Pilih Nomor Juz...</option>
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
