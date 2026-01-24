<script setup>
import { computed } from 'vue' // Aseguramos importar computed

const route = useRoute()
// Convertimos a número con seguridad
const idActual = Number(route.params.id)

// 1. Usamos 'lazy: true' para que no bloquee la navegación si tarda un poco
const { data: respuestaApi, pending, error } = await useFetch('/api/destinos', {
  lazy: true
})

// 2. Lógica computada para encontrar el destino de forma segura
// Esto se recalcula automáticamente cuando 'respuestaApi' cambia
const destino = computed(() => {
  // Si no ha cargado, regresamos null
  if (!respuestaApi.value) return null

  // Normalizamos (si viene array u objeto)
  const lista = Array.isArray(respuestaApi.value) 
    ? respuestaApi.value 
    : (respuestaApi.value?.destinos || [])

  // Buscamos con "==" para flexibilidad (1 == "1")
  return lista.find(d => d?.id == idActual)
})

// 3. SEO (Solo se aplica si destino existe)
// Usamos watchEffect o un computed dentro de useHead si queremos reactividad total,
// pero esto es seguro para evitar errores si es null.
if (destino.value) {
  useHead({
    title: `${destino.value.titulo} | Turismo Mixteca`,
    meta: [
      { name: 'description', content: destino.value.descripcionCorto },
      { property: 'og:image', content: destino.value.imagen }
    ]
  })
}
</script>

<template>
  <div class="bg-slate-50 min-h-screen">

    <div v-if="pending" class="h-screen w-full flex flex-col items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600 mb-4"></div>
      <p class="text-slate-500 font-medium animate-pulse">Cargando experiencia...</p>
    </div>

    <div v-else-if="error || !destino" class="h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      <div class="text-6xl mb-4">🗺️</div>
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Destino no encontrado</h1>
      <p class="text-slate-500 mb-8 max-w-md">Parece que este lugar no existe o hubo un problema al cargar el mapa.</p>
      <NuxtLink to="/" class="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg">
        Volver al Mapa
      </NuxtLink>
    </div>

    <div v-else class="pb-24 animate-fade-in">
      
      <div class="relative h-[50vh] w-full overflow-hidden">
        <NuxtImg 
          :src="destino.imagen" 
          :alt="destino.titulo" 
          format="webp"
          class="absolute inset-0 h-full w-full object-cover"
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
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-[2rem] p-8 shadow-xl shadow-emerald-900/5 border border-emerald-100 sticky top-24">
              <h3 class="text-xl font-bold text-slate-900 mb-6">🎒 Detalles</h3>
              <div class="space-y-6">
                <p class="text-lg font-bold text-slate-900">{{ destino.precio }}</p>
                
                <div v-if="destino.tips && destino.tips.length">
                  <p class="text-sm text-slate-500 font-medium mb-2">Recomendaciones</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li v-for="tip in destino.tips" :key="tip" class="text-sm text-slate-600">{{ tip }}</li>
                  </ul>
                </div>

                <a :href="destino.ubicacion" target="_blank" class="block w-full rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white hover:bg-slate-700 transition-colors">
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

<style scoped>
/* Una pequeña animación para que la entrada sea suave */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>