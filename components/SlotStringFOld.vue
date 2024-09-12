<!-- 

This is unused. Replaced by SlotStringF.ts
    This implementation was written with the help of ChatGPT and Claude and it was just hacky and bad and didn't support reactivity.
    The new implementation was written with proper Vue integration, and based on the vue i18n source code. That was kinda hard but still took less time than I spent on this.

Vue-slot based string-formatting.

    Purpose:

        This is basically a reimplementation of <i18n-t>, but instead of passing in a localizedStringKey, 
            we pass in the localizedString directly.

        We made this to decouple the
                key -> localizedString lookup 
            from the
                slot-based string-formatting 
            which <i18n-t> does all-in-one.
            That way we can neatly reuse our MFLocalizedString(<key>, <localizerHint>) function and pass its result to <SlotStringF>.
            Which in turn lets us easily regex the source code for MFLocalizedString() to find all localizedStringKeys used in the source code.

    Discussion:
        If this makes trouble we could go back to using <i18n-t> and creata a new, nicely regexable function MFLocalizedStringKey(<key>, <localizerHint>) 
            which just returns the key that it is passed. We could pass its return to <i18n-t> and that should work. 
            That approach should be much simpler than this.

    Functionality:

        Overview:
            The component renders a an html element with a specific 'tag', 'class' and an 'innerHTML' string. The innerHTML string can contain {format_specifiers} which will be replaced by the content of the vue-slots passed into the <SlotStringF> component.

        Example 1: 

            Usage:

                <SlotStringF    
                    root-tag="p" 
                    root-class="bg-blue-500" 
                    html-format="Some <strong>html<strong> text with a vue component: {vue_component_placeholder} as well!"
                >
                    <template #vue_component_placeholder>
                        <SomeAwesomeVueComponent/>
                    </template>
                </SlotStringF>
            
            This would render into the DOM as:

                <p class='bg-blue-500'>
                    Some <strong>html<strong> text with a vue component: [Full render of SomeAwesomeVueComponent] as well!
                </p>
-->


<!-- 


<template>
    <component :is="rootTag" v-html="rootInnerHTML" :class="rootClass" ref="rootElement"></component>
</template>

<script setup lang="ts">

/* Imports */
import { stringf } from '../utils/util';
import { render } from 'vue';

/* Get ref */

const rootElement = ref<HTMLElement>();

/* Define props */
const props = defineProps({
    rootTag: String,    // HTML tag of the root element
    rootClass: String,  // HTML classes of the root element
    htmlFormat: String, // innerHTML string that will be rendered and inserted into the root element. Can contain html markup and {format_specifiers}. The format specifiers will be replaced by the content of the slots passed to this component. 
});

/* Get slots */
const slots = useSlots();

/* Declare rootInnerHTML */
const rootInnerHTML = ref<string>();

onMounted(() => {

    /* Process htmlFormat 
        Replace each ```{cool_format_specifier}``` in the htmlFormat with ```<mf-slot-placeholder id="cool_format_specifier"></mf-slot-placeholder>``` 
        (Actually only if there is a slot with the name ```#cool_format_specifier```)
        (Where 'cool_format_specifier' is the slotName)
    */
    const replacements: Object = {};
    for (const slotName of Object.keys(slots)) {
        replacements[slotName] = `<mf-slot-placeholder id="${slotName}"></mf-slot-placeholder>`;
    }
    rootInnerHTML.value = stringf(props.htmlFormat!, replacements);

    /* 
    Replace <mf-slot-placeholder> elements with actual content from slots 

    Why use nextTick()?
        Above, we modify rootInnerHTML, which is bound to the innerHTML of the root element. Below we use querySelector() to find children
        of this innerHTML. We need to wait a tick for the innerHTML to render so that this works. (I think)
    */
    nextTick(() => {
        for (const [slotName, slotContent] of Object.entries(slots)) {

            // Get slot placeholder element
            const placeholder = rootElement.value!.querySelector(`mf-slot-placeholder#${slotName}`);

            // Render the slot node
            //  Note: I don't remember how I figured this out, it took hours. Not sure this is the best approach.
            const slotVNodes = slotContent!();
            console.assert(slotVNodes.length == 1, `More than 1 node found in slot #${slotName}. Don't know how to handle.`);
            const slotVNode = slotVNodes[0];
            const renderingHost = document.createElement('div');
            render(slotVNode, renderingHost);

            // Insert the slot node
            placeholder?.replaceWith(slotVNode.el);
        }
    });
})


</script> 



-->