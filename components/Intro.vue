<template>
  <div class="mt-[0rem]">

    <!-- Background -->

    <div class="bg-transparent w-screen h-[100vh] absolute left-0.5 right-0.5 top-0 bottom-0 -z-10"></div>

    <!-- Content -->

    <div class="group w-[100%] h-[calc(100vh-5rem)] duration-[0.8s] ease-[cubic-bezier(0.2,0,0.2,1)]">
      <div ref="innerContent" class="h-[100%] w-[100%] flex flex-col items-center justify-center translate-y-[-6rem] transition-[transform] duration-[inherit] ease-[inherit] border-[0px]"> 
        <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" class="h-[14rem] transition-[opacity] opacity-0 duration-[inherit] ease-[inherit] border-[0px] mt-[-2rem]">
        <h1 ref="mmfName" class="font-[700] text-[5.0rem] text-black/90 mt-[1.75rem] mb-[-1.25rem] transition-transform duration-[inherit] ease-[inherit] animate-pulse scale-[0.8]">Mac Mouse Fix</h1>
        <p ref="tagline" class="text-black mb-[1.5rem] transition-[opacity] opacity-0 duration-[inherit] ease-[inherit]">Make Your $10 Mouse Better Than an Apple Trackpad</p>
        <div ref="downloadButton" class="bg-blue-500 rounded-[5rem] ransition-[opacity] opacity-0 duration-[inherit] ease-[inherit]">
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

/* Get dom element refs */

const innerContent:   Ref<HTMLElement|null> = ref(null)
const mmfIcon:        Ref<HTMLElement|null> = ref(null)
const mmfName:        Ref<HTMLElement|null> = ref(null)
const tagline:        Ref<HTMLElement|null> = ref(null)
const downloadButton: Ref<HTMLElement|null> = ref(null)

/* 
  Wait for mount 
  so that refs are defined
*/

onMounted(() => {

  /* Intro animation */
  innerContent.value!.classList.remove('translate-y-[-6rem]')
  innerContent.value!.classList.add('translate-y-[-0rem]')
  mmfIcon.value!.classList.remove('opacity-0')
  mmfName.value!.classList.remove('animate-pulse', 'scale-[0.8]')
  tagline.value!.classList.remove('opacity-0')
  tagline.value!.classList.add('opacity-[0.7]')
  downloadButton.value!.classList.remove('opacity-0')
})



</script>

<style scoped lang="postcss">

</style>