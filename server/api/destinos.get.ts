// server/api/destinos.get.ts
import { serverSupabaseClient } from '#supabase/server'

// 1. DEFINIMOS LA FORMA DE LOS DATOS CRUDOS (Base de Datos)
// Fíjate que aquí usamos snake_case porque así están en Supabase
interface DestinoDB {
    id: number
    titulo: string
    categoria: string
    descripcion_corto: string    // snake_case
    descripcion_completa: string // snake_case
    imagen: string
    ubicacion: string
    precio: string
    tips: string[]
    galeria: string[]
}

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const { data, error } = await client
        .from('destinos')
        .select('*')
        .order('id', { ascending: true })

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    // 2. EL TRUCO (Type Assertion) 🪄
    // Si 'data' es null, usamos un array vacío [].
    // Luego usamos "as DestinoDB[]" para forzar a TS a entender la estructura.
    const destinosRaw = (data || []) as DestinoDB[]

    // 3. ADAPTADOR
    // Ahora TS ya sabe que 'destino' tiene .id, .descripcion_corto, etc.
    return destinosRaw.map(destino => ({
        id: destino.id,
        titulo: destino.titulo,
        categoria: destino.categoria,

        // Mapeo: snake_case (DB) -> camelCase (Frontend)
        descripcionCorto: destino.descripcion_corto,
        descripcionCompleta: destino.descripcion_completa,

        imagen: destino.imagen,
        ubicacion: destino.ubicacion,
        precio: destino.precio,
        tips: destino.tips,
        galeria: destino.galeria
    }))
})