<template>
  <div>

    <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">Do the Things <br>You Do on a <span class="blue-text">Trackpad</span>.<br>Without a Trackpad.</h2>
    <p class="text-2xl font-medium text-gray-500/80 mb-20 w-max-[60rem]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam voluptates odit doloremque reiciendis aliquid, possimus nobis consequuntur. Necessitatibus, dignissimos mollitia, quod repellendus debitis architecto nemo, voluptates exercitationem voluptate itaque ipsum?</p>
    <!-- <p class="text-xl font-normal text-gray-500/90 mb-20 w-[60rem]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam voluptates odit doloremque reiciendis aliquid, possimus nobis consequuntur. Necessitatibus, dignissimos mollitia, quod repellendus debitis architecto nemo, voluptates exercitationem voluptate itaque ipsum?</p> -->

    <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-4">


      <FeatureCard extra-class="feature-card col-span-auto bg-pink-gradient">
        <template v-slot:default>
          <div class="flex flex-row items-center h-full">
            <div>
              <h3 class="dark-bg">Move Between Spaces</h3>
              <p class="dark-bg">Hold a button on your mouse, then drag the mouse left or right to move to another Space.</p>
              <p class="dark-bg">It works just like swiping with 4 fingers on an Apple Trackpad.</p>
            </div>
            <div class="ml-4">
              <img src="~/assets/img/play-dark.png" alt="trackpad" class="w-20">
            </div>
          </div>
        </template>
        <template v-slot:expanded>

        </template>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto bg-orange-gradient flex flex-col">
        <h3 class="dark-bg">Mission Control</h3>
        <p class="dark-bg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
        <a href="" class="mt-2 text-gray-100 underline">See it in action ❯</a>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto bg-blue-gradient p-6">
        <h3 class="dark-bg">App Exposé</h3>
        <p class="dark-bg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Show Desktop</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Launchpad</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Look Up & Data Detectors</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Move between Pages</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Mark Mails as Unread</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Scroll Freely</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Pinch to Zoom</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
      <FeatureCard extra-class="feature-card col-span-auto">
        <h3>Smart Zoom</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
      </FeatureCard>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style lang="postcss" scoped>

  .grid > * {
    @apply h-96;
  }

  .feature-card h3 { /* Not sure this abstraction is good / tailwindy. See https://tailwindcss.com/docs/reusing-styles */
    @apply text-lg font-bold mb-4;
  }
  .feature-card p {
    @apply text-gray-500/80 mb-2;
  }


  .feature-card h3.dark-bg { /* Not sure this abstraction is good / tailwindy. See https://tailwindcss.com/docs/reusing-styles */
    @apply text-lg font-bold text-gray-100;
  }

  .feature-card p.dark-bg {
    @apply text-gray-100/75;
  }


  .blue-text {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400;
  }

</style>