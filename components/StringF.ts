/*

    Vue-slot based string-formatting.

    Purpose:

        This is basically a simplified, improved, general-purpose reimplementation of vue-i18n's <i18n-t> component.

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
            Content from the slots that are passed into this component is inserted into the *format string* and then rendered into the DOM. 
                The format string is passed into the default slot as plain text. If the format string contains <html> <tags>, those will be rendered as well!

            Overall, this works similar to regular string-formatting (that's what StringF stands for), but instead of replacing format-specifiers in the format string with simple text, 
                we can replace format-specifiers with anything that can go into a Vue slot. (Any HTML nodes, Vue-Components, Elements with TailwindCSS styling, etc.) Also the format string 
                can contain HTML syntax which will be rendered into the DOM.
                
            This is useful for inserting HTML Nodes and Vue Components into a localized string. And also for rendering markdown in the localized string.

        Example 1: 

            Usage:

                <p class='bg-blue-500'>
                    <StringF>
                        {{ "Some text with a vue component: {vue_comppp} in the <strong>middle</strong>!" }}
                        <template #vue_comppp>
                            <SomeAwesomeVueComponent/>
                        </template>
                    </StringF>
                </p>
            
            This would render into the DOM as:

                <p class='bg-blue-500'>
                    Some text with a vue component: [Full, reactive, render of <SomeAwesomeVueComponent>] in the <strong>middle</strong>!
                </p>
        Example 2: 

            Usage: 

                <StringF>
                    {{ mdRender(MFLocalizedString('some.localization.key', 'Some hint for the localizer', `
                        Hi this **issss**
                        - Z
                        - {locale_picker}
                        - {the_aaas}
                        The future.
                    `)) }}

                    <template #locale_picker> 
                        <LocalePicker/>
                    </template>
                    <template #the_aaas> 
                        AAA 
                    </template>
                </StringF>
            
            Which should render to this in the DOM:

                <p>Hi this <strong>issss</strong></p>
                <ul>
                    <li>Z</li>
                    <li>[Full, reactive, render of <LocalePicker> component]</li>
                    <li>AAA</li>
                </ul>
                <p>The future.</p>

                (-> And in other languages it would render to the appropriate translation.)
    
    Performance:
        - In my benchmarking, in production builds, this componentn always takes well under 1ms to render. 
            And since Vue heavily caches components and we also do prerendering, this will usually only run a few times when the page loads (idk why it runs at all after prerendering actually?). It will not run while the user is using the page. So it's totally fast enough without optimizations (as of September 2024, running on M1 MacBook Air)
*/

import * as NodeHTMLParser from 'node-html-parser'
import * as vue from 'vue'
import * as intlify from '@intlify/shared'
import { stringf_getArray, createTextVNode, removeIndent } from '../utils/util'
import { defineNuxtComponent } from 'nuxt/app'

