<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. -->

<template>
  <div>

    <!-- NavBar -->
    <Navbar/>

    <!-- Output page content -->
    <div class="container mx-auto pt-[0rem]"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->

    <!-- 
    Language Picker
    Notes: 
    - I can't seem to give this a blue accent under the arrow like the native system buttons. This should be default look for <select> buttons. See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select. But the current look is good enough for Chrome and Safari.
    -->
    <div class="container mx-auto mb-[4rem]">
      <select id="locale-select" v-model="$i18n.locale" class="rounded-[50vh] outline outline-1 outline-slate-500/20"> 
        <option v-for="$loc in $i18n.locales" :value="$loc.code"> {{ $loc.name }}</option> 
      </select> 
    </div>

  </div>
</template>

<style scoped>


</style>