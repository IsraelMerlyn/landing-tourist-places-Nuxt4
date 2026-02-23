<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

// 1. Obtener datos (Reutilizamos la API existente para no fallar)
const { data: destinos, pending } = await useFetch('/api/destinos')

// 2. Encontrar el destino exacto por ID
const destino = computed(() => {
  if (!destinos.value) return null
  return destinos.value.find(d => d.id == route.params.id)
})

// 3. SEO Dinámico
useHead({
  title: computed(() => destino.value ? `${destino.value.titulo} | Descubre Oaxaca` : 'Cargando Destino...'),
})

// 4. Utilidad para formatear los saltos de línea de la descripción
const formatDescription = (text) => {
  if (!text) return 'Sin descripción detallada.'
  return text.replace(/\n/g, '<br />')
}

// 5. Lógica de la Galería (Lightbox)
const lightboxOpen = ref(false)
const selectedImage = ref('')

const openLightbox = (imgUrl) => {
  selectedImage.value = imgUrl
  lightboxOpen.value = true
}
</script>

<template>
  <div class="bg-slate-50 min-h-screen font-sans pb-24 selection:bg-emerald-200 selection:text-emerald-900">
    
    <div v-if="pending" class="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      <p class="text-emerald-700 font-bold animate-pulse">Preparando tu viaje...</p>
    </div>

    <div v-else-if="!destino" class="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div class="text-8xl mb-6 grayscale opacity-30">🧭</div>
      <h1 class="text-3xl font-bold text-slate-900 mb-2">Destino no encontrado</h1>
      <p class="text-slate-500 mb-8">Parece que este rincón de la Mixteca aún es un secreto.</p>
      <button @click="router.back()" class="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-500 transition-colors">
        Volver a explorar
      </button>
    </div>

    <main v-else class="animate-fade-in">
      
      <button @click="router.back()" class="absolute top-6 left-6 md:top-10 md:left-10 z-50 bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white hover:text-slate-900 transition-all shadow-xl group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 group-hover:-translate-x-1 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
      </button>

      <div class="relative h-[60vh] md:h-[70vh] w-full w-full overflow-hidden ">
        <NuxtImg 
          :src="destino.imagen" 
          :alt="destino.titulo"
          class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/40 to-transparent"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-40 md:-mt-56">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div class="lg:col-span-8 space-y-10">
            
            <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {{ destino.categoria }}
                </span>
                <span class="flex items-center text-slate-400 text-sm font-medium gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" /></svg>
                  Oaxaca, México
                </span>
              </div>
              
              <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 font-montserrat">
                {{ destino.titulo }}
              </h1>
              
              <p class="text-xl text-slate-500 font-light leading-relaxed">
                {{ destino.descripcionCorto }}
              </p>
            </div>

            <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span class="bg-orange-100 text-orange-600 p-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </span>
                Sobre este lugar
              </h2>
              
              <div class="prose prose-lg prose-emerald max-w-none text-slate-600 font-light leading-loose" 
                   v-html="formatDescription(destino.descripcionCompleta || destino.descripcionCorto)">
              </div>
            </div>

            <div v-if="destino.galeria && destino.galeria.length > 0" class="space-y-6">
              <h2 class="text-2xl font-bold text-slate-900 flex items-center gap-3 ml-2">
                📸 Galería visual
              </h2>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                <div v-for="(img, index) in destino.galeria" :key="index" 
                     @click="openLightbox(img)"
                     class="relative rounded-3xl overflow-hidden cursor-pointer group shadow-md"
                     :class="{ 'col-span-2 row-span-2': index === 0 }"> <NuxtImg :src="img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="lg:col-span-4">
            <div class="sticky top-24 bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/80 border border-slate-100">
              
              <div class="flex flex-col mb-8 pb-8 border-b border-slate-100">
                <span class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Inversión desde</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-5xl font-black text-slate-900">{{ destino.precio }}</span>
                </div>
              </div>

              <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3 text-slate-600">
                  <span class="bg-emerald-50 text-emerald-600 p-2 rounded-lg">✅</span>
                  <span class="font-medium">Guía local certificado</span>
                </div>
                <div class="flex items-center gap-3 text-slate-600">
                  <span class="bg-emerald-50 text-emerald-600 p-2 rounded-lg">📸</span>
                  <span class="font-medium">Zonas fotográficas</span>
                </div>
                <div class="flex items-center gap-3 text-slate-600">
                  <span class="bg-emerald-50 text-emerald-600 p-2 rounded-lg">🍃</span>
                  <span class="font-medium">Eco-turismo responsable</span>
                </div>
              </div>

              <button class="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2">
                Solicitar Información
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </button>
              
              <p class="text-center text-xs text-slate-400 mt-4 font-medium">
                Sujeto a disponibilidad por temporada.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>

    <transition name="fade">
      <div v-if="lightboxOpen" class="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center" @click="lightboxOpen = false">
        <button class="absolute top-6 right-6 text-white/50 hover:text-white p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <NuxtImg :src="selectedImage" class="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl" @click.stop />
      </div>
    </transition>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Animación del Lightbox */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos para el inyector HTML de la descripción */
:deep(.prose) {
  p { margin-bottom: 1.5em; }
}
</style>