export default defineNuxtComponent({
    name: 'StringF',
    props: intlify.assign({
        replacements: Object,
    }),
    setup(props, ctx) {

        return () => {

            // Benchmark
            console.time('StringFRendering');

            // Parse context
            const { attrs, slots, emit, expose } = ctx;
            
            // Get nodes from default slot
            const defaultSlotRenderer = slots['default'];
            if (defaultSlotRenderer === undefined) {
                return undefined
            }

            // Get format string from default slot
            let format: string = getPlaintextSlotContent(defaultSlotRenderer);

            // Remove indent from default slot content
            //  Notes: 
            //      This is was for when we used the 'preserve-whitespace vite complier option, which makes it so whitespace and indents of text passed into vue slots is not cleaned automatically. (See in nuxt.config.ts: ```vite: { vue: { template: { compilerOptions: { whitespace: 'preserve' } } } }```)
            //      We did that to be able to write markdown directly in the slot, but we don't need that anymore.
            // format = removeIndent(format);

            // Render format string to DOM nodes
            //  Notes:
            //  - We used to use the browser-native DOMParser() but switched to node-html-parser package since that also works during prerendering.
            //  - We do this whole HTML parsing in case the *format string* contains HTML tags. We want this so we can pass in the result of our markdown renderer (which returns a string with HTML tags), since we like using markdown in our localized strings.
            //          Sidenote: Not sure if this could work when we write html text into the slot directly, (instead of passing a plaintext string containing html markup) since I think vue would automatically render literal HTML markup passed into a slot as VNodes instead of a string with HTML.

            const formatAsElementTree: NodeHTMLParser.HTMLElement = NodeHTMLParser.parse(format, {}); // (new DOMParser()).parseFromString(format, 'text/html');

            // Render other slots
            let renderedFormatSpecifierSlots: { [slotName: string]: vue.VNode[] } = {};
            for (const [slotName, slotRenderingFn] of Object.entries(slots)) {
                if (slotName == 'default') continue; // Skip the default slot, since we handle that separately. It contains our 'format string', and the other slots, which we're handling here, contain the content we want to insert into the format string.
                if (slotRenderingFn === undefined) continue;
                // @ts-ignore
                renderedFormatSpecifierSlots[slotName] = slotRenderingFn();
            }

            // Define helper 
            //      Iterate HTML nodes and parse them into VNodes
            //      Also insert content from named slots by replacing format-specifers (like e.g. `{ url }`).
            function vNodesFromDomTree(rootNode: NodeHTMLParser.Node, renderedFormatSpecifierSlots: { [slotName: string]: vue.VNode[] }): vue.VNode | vue.VNode[] | undefined {
                
                // Render children
                let childVNodes: vue.VNode[] = []
                if (rootNode.childNodes) {
                    for (let i = 0; i < rootNode.childNodes.length; i++) {

                        // Recurse
                        const n = vNodesFromDomTree(rootNode.childNodes[i], renderedFormatSpecifierSlots);
                        
                        // Store in child array
                        if (n === undefined) {

                        } else if (Array.isArray(n)) {
                            childVNodes.push(...n);
                        } else {
                            childVNodes.push(n);
                        }
                        
                    }
                }

                // Render parent
                let result: vue.VNode | vue.VNode[] | undefined = undefined;
                const vueProps = undefined;
                if (rootNode instanceof NodeHTMLParser.TextNode) {
                    // Render HTML Text node to VNode

                    // Validate
                    console.assert(childVNodes.length == 0, `Text html node unexpectedly had children. Need to adapt code.`) ;
                    
                    // Get node text
                    //      Note: There are different ways to get the node text. This SO post says .data is the best one: https://stackoverflow.com/a/12287159/10601702. 
                    //              Update: Now using html-node-parser instead of native Node, so switched over to ._rawText, which should be the same thing.
                    // @ts-ignore
                    const nodeText = rootNode._rawText;

                    if (!nodeText) {
                        // Do nothing if there's no text in the textNode.

                    } else {
                        
                        // Format the strin
                        //      Note: The `#slotNames`s of the rendered slots need to match with `{ format_specifiers }` inside the text content - then stringf_getArray() will replace the { format_specifier } with the rendered VNodes from the slot. If feel like this is a bit confusing/obfuscated.
                        const stringfArray: (string | vue.VNode[])[] = stringf_getArray(nodeText, renderedFormatSpecifierSlots);
                        
                        // Compile the stringf array to VNodes
                        let vnodes: vue.VNode[] = [];
                        for (const item of stringfArray) {
                            if (typeof item === 'string') {
                                vnodes.push(createTextVNode(item));
                            } else if (Array.isArray(item)) {
                                vnodes.push(...item); // Flatten-out VNode arrays. (Each array is the contents of a slot.)
                            } else {
                                console.assert(false, 'Unexpected stuff.')
                            }
                        }

                        // Assign result
                        result = vnodes;
                    }
                } else if (rootNode instanceof NodeHTMLParser.HTMLElement) {
                    
                    // Validate
                    //      This validation doesn't make sense after moving from DOMParser -> node-html-parser.
                    if (false) {  console.assert((rootNode.tagName) && (rootNode.tagName === rootNode.nodeName), `Our markdown renderer outputted an HTMLElement with an unhandled nodeName: ${rootNode.nodeName}. The nodeName does not match the HTML tag which we don't expect.`); }
                    
                    // Render HTML element to VNode
                    result = vue.h(rootNode.tagName, vueProps, childVNodes);
                } else {
                    console.assert(false, `Found node of unexpected type: ${typeof rootNode}`);
                }

                // Return
                return result;

            }
            
            let formatTreeChildrenAsVNodes: (vue.VNode|undefined)[] = [];
            for (let i = 0; i < formatAsElementTree.childNodes.length; i++) {
                
                // Invoke recursive helper
                const nodes: undefined | vue.VNode | vue.VNode[] = vNodesFromDomTree(formatAsElementTree.childNodes[i], renderedFormatSpecifierSlots);

                // Assemble childNodeArray
                if (!nodes) {
                    console.assert(false, `Not sureee this can hapeenn.`);
                } else if (Array.isArray(nodes)) {          // Not sure this can happen, but we can handle it gracefully
                    formatTreeChildrenAsVNodes.push(...nodes); 
                } else if (vue.isVNode(nodes)) {            // Default case that we expect.
                    formatTreeChildrenAsVNodes.push(nodes);
                } else {
                    console.assert(false, `Weeird spooky stuff, shouldn't happen.`);
                }
                
            }

            // Get result
            const props = undefined;
            const result = vue.h(vue.Fragment, props, formatTreeChildrenAsVNodes); // vue.Fragment explanation: https://v3-migration.vuejs.org/new/fragments.html

            // Benchmark
            console.timeEnd('StringFRendering');

            // Return
            return result;
        }
    }
})
function getPlaintextSlotContent(slotGetterFn: () => vue.VNode[]): string {

     // Note: This function is a duplicate of util.plainTextFromVueSlot(). Should probably unify.

    // Get VNodes from slot.
    const slotNodes: vue.VNode[] = slotGetterFn();

    // Validate
    console.assert(Array.isArray(slotNodes));
    console.assert(slotNodes.length > 0);
    console.assert(slotNodes.length == 1);

    // Assemble result
    let result: string = ""
    for (let i = 0; i < slotNodes.length; i++) {
        if (slotNodes[i].type == vue.Text) { // `Text` weirdly shows up as `Symbol('v-txt')` in the debugger. 
            // Get content from text VNodes
            const childrenStr = slotNodes[i].children // For text VNodes, I saw that .el is null, but .children is actually a string with the text content. I think .el is only available after onMount().
            console.assert(typeof childrenStr === 'string')
            result += childrenStr
        } else {

            // Get content from DOM
            //  - I think this doesn't work during initial invocation of the render function since the DOM nodes are only created after the 'onMount()' event. ('mounting' means the creation of DOM node tree from VNode tree.)
            //      -> Probably best if we only put *text* VNodes into the default slot, so that this case is never hit.
            console.assert(false, `Found sth other than a text-VNode in the default slot. (type: ${String(slotNodes[i].type)}). Not sure we can parse that into a format string.`)
            const domElement = slotNodes[i].el // 
            if (domElement && domElement instanceof Element) {
                result += domElement.innerHTML
            } else {
                console.assert(false, `Not sure this can happen. Reviewwww the code.`)
            }
        }
    }

    // Return
    return result
}



