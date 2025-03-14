w
<template>
    <select ref="localePicker" @change="handleLocaleSelect" class="cool-select">
        <!-- We might wanna add <optgroup>s here and group the locales into continents once there are more displayed locales. 
            Update: (26.08.2024) All the langauges come from Europe or Asia, so doesn't make sense. Maybe we could group by something else. Will worry later. -->
        <option v-for="$loc in localesToDisplay" :value="$loc">
            {{ Localizable.localeInfo($loc)?.name ?? '?' }}
        </option>
    </select>
</template>

<script lang="ts" setup>

/* Constants */
const showLocaleThreshold = 50; // If the translation progress of a locale is greater than this, we show it in the locale picker. (E.g. 60 means: Only show locales that are more than 60% complete) || Note: Keep this in sync with `show_locale_threshold` in our python scripts.

/* Import global store */
import { useGlobalStore } from "~/store/global";
const global = useGlobalStore();

/* Import i18n stuff
Note: Why can't we use $i18n in ts like we do in html? */

const { $coolI18n } = useNuxtApp();
const localePicker = ref<HTMLSelectElement | null>(null);
import * as Localizable from "~/locales/localizableAccess";
import { getBrowserLocale, setUserSelectedLocale } from "~/locales/localizableUtil";

var localesToDisplay = ref<any>(null);

onMounted(() => {
    /* Get locales to display
      Notes:
      - We get cryptic errors if we run this serverside. No Idea why. (23.08.2024)
      - Tried to run this outside of onMounted(). Strange issues iirc, but don't remember what.
      - [Mar 2025] Not sure this will properly update after switching locales. Maybe use computed() to get proper reactivity.
    */

    const result = Localizable.localeCodes().filter((loc) => {
        return (
            $coolI18n.isCurrentLanguage(loc) || // Show the current language -> Otherwise the layout breaks.
            Localizable.localizationProgressAsInt(loc) > showLocaleThreshold || // Show sufficiently translated languages -> In case the user speaks one of these languages, they might want to switch to it
            getBrowserLocale() == loc
        ); // Show the preferred locale of the user's browser -> When the user first opens the page it will display in this locale (as of 23.08.2024)
    });
    localesToDisplay.value = result;

    // Set initial locale picker selection
    // Note: We tried to use v-bind/: and v-model, but neither of them worked
    requestAnimationFrame(() => {
        // requestAnimationFrame() is necessary when we update localesToDisplay.value inside onMounted directly before this.
        localePicker.value!.value = $coolI18n.currentLocale.value;
    });
});

/* React to user selecting a new locale */

function handleLocaleSelect(event: Event) {
    // Extract info
    const target = event.target as HTMLSelectElement;
    const selectedLocale = target.value;

    // Guard change
    if ($coolI18n.currentLocale.value == selectedLocale) {
        return;
    }

    // Global flag
    global.localeSwitchCount += 1;

    // Store user preference
    setUserSelectedLocale(selectedLocale);

    // Set locale
    navigateTo($coolI18n.switchLocalePath(selectedLocale));
    
    // Set transition state
    //  TODO: [Mar 2025] Consider removing this 
    global.localeSwitchIsPending = true; 
}

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
