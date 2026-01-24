<script setup>
import { ref, computed } from 'vue';

// 1. SEO: Definimos los meta tags para Google
useHead({
  title: 'Turismo en la Mixteca | Israel Merlyn',
  meta: [
    { name: 'description', content: 'Descubre los tesoros escondidos de Oaxaca. Guía turística de cascadas, cuevas y cultura en la región Mixteca.' },
    // Open Graph para que se vea bonito al compartir en Facebook/WhatsApp
    { property: 'og:title', content: 'Turismo en la Mixteca | Israel Merlyn' },
    { property: 'og:description', content: 'Explora cascadas, historia y gastronomía de Oaxaca.' },
    { property: 'og:image', content: 'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png' }
  ]
})

// ... (Tu data original se mantiene igual) ...
const { destinos } = useDestinos()

const carouselImages = [
  'https://pbs.twimg.com/media/CXMShmQUoAALgZX.jpg',
  'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png',
  'https://oaxaca.eluniversal.com.mx/sites/default/files/2021/08/04/cascada_esmeralda_santiago_yosondua.jpg'
];
const currentIndex = ref(0);

const prevImage = () => currentIndex.value > 0 ? currentIndex.value-- : currentIndex.value = carouselImages.length - 1;
const nextImage = () => currentIndex.value < carouselImages.length - 1 ? currentIndex.value++ : currentIndex.value = 0;

const searchQuery = ref('');
const selectedCategory = ref('Todos');
const categories = ['Todos', 'Naturaleza', 'Cultura', 'Aventura', 'Gastronomía'];

const filteredDestinos = computed(() => {
  return destinos.filter(destino => {
    const matchCategory = selectedCategory.value === 'Todos' || destino.categoria === selectedCategory.value;
    const query = searchQuery.value.toLowerCase();
    const matchSearch = destino.titulo.toLowerCase().includes(query) ||
      destino.descripcionCorto.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });
});
</script>

<template>
  <div class="bg-white">

    <header
      class="relative isolate px-6 pt-14 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">

      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 lg:pr-10">
        <div class="hidden sm:mb-8 sm:flex sm:justify-start">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-gray-50/50 backdrop-blur-sm">
            Tesoros escondidos de Oaxaca.
            <a href="#galeria"
              class="font-semibold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm">
              <span class="absolute inset-0" aria-hidden="true"></span>Ver galería <span
                aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div class="text-left">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Descubre la magia de la Mixteca
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Una guía para explorar cascadas, cuevas y tradiciones milenarias. Conoce los rincones que hacen única a
            nuestra tierra.
          </p>
          <div class="mt-10 flex items-center justify-start gap-x-6">
            <a href="#galeria" aria-label="Ir a la sección de explorar lugares"
              class="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-500 hover:-translate-y-1 transition-all">
              Explorar Lugares
            </a>
            <NuxtLink to="/about"
              class="text-sm font-semibold leading-6 text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors">
              Nuestra Historia <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="relative lg:col-span-1 h-full w-full group p-4 mb-24 lg:mb-0">
        <div class="absolute inset-0 bg-emerald-200 blur-3xl opacity-20 rounded-full transform translate-y-10"></div>

        <div class="relative h-[500px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-200">
          <NuxtImg :src="carouselImages[currentIndex]" alt="Paisaje destacado de la Mixteca Oaxaqueña" format="webp"
            width="1200" height="800" preload fetchpriority="high" sizes="sm:100vw md:50vw lg:800px"
            class="h-full w-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>

        <button aria-label="Imagen anterior"
          class="absolute top-1/2 left-8 -translate-y-1/2 bg-white/80 backdrop-blur-md text-emerald-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg z-10"
          @click="prevImage">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button aria-label="Siguiente imagen"
          class="absolute top-1/2 right-8 -translate-y-1/2 bg-white/80 backdrop-blur-md text-emerald-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg z-10"
          @click="nextImage">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </header>

    <section class="bg-emerald-900 py-24 sm:py-32 rounded-t-[3rem] -mt-10 relative z-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center text-white mb-16">
          <h2 class="text-base font-semibold leading-7 text-emerald-400 tracking-wider uppercase">Conoce tu tierra</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Más que un destino, un legado</p>
        </div>

        <div class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 text-emerald-100">
          <div class="flex flex-col gap-2">
            <h3 class="text-white font-bold text-lg">🌿 Naturaleza</h3>
            <p>Paisajes vírgenes y biodiversidad única.</p>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-white font-bold text-lg">🏛 Historia</h3>
            <p>Relatos antiguos y arquitectura colonial.</p>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-white font-bold text-lg">🎭 Cultura</h3>
            <p>Tradiciones vivas, gastronomía y fiestas.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="galeria" class="bg-slate-50 min-h-screen pb-24">

      <div class="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md border-b border-gray-200 py-6">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="flex flex-col md:flex-row gap-6 justify-between items-center">

            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar" role="tablist">
              <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" role="tab"
                :aria-selected="selectedCategory === cat" :class="[
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-500 hover:text-emerald-600'
                ]">
                {{ cat }}
              </button>
            </div>

            <div class="relative w-full md:w-80">
              <label for="search" class="sr-only">Buscar destinos</label>
              <input id="search" v-model="searchQuery" type="text"
                class="block w-full rounded-full border-0 py-2.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 shadow-sm"
                placeholder="Buscar cascadas, pueblos...">
            </div>

          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-12">

        <div v-if="filteredDestinos.length === 0" class="text-center py-20">
          <div class="text-6xl mb-4" aria-hidden="true">🔍</div>
          <h3 class="text-lg font-medium text-gray-900">No hay resultados</h3>
          <button @click="searchQuery = ''; selectedCategory = 'Todos'"
            class="mt-4 text-emerald-600 font-semibold hover:underline">Ver todo de nuevo</button>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="destino in filteredDestinos" :key="destino.id"
            class="flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-shadow duration-300 border border-gray-100 group">

            <div class="h-56 w-full overflow-hidden relative">
              <NuxtImg :src="destino.imagen" :alt="`Fotografía de ${destino.titulo}`" format="webp" loading="lazy"
                width="600" height="400" sizes="sm:100vw md:50vw lg:400px"
                class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div class="flex flex-1 flex-col justify-between p-8">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ destino.titulo }}</h3>
                <p class="text-sm leading-6 text-gray-500 line-clamp-3">
                  {{ destino.descripcionCorto }}
                </p>
              </div>

              <div class="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  {{ destino.precio }}
                </span>
              <NuxtLink 
    :to="`/destinos/${destino.id}`"
    :aria-label="`Ver detalles de ${destino.titulo}`"
    class="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-slate-700 transition-colors flex items-center gap-1"
  >
    Ver Detalles <span aria-hidden="true">&rarr;</span>
  </NuxtLink>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>

  </div>
</template>