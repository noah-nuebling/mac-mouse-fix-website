

/*

    Unused. Replaced by <StringF>
    
        At the time of writing, the differences are that 
            - The new StringF receives the 'format' string in its default slot, instead of in a 'format=...' attribute
            - If the format string contains HTML syntax, the new StringF can render the HTML nodes to the DOM!
        
        We might wanna keep this as this has detailed explanations of stuff like vue.Fragment,
            which the new <StringF> is missing.

Vue-slot based string-formatting.

    Purpose:

        This is basically a simplified, general-purpose reimplementation of vue-i18n's <i18n-t> component.

        We made this to decouple the
                key -> localizedString lookup 
            from the
                slot-based string-formatting 
            which <i18n-t> does all-in-one.
            That way we can neatly reuse our MFLocalizedString(<key>, <localizerHint>) function and pass its result to <SlotStringF>.
            Which in turn lets us easily regex the source code for MFLocalizedString() to find all localizedStringKeys used in the source code.

            Also, I guess it was fun to implement some 'low-level' Vue stuff. (And I think this API is more modular and less complicated than <i18n-t>)

    Discussion:
        If this ever makes trouble, we could go back to using <i18n-t> and creat a new, nicely regexable function MFLocalizedStringKey(<key>, <localizerHint>) 
            which just returns the key that it is passed. We could pass its return to <i18n-t> and that should work as well. 

    Functionality:

        Overview:
            Content from the slots that are passed into this component is inserted into the `format` string and then rendered into the DOM.

            This works similar to regular string-formatting (that's what StringF stands for), but instead of replacing format-specifiers with text, 
                we replace format-specifiers with anything that can go into a Vue slot. (Any HTML nodes, Vue-Components, Elements with TailwindCSS styling, etc.)
                
            This is useful for inserting HTML Nodes and Vue Components at localizer-specified places into a localized string.

        Example: 

            Usage:

                <p class='bg-blue-500'>
                    <SlotStringF format="Some text with a vue component: {vue_comppp} in the middle!">
                        <template #vue_comppp>
                            <SomeAwesomeVueComponent/>
                        </template>
                    </SlotStringF>
                </p>
            
            This would render into the DOM as:

                <p class='bg-blue-500'>
                    Some text with a vue component: [Full, reactive, render of <SomeAwesomeVueComponent>] in the middle!
                </p>
 */

import { assign } from '@intlify/shared'
import type { VNodeChild } from 'vue'
import { isVNode, Fragment } from 'vue'
import * as vue from 'vue'
import { stringf_getArray, createTextVNode, plainTextFromVueSlot } from '../utils/util';

export default defineComponent({

    // Implementation mostly copied from vue's <i18n-t> source code (GitHub: vue-i18n/packages/vue-i18n-core/src/components/Translation.ts)

    name: 'SlotStringF',
    setup(props: any, context: any): any {

        const { slots, attrs } = context

        return (): VNodeChild => {
            
            // Get format string from default slot
            //  The format string is inserted into the DOM by this component.
            //      If the format string contains {format_specifiers}, they will be replaced by the content of the slots with #names matching the format specifiers.
            const formatString = plainTextFromVueSlot(slots['default']);

            // Prepare named slots
            const namedSlotMap: { [key: string]: VNode[] } = {};
            for (const [slotName, slotRenderingFn] of Object.entries(slots)) {
                namedSlotMap[slotName] = slotRenderingFn(); // Gets an array of the VNodes in the slot.
            }
            
            // Do string formatting
            //      Note: This creates a nested array. 
            //          That's because stringf_getArray() returns an array of **string segments from the props.format string**, interspersed with **the values of the slotMap dict**. 
            //              Since the values of slotMap dict are arrays of VNodes, we get a nested array in the end.
            //          Logically, this array should be flat, since it represents an ordered list of childnodes 
            //          to insert into the root node of this component. However, the vue rendering function h() 
            //          seems to automatically flatten the array of childnodes which we pass it.
            //              Update: We do manually flatten it now for better code structure and validation.
            var childNodes = stringf_getArray(formatString, namedSlotMap);

            // Post-process childNodes
            let cleanChildNodes: any[] = [];
            for (let i = 0; i < childNodes.length; i++) {

                if (typeof childNodes[i] === 'string') {
                    // Convert string segments to VNodes
                    cleanChildNodes.push(createTextVNode(childNodes[i]));

                } else if (Array.isArray(childNodes[i])) {
                    // Flatten arrays of VNodes.
                    //      Why do we have a nested arrays of VNodes?: See notes on stringf_getArray()
                    cleanChildNodes.push(...(childNodes[i]));

                } else {
                    // Fallback case
                    console.assert(false, 'stringf: Not sure this can ever happen.').
                    cleanChildNodes.push(childNodes[i]);
                }       
            }

            // Validate
            let isAllVNodes = true;
            for (const childNode of cleanChildNodes) {
                if (!isVNode(childNode)) { isAllVNodes = false; break; }   
            }
            if (!isAllVNodes) {
                console.assert(false, `stringf: Something went wrong. Not all children are VNodes. Childnodes: ${objectDescription(cleanChildNodes)}`);
            } else {
                console.debug(`stringf: is-all-vnode-array test passed.`)
            }

            // Preprocess attrs
            //      Don't know what this does, copied from vue's <i18n-t> source code
            const assignedAttrs = assign({}, attrs);

            // Define HTML tag
            //          for rendering content into.
            //      Note: 
            //          Afaik, a 'Fragment' VNode renders its children directly into its parent. So it effectively disappears in the rendered HTML.
            let tag = Fragment;

            // Render
            //  Note: I think passing `assignedAttrs` to h() makes it so the HTML attributes (such as class="...") that the parent assigned to <SlotStringF> 
            //      are transferred to the Root HTML node that <SlotStringF> renders into the HTML DOM. Since we use a 'Fragment' VNode (as of 13.09.2024), 
            //      which doesn't render *anything* into the HTML DOM, using assignedAttrs might not do anything.
            const result: VNode = h(tag, assignedAttrs, cleanChildNodes);

            // Return
            return result;
        }
    },
});
