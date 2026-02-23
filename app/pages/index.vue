<script setup>
import { ref, computed, onMounted } from 'vue';

// 1. SEO y Metadatos
useHead({
  title: 'Turismo en la Mixteca | Israel Merlyn',
  meta: [
    { name: 'description', content: 'Descubre los tesoros escondidos de Oaxaca. Guía turística de cascadas, cuevas y cultura en la región Mixteca.' },
    { property: 'og:title', content: 'Turismo en la Mixteca | Israel Merlyn' },
    { property: 'og:description', content: 'Explora cascadas, historia y gastronomía de Oaxaca.' },
    { property: 'og:image', content: 'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png' }
  ]
})

// 2. Consumo de API (Con manejo de estado)
const { data: destinos, pending, error } = await useFetch('/api/destinos')

if (error.value) {
  console.error('Error cargando destinos:', error.value)
}

// 3. Lógica del Carrusel
const carouselImages = [
  'https://pbs.twimg.com/media/CXMShmQUoAALgZX.jpg',
  'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png',
  'https://oaxaca.eluniversal.com.mx/sites/default/files/2021/08/04/cascada_esmeralda_santiago_yosondua.jpg'
];
const currentIndex = ref(0);

const prevImage = () => currentIndex.value > 0 ? currentIndex.value-- : currentIndex.value = carouselImages.length - 1;
const nextImage = () => currentIndex.value < carouselImages.length - 1 ? currentIndex.value++ : currentIndex.value = 0;

// Auto-play del carrusel (Mejora UX)
onMounted(() => {
  setInterval(() => {
    nextImage()
  }, 6000)
})

// 4. Lógica de Filtrado
const searchQuery = ref('');
const selectedCategory = ref('Todos');
const categories = ['Todos', 'Naturaleza', 'Cultura', 'Aventura', 'Gastronomía'];

const filteredDestinos = computed(() => {
  const listaDestinos = destinos.value || []
  
  return listaDestinos.filter(destino => {
    const matchCategory = selectedCategory.value === 'Todos' || destino.categoria === selectedCategory.value;
    const query = searchQuery.value.toLowerCase();
    
    // Búsqueda segura (evita errores si description es null)
    const titulo = destino.titulo?.toLowerCase() || '';
    const desc = destino.descripcionCorto?.toLowerCase() || '';
    
    const matchSearch = titulo.includes(query) || desc.includes(query);
    return matchCategory && matchSearch;
  });
});
</script>

