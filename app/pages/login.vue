<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// Si ya está logueado, lo mandamos al admin (futuro dashboard)
watchEffect(() => {
  if (user.value) {
    router.push('/admin/dashboard')
  }
})

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    loading.value = false
    errorMsg.value = 'Credenciales incorrectas. Intenta de nuevo.'
  } else {
    // El watchEffect de arriba se encargará de redirigir
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    
    <div class="max-w-md w-full bg-white rounded-[2rem] shadow-xl shadow-gray-200 overflow-hidden border border-gray-100">
      
      <div class="bg-slate-900 p-8 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full transform -translate-y-10"></div>
        <h2 class="relative font-montserrat text-2xl font-bold text-white mb-2">Bienvenido de nuevo</h2>
        <p class="relative text-slate-400 text-sm">Panel Administrativo Mixteca</p>
      </div>

      <div class="p-8 pt-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              required
              class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 px-4 bg-gray-50"
              placeholder="admin@mxc.com.mx"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input 
              id="password"
              v-model="password" 
              type="password" 
              required
              class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-3 px-4 bg-gray-50"
              placeholder="••••••••"
            >
          </div>

          <div v-if="errorMsg" class="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
            {{ errorMsg }}
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Entrando...</span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-sm text-gray-400 hover:text-emerald-600 transition-colors">
            &larr; Volver al inicio
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>