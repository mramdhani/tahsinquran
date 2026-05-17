<template>
  <span 
    @click="tahsinStore.setActiveWord(word)"
    class="word-interactive font-uthmani inline-block transition-all hover:scale-105 duration-150 mx-[2px] px-1 py-0.5 rounded cursor-pointer select-none transition-all"
    :class="isActive 
      ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#064e3b] font-bold shadow-sm' 
      : 'text-[#064e3b] hover:text-[#d4af37]'"
    :style="tahsinStore.showTajwidColors && wordHasTajwid && !isActive ? `color: ${word.tajwids[0].color_code} !important;` : ''"
  >
    {{ word.text_arabic }}
  </span>
</template>

<script setup>
import { useTahsinStore } from '~/stores/tahsin'
import { computed } from 'vue'

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
})

const tahsinStore = useTahsinStore()

const wordHasTajwid = computed(() => {
  return props.word.tajwids && props.word.tajwids.length > 0 && props.word.tajwids[0].id !== 'lafadz_standar'
})

const isActive = computed(() => {
  return tahsinStore.activeWord && tahsinStore.activeWord.id === props.word.id
})
</script>
