<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const logout = async () => {
  await client.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      
      <div class="bg-white rounded-2xl p-8 shadow-lg flex justify-between items-center">
        <div>
          <h1 class="font-montserrat text-2xl font-bold text-gray-900">Panel de Control</h1>
          <p class="text-gray-500">Hola, {{ user?.email }} 👋</p>
        </div>
        
        <button 
          @click="logout"
          class="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <div class="mt-8 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-400">
        Aquí construiremos el CRUD (Próximamente) 🏗️
      </div>

    </div>
  </div>
</template>