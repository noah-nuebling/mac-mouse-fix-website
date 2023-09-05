<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

<template>
  <div>

    <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-0 mt-20 text-gray-800">Macs Are Best<br>With a <span class="text-gradient-blue">Trackpad</span>.<br>…Right?</h2>
    <i18n path="trackpad-features.title" tag="h2">
      <template v-slot:0>
        {{ $t('trackpad-features.title.0') }}
      </template>
    </i18n>
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Trackpad</span>-like Gestures.</h2> -->
    <p class="text-[1.5rem] leading-[1.5] font-medium text-gray-500/80 mb-[5rem] mt-[5rem] w-max-[60rem]">
      Mac Mouse Fix brings all the functions of an official Apple Trackpad to your third-party mouse.*<br>And all the interactions feel just as effortless, responsive, smooth, and polished as they do on the Trackpad.
    </p>
    <!-- <p class="text-xl font-normal text-gray-500/90 mb-20 w-[60rem]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam voluptates odit doloremque reiciendis aliquid, possimus nobis consequuntur. Necessitatibus, dignissimos mollitia, quod repellendus debitis architecto nemo, voluptates exercitationem voluptate itaque ipsum?</p> -->

    <!-- <hr class="border-gray-700/10 border-[2px] mt-[-1rem] mb-5"> -->

    <div class="bg-gray-200/50 rounded-[16px] px-3 pt-3 pb-3 mb-6 shadow-sm-inset">
      <p class="text-normal text-center font-normal text-gray-500/70 mb-1 mt-0 w-max-[60rem]">Explore the range of Trackpad functionalities which Mac Mouse Fix brings to your mouse in the cards below.*</p>
      <p class="text-normal text-center font-normal text-gray-500/70 mb-0 mt-0 w-max-[60rem]">Click any card for a video demo.</p>
      <!-- <hr class="border-gray-400/20 border-[1px] mb-0 mt-0 -mx-3"> -->
    </div>
    <div class="">
      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-4">

        <FeatureCard ref="moveSpacesCard" class="feature-card col-span-auto bg-gradient-pink shadow-md shadow-red-900/30 cursor-pointer group" @click="$refs.moveSpacesCard.expand()">
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
            <div class="rounded-[0px] border-[4px] m-[-4px] border-gray-50/20 min-h-[52px] flex items-center justify-center mt-5 cursor-pointer group-hover:underline">
              <a class="text-base dark-bg text-gray-50/90 text-center"><span class="">See It in Action</span><span class="inline-space-[8]"/><img src="~/assets/img/play.circle@2x.png" alt="Play Video Icon" class="ml-[0px] inline h-[1.16rem] align-[-3.6px] contrast-200"></a>
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
        <FeatureCard class="feature-card col-span-auto bg-gradient-orange shadow-md shadow-orange-900/30">
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
        <FeatureCard class="feature-card col-span-auto bg-gradient-blue shadow-md shadow-blue-900/40">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
        <FeatureCard class="feature-card col-span-auto bg-white">
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
    <p class="text-xl text-center text-xs text-gray-500/70 mb-7 mt-10 w-max-[60rem]">* Mac Mouse Fix can only bring all of the Trackpad-features to your third-party mouse in the way described, if your mouse has at least 5 buttons which are recognized by Mac Mouse Fix. If Mac Mouse Fix recognizes less than 5 buttons on your mouse, Mac Mouse Fix will still work great with it and and you can even still use all of these Trackpad features listed here from your mouse, but you will have to set them up in a different - arguably less intuitive - way.</p>

    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">Make Your Mouse Do<br>Anything You Can <span class="text-gradient-orange">Think </span>of.<br>As Fast as You Can Think of It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-orange">Think </span>It.<br>Then Make Your Mouse Do It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It. <span class="text-gradient-green-yellow">Click</span> It.<span class="text-gradient-orange"> Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-blue">Think </span>It.<br> <span class="text-gradient-green-yellow">Click</span> It.<br><span class="text-gradient-orange">Do</span> It.</h2> -->
    <!-- <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800">As <span class="text-gradient-green-yellow">Flexible</span> as Your Mind.<br>As <span class="text-gradient-orange">Fast</span> As You Can Think.</h2> -->
    <h2 class="xl:text-7xl md:text-6xl text-5xl font-bold tracking-tight mb-20 mt-20 text-gray-800"><span class="text-gradient-green-yellow">Think</span> it?<br><span class="text-gradient-orange">Do</span> it.</h2>
    
    <p class="text-2xl font-medium text-gray-500/80 mb-20 w-max-[60rem]">Mac Mouse Fix's incredibly intuitive, yet remarkably flexible UI lets you set up your mouse exactly how you want it in seconds.</p>

  </div>
</template>

<script setup lang="ts">

</script>

<style lang="postcss">

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
/* 
  .ass-shadow {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)
  }

  .ass-low-shadow {
    box-shadow: 0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)
  } */

  .orange-shadow { /* Unused now. Remove */
    box-shadow: 0px 2px 4px 0px rgba(71, 30, 0, 0.3),0px 4px 16px 0px rgba(145, 60, 1, 0.3),0px 8px 32px 0px rgba(145, 60, 1, 0.3);
  }

</style>