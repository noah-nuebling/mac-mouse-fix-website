<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. -->

<template>
  <div>

    <!-- Header -->
    <header class="shadow-sm bg-white z-10">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Nuxt Dojo</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li> <!-- NuxtLink dynamically generates the page instead of requesting prerendered page from the server -->
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/products" class="btn">Products</NuxtLink></li>
          <li><NuxtLink to="/test" class="btn">Test</NuxtLink></li>
          <!-- <li><NuxtLink to="/products/abc" class="btn">abc prod</NuxtLink></li> -->
        </ul>
      </nav>
    </header>

    <!-- Output page content -->
    <div class="container mx-auto p-4"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->

  </div>
</template>

<style scoped>
.router-link-exact-active { /* This class is magically applied to the selected link in the <nav> (and maybe other places?) */
  color: #12b489
}
</style>