<template>
  <header :class="['fixed left-0 right-0 header-shadow backdrop-blur-[20px] backdrop-saturate-[1.8] z-50 transition-colors duration-[0.5s]', navbarHasDarkAppearance ? 'bg-neutral-900/80 text-white/[0.85]' : 'bg-neutral-50/80 text-black/[0.85]']">
    <nav class="container mx-auto py-[0.4rem] text-[1rem] font-[400] flex justify-between items-center">
      
      <NuxtLink to="/" class="font-display mx-[2rem] font-[600] text-[1.75rem] tracking-[-0.00em] leading-[1.15em]">Mac Mouse Fix</NuxtLink>

      <ul class="flex gap-[2rem] mx-[2rem] font-[400] my-[1.0rem] items-center h-fit tracking-[-0.01em]">

        <li><NuxtLink to="/test" class="">Overview</NuxtLink></li> <!-- NuxtLink dynamically generates the page instead of requesting prerendered page from the server -->
        <!-- <li><NuxtLink to="/" class="">More</NuxtLink></li> -->
        <li>
          <NuxtLink to="/about" class="">More on GitHub <img :src="externalLinkImagePath" alt="" :class="['inline h-[0.9em] ml-[0.1em] mr-[0.1em] translate-y-[0.08em] align-baseline opacity-[0.8] transition-[filter] duration-[0.5s]', navbarHasDarkAppearance ? 'invert' : '']"></NuxtLink>
        </li>

        <li class="my-[-10rem]"><DownloadButton class="bg-blue-500 rounded-full text-white ml-[0.3rem] px-[0.85em] py-[0.3em] text-[1.0rem] translate-y-[-0.05em]"/></li>
      
        <!-- 
        <li><NuxtLink to="/products/abc" class="btn">abc prod</NuxtLink></li>
        <li><NuxtLink to="/">Home</NuxtLink></li> 
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/products" class="btn">Products</NuxtLink></li> 
      -->
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">

import { useGlobalStore } from "~/store/global";
import externalLinkImagePath from "../assets/img/arrow.up.right.square@8x.png"
import { storeToRefs } from "pinia";

const globalState = useGlobalStore()
const { navbarHasDarkAppearance } = storeToRefs(globalState)

watch(navbarHasDarkAppearance, (newValue) => {

  console.log(`Navbar dark state: ${ newValue }`);
  
})

</script>


<style scoped lang="postcss">

.router-link-exact-active { /* This class is magically applied to the selected link in the <nav> (and maybe other places?) */
  opacity: 0.6;
  cursor: default;
}

.header-shadow {
  box-shadow: 0px 0.0px 4px 0px rgba(0, 0, 0, 0.05), 0 0px 6px 0 rgba(0, 0, 0, 0.1), 0 0px 15px 0 rgba(0, 0, 0, 0.07);
  /* @apply shadow-sm; */
}

</style>