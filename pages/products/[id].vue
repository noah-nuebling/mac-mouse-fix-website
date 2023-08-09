<template>
  <div>

    <Head>
      <Title>Nuxt Dojo | {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>

    <ProductDetails :product="product"/>
  </div>
</template>

<script setup>
  const { id } = useRoute().params // Unwrap id value from route
  const uri = 'https://fakestoreapi.com/products/' + id

  // Fetch the product
  const { data: product } = await useFetch(uri /*, { key: id } <- This was necessary in the tutorial ep 8 minute 10:00, but seemingly not anymore */)

  if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true }) /* fatal needs to be true so that dynamically processed links lead to the error.vue page */
  }

  definePageMeta({
    layout: 'productsss'
  }) 
</script>

<style scoped>

</style>