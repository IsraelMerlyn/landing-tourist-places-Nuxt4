<script setup lang="ts">
// Definimos las props que este componente 
const props = defineProps({
  type: {
    type: String,
    default: 'text' 
  },
  // Agregamos modelValue para que funcione el v-model 
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

// Esto es para que el componente pueda emitir cambios al padre
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input 
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm/6 shadow-sm" 
  />
</template>