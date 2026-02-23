<template>
  <div class="font-sans min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
    <NuxtLayout>
      
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
/* 👇 Aquí está la magia de la transición */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem); /* Un efecto borroso elegante */
}
</style>