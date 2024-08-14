<!-- 
  
  Notes:
  - NuxtLink dynamically generates the page instead of requesting prerendered page from the server 

-->

<template>
  <header ref="root" :class="['fixed select-none left-0 right-0 header-shadow backdrop-blur-[20px] backdrop-saturate-[1.8] z-50 transition-[transform,color,background-color,border-color,text-decoration-color,fill,stroke] duration-[0.5s] !max-w-full ch-[a]:no-underline', navbarHasDarkAppearance ? 'bg-neutral-950/80 text-white/[0.85]' : 'bg-neutral-50/80 text-black/[0.85]']"
    v-on-click-outside="{ onEvent: () => isExpanded = false, condition: isExpanded, blockEvents: true }"
  >
    <nav :class="['py-[0.4rem] px-[2rem] text-[1rem] font-[400] flex justify-between items-center relative left-[50%] translate-x-[-50%]', $attrs.class]">
      
      <!-- Left-aligned -->
      <div class="flex flex-row items-center">
        <!-- <div class=" relative wh-[2.6rem] translate-y-[-0.025rem] mr-[2rem]">
          <img ref="mmfIcon" :src="mmfIconImagePath" alt="Mac Mouse Fix Icon" :class="['absolute inset-0 w-full h-full scale-[1.2]']">
        </div> -->
        <NuxtLink  :to="localePath('/')" class="mmf-name font-display font-[600] sm:text-[1.75rem] text-[1.75rem] tracking-[-0.00em] leading-[1.15em]">Mac Mouse Fix</NuxtLink>
      </div>

      <!-- Right-aligned -->
      <div class="flex sm:gap-[0rem] gap-[2rem] font-[400] my-[0.7rem] items-center h-fit tracking-[-0.01em]">

        <div class="px-[1.25rem] py-[1.5rem] my-[-1.5rem] sm:block hidden" @click="isExpanded = !isExpanded">
          <img :src="chevronImagePath" alt="" :class="['w-[1.15rem] transition-[transform,filter] duration-[0.5s]', navbarHasDarkAppearance ? 'invert' : '']" :style="{ transform: `rotateZ(${ isExpanded ? 180.0001 : 0 }deg) translateY(0.1rem)`, transformOrigin: '50% 60%' }">
        </div>


        <NuxtLink :to="localePath('/')" class="sm:hidden">{{ $t('navbar.overview') }}</NuxtLink>
        <a href="https://github.com/noah-nuebling/mac-mouse-fix" class="sm:hidden">{{ $mt('navbar.github') }} <img :src="externalLinkImagePath" alt="" :class="['inline h-[0.9em] ml-[0.1em] mr-[0.1em] translate-y-[0.08em] align-baseline opacity-[0.8] transition-[filter] duration-[0.5s]', navbarHasDarkAppearance ? 'invert' : '']"></a>

        <DownloadButton class="my-[0rem] bg-blue-500 rounded-full text-white ml-[0.3rem] px-[0.85em] py-[0.3em] text-[1.0rem] sm:translate-y-[0.15em] translate-y-[-0.05em]"/>
    </div>
    
  </nav>

  <!-- Expanded mobile nav links -->
  <client-only> <!-- Client-only to prevent hydration mismatch -->
    <div ref="expandingContainer" :class="['overflow-clip h-0 transition-[height] duration-[0.5s]', currentSize <= ResponsiveSize.sm ? '' : 'hidden', isExpanded ? '' : '']">
      <div :class="['sm:flex hidden flex-col items-left gap-[1rem] mx-[3rem] text-[1.1rem] font-[400] tracking-[-0.01em] pb-[1rem]']">
        <hr :class="['border-t-[1px] ', navbarHasDarkAppearance ? 'border-white/[0.15]' : 'border-black/[0.1]']">
        <NuxtLink class="" :to="localePath('/')" >{{ $t('navbar.overview') }}</NuxtLink>
        <hr :class="['border-t-[1px] ', navbarHasDarkAppearance ? 'border-white/[0.15]' : 'border-black/[0.1]']">
        <a class="" href="https://github.com/noah-nuebling/mac-mouse-fix" >{{ $mt('navbar.github') }} <img :src="externalLinkImagePath" alt="" :class="['inline h-[0.9em] ml-[0.1em] mr-[0.1em] translate-y-[0.08em] align-baseline opacity-[0.8] transition-[filter] duration-[0.5s]', navbarHasDarkAppearance ? 'invert' : '']"></a>
      </div>
    </div>
  </client-only>

  <hr :class="['border-t-[1px] ', navbarHasDarkAppearance ? 'border-white/[0.15]' : 'border-black/[0.0]']">
