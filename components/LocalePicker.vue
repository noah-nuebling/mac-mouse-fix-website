

<template>
    <select 
        ref="localePicker" 
        class="cool-select"
        @change="(event: Event) => { $coolI18n.userSelectLocale((event.target as HTMLSelectElement).value) }" 
    >
        <!-- 
            - We might wanna add <optgroup>s here and group the locales into continents once there are more displayed locales. 
                Update: (26.08.2024) All the langauges come from Europe or Asia, so doesn't make sense. Maybe we could group by something else. Will worry later. 
            - [Mar 2025] If we set the select's :value instead of the individual option's :selected, then the page will always load with the first option (English) selected. No idea why.
        -->
        <option v-for="$loc in localesToDisplay" :value="$loc" :selected="$coolI18n.currentLocale.value == $loc">
            {{ Localizable.localeInfo($loc)?.name ?? '?' }}
        </option>
    </select>
</template>

<script lang="ts" setup>

/* Constants */
const showLocaleThreshold = 50; // If the translation progress of a locale is greater than this, we show it in the locale picker. (E.g. 60 means: Only show locales that are more than 60% complete) || Note: Keep this in sync with `show_locale_threshold` in our python scripts.

/* Import i18n stuff
Note: Why can't we use $i18n in ts like we do in html? */

const { $coolI18n } = useNuxtApp();
const localePicker = ref<HTMLSelectElement | null>(null);
import * as Localizable from "~/locales/localizableAccess";
import { getBrowserLocale, setUserSelectedLocale } from "~/locales/localizableUtil";

let localesToDisplay = computed(() => {
    const l = Localizable.localeCodes().filter((locale) => {
        const doPass = (
            $coolI18n.isCurrentLanguage(locale)                                     ||   // Show the current language -> Otherwise the layout breaks.
            Localizable.localizationProgressAsInt(locale) > showLocaleThreshold     ||   // Show sufficiently translated languages -> In case the user speaks one of these languages, they might want to switch to it
            (isMounted.value && getBrowserLocale() == locale)                       ||   // Show the preferred locale of the user's browser -> When the user first opens the page it will display in this locale (as of [Mar 2025]) || Only add this after mounting to prevent hydration mismatch warnings.
            0
        );
        // console.log(`doPass for locale ${locale}: ${doPass}. (CurrentLocale: ${ $coolI18n.currentLocale.value})`)
        return doPass;
    })
    return l;
})


const isMounted = ref(false);
onMounted(() => {
    isMounted.value = true;
})

/* Update selection when locale updates due to other reasons
  (E.g. user navigating back through history)
  Update: Not necessary anymore (I think after adding transitions in app.vue) */
// watch(i18n.locale, (newLocale) => {
    // i18n.waitForPendingLocaleChange()
    // if (localePicker.value != null) {
    //   localePicker.value!.value = newLocale
    // }
// });
</script>

<style scoped>
.cool-select {
    /*
  This button looks weirdddd on macOS Safari. Idk why. `appearance: button` seems to render <select> elements nicely in a codepen, (See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select) but here's it renders this weird iOS 6 button.
  The rounded and outline stuff applies on Chrome. Not sure what happens on mobile Safari, but it looks okay.
  Update: Found a solution! See below.
  */

    appearance: button;

    /* The following 4 styles are set inside tailwind.css @base with the selector `*, ::before, ::after`. That's due to tailwinds 'preflight' feature. This breaks the system-button-styles. By reverting them all, the system button styles work properly.
      Notes:
      - Alternatively, we could turn off preflight in tailwind.config.js.
      - I've seen the button break again during testing which was very confusing. To get the broken style to go away, I had to open the website on a different domain (Using http://192.168.1.107:3000 instead of localhost:3000) */
    box-sizing: revert;
    border-width: revert;
    border-style: revert;
    border-color: revert;
}
</style>
