<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. -->

<template>
  <div>

    <!-- NavBar -->
    <Header :darkAppearance="false"/>

    <!-- Output page content -->
    <div class="container mx-auto pt-[5rem]"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->

  </div>
</template>

<style scoped>


</style>