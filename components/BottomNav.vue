<template>
  <div>
    <div :class="['relative flex justify-center', colorClass ?? '', $props.isMinimal ? '' : 'h-[50vh]']">
      <div class="w-fit h-full flex flex-col justify-center items-center gap-[0.9rem] !text-[1.0rem]">

        <!-- Credits -->
        <p :class="['strong:font-[600] strong:text-gradient-to-l  strong:filter strong:brightness-[1.05]']" :style="$props.isMinimal ? 'display: none' : ''">
          <StringF>
            {{ mdrf(MFLocalizedString('footer.credits', '')) }}
          </StringF> 
        </p>
        
        <div class="sm:w-[100%] w-[200%] h-[1px] !bg-neutral-900/[0.0] bg-gradient-to-r from-transparent via-neutral-900/[0.1] to-transparent" :style="$props.isMinimal ? 'display: none' : ''"/>

        <!-- Downloads -->
        <div :class="['whitespace-nowrap overflow-none border-0 py-[0.0rem] px-[0rem] mx-[0rem] rounded-[0.5rem] bg-white/[0] border-neutral-900/[0.9] border-1']" :style="$props.isMinimal ? 'display: none' : ''">
          <p class="inline-block">
            <StringF>
              {{ MFLocalizedString('footer.thankyou', 'This is a thankkkkyou.') }}
              <template #dwn>
                <img :src="`https://img.shields.io/github/downloads/noah-nuebling/mac-mouse-fix/total?label=&link=https%3A%2F%2Fgithub.com%2Fnoah-nuebling%2Fmac-mouse-fix%2Freleases&color=${downloadsBadgeColor}`" class="inline-block mx-[.25em] translate-y-[-0.1em] my-[-99rem] min-w-[34px] brightness-[1]">
              </template>
            </StringF>
          </p>
        </div>

        <div class="sm:w-[100%] w-[200%] h-[1px] !bg-neutral-900/[0.0] bg-gradient-to-r from-transparent via-neutral-900/[0.1] to-transparent" :style="$props.isMinimal ? 'display: none' : ''"/>

        <!-- Locale Picker-->
        <div class="text-[1.0em]">
          <LocalePicker/>
        </div>

      </div>

    </div>  
  </div>
</template>

<script setup lang="ts">

/* Props */

defineProps({
  isMinimal: Boolean,
  downloadsBadgeColor: {
    type: String,
    default: '25c65f',
  },
  colorClass: {
    type: String,
    default: 'accent-[#00b551] strong:gradient-green ch-[a]:gradient-green',
  }
})

/* Import markdown translate */
const { $coolI18n: { mdrf, MFLocalizedString } } = useNuxtApp();



</script>

<style scoped>



</style>