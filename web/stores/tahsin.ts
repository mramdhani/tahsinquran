import { defineStore } from 'pinia'

export const useTahsinStore = defineStore('tahsin', {
  state: () => ({
    activeWord: null, // Stores the clicked word object
    isBottomSheetOpen: false,
    showTajwidColors: false // Default is false to keep Quran text clean and high contrast
  }),
  actions: {
    setActiveWord(wordData) {
      this.activeWord = wordData
      this.isBottomSheetOpen = true
      
      // Auto play audio if URL is available
      if (wordData.audio_url) {
        const audio = new Audio(wordData.audio_url)
        audio.play()
      }
    },
    closeBottomSheet() {
      this.isBottomSheetOpen = false
      this.activeWord = null
    },
    toggleTajwidColors() {
      this.showTajwidColors = !this.showTajwidColors
    }
  }
})
