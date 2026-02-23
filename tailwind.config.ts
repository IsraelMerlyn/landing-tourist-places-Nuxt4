// tailwind.config.ts
import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

export default <Config>{
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {

            fontFamily: {
                sans: ['Inter', 'sans-serif'],        // Para textos largos (limpio)
                montserrat: ['Montserrat', 'sans-serif'] // Para Títulos (impacto)
            },

            colors: {
                // Usaremos 'emerald' como color primario (naturaleza/cascadas)
                primary: colors.emerald,
                // Usaremos 'slate' para fondos oscuros elegantes (piedra/montaña)
                darkbg: colors.slate,
            }
        }
    },
    plugins: []
}