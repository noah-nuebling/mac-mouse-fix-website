// Set Safari Preview 
//  (Otherwise Safari shows our blue splash image under "Suggestions") 
//  Based on: https://stackoverflow.com/q/11055418/10601702
//  Untested as of [Jun 6 2025] (when I wrote this code.) I'm not sure how to test this. Probably have to make Safari delete its caches? I guess I'll see if it works over the next few weeks.


export default defineNuxtPlugin((nuxtApp) => {
    // Client-only
    if (import.meta.client) {
        // Redirect Safar preview fetcher
        if (window.navigator && window.navigator.loadPurpose === "preview") {
            window.location.href = "/favicon.ico";
        }
    }
})