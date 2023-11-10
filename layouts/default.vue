<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. -->

<template>
  <div>

    <!-- NavBar -->
    <Navbar/>

    <!-- Output page content -->
    <div class="container mx-auto pt-[0rem]"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->

    <!-- 
    Locale Picker
    Notes: 
    - I can't seem to give this a blue accent under the arrow like the native system buttons. This should be default look for <select> buttons. See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select. But the current look is good enough for Chrome and Safari.
    -->
    <div class="container mx-auto mb-[4rem]">
      <select ref="localePicker" @change="handleLocaleSelect" class="rounded-[50vh] outline outline-1 outline-slate-500/20"> 
        <option v-for="$loc in $i18n.locales" :value="$loc.code"> {{ $loc.name }}</option> 
      </select> 
    </div>

  </div>
</template>

<script setup lang="ts">

/* Import i18n stuff
Note: Why can't we use $i18n in ts like we do in html? */

const i18n = useI18n() 
const localePicker = ref<HTMLSelectElement|null>(null)

/* Set initial locale picker selection
    Note: We tried to use v-bind/: and v-model, but neither of them worked */

onMounted(() => {
  localePicker.value!.value = i18n.locale.value
});

/* React to user selecting a new locale */
  
function handleLocaleSelect(event: Event) {
  const select = event.target as HTMLSelectElement
  i18n.setLocale(select.value);
}
  
</script>

<style scoped>
</style>