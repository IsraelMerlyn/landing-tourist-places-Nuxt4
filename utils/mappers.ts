// utils/mappers.ts

// Esta interfaz define qué esperamos recibir de la DB
interface DestinoDB {
    id: number;
    titulo: string;
    categoria: string;
    descripcion_corto: string;
    descripcion_completa: string;
    imagen: string;
    ubicacion: string;
    precio: string;
    tips: string[];
    galeria: string[];
}

// Función pura: Entra A -> Sale B
export const mapDestinoToFrontend = (destino: DestinoDB) => {
    return {
        id: destino.id,
        titulo: destino.titulo,
        categoria: destino.categoria,
        // La transformación crítica
        descripcionCorto: destino.descripcion_corto,
        descripcionCompleta: destino.descripcion_completa,
        imagen: destino.imagen,
        ubicacion: destino.ubicacion,
        precio: destino.precio,
        tips: destino.tips || [], // Protección extra contra nulls
        galeria: destino.galeria || []
    }
}