  <!-- 
    Notes:
    - bg-origin-border is needed to make the border work properly with background gradient. See https://stackoverflow.com/questions/11717873/why-are-border-colors-inverted-when-a-background-gradient-is-applied
    - $attrs.class contains the classes set by the parent like this <FeatureCard class="baz boo" />
    - We're making the card a flexbox just to center the video vertically during the expand animation. Not sure this is the best solution. Also no idea why/if the video is centered horizontally, if the card has a taller aspect ratio than the card.
    - If we set margins on the slot content, that currently doesn't work properly for the default slot for some reason. The div around the default slot has the exact size of the slot content, but without the slot content's margins. This makes it so part of the slot content is cut off. I don't know what's going on. We'll just use padding instead of margins for now. Edit: This doesn't happen anymore now. I dont' know what changed. Might have to do with `space-x-0` and `space-y-0` which we removed.
    - I struggled controlling which part of the card content gets clipped / resized during the animation. It was because we couldn't get elements to shrink below their content size. Solution was setting min-h-0 and min-w-0 (for flex items) or setting overflow-clip (for block or flex items). Source: https://stackoverflow.com/a/38383437/10601702
      - However I couldn't get it to work properly with block items, so we made everything flex. But the expandedCardContent div and the other children of the `swappableContentContainer` *don't* seem to need the min-[axis]-0 to shrink properly. I have no clue why. Edit: When we switched everything to flex-col (instead of the default flex-row), we DID have to add the min-[axis]-0 for things to work. I'm lost. But hey it works.
      - We made everything flex because it works and block confuses me. The expandedCardContent div starts out with display: none (twcc `hidden`) and gets display: flex through js
      - We had to add grow for the flex items to grow beyond content size vertically (along with min-[axis]-0 to make it shrink vertically I think?). Not sure what's going on.
    - On the defaultCardContent div we had to set flex-col (default is row), otherwise things would behave super weird when trying to set margins on its child. No clue why. We're setting everything to flex col, even if we only expect the flexbox to contain one item because of this.
    
    - !We made lots of changes since we wrote the stuff above ^^^. We overhauled the animations to be transform-based and let the animations start later so they perform okay on Safari and mobile. Changed the structure to facilitate this and didn't document the decision-making. So I think most of the stuff above is irrelevant now. 
  -->

<template>
  <div
    ref="card"
    :class="['relative h-full cursor-pointer overflow-clip will-change-[transform,opacity]', $props.class]">

    <!-- Background Filter Container -->
    <div 
      ref="backgroundFilterContainer"
      :class="['h-full w-full', $props.backgroundFilterClass]">

      <!-- Border Container -->
      <div
        ref="borderContainer"
        :class="['h-full overflow-clip', $props.borderClass]">

          <!-- Content Container -->
        <div
          id="contentContainer"
          ref="contentContainer"
          :class="['h-full flex flex-col will-change-[transform,opacity]']">

          <!-- Minimize hint -->
          <div 
            ref="minimizeHint"
            class="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[10] flex flex-column items-center justify-center invisible opacity-0 transition-opacity">
            
            <p class="text-white text-center text-2xl">{{ $t('feature-card.minimize-hint') }}</p>
          </div>

          <!-- Top -->
          <div ref="topCardContent" class="flex flex-col">
            <slot name="top"/>
          </div> 

          <!-- Swap -->
          <div ref="swappableContentContainer" class="min-h-0 min-w-0
                                                      grow
                                                      flex flex-col">

            <!-- Default -->
            <div ref="defaultCardContent" id="defaultCardContent" class="min-h-0 min-w-0
                                                grow
                                                flex flex-col">
              <slot name="default"/>
            </div>

            <!-- Expanded -->
            <div ref="expandedCardContent" id="expandedCardContent" class="min-h-0 min-w-0
                                                  grow
                                                  hidden flex-col">
              <slot name="expanded"/>
            </div>
          </div>

          <!-- Bottom -->
          <div ref="bottomCardContent" class="flex flex-col">
            <slot name="bottom"/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  

</script>

<style lang="postcss" scoped>

</style>