<template>
  <div class="mt-[0rem]">

    <!-- Background -->

    <div class="bg-transparent w-screen h-[100vh] absolute left-0.5 right-0.5 top-0 bottom-0 -z-10"></div>

    <!-- Content -->

    <div class="flex items-center justify-center group w-[100%] h-[calc(100vh-5rem)] duration-[0.8s] ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div class="h-fit w-fit border-[0px] relative duration-[inherit] ease-[inherit]">
        <div ref="innerContent" :class="['h-[100%] w-[100%] relative flex flex-col items-center justify-center transition-[transform] duration-[inherit] ease-[inherit] border-[0px]', !isMounted ? 'translate-y-[-6rem]' : '']"> 
          <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" :class="['h-[14rem] transition-[opacity] duration-[inherit] ease-[inherit] border-[0px] mt-[-2rem]', !isMounted ? 'opacity-0' : '']">
          <h1 ref="mmfName" :class="['font-[700] text-[5.0rem] text-black/90 mt-[1.75rem] mb-[-1.25rem] transition-transform duration-[inherit] ease-[inherit]', !isMounted ? 'animate-pulse scale-[0.8]' : '']">Mac Mouse Fix</h1>
          <p ref="tagline" :class="['text-black mb-[1.5rem] transition-[opacity] duration-[inherit] ease-[inherit]', !isMounted ? 'opacity-0' : 'opacity-[0.7]']">Make Your $10 Mouse Better Than an Apple Trackpad</p>
          <div ref="downloadButton" :class="['bg-blue-500 rounded-[5rem] transition-[opacity] duration-[inherit] ease-[inherit]', !isMounted ? 'opacity-0' : '']">
            <p class="text-white mx-[0.75em] my-[0.25em] text-[1.0rem]">Download</p>
          </div>
        </div>
        <img ref="colorSplash1" :src="colorSplashImagePath" alt="Color Splash" :class="['absolute top-0 left-0 translate-x-[calc(-50%-30rem)] translate-y-[calc(-50%-30rem)] scale-[4.0] -z-10 transition-[opacity] duration-[3.6s] ease-[inherit]', !isMounted ? 'opacity-0' : '']">
        <img ref="colorSplash2" :src="colorSplashImagePath" alt="Color Splash" :class="['absolute bottom-0 right-0 translate-x-[calc(50%+30rem)] translate-y-[calc(50%+35rem)] scale-[4.0] -z-10 transition-[opacity] duration-[3.6s] ease-[inherit]', !isMounted ? 'opacity-0' : '']">
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

/* Manually import images 
  (Not totally sure if necessary)
*/
import mmfIconImagePath from "../assets/img/mmf-icon.png"
import colorSplashImagePath from "../assets/img/color-splash.png"

/* Get dom element refs 
    All unused atm
*/

// const innerContent:   Ref<HTMLElement|null> = ref(null)
// const mmfIcon:        Ref<HTMLElement|null> = ref(null)
// const mmfName:        Ref<HTMLElement|null> = ref(null)
// const tagline:        Ref<HTMLElement|null> = ref(null)
// const downloadButton: Ref<HTMLElement|null> = ref(null)
// const colorSplash1:   Ref<HTMLElement|null> = ref(null)
// const colorSplash2:   Ref<HTMLElement|null> = ref(null)

/* State */

const isMounted = ref(false)

/* Wait for mount 
    We play intro animations after mount, not sure if that makes sense?
*/

onMounted(() => {
  isMounted.value = true
})



</script>

<style scoped lang="postcss">

</style>