<script setup>
    import { ref } from 'vue'

    const isOpen= ref(false) 
</script>
<template>
    <div class="min-h-screen flex flex-col">
      <nav class="flex justify-between items-center p-6 bg-slate-900 text-white shadow-md flex-wrap">
    <div class="text-xl font-bold tracking-wider">
         Israel Merlyn
    </div>

    <button @click="isOpen = !isOpen" class="md:hidden text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>

    <div v-if="isOpen" class="absolute top-20 left-0 w-full bg-slate-800 flex flex-col items-center gap-6 p-6 shadow-xl md:hidden z-50">
     <NuxtLink to="/" class="hover:text-slate-300" @click="isOpen = false">Inicio</NuxtLink>
    <NuxtLink to="/about" class="hover:text-slate-300" @click="isOpen = false">Sobre Nosotros</NuxtLink>
    <NuxtLink to="/contact" class="hover:text-slate-300" @click="isOpen = false">Contacto</NuxtLink>
    <NuxtLink to="/blog" class="hover:text-slate-300" @click="isOpen = false">Blog</NuxtLink>
    </div>

    </nav>

        <main class="flex-grow p-8 bg-slate-50">
            <slot />
        </main>

        <footer class="bg-slate-800 text-slate-400 text-center p-4 text-sm">
            &copy; 2025 NuxtCorp - Creado con Nuxt 3 y Tailwind
        </footer>
    </div>
</template>