<template>
  <div class="w-full flex flex-col justify-center items-center">
    <i18n-t tag="h2" :keypath="titleKey!" class="text-center whitespace-pre-wrap xs:text-[2.75rem] sm:text-[3.25rem] md:text-[5rem] text-[5rem] font-[700] leading-[1.05] tracking-[-0.15rem] mx-[1rem] mt-[18rem] text-gray-800">
      <template #accent v-if="titleAccentKey"> 
        <span :class="titleAccentClass">{{ $t(titleAccentKey!)}}</span> 
      </template>
      <template #accent2 v-if="titleAccent2Key"> 
        <span :class="titleAccent2Class">{{ $t(titleAccent2Key!)}}</span> 
      </template>
    </i18n-t>

    <p v-if="bodyKey" v-html="$mt(bodyKey!)" class="text-center max-w-[30em] whitespace-pre-wrap sm:text-[1.4rem] text-[1.8rem] font-[400] text-black/[0.9] leading-[1.4] tracking-[-0.005rem] my-[4.5rem] mx-[1rem]"></p>
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