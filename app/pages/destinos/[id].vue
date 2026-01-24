<script setup>
const route = useRoute()
const { destinos } = useDestinos()

console.log('--- INICIO DEL DIAGNÓSTICO ---')

// 1. Verificamos qué ID llega de la URL
const idUrl = route.params.id
console.log('1. ID en la URL:', idUrl, '(Tipo:', typeof idUrl, ')')

// 2. Verificamos si la lista de destinos llegó bien
console.log('2. Lista de destinos:', destinos)

if (!destinos || destinos.length === 0) {
  console.error('❌ ERROR CRÍTICO: La lista de destinos está vacía o indefinida.')
} else {
  console.log('✅ La lista tiene datos. Primer ID disponible:', destinos[0].id, '(Tipo:', typeof destinos[0].id, ')')
}

// 3. Convertimos a número (asegurándonos)
const idActual = Number(idUrl)

// 4. Intentamos buscar
const destino = destinos.find(d => d.id === idActual)
console.log('3. Resultado de la búsqueda:', destino)

console.log('--- FIN DEL DIAGNÓSTICO ---')

// Manejo de error original
if (!destino) {
  throw createError({ statusCode: 404, statusMessage: 'Destino no encontrado', fatal: true })
}

// SEO
if (destino) {
  useHead({
    title: `${destino.titulo} | Turismo Mixteca`,
    meta: [
      { name: 'description', content: destino.descripcionCorto },
      { property: 'og:image', content: destino.imagen }
    ]
  })
}

// 3. SEO Dinámico: El título de la pestaña será el nombre del lugar
useHead({
  title: `${destino.titulo} | Turismo Mixteca`,
  meta: [
    { name: 'description', content: destino.descripcionCorto },
    { property: 'og:image', content: destino.imagen }
  ]
})
</script>

<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    
    <div class="relative h-[50vh] w-full overflow-hidden">
      <NuxtImg 
        :src="destino.imagen" 
        :alt="destino.titulo" 
        format="webp"
        width="1200"
        height="800"
        class="absolute inset-0 h-full w-full object-cover"
        preload
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
      
      <div class="absolute bottom-0 left-0 w-full p-6 sm:p-12 max-w-7xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center text-emerald-300 hover:text-white mb-4 transition-colors font-semibold bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
          &larr; Volver al mapa
        </NuxtLink>
        <h1 class="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">{{ destino.titulo }}</h1>
        <span class="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {{ destino.categoria }}
        </span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 -mt-10 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 space-y-8">
          
          <div class="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-emerald-900/5">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">Sobre este lugar</h2>
            <p class="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
              {{ destino.descripcionCompleta }}
            </p>

            <div class="mt-8">
              <h3 class="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Galería</h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(img, index) in destino.galeria" :key="index" class="rounded-2xl overflow-hidden h-40">
                   <NuxtImg 
                    :src="img" 
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    format="webp"
                    loading="lazy"
                   />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="lg:col-span-1">
          <div class="bg-white rounded-[2rem] p-8 shadow-xl shadow-emerald-900/5 border border-emerald-100 sticky top-24">
            
            <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>🎒</span> Detalles del Viaje
            </h3>

            <div class="space-y-6">
              
              <div class="flex items-start gap-4">
                <div class="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p class="text-sm text-slate-500 font-medium">Costo aproximado</p>
                  <p class="text-lg font-bold text-slate-900">{{ destino.precio }}</p>
                </div>
              </div>

              <div v-if="destino.tips">
                <div class="flex items-start gap-4 mb-3">
                  <div class="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                     <p class="text-sm text-slate-500 font-medium">Recomendaciones</p>
                  </div>
                </div>
                <ul class="space-y-2 pl-12">
                  <li v-for="tip in destino.tips" :key="tip" class="text-sm text-slate-600 list-disc marker:text-emerald-500">
                    {{ tip }}
                  </li>
                </ul>
              </div>

              <div class="pt-6 border-t border-slate-100">
                <a 
                  :href="destino.ubicacion" 
                  target="_blank"
                  class="block w-full rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white shadow-lg hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Ver en Google Maps
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>