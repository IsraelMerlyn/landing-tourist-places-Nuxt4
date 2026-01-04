<template>
  <div class="bg-white">
    
    <div class="relative isolate px-6 pt-14 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
      
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 lg:pr-10">
        <div class="hidden sm:mb-8 sm:flex sm:justify-start">
          <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Anunciamos nuestra nueva ronda de inversión. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Leer más <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div class="text-left">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Datos que impulsan tu negocio
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Transformamos la complejidad de tus datos en soluciones simples y escalables. Deja de adivinar y empieza a tomar decisiones basadas en inteligencia real.
          </p>
          <div class="mt-10 flex items-center justify-start gap-x-6">
            <NuxtLink to="/contact" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Comenzar Ahora
            </NuxtLink>
            <NuxtLink to="/about" class="text-sm font-semibold leading-6 text-gray-900">
              Conoce al equipo <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="relative lg:col-span-1">
        <img 
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Equipo trabajando en análisis de datos" 
          class="aspect-[3/2] w-full bg-gray-50 object-cover lg:aspect-auto lg:h-[600px] xl:aspect-[4/3] rounded-2xl shadow-2xl"
        >
      </div>

    </div>
  </div>
</template>