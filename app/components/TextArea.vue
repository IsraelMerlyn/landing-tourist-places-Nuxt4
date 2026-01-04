<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  rows: {
    type: [String, Number],
    default: 4
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    :value="modelValue"
    :rows="rows"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm/6 shadow-sm"
  ></textarea>
</template>