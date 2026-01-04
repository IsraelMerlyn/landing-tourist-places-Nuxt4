<script setup>
// Importamos ref para crear variables reactivas
import { ref } from 'vue'

// 2. Definimos el estado del formulario
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '', // Campo opcional corporativo
  message: ''
})

// Controlamos la visibilidad del modal
const showModal = ref(false)
const isLoading = ref(false) // Para deshabilitar el botón mientras "envía"

const handleSubmit = async () => {
  // 1. Activamos estado de carga
  isLoading.value = true
  
  // 2. Simulamos una espera de red (2 segundos) para realismo
  // En la vida real, aquí iría tu fetch/axios al backend
  await new Promise(resolve => setTimeout(resolve, 1500))

  // 3. Mostramos el modal y quitamos carga
  isLoading.value = false
  showModal.value = true
  
  // Opcional: Limpiar formulario aquí o al cerrar el modal
}

// Función para reiniciar formulario al cerrar modal
const closeModal = () => {
  showModal.value = false
  form.value = { firstName: '', lastName: '', email: '', company: '', message: '' }
}
</script>

<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hablemos de tu proyecto</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          ¿Tienes una idea innovadora? Nuestro equipo de expertos está listo para ayudarte a escalarla.
        </p>
      </div>

     <form @submit.prevent="handleSubmit" class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          <div>
            <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nombre</label>
            <div class="mt-2.5">
              <Input v-model="form.firstName" type="text" id="first-name" autocomplete="given-name" />
            </div>
          </div>

          <div>
            <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Apellido</label>
            <div class="mt-2.5">
              <Input v-model="form.lastName" type="text" id="last-name" autocomplete="family-name" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="company" class="block text-sm font-semibold leading-6 text-gray-900">Empresa / Organización</label>
            <div class="mt-2.5">
              <Input v-model="form.company" type="text" id="company" autocomplete="organization" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email corporativo</label>
            <div class="mt-2.5">
              <Input v-model="form.email" type="email" id="email" autocomplete="email" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">¿Cómo podemos ayudarte?</label>
            <div class="mt-2.5">
              <TextArea v-model="form.message" id="message" rows="4" />
            </div>
          </div>

        </div>

        <div class="mt-10">
          <button 
            type="submit" 
            :disabled="isLoading"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            <span v-if="!isLoading">Enviar Solicitud</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          </button>
        </div>
      </form>
    </div>
    <SuccessModal 
      :isOpen="showModal" 
      :email="form.email" 
      @close="closeModal" 
    />
  </div>
</template>