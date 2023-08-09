<!-- "productsss.vue" is not a magic name. -->

<template>
  <div>

    <!-- Header -->
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4">
        <NuxtLink to="/products">Nuxt Dojo Merch</NuxtLink>
      </nav>
    </header>

    <!-- Content -->
    <div class="container mx-auto p-4"><slot /></div> <!-- page templates will be inserted here (about.vue, index.vue, etc) -->

    <!-- Footer -->
    <footer class="container mx-auto p-4 flex justify-between border-t-2">
      <ul class="flex gap-4">
        <li><NuxtLink to="/">Home</NuxtLink></li> <!-- NuxtLink dynamically generates the page instead of requesting prerendered page from the server -->
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/products">Products</NuxtLink></li>
      </ul>
    </footer>

  </div>
</template>

<style scoped>
.router-link-exact-active {
  /* This class is magically applied to the selected link in the <nav> (and maybe other places?) */
  color: #12b489
}
</style>