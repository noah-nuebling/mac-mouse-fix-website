export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.dev) {         // Disable debug logs in production builds.
        console.debug = () => {}
    }
})