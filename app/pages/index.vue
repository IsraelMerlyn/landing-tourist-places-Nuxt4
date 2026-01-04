<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <h1 class="text-5xl font-bold text-slate-800 mb-6">
      Bienvenido a <span class="text-indigo-600">NuxtCorp</span>
    </h1>
    
    <p class="text-xl text-slate-600 mb-8 max-w-2xl">
      Creamos soluciones digitales de alto rendimiento utilizando la potencia del SSR y la flexibilidad de Vue 3.
    </p>

    <div class="flex gap-4">
      <NuxtLink to="/contact" class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">
        Empezar Ahora
      </NuxtLink>
      
      <NuxtLink to="/about" class="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition">
        Conocenos
      </NuxtLink>
    </div>
  </div>
</template>