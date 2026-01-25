<script setup lang="ts">
import Swal from 'sweetalert2'
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const showPassword = ref(false) // Estado para el ojito
const showModal = ref(false) // Controla si se ve la ventana emergente
const saving = ref(false)
definePageMeta({
  middleware: 'auth' // Nombre del archivo que creamos en el paso 1
})
// Redirigir si ya hay sesión
watchEffect(() => {
  if (user.value) {
    router.push('/admin/dashboard')
  }
})
const logout = async () => {
  await client.auth.signOut()
  router.push('/login')
}
const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    loading.value = false
    // Mensaje amigable dependiendo del error
    if (error.message.includes('Invalid login credentials')) {
      errorMsg.value = 'Correo o contraseña incorrectos.'
    } else if (error.message.includes('Email not confirmed')) {
      errorMsg.value = 'Debes confirmar tu correo o desactivar la confirmación en Supabase.'
    } else {
      errorMsg.value = error.message
    }
  }
}
const destinos = ref([])

const fetchDestinos = async () => {
  loading.value = true
  try {
    // Usamos $fetch para llamar a tu backend
    const data = await $fetch('/api/destinos')
    destinos.value = data
    console.log('✅ Datos cargados vía API:', data)
  } catch (error) {
    console.error('❌ Error cargando API:', error)
  } finally {
    loading.value = false
  }
}
// Datos del Formulario
const form = ref({
  titulo: '',
  descripcion_corto: '', // Ojo: Debe coincidir con tu columna en DB
  categoria: 'Aventura', // Valor por defecto
  precio: '',
  imagen: '' // Por ahora pegaremos URL (Luego veremos Storage)
})
const guardarDestino = async () => {
  saving.value = true
  
  // Insertamos directo a Supabase (Admin tiene permiso ALL)
  const { error } = await client
    .from('destinos')
    .insert({
      titulo: form.value.titulo,
      descripcion_corto: form.value.descripcion_corto,
      categoria: form.value.categoria,
      precio: form.value.precio,
      imagen: form.value.imagen
    })

  saving.value = false

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo guardar: ' + error.message,
    })
  } else {
    showModal.value = false
    form.value = { titulo: '', descripcion_corto: '', categoria: 'Aventura', precio: '', imagen: '' }
    fetchDestinos()
    
    // Toast (Alerta pequeña en la esquina)
    Swal.fire({
      icon: 'success',
      title: '¡Destino guardado!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })
  }
}
const eliminarDestino = async (id: number) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#10b981', // Emerald-500
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrarlo',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    const { error } = await client.from('destinos').delete().eq('id', id)

    if (error) {
      Swal.fire('Error', error.message, 'error')
    } else {
      fetchDestinos()
      Swal.fire(
        '¡Borrado!',
        'El destino ha sido eliminado.',
        'success'
      )
    }
  }
}
// Ejecutar la carga inicial
onMounted(() => {
  fetchDestinos()
})
</script>
<template>
  <div class="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans relative">
    
    <header class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
      <div>
        <h1 class="font-montserrat text-3xl font-bold text-gray-900">Panel de Control</h1>
        <p class="text-gray-500 text-sm mt-1">Administrando <span class="font-bold text-emerald-600">{{ destinos.length }} destinos</span> activos.</p>
      </div>

      <div class="flex gap-4">
        <button 
          @click="logout"
          class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-white hover:text-red-500 transition-colors shadow-sm"
        >
          Salir
        </button>

        <button 
          @click="showModal = true"
          class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <span>+</span> Nuevo Destino
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto">
      
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent"></div>
      </div>

      <div v-else-if="destinos.length === 0" class="bg-white rounded-[2rem] p-12 text-center border border-dashed border-gray-300">
        <div class="text-6xl mb-4 opacity-50">📂</div>
        <h3 class="text-xl font-bold text-gray-900">No hay destinos</h3>
        <p class="text-gray-500 mb-6">Agrega el primero usando el botón verde.</p>
      </div>

      <div v-else class="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-500">
            <thead class="bg-gray-50/50 text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
              <tr>
                <th class="px-6 py-4">Imagen</th>
                <th class="px-6 py-4">Información</th>
                <th class="px-6 py-4">Categoría</th>
                <th class="px-6 py-4">Precio</th>
                <th class="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="destino in destinos" :key="destino.id" class="hover:bg-gray-50/80 transition-colors group">
                <td class="px-6 py-4">
                  <div class="h-16 w-24 rounded-lg overflow-hidden border border-gray-100 bg-gray-100">
                    <img :src="destino.imagen" class="h-full w-full object-cover" alt="">
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-900 text-base">{{ destino.titulo }}</div>
                  <div class="text-xs text-gray-400 line-clamp-1 max-w-xs">{{ destino.descripcionCorto }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {{ destino.categoria }}
                  </span>
                </td>
                <td class="px-6 py-4 font-medium text-gray-900">{{ destino.precio }}</td>
                <td class="px-6 py-4 text-right">
                  <button 
                    @click="eliminarDestino(destino.id)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                    title="Eliminar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div v-if="showModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="font-bold text-gray-800 text-lg">Nuevo Destino</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form @submit.prevent="guardarDestino" class="p-6 space-y-4">
          
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Título</label>
            <input v-model="form.titulo" type="text" required class="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ej: Cascada Velo de Novia">
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción Corta</label>
            <textarea v-model="form.descripcion_corto" rows="2" required class="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Breve resumen..."></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
              <select v-model="form.categoria" class="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm outline-none">
                <option>Aventura</option>
                <option>Cultura</option>
                <option>Gastronomía</option>
                <option>Relax</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Precio</label>
              <input v-model="form.precio" type="text" class="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm outline-none" placeholder="$0.00 MXN">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">URL de Imagen</label>
            <input v-model="form.imagen" type="url" required class="w-full rounded-lg border-gray-200 bg-gray-50 p-3 text-sm outline-none" placeholder="https://...">
            <p class="text-[10px] text-gray-400 mt-1">* Por ahora pega un link de Google Images o Unsplash.</p>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg">Cancelar</button>
            <button 
              type="submit" 
              :disabled="saving"
              class="px-6 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              {{ saving ? 'Guardando...' : 'Guardar Destino' }}
            </button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>