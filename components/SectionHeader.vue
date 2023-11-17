<template>
  <div class="section w-full flex flex-col justify-center items-center h-[100svh]">

    <!-- Title -->
    <div class="section-title mx-[1rem] h-full flex items-center">
      <i18n-t tag="h2" :keypath="titleKey!" class="fadeee text-center whitespace-pre-wrap xs:text-[2.75rem] sm:text-[3.25rem] md:text-[5rem] text-[5.5rem] font-[700] leading-[1.05] tracking-[-0.15rem] text-gray-800">
        <template #accent v-if="titleAccentKey"> 
          <span :class="['', titleAccentClass]">{{ $t(titleAccentKey!)}}</span> 
        </template>
        <template #accent2 v-if="titleAccent2Key"> 
          <span :class="['', titleAccent2Class]">{{ $t(titleAccent2Key!)}}</span> 
        </template>
      </i18n-t>
    </div>

    <!-- Body -->
    <div class="section-body mx-[1rem] absolute inset-0 h-full flex justify-center items-center opacity-0">
      <p v-if="bodyKey" v-html="$mt(bodyKey!)" class="fadeee text-center max-w-[30em] whitespace-pre-wrap sm:text-[1.4rem] text-[1.8rem] text-black/[0.9] strong:text-gradient-to-l font-[400] strong:font-[500] leading-[1.4] tracking-[-0.005rem]"></p>
    </div>
  </div>
</template>

<script setup lang="ts">

const $mt = useMT()

const props = defineProps({
  titleKey: String,
  titleAccentKey: String,
  titleAccentClass: String,
  titleAccent2Key: String,
  titleAccent2Class: String,
  bodyKey: String,
})

</script>

<style scoped>

</style>