<template>
  <span 
    @click="tahsinStore.setActiveWord(word)"
    class="word-interactive font-uthmani inline-flex items-center justify-center align-middle leading-normal transition-all hover:scale-105 duration-150 mx-0 px-[1px] sm:px-[1px] py-1.5 sm:py-2.5 rounded cursor-pointer select-none"
    :class="isActive 
      ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#064e3b] font-bold shadow-sm px-1.5' 
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