/* 
---------
OLD STUFF 
---------
*/


// MFLocalizedStringNode
//      This was supposed to be a replacement for ```{{ mdRender(MFLocalizedString()) }}```
//      that lets us write multiline uiStrings more easily. 
//      But we can just use `template-literals` to nicely write a multiline string literal and pass it to the MFLocalizedString() js function instead.
//      Also using this requires us to disable whitespace stripping in the vite compiler settings, which lead to weird warnings in the browser console. 
//      So using {{ MFLoclizedString() }} is just better.

// const MFLocalizedStringNode = defineNuxtComponent({

//     name: 'MFLocalizedStringNode',
//     props: assign({
//         key: String,
//         comment: String,
//         markdown: Boolean,
//     }),
//     setup(props, ctx) {

//         const { $coolI18n: { _localizedString, mdRenderer } } = useNuxtApp();
//         const { attrs, slots, emit, expose } = ctx;

//         return () => {

//             // Guard
//             if (!props.key) { return undefined; }

//             // Get localized string
//             let localizedString = _localizedString(props.key);

//             // Validate?
//             //  The default slot content should match the _localizedString for the development language. Maybe we could assert this here?
            
//             // Render markdown
//             if (props.markdown) {
//                 localizedString = mdRenderer.render(localizedString);
//             }

//             // Create VNode
//             const vnode = createTextVNode(localizedString);

//             // Return
//             return vnode;
//         }
//     }
// });