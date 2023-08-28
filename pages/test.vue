<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div>

    <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">Do the Things <br>You Do on a <span class="text-gradient-blue">Trackpad</span>.<br><span class="text-gradient-yellow">Without</span> a <span class= text-gradient-light-yellow>Trackpad</span>.</h2>
    <p class="text-2xl font-medium text-gray-500/80 mb-20 w-max-[60rem]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam voluptates odit doloremque reiciendis aliquid, possimus nobis consequuntur. Necessitatibus, dignissimos mollitia, quod repellendus debitis architecto nemo, voluptates exercitationem voluptate itaque ipsum?</p>
    <!-- <p class="text-xl font-normal text-gray-500/90 mb-20 w-[60rem]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam voluptates odit doloremque reiciendis aliquid, possimus nobis consequuntur. Necessitatibus, dignissimos mollitia, quod repellendus debitis architecto nemo, voluptates exercitationem voluptate itaque ipsum?</p> -->

    <div class="grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-10 py-4">

      <FeatureCard class="feature-card col-span-auto bg-gradient-pink">
        <template v-slot:top> 
          <h3 class="dark-bg m-6">Move Between Spaces</h3>
        </template>
        <template v-slot:default>
          <div class="flex flex-row items-center h-full m-6 mt-0 mb-3">
            <div>
              <p class="dark-bg">Hold a button on your mouse, then drag the mouse left or right to move to another Space with a smooth and intuitive animation which follows the movements of your hand precisely.</p>
              <p class="dark-bg">It works just like swiping left of right with 4 fingers on an Apple Trackpad.</p>
            </div>
            <!-- <div class="ml-4">
              <img src="~/assets/img/play-dark.png" alt="trackpad" class="w-20">
            </div> -->
            
          </div>
          <div class="rounded-[0px] border-[4px] m-[-4px] border-gray-50/20 min-h-[52px] flex items-center justify-center mt-5">
            <a class="text-base dark-bg text-gray-50/90 text-center underline"><span class="">See It in Action</span><span class="inline-space-[8]"/><img src="~/assets/img/play.circle@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-3.6px] contrast-200"></a>
          </div>
        </template>
        <template v-slot:expanded>
          <div class="video-wrapper">
            <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="object-cover w-full h-full">
              <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
            </video>
          </div>
        </template>
        <!-- <template v-slot:bottom>
        </template> -->
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto bg-gradient-orange">
        <template v-slot:default>
          <div class="m-6">
            <h3 class="dark-bg">Mission Control</h3>
            <p class="dark-bg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
            <a href="" class="mt-2 text-gray-100 underline">See it in action ❯</a>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto bg-gradient-blue">
        <template v-slot:default>
          <div class="m-6">
            <h3 class="dark-bg">App Exposé</h3>
            <p class="dark-bg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Show Desktop</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Launchpad</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Look Up & Data Detectors</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Move between Pages</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Mark Mails as Unread</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Scroll Freely</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Pinch to Zoom</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
      <FeatureCard class="feature-card col-span-auto">
        <template v-slot:default>
          <div class="m-6">
            <h3>Smart Zoom</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.</p>
          </div>
        </template>
        <template v-slot:expanded>
          <video id="vid1" preload="auto" playsinline loop autoplay alt="Remap Demo" class="w-full">
            <source src="~assets/video/remap_demo_old.mp4#t=0.1" type="video/mp4">
          </video>
        </template>
      </FeatureCard>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style lang="postcss" scoped>

  /* Card Content */

  .feature-card h3 { /* Not sure this abstraction is good / tailwindy. See https://tailwindcss.com/docs/reusing-styles */
    @apply text-lg font-bold;
  }
  .feature-card p {
    @apply text-gray-500/80;

    &:not(:last-child)  { /* Paragraph spacing */
      @apply mb-3
    }
  }

  .feature-card h3.dark-bg { /* Not sure this abstraction is good / tailwindy. See https://tailwindcss.com/docs/reusing-styles */
    @apply text-lg font-bold text-gray-100;
  }

  .feature-card p.dark-bg {
    @apply text-gray-100/75;
  }

  .video-wrapper { 

    /* Note: Keep the border color, width and radius in sync with the FeatureCard to make it look nice */

    @apply  grow
            rounded-[24px] border-[4px] m-[-4px] border-gray-50/25 
            overflow-clip
            flex items-center justify-center;
  }

</style>