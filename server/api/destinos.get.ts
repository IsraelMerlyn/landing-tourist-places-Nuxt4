
import { serverSupabaseClient } from '#supabase/server'

import { mapDestinoToFrontend } from '../../utils/mappers'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    // ... (tu query a supabase igual que antes) ...
    const { data, error } = await client.from('destinos').select('*')

    if (error) throw createError({ statusCode: 500, statusMessage: error.message })

    return (data || []).map((d: any) => mapDestinoToFrontend(d))
})