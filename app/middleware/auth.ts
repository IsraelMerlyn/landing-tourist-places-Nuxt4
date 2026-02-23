// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()

    // Si el usuario NO está logueado y quiere entrar a una ruta protegida...
    if (!user.value) {
        // ... lo mandamos al login
        return navigateTo('/login')
    }
})