<script setup lang="ts">
defineProps({
  isOpen: Boolean,
  email: String
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
        
        <div 
          class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all"
          @click.stop
        >
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6 animate-bounce-short">
            <svg class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" class="checkmark" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
          
          <p class="text-gray-500 mb-6">
            Hemos recibido tu solicitud. Enviamos una copia de confirmación a: <br>
            <span class="font-bold text-indigo-600">{{ email }}</span>
          </p>

          <button 
            @click="$emit('close')"
            class="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Entendido, gracias
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Animación personalizada para que el check se "dibuje" */
.checkmark {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: draw 0.6s 0.2s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

@keyframes draw {
  100% {
    stroke-dashoffset: 0;
  }
}

/* Un pequeño rebote al aparecer el círculo */
.animate-bounce-short {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>