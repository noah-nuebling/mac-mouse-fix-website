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

  </div>
</template>

<script setup lang="ts">

var rootElement = ref<HTMLDivElement | null>(null)

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '~/store/global';
const global = useGlobalStore()
const { navbarHeight_Unexpanded } = storeToRefs(global)

// Pad rootElement so that navbar doesn't overlap
watch(navbarHeight_Unexpanded, (newHeight) => {
  rootElement!.value!.style.paddingTop = `${newHeight}px`
})

</script>

<style lang="postcss" scoped>

</style>