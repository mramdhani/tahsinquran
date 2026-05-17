// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  css: ['~/assets/css/tailwind.css'],
  pwa: {
    manifest: {
      name: 'Tahsin Quran',
      short_name: 'Tahsin',
      description: 'Aplikasi interaktif Tahsin Al-Qur\'an',
      theme_color: '#ffffff',
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /\/api\/surahs.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'api-surahs-cache',
            expiration: {
              maxEntries: 114,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
})
