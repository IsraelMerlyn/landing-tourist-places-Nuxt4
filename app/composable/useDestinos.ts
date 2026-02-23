// @ts-nocheck
export const useMisDestinos = () => {
    // 1. ESTADO COMPARTIDO (Sin tipos explícitos)
    const destinos = useState('destinos', () => [])
    const loading = useState('loading_destinos', () => false)

    const client = useSupabaseClient()

    // 2. OBTENER DATOS (READ)
    const fetchDestinos = async () => {
        loading.value = true
        try {
            // Llamamos a tu API que YA FUNCIONA
            const data = await $fetch('/api/destinos')

            // Asignamos directamente
            destinos.value = data || []
        } catch (error) {
            console.error('Error cargando destinos:', error)
        } finally {
            loading.value = false
        }
    }

    // 3. CREAR (CREATE)
    const crearDestino = async (nuevoDestino) => {
        // Validación manual simple
        if (!nuevoDestino.titulo || !nuevoDestino.imagen) {
            throw new Error("El título y la imagen son obligatorios")
        }

        const { data, error } = await client
            .from('destinos')
            .insert(nuevoDestino)
            .select()

        if (error) throw error

        // Recargamos la lista para ver el cambio
        await fetchDestinos()
    }

    // 4. ELIMINAR (DELETE)
    const eliminarDestino = async (id) => {
        const { error } = await client
            .from('destinos')
            .delete()
            .eq('id', id)

        if (error) throw error

        // Actualizamos la lista localmente
        if (destinos.value) {
            destinos.value = destinos.value.filter(d => d.id !== id)
        }
    }
    const actualizarDestino = async (id, datosActualizados) => {
        // Validamos
        if (!datosActualizados.titulo || !datosActualizados.imagen) {
            throw new Error("El título y la imagen son obligatorios")
        }

        // Enviamos a Supabase
        const { error } = await client
            .from('destinos')
            .update(datosActualizados) // Los nuevos datos
            .eq('id', id)              // Cual fila editar (WHERE id = X)

        if (error) throw error

        // Recargamos para ver cambios
        await fetchDestinos()
    }

    return {
        destinos,
        loading,
        fetchDestinos,
        crearDestino,
        eliminarDestino,
        actualizarDestino
    }
}