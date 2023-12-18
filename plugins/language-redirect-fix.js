// This plugin is a workaround for bugs with nuxt i18n redirects. See https://github.com/nuxt-modules/i18n/issues/2626
// Add `<meta name="server-locale" :content="$i18n.locale">` to the template of a page (or layout) for this to work.

export default defineNuxtPlugin(async function(app) {

    if (process.client) {

        app.hook("app:mounted", () => {

            const serverLocale = document.querySelector('meta[name="server-locale"]')?.getAttribute('content');
            const clientLocale = app.$i18n.locale.value

            if (serverLocale != null && serverLocale != clientLocale) {
                location.reload()
            }
        })
    }
})
