<template>
  <div class="w-full flex flex-col justify-center items-center">

    <!-- Title -->
    <div class="section-title h-full flex items-center mt-[45vh]">
      <i18n-t tag="h2" :keypath="titleKey!" class="fadeeexxx text-center whitespace-pre-wrap xs:text-[3.15rem] sm:text-[3.5rem] md:text-[5.5rem] text-[6rem] font-[700] leading-[1.05] tracking-[-0.15rem] text-gray-800">
        <template #accent v-if="titleAccentKey"> 
          <span :class="['', titleAccentClass]">{{ $t(titleAccentKey!)}}</span> 
        </template>
        <template #accent2 v-if="titleAccent2Key"> 
          <span :class="['', titleAccent2Class]">{{ $t(titleAccent2Key!)}}</span> 
        </template>
      </i18n-t>
    </div>

    <!-- Body -->
    <div class="section-body mx-[1.5rem] flex justify-center items-center my-[25vh]">
      <p v-if="bodyKey" v-html="$mt(bodyKey!)" class="fadeee text-center max-w-[30em] whitespace-pre-wrap sm:text-[1.4rem] text-[2rem] text-black/[0.9] font-[400] strong:font-[500] leading-[1.4] tracking-[-0.005rem]"></p>
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