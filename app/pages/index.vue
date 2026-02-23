<script setup>
import { ref, computed, onMounted } from 'vue';

// 1. SEO y Metadatos
useHead({
  title: 'Turismo en la Mixteca | Descubre Oaxaca',
  meta: [
    { name: 'description', content: 'Descubre los tesoros escondidos de Oaxaca. Guía turística de cascadas, cuevas y cultura en la región Mixteca.' },
    { property: 'og:title', content: 'Turismo en la Mixteca | Israel Merlyn' },
    { property: 'og:description', content: 'Explora cascadas, historia y gastronomía de Oaxaca.' },
    { property: 'og:image', content: 'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png' }
  ]
})

// 2. Consumo de API
const { data: destinos, pending, error } = await useFetch('/api/destinos')

if (error.value) {
  console.error('Error cargando destinos:', error.value)
}

// 3. Lógica del Carrusel (¡AHORA DINÁMICO!)
const fallbackImages = [
  'https://pbs.twimg.com/media/CXMShmQUoAALgZX.jpg',
  'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png',
  'https://oaxaca.eluniversal.com.mx/sites/default/files/2021/08/04/cascada_esmeralda_santiago_yosondua.jpg'
];

// Tomamos las 3 fotos más recientes de la BD, o usamos las de respaldo
const carouselImages = computed(() => {
  if (destinos.value && destinos.value.length > 0) {
    return destinos.value.slice(0, 3).map(d => d.imagen)
  }
  return fallbackImages
})

const currentIndex = ref(0);

const prevImage = () => currentIndex.value > 0 ? currentIndex.value-- : currentIndex.value = carouselImages.value.length - 1;
const nextImage = () => currentIndex.value < carouselImages.value.length - 1 ? currentIndex.value++ : currentIndex.value = 0;

onMounted(() => {
  setInterval(() => {
    nextImage()
  }, 5000)
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
    
    const titulo = destino.titulo?.toLowerCase() || '';
    const desc = destino.descripcionCorto?.toLowerCase() || '';
    
    const matchSearch = titulo.includes(query) || desc.includes(query);
    return matchCategory && matchSearch;
  });
});
</script>

