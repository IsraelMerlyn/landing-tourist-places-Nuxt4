// tests/mappers.test.ts
import { describe, it, expect } from 'vitest'
import { mapDestinoToFrontend } from '../utils/mappers'

describe('Mappers Utils', () => {

    it('Debe convertir snake_case a camelCase correctamente', () => {
        // 1. ARRANGE (Preparar datos falsos "Mock")
        const mockDestinoDB = {
            id: 1,
            titulo: 'Test Place',
            categoria: 'Test',
            descripcion_corto: 'Descripción corta prueba', // Dato snake_case
            descripcion_completa: 'Larga',
            imagen: 'img.png',
            ubicacion: 'maps',
            precio: '$100',
            tips: [],
            galeria: []
        }

        const resultado = mapDestinoToFrontend(mockDestinoDB)


        // Verificamos que la propiedad 'descripcionCorto' exista y tenga el valor correcto
        expect(resultado).toHaveProperty('descripcionCorto')
        expect(resultado.descripcionCorto).toBe('Descripción corta prueba')

        // Verificamos que NO exista la propiedad vieja
        expect(resultado).not.toHaveProperty('descripcion_corto')
    })

})