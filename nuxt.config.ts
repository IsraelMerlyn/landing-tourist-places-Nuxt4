// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  // Configuración de Imágenes
  image: {
    provider: 'netlify',
    // Permitir optimizar imágenes de estos dominios
    domains: [
      'images.unsplash.com',
      'pbs.twimg.com',
      'mxc.com.mx',
      'oaxaca.eluniversal.com.mx',
      'upload.wikimedia.org',
      'imparcialoaxaca.mx'
    ],
    // Calidad por defecto
    quality: 80,
    format: ['webp']
  }
})