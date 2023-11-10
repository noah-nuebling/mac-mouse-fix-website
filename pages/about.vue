<!-- index.vue is the magic name for the home page -->

<template>
  <div>

    <h2>About</h2>
    <p> {{ $t('test-stuff') }} </p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ipsa, culpa necessitatibus inventore similique quam autem sapiente quos. Doloribus, voluptatum. Quas totam illum rem assumenda accusantium asperiores inventore quam ea!</p>
  
  </div>
</template>

<script setup>

</script>

<style scoped>
  h2 {
    margin-bottom: 20px;
    font-size: 36px;
  }
  p {
    margin: 20px 0;
  }
</style>