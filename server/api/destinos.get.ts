// @ts-nocheck
import { serverSupabaseClient } from '#supabase/server'

// MODIFICACIÓN 1: Quitamos ": any". Dejamos solo "d".
const mapDestino = (d) => {
    return {
        id: d.id,
        titulo: d.titulo,
        categoria: d.categoria,
        descripcionCorto: d.descripcion_corto || d.descripcionCorto || '',
        descripcionCompleta: d.descripcion_completa || d.descripcionCompleta || '',
        imagen: d.imagen,
        ubicacion: d.ubicacion || '',
        precio: d.precio,
        tips: d.tips || [],
        galeria: d.galeria || []
    }
}

export default defineEventHandler(async (event) => {
    try {
        const client = await serverSupabaseClient(event)

        const { data, error } = await client
            .from('destinos')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error Supabase:', error.message)
            throw createError({ statusCode: 500, statusMessage: error.message })
        }

        // MODIFICACIÓN 2: Quitamos tipos aquí también. 
        // Solo "item" en lugar de "item: any" o similar.
        return (data || []).map(item => mapDestino(item))

    } catch (err) {
        console.error('Error API:', err)
        throw createError({ statusCode: 500, statusMessage: 'Error interno del servidor' })
    }
})