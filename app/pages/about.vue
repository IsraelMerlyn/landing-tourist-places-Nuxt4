<script setup>


// SEO para esta página
useHead({
  title: 'Nuestra Historia | Israel Merlyn',
  meta: [
    { name: 'description', content: 'De la lógica del código al rugido del motor: La historia detrás del explorador de la Mixteca.' }
  ]
})
</script>

<template>
  <div class="relative bg-slate-50 min-h-screen overflow-hidden font-sans selection:bg-emerald-200 selection:text-emerald-900">
    
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div class="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-emerald-100/50 blur-3xl opacity-50 mix-blend-multiply"></div>
      <div class="absolute top-[40%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-teal-50/60 blur-3xl opacity-50 mix-blend-multiply"></div>
    </div>

    <button @click="router.back()" class="fixed top-6 left-6 md:top-10 md:left-10 z-50 bg-white/60 backdrop-blur-xl border border-white/80 text-slate-800 p-3.5 rounded-full hover:bg-white hover:text-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 group-hover:-translate-x-1 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
    </button>

    <div class="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-24 min-h-screen flex items-center relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        
        <div class="lg:col-span-5 relative group order-1 lg:order-none animate-fade-in-up">
          <div class="absolute -inset-4 bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-[3rem] rotate-3 group-hover:rotate-1 transition-transform duration-700 opacity-70"></div>
          
          <div class="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/15 h-[500px] sm:h-[600px] border-4 border-white">
            <NuxtImg 
              src="/assets/israelmerlyn.jpeg" 
              alt="Israel Merlyn en motocicleta por Oaxaca" 
              format="webp"
              class="w-full h-full object-cover transform group-hover:scale-105 transition duration-1000 ease-out"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

            <div class="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl sm:max-w-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-400 mb-2 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <p class="text-white font-bold text-lg leading-snug tracking-wide text-shadow-sm">"No hay wifi en la montaña, pero te aseguro que encontrarás una mejor conexión."</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 order-2 lg:order-none animate-fade-in-up animation-delay-200">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
             <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span class="text-emerald-700 font-bold tracking-widest uppercase text-xs">La mente detrás de la ruta</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.1] font-montserrat">
            Donde el asfalto termina, <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">comienza la aventura.</span>
          </h1>
          
          <div class="prose prose-lg prose-emerald text-slate-600 font-light leading-relaxed mb-10 max-w-none">
            <p>
              Soy <strong>Ingeniero en Sistemas</strong>, desarrollador y docente. Paso mis días resolviendo lógica compleja, creando aplicaciones y estructurando bases de datos frente a una pantalla. Pero mi verdadera recarga de energía no viene de un café, sino del rugido del motor y el viento en la cara al trazar curvas en la sierra.
            </p>
            <p>
              Como <strong>Biker</strong>, siempre busqué ir más allá de las guías turísticas tradicionales. Me di cuenta de que los algoritmos de mapas no siempre conocen las mejores historias.
            </p>
            <p class="text-xl text-slate-800 font-medium pl-6 border-l-4 border-emerald-400 my-8 italic bg-gradient-to-r from-emerald-50/50 to-transparent py-2">
              Los verdaderos tesoros de la Mixteca los descubrí gracias a la gente: amigos locales que me decían "Israel, tienes que ir a ver la cascada que está detrás de aquel cerro".
            </p>
            <p>
              Así nació esta plataforma. Decidí fusionar mis dos mundos: usar mis habilidades en desarrollo para digitalizar esas recomendaciones locales y compartirlas contigo.
            </p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <div class="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-emerald-200 hover:-translate-y-1 transition-all">
              <div class="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-2xl mb-4">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
              </div>
              <h3 class="text-slate-900 font-bold text-lg mb-2">Rutas Verificadas</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Cada lugar publicado aquí ha sido recorrido en moto y vivido en primera persona.</p>
            </div>

            <div class="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-emerald-200 hover:-translate-y-1 transition-all">
              <div class="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-2xl mb-4">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              </div>
              <h3 class="text-slate-900 font-bold text-lg mb-2">Secreto Local</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Sin filtros turísticos. Información real compartida por la gente que habita la tierra.</p>
            </div>
          </div>

          <div class="mt-12 flex items-center gap-5 border-t border-slate-200/60 pt-8">
             <div class="h-14 w-14 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
               <span class="font-bold text-lg tracking-wider">IM</span>
             </div>
             <div>
               <p class="text-slate-900 font-bold font-serif italic text-xl">Israel Merlyn</p>
               <p class="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-0.5">Ingeniero & Biker</p>
             </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
.animation-delay-200 { 
  animation-delay: 200ms; 
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>