// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/supabase',],
  supabase: { redirect: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap' }
      ]
    }
  },
  // Configuración de Imágenes
  image: {
    // provider: 'netlify',
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
  },

  nitro: {
    prerender: {
      failOnError: false // Si una página falla, no detengas todo el build
    }
  },

  typescript: {
    typeCheck: false,
    strict: false
  }
})