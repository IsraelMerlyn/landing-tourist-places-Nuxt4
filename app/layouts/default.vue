<template>
    <div class="min-h-screen flex flex-col">
        <nav class="flex justify-between items-center p-6 bg-slate-900 text-white shadow-md">
            <div class="text-xl font-bold tracking-wider">
                 Israel Merlyn
            </div>

            <div class="flex gap-6 font-medium">
                <NuxtLink to="/" class="hover:text-slate-300">Inicio</NuxtLink>
                <NuxtLink to="/about" class="hover:text-slate-300">Sobre Nosotros</NuxtLink>
                <NuxtLink to="/contact" class="hover:text-slate-300">Contacto</NuxtLink>
            </div>
        </nav>

        <main class="flex-grow p-8 bg-slate-50">
            <slot />
        </main>

        <footer class="bg-slate-800 text-slate-400 text-center p-4 text-sm">
            &copy; 2025 NuxtCorp - Creado con Nuxt 3 y Tailwind
        </footer>
    </div>
</template>