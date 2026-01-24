<script setup>
import { ref, computed } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  motive: 'Sugerir un nuevo lugar turístico', // Valor por defecto
  extraField: '', // Campo dinámico (puede ser Maps o Presupuesto)
  message: ''
})

const motives = [
  'Sugerir un nuevo lugar turístico',
  'Quiero un sitio web como este',
  'Colaboración / Negocios',
  'Otro'
]

// --- LÓGICA DE FORMULARIO INTELIGENTE 🧠 ---
// Detectamos qué eligió el usuario para cambiar la etiqueta del campo extra
const isWebProject = computed(() => form.value.motive === 'Quiero un sitio web como este')
const isPlaceSuggestion = computed(() => form.value.motive === 'Sugerir un nuevo lugar turístico')

const showModal = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  form.value = { firstName: '', lastName: '', email: '', motive: 'Sugerir un nuevo lugar turístico', extraField: '', message: '' }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
    
    <div class="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl shadow-emerald-900/10 overflow-hidden border border-gray-100">
      
      <div class="lg:w-2/5 bg-emerald-900 relative p-12 flex flex-col justify-between text-white overflow-hidden">
        
        <div class="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1992&q=80" alt="Textura Oaxaca" class="w-full h-full object-cover grayscale mix-blend-multiply" />
        </div>

        <div class="relative z-10">
          <h2 class="text-3xl font-bold tracking-tight">Hablemos</h2>
          <p class="mt-4 text-emerald-200 text-lg leading-relaxed">
            Ya sea para compartir un secreto de la Mixteca o para construir el futuro digital de tu negocio.
          </p>

          <div class="mt-12 space-y-6">
            <div class="flex items-center gap-4">
              <div class="bg-emerald-800/50 p-3 rounded-full">
                <svg class="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p class="text-xs text-emerald-300 uppercase font-bold tracking-wider">Escríbenos</p>
                <p class="text-white">isramerlyn@gmail.com</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="bg-emerald-800/50 p-3 rounded-full">
                <svg class="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p class="text-xs text-emerald-300 uppercase font-bold tracking-wider">Base</p>
                <p class="text-white">Tlaxiaco, Oaxaca, MX</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative z-10 mt-12 flex gap-4">
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>

      <div class="lg:w-3/5 p-8 sm:p-12 lg:p-16 bg-white">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Nombre</label>
                <input v-model="form.firstName" type="text" class="w-full rounded-full border-gray-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors" placeholder="Tu nombre" />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Apellido</label>
                <input v-model="form.lastName" type="text" class="w-full rounded-full border-gray-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors" placeholder="Tu apellido" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
              <input v-model="form.email" type="email" class="w-full rounded-full border-gray-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors" placeholder="hola@ejemplo.com" />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">¿De qué quieres hablar?</label>
              <select v-model="form.motive" class="w-full rounded-full border-gray-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors cursor-pointer">
                <option v-for="m in motives" :key="m" :value="m">{{ m }}</option>
              </select>
            </div>

            <transition 
              enter-active-class="transition duration-300 ease-out" 
              enter-from-class="transform scale-95 opacity-0 -translate-y-2" 
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0" 
              leave-to-class="transform scale-95 opacity-0 -translate-y-2"
            >
              <div v-if="isWebProject" class="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                <label class="block text-sm font-bold text-indigo-900 mb-2">🚀 Genial, ¿Cuál es tu presupuesto estimado?</label>
                <select v-model="form.extraField" class="w-full rounded-full border-indigo-200 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option disabled value="">Selecciona un rango</option>
                  <option>Menos de $5,000 MXN</option>
                  <option>$5,000 - $15,000 MXN</option>
                  <option>Más de $15,000 MXN</option>
                </select>
              </div>
              <div v-else-if="isPlaceSuggestion" class="bg-emerald-600 p-6 rounded-3xl border border-emerald-100">
                <label class="block text-sm font-bold text-emerald-900 mb-2">📍 ¡Gracias! ¿Tienes la ubicación en Google Maps?</label>
                <input v-model="form.extraField" type="text" class="w-full rounded-full border-emerald-700 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 placeholder:text-emerald-700" placeholder="Pega el link aquí..." />
              </div>
            </transition>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
              <textarea v-model="form.message" rows="4" class="w-full rounded-3xl border-gray-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors" placeholder="Cuéntanos los detalles..."></textarea>
            </div>

            <button type="submit" :disabled="isLoading" class="w-full rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-slate-800 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              <span v-if="!isLoading">Enviar Mensaje &rarr;</span>
              <span v-else>Enviando...</span>
            </button>

          </div>
        </form>
      </div>

    </div>

    <Teleport to="body">
      <div v-if="showModal" class="relative z-[60]">
        <div class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4 text-4xl">🎉</div>
            <h3 class="text-xl font-bold text-gray-900">¡Recibido!</h3>
            <p class="mt-2 text-sm text-gray-500">Gracias {{ form.firstName }}, revisaremos tu mensaje sobre <b>{{ isWebProject ? 'Desarrollo Web' : 'Turismo' }}</b> enseguida.</p>
            <button @click="closeModal" class="mt-6 w-full rounded-full bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-500">Cerrar</button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>