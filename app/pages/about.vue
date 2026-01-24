<script setup>
  
// SEO para esta página
useHead({
  title: 'Nuestra Historia | Israel Merlyn',
  meta: [
    { name: 'description', content: 'La historia detrás del proyecto: De ingeniero en sistemas a explorador de la Mixteca en motocicleta.' }
  ]
})
</script>

<template>
  <div class="py-24 px-6 bg-slate-50 min-h-screen flex items-center">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      <div class="relative group">
        <div class="absolute -inset-4 bg-emerald-100 rounded-[3rem] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
        
        <div class="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10 h-[600px]">
          <NuxtImg 
            src="/assets/israelmerlyn.jpeg" 
            alt="Motociclista viajando por carreteras de Oaxaca" 
            format="webp"
            width="800"
            height="1000"
            class="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
          />
          
          <div class="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg max-w-xs">
            <p class="text-emerald-800 font-bold text-lg">"No hay wifi en la montaña, pero te aseguro que encontrarás una mejor conexión."</p>
          </div>
        </div>
      </div>

      <div class="lg:pl-8">
        <h2 class="text-emerald-600 font-bold tracking-widest uppercase mb-3 text-sm">
          Sobre el proyecto
        </h2>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
          Donde el asfalto termina, <span class="text-emerald-600">comienza la aventura.</span>
        </h1>
        
        <div class="prose prose-lg text-slate-600 mb-8">
          <p>
            Soy <strong>Ingeniero en Sistemas</strong> de profesión, lo que significa que paso gran parte de mi vida resolviendo lógica compleja frente a una pantalla. Pero mi verdadera recarga de energía no viene de un café, sino del rugido del motor y el viento en la cara.
          </p>
          <p>
            Como <strong>Biker</strong>, siempre busqué ir más allá de las guías turísticas tradicionales. Me di cuenta de que Google Maps no te cuenta las mejores historias.
          </p>
          <p class="font-medium text-slate-800">
            Los verdaderos tesoros de la Mixteca los descubrí gracias a la recomendación de "boca en boca": amigos que viven en los pueblos y me decían <em>"Israel, tienes que ir a ver la cascada que está detrás del cerro".</em>
          </p>
          <p>
            Así nació esta plataforma: decidí usar mis habilidades técnicas para digitalizar esas recomendaciones locales y compartirlas con el mundo.
          </p>
        </div>
        
        <ul class="space-y-6 mt-10">
          
          <li class="flex items-start">
            <div class="flex-shrink-0 bg-emerald-100 p-3 rounded-full mr-4">
              <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-slate-900 font-bold text-lg">Rutas Verificadas</h3>
              <p class="text-slate-500 text-sm mt-1">Cada lugar aquí publicado ha sido recorrido en moto y vivido en primera persona.</p>
            </div>
          </li>

          <li class="flex items-start">
            <div class="flex-shrink-0 bg-emerald-100 p-3 rounded-full mr-4">
              <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-slate-900 font-bold text-lg">Recomendación Local</h3>
              <p class="text-slate-500 text-sm mt-1">Sin filtros turísticos. Información real compartida por la gente que habita la tierra.</p>
            </div>
          </li>

        </ul>

        <div class="mt-12 flex items-center gap-4 border-t border-slate-200 pt-8">
           <div class="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
             IM
           </div>
           <div>
             <p class="text-slate-900 font-bold font-serif italic">Israel Merlyn</p>
             <p class="text-xs text-slate-500 uppercase tracking-wide">Founder & Rider</p>
           </div>
        </div>

      </div>

    </div>
  </div>
</template>