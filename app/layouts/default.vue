<script setup>

import { ref, computed } from 'vue' // Importar computed
const route = useRoute() //
const isOpen = ref(false)

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans">
    
    <nav class="fixed top-0 w-full z-50 transition-all duration-300 bg-emerald-950/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          
          <NuxtLink to="/" class="flex items-center gap-2 group" @click="closeMenu">
            <div class="bg-emerald-500/20 p-2 rounded-full group-hover:bg-emerald-500/40 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-emerald-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              Israel Merlyn
            </span>
          </NuxtLink>

          <div class="hidden md:flex items-center gap-2">
            
            <NuxtLink 
              to="/" 
              active-class="bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              class="px-4 py-2 rounded-full text-sm font-medium text-emerald-100 hover:bg-white/10 hover:text-white transition-all"
            >
              Inicio
            </NuxtLink>

            <NuxtLink 
    to="/#galeria" 
    :class="[
      'px-4 py-2 rounded-full text-sm font-medium transition-all',
      route.path.includes('/destinos') || route.hash === '#galeria'
        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
        : 'text-emerald-100 hover:bg-white/10 hover:text-white'
    ]"
  >
    Destinos
  </NuxtLink>

            <NuxtLink 
              to="/about" 
              active-class="bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              class="px-4 py-2 rounded-full text-sm font-medium text-emerald-100 hover:bg-white/10 hover:text-white transition-all"
            >
              Historia
            </NuxtLink>
            
            <NuxtLink 
              to="/contact" 
              active-class="bg-emerald-400 translate-y-0"
              class="ml-4 px-5 py-2.5 rounded-full text-sm font-bold bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:-translate-y-0.5 transition-all duration-300"
            >
              Contacto
            </NuxtLink>
          </div>

          <button @click="isOpen = !isOpen" class="md:hidden p-2 rounded-lg text-emerald-100 hover:bg-white/10 focus:outline-none transition-colors">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isOpen" class="md:hidden bg-emerald-900 border-t border-white/10 shadow-2xl pb-6">
          <div class="flex flex-col space-y-2 px-6 pt-4">
            
            <NuxtLink 
              to="/" 
              @click="closeMenu" 
              active-class="bg-emerald-600 text-white"
              class="block px-4 py-3 rounded-xl text-base font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors"
            >
              Inicio
            </NuxtLink>

            <NuxtLink 
              to="/about" 
              @click="closeMenu" 
              active-class="bg-emerald-600 text-white"
              class="block px-4 py-3 rounded-xl text-base font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors"
            >
              Sobre Nosotros
            </NuxtLink>

            <NuxtLink 
              to="/contact" 
              @click="closeMenu" 
              active-class="bg-emerald-600 text-white"
              class="block px-4 py-3 rounded-xl text-base font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white transition-colors"
            >
              Contacto
            </NuxtLink>
            
            <div class="pt-4 mt-2 border-t border-white/10">
               <button class="w-full text-center py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-500 transition-colors">
                 Reservar Ahora
               </button>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <main class="flex-grow pt-20 bg-slate-50">
      <slot />
    </main>

    <footer class="bg-emerald-950 text-slate-300 py-12 border-t border-emerald-900">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        <div>
          <h3 class="text-xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
             <span>🌿 Israel Merlyn</span>
          </h3>
          <p class="text-sm text-emerald-200/70 leading-relaxed">
            Explorando los rincones más bellos de Oaxaca. Nuestra misión es conectar a las personas con la naturaleza y la cultura Mixteca.
          </p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Explora</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Destinos Populares</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Galería de Fotos</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Recomendaciones</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Blog de Viajes</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
          <ul class="space-y-3 text-sm">
            <li class="flex items-center justify-center md:justify-start gap-2">
              <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              isramerlyn@gmail.com
            </li>
            <li class="flex items-center justify-center md:justify-start gap-2">
              <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Tlaxiaco, Oaxaca, México
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-12 pt-8 border-t border-emerald-900 text-center text-xs text-emerald-200/40">
        &copy; 2026 Israel Merlyn. Todos los derechos reservados.
      </div>
    </footer>

  </div>
</template>