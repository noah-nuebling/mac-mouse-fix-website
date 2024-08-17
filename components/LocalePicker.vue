
<template>
  <!-- 
  Locale Picker
  Notes: 
  - I can't seem to give this a blue accent under the arrow like the native system buttons. This should be default look for <select> buttons. See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select. But the current look is good enough for Chrome and Safari.
  -->
    <select ref="localePicker" @change="handleLocaleSelect" class="cool-select"> 
      <option v-for="$loc in $i18n.locales" :value="$loc.code"> {{ $loc.name }}</option> 
    </select>
</template>

<script lang="ts" setup>

/* Import global store */
import { useGlobalStore } from "~/store/global";
const global = useGlobalStore();

/* Import i18n stuff
Note: Why can't we use $i18n in ts like we do in html? */

const i18n = useI18n();
const switchLocalePath = useSwitchLocalePath()
const localePicker = ref<HTMLSelectElement|null>(null);

/* Set initial locale picker selection
    Note: We tried to use v-bind/: and v-model, but neither of them worked */

onMounted(() => {
  localePicker.value!.value = i18n.locale.value
});

/* React to user selecting a new locale */

function handleLocaleSelect(event: Event) {
  
  // Extract info
  const target = event.target as HTMLSelectElement;
  const selectedLocale = target.value;

  // Guard change
  if (i18n.locale.value == selectedLocale) { return }

  // Global flag
  global.localeSwitchCount += 1;

  // Set locale
  // Notes: 
  //  - `i18n.locale.value = newLocale` does not change the route
  //  - `setLocale()` changes the route, doesn't set the locale cookie (August 2024) (It used to set the cookie?)
  navigateTo(switchLocalePath(selectedLocale));
  i18n.setLocaleCookie(selectedLocale);
  global.localeSwitchIsPending = true;
}

/* Update selection when locale updates due to other reasons 
  (E.g. user navigating back through history)
  Update: Not necessary anymore (I think after adding transitions in app.vue) */ 
watch(i18n.locale, (newLocale) => {
  // i18n.waitForPendingLocaleChange()
  // if (localePicker.value != null) {
  //   localePicker.value!.value = newLocale
  // }  
})

</script>

<style scoped>

.cool-select {

/* 
This button looks weirdddd on macOS Safari. Idk why. `appearance: button` seems to render <select> elements nicely in a codepen, but here's it renders this weird iOS 6 button. 
The rounded and outline stuff applies on Chrome. Not sure what happens on mobile Safari, but it looks okay. 
Update: Found a solution! See below. 
*/

appearance: button;

/* The following 4 styles are set inside tailwind.css @base with the selector `*, ::before, ::after`. Not sure why. But these styles break the system button styles. By reverting them all, the system button styles work properly. */
box-sizing: revert;
border-width: revert;
border-style: revert;
border-color: revert;
}

</style>