</header>
</template>

<script setup lang="ts">

// import mmfIconImagePath from "../assets/img/mmf-icon.png"
import burgerImagePath from "../assets/img/line.3.horizontal@8x.png"
import chevronImagePath from "../assets/img/chevron.down@8x.png"


const { currentSize, ResponsiveSize } = useResponsive()
const $mt = useMT()
import { getProps, setProps } from '~/utils/util'
import { useGlobalStore } from "~/store/global";
import externalLinkImagePath from "../assets/img/arrow.up.right.square@8x.png"
import { storeToRefs } from "pinia";

const globalState = useGlobalStore()
const { navbarHasDarkAppearance, navbarHeight_Unexpanded } = storeToRefs(globalState)

const localePath = useLocalePath()

const isExpanded = ref(false)
const expandingContainer = ref<HTMLElement | null>(null)
const root = ref<HTMLElement | null>(null)

onMounted(() => {

  // Update navbar height (not sure if good place/method to do this)
  navbarHeight_Unexpanded.value = root.value!.offsetHeight
})


watch(isExpanded, (shouldExpand) => {

  // Css transitions don't work with fit-content, so we're measuring the 'fit-content' size in js and then setting the fitting size in px. That way the css transitions work.

  if (shouldExpand) {

    // Measure expanded size
    expandingContainer.value!.style.height = 'fit-content'
    const calcHeight = expandingContainer.value?.offsetHeight
    expandingContainer.value!.style.height = '0'

    doAfterRender(() => {

      // Start animation
      expandingContainer.value!.style.height = `${ calcHeight }px`
      root.value!.style.transform = `rotate(0.01deg)`

    })
  } else { 
    
    // Unexpand

    // Store og props
    const ogTransition = expandingContainer.value!.style.transition
    const ogHeight = expandingContainer.value!.style.height

    // Set target height
    //  Without animation
    expandingContainer.value!.style.transition = 'none'
    expandingContainer.value!.style.height = '0'

    // Store target height globally
    const calcNavbarHeight = root.value!.offsetHeight
    navbarHeight_Unexpanded.value = calcNavbarHeight

    // Restore og height
    expandingContainer.value!.style.height = ogHeight

    doAfterRender(() => {
      // Restore transition & start animation
      expandingContainer.value!.style.transition = ogTransition
      expandingContainer.value!.style.height = '0'
      root.value!.style.transform = `rotate(0deg)`
    })
  }
})

function unexpandAndStoreHeight() {


}

watch(currentSize, (newValue) => { 

  // Watch page width changes

  // We're always unexpanding after page width changes 
  //  So that we can properly update the navbarHeight_Unexpanded and so the expanded height is recalculated for the new page width
  //  I think I saw some subtle bugs with this when playing around with it a lot but can't reproduce anymore.
  isExpanded.value = false
})



</script>


<style scoped lang="postcss">

.router-link-exact-active {
  cursor: default;
}
.router-link-exact-active:not(.mmf-name)  { /* This class is magically applied to the selected link in the <nav> (and maybe other places?) */
  /* color: hsla(0, 0%, 0%, 0.4); */
  opacity: 0.5;
}

.header-shadow {
  box-shadow: 0px 0.0px 4px 0px rgba(0, 0, 0, 0.05), 0 0px 6px 0 rgba(0, 0, 0, 0.1), 0 0px 15px 0 rgba(0, 0, 0, 0.07);
  /* @apply shadow-sm; */
}

</style>