<template>
  <div class="bg-white selection:bg-emerald-200 selection:text-emerald-900">

  <header class="relative isolate px-6 pt-14 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] overflow-hidden">
      
      <div class="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[800px] bg-emerald-50/50 rounded-full blur-3xl opacity-60"></div>

      <div class="mx-auto max-w-2xl py-10 lg:py-0 lg:pr-10 z-10">
        <div class="hidden sm:mb-8 sm:flex sm:justify-start">
          <div class="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-emerald-500/50 bg-white/60 backdrop-blur-md transition-all">
            Tesoros escondidos de Oaxaca.
            <a href="#galeria" class="font-bold text-emerald-600 ml-1">
              Ver galería <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        
        <div class="text-left">
          <h1 class="font-montserrat text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl leading-tight">
            Descubre la magia de la 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Mixteca</span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 font-sans font-light">
            Una guía para explorar cascadas, cuevas y tradiciones milenarias. Conoce los rincones que hacen única a nuestra tierra.
          </p>
          
          <div class="mt-10 flex items-center justify-start gap-x-4">
            <a href="#galeria" 
              class="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:-translate-y-1 transition-all">
              Explorar Lugares
            </a>
            <NuxtLink to="/about" class="text-sm font-bold leading-6 text-gray-900 px-6 py-3.5 hover:bg-gray-50 rounded-full border border-gray-200 transition-colors">
              Nuestra Historia
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="relative lg:col-span-1 h-full w-full p-4 lg:mb-0 flex items-center justify-center">
        <div class="absolute inset-0 bg-emerald-300 blur-3xl opacity-20 rounded-full transform translate-y-10 scale-90 -z-10"></div>

        <div class="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-900/10 border-4 border-white group">
          
          <NuxtImg 
            :src="carouselImages[currentIndex]" 
            alt="Paisaje destacado de la Mixteca Oaxaqueña" 
            format="webp"
            width="800" height="600"
            class="h-full w-full object-cover transition-transform duration-[1500ms] ease-in-out transform group-hover:scale-110" 
          />
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

          <div class="absolute bottom-6 right-6 flex gap-3 z-20">
            <button @click="prevImage" aria-label="Anterior" class="bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white hover:text-emerald-900 transition-all shadow-lg hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button @click="nextImage" aria-label="Siguiente" class="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-400 border border-emerald-400 transition-all shadow-lg hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
          
        </div>
      </div>
    </header>

    <section class="bg-slate-900 py-20 rounded-t-[3rem] mt-12 lg:-mt-24 relative z-20 overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div class="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div class="mx-auto max-w-2xl lg:text-center text-white mb-16">
          <h2 class="text-sm font-bold text-emerald-400 tracking-widest uppercase mb-2">Conoce tu tierra</h2>
          <p class="font-montserrat text-3xl font-bold text-white sm:text-4xl">Más que un destino, un legado</p>
        </div>

        <div class="grid max-w-xl grid-cols-1 gap-10 lg:max-w-none lg:grid-cols-3">
          <div class="group flex flex-col gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors">
            <div class="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl">🌿</div>
            <h3 class="text-white font-montserrat font-bold text-xl">Naturaleza</h3>
            <p class="text-slate-400 font-light leading-relaxed">Paisajes vírgenes y biodiversidad única que han resistido el paso del tiempo.</p>
          </div>
          <div class="group flex flex-col gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors">
            <div class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-2xl">🏛</div>
            <h3 class="text-white font-montserrat font-bold text-xl">Historia</h3>
            <p class="text-slate-400 font-light leading-relaxed">Relatos antiguos, arquitectura colonial y el eco de los antepasados.</p>
          </div>
          <div class="group flex flex-col gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors">
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl">🎭</div>
            <h3 class="text-white font-montserrat font-bold text-xl">Cultura</h3>
            <p class="text-slate-400 font-light leading-relaxed">Tradiciones vivas, gastronomía auténtica y fiestas que llenan el alma.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="galeria" class="bg-slate-50 min-h-screen pb-24 pt-10">

      <div class="sticky top-0 z-30 bg-slate-50/90 backdrop-blur-lg border-b border-gray-200 py-4 shadow-sm">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="flex flex-col md:flex-row gap-6 justify-between items-center">

            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar" role="tablist">
              <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" role="tab"
                :aria-selected="selectedCategory === cat" :class="[
                  'px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap border',
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-500 hover:text-emerald-600'
                ]">
                {{ cat }}
              </button>
            </div>

            <div class="relative w-full md:w-80 group">
              <label for="search" class="sr-only">Buscar destinos</label>
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                </svg>
              </div>
              <input id="search" v-model="searchQuery" type="text"
                class="block w-full rounded-full border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 focus:outline-none shadow-sm transition-all"
                placeholder="Buscar cascadas, pueblos...">
            </div>

          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-12">

        <div v-if="pending" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="rounded-[2rem] overflow-hidden bg-white shadow-lg border border-gray-100 animate-pulse h-[400px]">
            <div class="h-56 bg-gray-200"></div>
            <div class="p-8 space-y-4">
              <div class="h-6 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredDestinos.length === 0" class="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
          <div class="text-6xl mb-4 grayscale opacity-50">🏜️</div>
          <h3 class="text-lg font-bold text-gray-900">No encontramos destinos</h3>
          <p class="text-gray-500 mb-6">Intenta cambiar tu búsqueda o categoría.</p>
          <button @click="searchQuery = ''; selectedCategory = 'Todos'"
            class="text-emerald-600 font-bold hover:underline">Ver todo de nuevo</button>
        </div>

        <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="destino in filteredDestinos" :key="destino.id"
            class="flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-2 border border-gray-100 group h-full">

            <div class="h-60 w-full overflow-hidden relative">
              <NuxtImg :src="destino.imagen" :alt="`Fotografía de ${destino.titulo}`" format="webp" loading="lazy"
                width="600" height="400"
                class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-800 shadow-sm uppercase tracking-wide">
                {{ destino.categoria }}
              </div>
            </div>

            <div class="flex flex-1 flex-col justify-between p-8">
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-montserrat font-bold text-gray-900 leading-tight">{{ destino.titulo }}</h3>
                </div>
                <p class="text-sm leading-relaxed text-gray-500 line-clamp-3 font-light">
                  {{ destino.descripcionCorto }}
                </p>
              </div>

              <div class="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <div class="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md">
                  <span>💲</span> {{ destino.precio }}
                </div>
                
                <NuxtLink :to="`/destinos/${destino.id}`" 
                  class="rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-600 transition-colors flex items-center gap-2 group-hover:gap-3">
                  Ver Detalles <span aria-hidden="true" class="transition-all">&rarr;</span>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
/* Utilidad para ocultar scrollbar horizontal en móviles */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>