// composables/useDestinos.js
export const useDestinos = () => {
  const destinos = [
    {
      id: 1,
      titulo: 'Cascada de Yosonduá',
      categoria: 'Naturaleza',
      descripcionCorto: 'Una impresionante caída de agua color esmeralda en la Mixteca.',
      descripcionCompleta: 'El agua de la cascada inicia en un lugar que se llama La Ciénega. En temporada de lluvias, el caudal aumenta de tal manera que es impactante ver, sentir y escuchar el rompimiento del agua. El nombre de Esmeralda se debe al color verde que predomina con el sol. Es un lugar perfecto para desconectarse y sentir la brisa.',
      imagen: 'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png',
      ubicacion: 'https://goo.gl/maps/tu-link-real-aqui',
      precio: '$50 MXN',
      tips: ['Lleva calzado antideslizante', 'Mejor época: Agosto-Octubre', 'No hay señal de celular'],
      galeria: [
         'https://pbs.twimg.com/media/CXMShmQUoAALgZX.jpg',
         'https://oaxaca.eluniversal.com.mx/sites/default/files/2021/08/04/cascada_esmeralda_santiago_yosondua.jpg'
      ]
    },
    {
      id: 2,
      titulo: 'Cueva Mágica (Ndúúva Mulinú)',
      categoria: 'Aventura',
      descripcionCorto: 'Naturaleza, senderismo y misticismo en San Pedro Molinos.',
      descripcionCompleta: 'Atrae visitantes por su naturaleza y la Cueva Mágica. Es hogar de los Maromeros, acróbatas que amenizan fiestas y rituales ancestrales. Ideal para senderismo, camping y conexión con la naturaleza. Se dice que la cueva tiene energía propia.',
      imagen: 'https://pbs.twimg.com/media/CXMShmQUoAALgZX.jpg',
      ubicacion: 'https://goo.gl/maps/tu-link-real-aqui',
      precio: 'Entrada Libre',
      tips: ['Lleva linterna', 'Ropa abrigadora', 'Respetar las zonas sagradas'],
      galeria: [
         'https://mxc.com.mx/wp-content/uploads/2024/08/santiago-yosondua-cascada-min.png',
         'https://pbs.twimg.com/media/CXMShmQUoAALgZX.jpg'
      ]
    },
  
  ]

  return {
    destinos
  }
}