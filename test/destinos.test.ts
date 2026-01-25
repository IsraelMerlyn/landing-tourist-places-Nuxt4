// tests/mappers.test.ts
import { describe, it, expect } from 'vitest'
import { mapDestinoToFrontend } from '../utils/mappers'

describe('Mappers Utils', () => {

    it('Debe transformar snake_case a camelCase correctamente', () => {
        // 1. ARRANGE (Preparar datos falsos de la DB)
        const mockDBResponse = {
            id: 1,
            titulo: 'Cancún',
            descripcion_corto: 'Playa hermosa', // Así viene de Supabase
            descripcion_completa: 'Detalle largo...',
            categoria: 'Playa',
            precio: '$500',
            imagen: 'foto.jpg',
            ubicacion: 'Mexico',
            tips: null, // Simulamos un null
            galeria: null
        }

        // 2. ACT (Ejecutar la función)
        // @ts-ignore - Ignoramos TS aquí porque estamos simulando datos crudos
        const resultado = mapDestinoToFrontend(mockDBResponse)

        // 3. ASSERT (Verificar resultados)
        expect(resultado.titulo).toBe('Cancún')
        // ¡Aquí está la magia! Probamos que el mapper arregló el nombre
        expect(resultado.descripcionCorto).toBe('Playa hermosa')
        expect(resultado.tips).toEqual([]) // Probamos que convirtió null en array vacío
    })

    it('Debe manejar arrays vacíos si tips o galeria vienen definidos', () => {
        const mockDBResponse = {
            id: 2,
            titulo: 'Oaxaca',
            descripcion_corto: 'Comida rica',
            descripcion_completa: '...',
            categoria: 'Cultura',
            precio: '$200',
            imagen: 'oax.jpg',
            ubicacion: 'Sur',
            tips: ['Llevar sombrero'],
            galeria: ['foto1.jpg']
        }

        // @ts-ignore
        const resultado = mapDestinoToFrontend(mockDBResponse)

        expect(resultado.tips).toHaveLength(1)
        expect(resultado.tips[0]).toBe('Llevar sombrero')
    })
})