<!-- "default.vue" is a magic layout name. The template will automatically be wrapped around all pages. -->

<template>
  <div>

    <!-- Header -->
    <header class="fixed left-0 right-0 shadow-sm bg-white z-50">
      <nav class="container mx-auto py-[0.4rem] text-[1rem] font-[400] flex justify-between">
        
        <NuxtLink to="/" class="font-display font-[600] text-[1.75rem] opacity-[0.85] tracking-[0.011em] leading-[1.15em]">iPad Pro</NuxtLink>

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