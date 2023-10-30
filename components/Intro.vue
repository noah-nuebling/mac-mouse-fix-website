<template>
  <div class="">

    <!-- Background -->

    <div class="bg-transparent w-screen h-[100vh] absolute left-0.5 right-0.5 top-0 bottom-0 -z-10"></div>

    <!-- Content -->

    <div class="group w-[100%] h-[calc(100vh-6rem)]">
      <div class=" h-[100%] w-[100%] flex flex-col items-center justify-center translate-y-[-5rem] scale-[1.3]"> 
        <img :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" class="h-[14rem] group-hover:invisible">
        <h1 class="font-[700] text-[5.0rem] text-black/90 mt-[1.75rem] mb-[-1.25rem] group-hover:translate-y-[-3rem] group-hover:scale-[0.8]">Mac Mouse Fix</h1>
        <p class="text-black opacity-[0.7] mb-[1.5rem] group-hover:opacity-0">Make Your $10 Mouse Better Than an Apple Trackpad</p>
        <div class="bg-blue-500 rounded-[5rem] group-hover:invisible">
          <p class="text-white mx-[0.75em] my-[0.25em]">Download</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

/* Manually import images 
  (Not totally sure if necessary)
*/
import mmfIconImagePath from "../assets/img/mmf-icon.png"


</script>

<style scoped lang="postcss">

</style>