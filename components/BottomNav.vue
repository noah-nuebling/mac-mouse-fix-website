<template>
  <div>
    <div :class="['relative h-[50vh] flex justify-center', colorClass ?? '']">
      <div class="w-fit h-full flex flex-col justify-center items-center gap-[0.9rem] !text-[1.0rem]">
        
        <!-- Credits -->
        <p v-html="$mt('footer.credits')" class=" strong:font-[600] strong:text-gradient-to-l  strong:filter strong:brightness-[1.05]"></p>
        <div class="sm:w-[100%] w-[200%] h-[1px] !bg-neutral-900/[0.0] bg-gradient-to-r from-transparent via-neutral-900/[0.1] to-transparent"/>

        <!-- Downloads -->
        <div class="whitespace-nowrap overflow-none border-0 py-[0.0rem] px-[0rem] mx-[0rem] rounded-[0.5rem] bg-white/[0] border-neutral-900/[0.9] border-1">
          <i18n-t tag="p" keypath="footer.thankyou" class="inline-block">
            <template #dwn> 
              <img :src="`https://img.shields.io/github/downloads/noah-nuebling/mac-mouse-fix/total?label=&link=https%3A%2F%2Fgithub.com%2Fnoah-nuebling%2Fmac-mouse-fix%2Freleases&color=${downloadsBadgeColor}`" class="inline-block mx-[.25em] translate-y-[-0.1em] my-[-99rem] min-w-[34px] brightness-[1]">
            </template>
          </i18n-t>
        </div>
        <div class="sm:w-[100%] w-[200%] h-[1px] !bg-neutral-900/[0.0] bg-gradient-to-r from-transparent via-neutral-900/[0.1] to-transparent"/>

        <!-- 
        Locale Picker
        Notes: 
        - I can't seem to give this a blue accent under the arrow like the native system buttons. This should be default look for <select> buttons. See https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select. But the current look is good enough for Chrome and Safari.
        -->
        <div class="text-[1.0em]">
          <select ref="localePicker" @change="handleLocaleSelect" class="cool-select "> 
            <option v-for="$loc in $i18n.locales" :value="$loc.code"> {{ $loc.name }}</option> 
        </select>

        </div>

      </div>

    </div>  
  </div>
</template>

<script setup lang="ts">

/* Props */

defineProps({
  downloadsBadgeColor: {
    type: String,
    default: '25c65f',
  },
  colorClass: {
    type: String,
    default: 'accent-[#00b551] strong:gradient-green',
  }
})

/* Import markdown translate */
const $mt = useMT()

/* Import i18n stuff
Note: Why can't we use $i18n in ts like we do in html? */

const i18n = useI18n() 
const localePicker = ref<HTMLSelectElement|null>(null)

/* Set initial locale picker selection
    Note: We tried to use v-bind/: and v-model, but neither of them worked */

onMounted(() => {
  localePicker.value!.value = i18n.locale.value
});

/* React to user selecting a new locale */
  
function handleLocaleSelect(event: Event) {
  const select = event.target as HTMLSelectElement
  i18n.setLocale(select.value);
}

</script>

<style scoped>

.cool-select {

  /* 
  This button looks weirdddd on macOS Safari. Idk why. `appearance: button` seems to render <select> elements nicely in a codepen, but here's it renders this weird iOS 6 button. 
  The rounded and outline stuff applies on Chrome. Not sure what happens on mobile Safari, but it looks okay. 
  Update: Found a solution! See below. 
  */

  appearance: button;

  /* The following 4 styles are set inside tailwind.css @base with the selector `*, ::before, ::after`. Not sure why. But these styles break the system button styles. By reverting them all, the system button styles work properly. */
  box-sizing: revert;
  border-width: revert;
  border-style: revert;
  border-color: revert;
}

</style>