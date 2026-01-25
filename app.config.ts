
export default defineAppConfig({
    ui: {
        primary: 'emerald', // 🌿 Color principal (Botones, enlaces, acentos)
        gray: 'slate',      // 🌑 Color de fondo en modo oscuro (Elegante)

        // Configuración global de componentes (para que todos se vean igual)
        button: {
            rounded: 'rounded-full', // Botones redonditos (más amigables)
            font: 'font-bold font-montserrat' // Usar la fuente de títulos
        },
        card: {
            rounded: 'rounded-2xl',
            shadow: 'shadow-lg'
        }
    }
})