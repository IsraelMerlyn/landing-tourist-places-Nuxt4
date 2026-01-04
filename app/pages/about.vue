<template>
  <div class="py-20 px-6 bg-white">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <div class="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Equipo trabajando" 
          class="w-full h-full object-cover"
        />
      </div>

      <div>
        <h2 class="text-indigo-600 font-bold tracking-wide uppercase mb-2">
          Nuestra Historia
        </h2>
        <h1 class="text-4xl font-extrabold text-slate-900 mb-6">
          Innovando con Pasión desde 2025
        </h1>
        <p class="text-lg text-slate-600 mb-6 leading-relaxed">
          En NuxtCorp, no solo escribimos código; construimos experiencias. Nacimos con la misión de facilitar el desarrollo web moderno utilizando las tecnologías más punteras del ecosistema Vue.
        </p>
        
        <ul class="space-y-4">
          <li class="flex items-center">
            <span class="bg-green-100 text-green-600 p-2 rounded-full mr-3">✓</span>
            <span class="text-slate-700 font-medium">Arquitectura Escalable</span>
          </li>
          <li class="flex items-center">
            <span class="bg-green-100 text-green-600 p-2 rounded-full mr-3">✓</span>
            <span class="text-slate-700 font-medium">Renderizado Híbrido</span>
          </li>
          <li class="flex items-center">
            <span class="bg-green-100 text-green-600 p-2 rounded-full mr-3">✓</span>
            <span class="text-slate-700 font-medium">Experiencia de Usuario Fluida</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>