<template>
  <div class="bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900 font-sans min-h-screen">

    <header class="relative px-6 pt-20 pb-32 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] overflow-hidden bg-white rounded-b-[4rem] shadow-sm">
      
      <div class="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-full blur-3xl opacity-70"></div>

      <div class="mx-auto max-w-2xl z-10">
        <div class="hidden sm:mb-8 sm:flex sm:justify-start animate-fade-in-up">
          <div class="relative rounded-full px-5 py-2 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-emerald-500 bg-white/60 backdrop-blur-md transition-all shadow-sm">
            ✨ Descubre los tesoros escondidos de Oaxaca.
            <a href="#galeria" class="font-bold text-emerald-600 ml-2 hover:text-emerald-700">
              Ver catálogo <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        
        <div class="text-left animate-fade-in-up animation-delay-100">
          <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl leading-[1.1]">
            La magia pura de la 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Mixteca</span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-500 font-light max-w-lg">
            Una guía premium para explorar cascadas, cuevas y tradiciones milenarias. Conoce los rincones que hacen única a nuestra tierra.
          </p>
          
          <div class="mt-10 flex items-center justify-start gap-x-4">
            <a href="#galeria" 
              class="rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 hover:bg-emerald-600 hover:shadow-emerald-600/30 hover:-translate-y-1 transition-all duration-300">
              Explorar Destinos
            </a>
            <NuxtLink to="/about" class="text-sm font-bold leading-6 text-slate-900 px-8 py-4 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>
              Ver Video
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="relative lg:col-span-1 h-full w-full flex items-center justify-center animate-fade-in-up animation-delay-200">
        <div class="relative h-[450px] md:h-[600px] w-full max-w-lg overflow-hidden rounded-[3rem] shadow-2xl shadow-emerald-900/20 group">
          
          <NuxtImg 
            :src="carouselImages[currentIndex]" 
            alt="Paisaje destacado" 
            format="webp"
            class="h-full w-full object-cover transition-transform duration-[2000ms] ease-out transform group-hover:scale-105" 
          />
          
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none"></div>

          <div class="absolute bottom-8 right-8 flex gap-3 z-20">
            <button @click="prevImage" class="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full hover:bg-white hover:text-slate-900 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button @click="nextImage" class="bg-emerald-500 text-white p-4 rounded-full hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 -mt-20 mb-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white hover:-translate-y-2 transition-transform duration-300">
          <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.535.31c.21.122.463.14.69.05l.59-.234c.338-.135.534-.482.464-.835l-.26-1.303a1.125 1.125 0 00-.54-.808l-1.16-.653a1.125 1.125 0 00-1.163.072l-.46.335a1.125 1.125 0 01-1.428-.016l-.11-.082a1.125 1.125 0 01-.395-.891l.145-1.55a1.125 1.125 0 00-.67-1.104l-.67-.291a1.125 1.125 0 00-1.146.126l-.42.302a1.125 1.125 0 01-1.116.14l-.26-.11a1.125 1.125 0 00-1.17.12L6.115 5.19z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 22.5a10.5 10.5 0 110-21 10.5 10.5 0 010 21z" /></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Naturaleza</h3>
          <p class="text-slate-500 text-sm leading-relaxed">Paisajes vírgenes y biodiversidad única que han resistido el paso del tiempo.</p>
        </div>
        
        <div class="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white hover:-translate-y-2 transition-transform duration-300">
          <div class="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Historia</h3>
          <p class="text-slate-500 text-sm leading-relaxed">Relatos antiguos, arquitectura colonial y el eco de nuestros antepasados.</p>
        </div>

        <div class="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white hover:-translate-y-2 transition-transform duration-300">
          <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Cultura</h3>
          <p class="text-slate-500 text-sm leading-relaxed">Tradiciones vivas, gastronomía auténtica y fiestas que llenan el alma.</p>
        </div>
      </div>
    </div>

    <section id="galeria" class="pb-24 pt-10">

      <div class="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-xl border-b border-gray-200/50 py-4 shadow-sm">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="flex flex-col md:flex-row gap-6 justify-between items-center">

            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar" role="tablist">
              <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" role="tab"
                :aria-selected="selectedCategory === cat" :class="[
                  'px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap',
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-105'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-emerald-500 hover:text-emerald-600'
                ]">
                {{ cat }}
              </button>
            </div>

            <div class="relative w-full md:w-96 group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </div>
              <input v-model="searchQuery" type="text"
                class="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 focus:outline-none shadow-sm transition-all bg-white"
                placeholder="Buscar paraísos, cascadas...">
            </div>

          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-12">

        <div v-if="pending" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="rounded-[2rem] overflow-hidden bg-white shadow-xl border border-gray-100 animate-pulse h-[450px]">
            <div class="h-64 bg-slate-200"></div>
            <div class="p-8 space-y-4">
              <div class="h-6 bg-slate-200 rounded-full w-3/4"></div>
              <div class="h-4 bg-slate-200 rounded-full w-full"></div>
              <div class="h-4 bg-slate-200 rounded-full w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredDestinos.length === 0" class="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-300 shadow-sm">
          <div class="text-6xl mb-6 opacity-40">🗺️</div>
          <h3 class="text-2xl font-bold text-gray-900">Aún no hay destinos aquí</h3>
          <p class="text-gray-500 mb-8 mt-2 max-w-md mx-auto">No pudimos encontrar lo que buscas. Intenta con otra categoría o palabra clave.</p>
          <button @click="searchQuery = ''; selectedCategory = 'Todos'"
            class="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-bold hover:bg-emerald-200 transition-colors">
            Limpiar filtros
          </button>
        </div>

        <transition-group v-else name="list" tag="div" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="destino in filteredDestinos" :key="destino.id"
            class="flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-2 border border-gray-100 group h-full">

            <div class="h-64 w-full overflow-hidden relative">
              <NuxtImg :src="destino.imagen" :alt="destino.titulo" format="webp" loading="lazy"
                class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div class="absolute top-4 right-4 flex flex-col gap-2 items-end">
                <div class="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700 shadow-sm uppercase tracking-wider">
                  {{ destino.categoria }}
                </div>
                <div v-if="destino.galeria && destino.galeria.length > 0" class="bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                  📸 +{{ destino.galeria.length }} Fotos
                </div>
              </div>
            </div>

            <div class="flex flex-1 flex-col justify-between p-8 bg-white">
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-emerald-600 transition-colors">{{ destino.titulo }}</h3>
                <p class="text-sm leading-relaxed text-slate-500 line-clamp-3">
                  {{ destino.descripcionCorto }}
                </p>
              </div>

              <div class="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Desde</span>
                  <span class="text-lg font-black text-slate-900">{{ destino.precio }}</span>
                </div>
                
                <NuxtLink :to="`/destinos/${destino.id}`" 
                  class="rounded-full bg-slate-900 p-3 text-white shadow-md hover:bg-emerald-500 hover:scale-110 transition-all group/btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 group-hover/btn:-rotate-45 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </NuxtLink>
              </div>
            </div>
          </article>
        </transition-group>

      </div>
    </section>

  </div>
</template>

<style scoped>
/* Ocultar scrollbar en los filtros */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Animaciones de entrada (Hero) */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animaciones fluidas del Grid (Filtros) */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.list-leave-active {
  position: absolute; /* Evita saltos bruscos cuando se borran tarjetas */
}
</style>