<!-- 

  Notes:
  - On the wrapper for the "see it in action" button we had to set `min-h-[52px]` instead of h-[52px], for it to actually work. No idea why.


 -->

 <template>
  <div ref="rootElement" class="">

    <div class="flex flex-row justify-stretch flex-wrap">

      <!-- Custom UI -->
      <div class="border-[1px] border-red-500 w-[500px] h-[500px]">

      </div>

      <!-- Paddle inline checkout -->
      <div class="border-[1px] border-blue-500 w-[500px] h-[500px]">
        
      </div>

    </div>

    <!-- Bottom navigation -->
    <BottomNav color-class="accent-[default] strong:gradient-blue" downloads-badge-color="4094ff"/> <!-- Good: 2f9bff, 4798ff, 4094ff || #3b82f6 is tailwinds blue-500 color -->

  </div>
</template>

<script setup lang="ts">

// Ge† ref

var rootElement = ref<HTMLDivElement | null>(null)

// Get global store

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/store/global';
const global = useGlobalStore()
const { navbarHeight_Unexpanded } = storeToRefs(global)

// Configure page
definePageMeta({
  layout: false,
})

// Pad rootElement so that navbar doesn't overlap
watch(navbarHeight_Unexpanded, (newHeight) => {
  rootElement!.value!.style.paddingTop = `${newHeight}px`
})

</script>

<style lang="postcss" scoped>

</style>