# 🌿 Turismo Mixteca - Israel Merlyn

![Banner del Proyecto](public/images/banner-proyecto.jpg) 
*(Tip: Aquí puedes poner una captura de tu Home)*

> Una plataforma web inmersiva dedicada a promover el ecoturismo y la riqueza cultural de la región Mixteca de Oaxaca. Desarrollada con tecnología moderna para asegurar velocidad, accesibilidad y SEO.

## 🚀 Demo en Vivo
[Ver sitio web](https://tu-url-aqui.com) *(Pendiente de deploy)*

## 🛠️ Stack Tecnológico

Este proyecto utiliza una arquitectura moderna basada en componentes y renderizado híbrido:

* **Framework Principal:** [Nuxt 3](https://nuxt.com/) (Vue.js Framework)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Imágenes:** @nuxt/image (Formato WebP + Lazy Loading)
* **Iconos:** Heroicons (SVG Inline)
* **Lenguaje:** JavaScript (ES6+) / HTML5 Semántico

## ✨ Características Clave

* **Navegación Dinámica:** Sistema de enrutamiento para ver detalles de cada destino (`/destinos/[id]`).
* **SEO Optimizado:** Metadatos dinámicos, etiquetas OpenGraph y semántica HTML.
* **Performance:** Puntuación de 90+ en Lighthouse (Core Web Vitals).
* **Diseño Responsivo:** Adaptado para móviles, tablets y escritorio con enfoque "Mobile First".
* **UX/UI Moderno:** Efectos Glassmorphism, transiciones suaves y tipografía legible.

## 📦 Instalación y Configuración

Si deseas correr este proyecto localmente, sigue estos pasos:

### Prerrequisitos
* Node.js (v18 o superior)
* NPM o Yarn

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone [https://github.com/tu-usuario/turismo-mixteca.git](https://github.com/tu-usuario/turismo-mixteca.git)
    cd turismo-mixteca
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Correr servidor de desarrollo**
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000` en tu navegador.

4.  **Construir para producción**
    ```bash
    npm run build
    npm run preview
    ```

## 📂 Estructura del Proyecto

```text
/
├── assets/          # Estilos globales y recursos estáticos
├── components/      # Componentes Vue reutilizables
├── composables/     # Lógica compartida (useDestinos.js)
├── layouts/         # Plantillas base (Navbar, Footer)
├── pages/           # Vistas y Rutas del sitio
│   ├── index.vue    # Home
│   └── destinos/    # Rutas dinámicas
│       └── [id].vue # Detalle de destino
├── public/          # Archivos estáticos públicos (imágenes grandes)
└── nuxt.config.ts   # Configuración de módulos y SEO