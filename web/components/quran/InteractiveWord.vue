<template>
  <span 
    @click="tahsinStore.setActiveWord(word)"
    class="word-interactive font-uthmani inline-block align-baseline transition-all duration-150 mx-0 px-[0.5px] sm:px-[1px] rounded cursor-pointer select-none"
    :class="isActive 
      ? 'text-[#c29b38] font-black' 
      : 'text-[#064e3b] sm:hover:text-[#d4af37]'"
    :style="isActive ? 'color: #c29b38 !important;' : (tahsinStore.showTajwidColors && wordHasTajwid ? `color: ${word.tajwids[0].color_code} !important;` : '')"
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
