<template>
  <span 
    @click="tahsinStore.setActiveWord(word)"
    class="word-interactive font-uthmani inline-block transition-all hover:scale-105 duration-150 mx-[1px] px-[2px] rounded cursor-pointer text-[#fdfaf3] hover:text-[#d4af37]"
    :style="tahsinStore.showTajwidColors && wordHasTajwid ? `color: ${word.tajwids[0].color_code};` : ''"
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
  return props.word.tajwids && props.word.tajwids.length > 0
})
</script>
