<template>
  <div class="w-full flex flex-col justify-center items-center">

    <!-- Title -->
    <div class="section-title h-full flex items-center mt-[45vh]">
      <h2 class="fadeeexxx text-center whitespace-pre-wrap xs:text-[3.15rem] sm:text-[3.5rem] md:text-[5.5rem] text-[6rem] font-[700] leading-[1.05] tracking-[-0.15rem] text-gray-800">
        <slot name="title"></slot>
        <!-- <StringF>
          {{ title }}
          <template #accent v-if="titleAccent"> 
            <span :class="['', titleAccentClass]">{{ titleAccent }}</span> 
          </template>
          <template #accent2 v-if="titleAccent2"> 
            <span :class="['', titleAccent2Class]">{{ titleAccent2 }}</span> 
          </template>
        </StringF> -->
      </h2>
    </div>

    <!-- Body -->
    <div class="section-body mx-[1.5rem] flex justify-center items-center my-[25vh]">
      <p v-if="$slots.body" class="fadeee text-center max-w-[30em] whitespace-pre-wrap sm:text-[1.4rem] text-[2rem] text-black/[0.9] font-[400] strong:font-[500] leading-[1.4] tracking-[-0.005rem]">
        <slot name="body"></slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  // title: String,
  // titleAccent: String,
  // titleAccent2: String,
  // body: String,
  // titleAccentClass: String,
  // titleAccent2Class: String,
})

</script>

<style scoped>

</style>