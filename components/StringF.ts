/*

    (SECURITY: Make sure you don't use this component with any strings from untrusted sources. Since it renders the HTML in the strings.)

    Vue-slot based string-formatting.

    Purpose:

        This is basically a simplified, improved, general-purpose reimplementation of vue-i18n's <i18n-t> component.

        We made this to decouple the
                key -> localizedString lookup 
            from the
                slot-based string-formatting 
            which <i18n-t> does all-in-one.
            That way we can neatly reuse our MFLocalizedString(<englishUIString>, <key>, <localizerHint>) function and pass its result to <StringF>.
            Which in turn lets us easily regex the source code for MFLocalizedString() to find all localizedStrings used in the source code.

            Also, I guess it was fun to implement some 'low-level' Vue stuff. (And I think this API is more modular and less complicated than <i18n-t>)

    Discussion:
        If this ever makes trouble, we could go back to using <i18n-t> and creat a new, nicely regexable function MFLocalizedStringKey(<englishUIString>, <key>, <localizerHint>) 
            which just returns the key that it is passed. We could pass its return to <i18n-t> and that should work as well. 

    Functionality:

        Overview:

            Feature 1: HTML-String Rendering:
                A format string is passed into the *default slot* of this component as plain text.
                If the format string contains <html> <tags>, those will be rendered as actual HTML structure in the DOM tree!

                In that way, this is replacement for innerHTML or v-html.
                    - The benefit over innerHTML / v-html is that we do not have to specify a root-node that the HTML string gets rendered into. <StringF> will simply render multiple root nodes, if the rendered HTML string describes multiple root nodes.
                    - <StringF> is probably somewhat slower than using v-html – but in my (minimal) benchmarking (See below) it seems very fast.

            Feature 2: HTML-String Formatting:
                Content from the *named slots* that are passed into this component is inserted into the *format string* (see above) and then rendered into the DOM.

                Overall, this works similar to regular string-formatting (that's what StringF stands for), but instead of replacing format-specifiers in the format string with simple text, 
                    we can replace format-specifiers with anything that can go into a Vue slot. (Any HTML nodes, Vue-Components, etc.) 
            
            Our use case:
                We built this, because it's useful for inserting HTML Nodes and Vue Components into a localized string. And also for rendering markdown syntax in the localized string into the DOM.

        Example 1: 

            Usage:

                <p class='bg-blue-500'>
                    <StringF>
                        {{ "Some text with a blue vue component: {vue_comppp} in the <strong>middle</strong>!" }}
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
                    {{ markdownRender(MFLocalizedStringgg(
                        `
                        Hi this **issss**
                        - Z
                        - {locale_picker}
                        - {the_aaas}
                        The future.
                        `, 
                        'some.localization.key',
                        'Some hint for the localizer'
                    )) }}

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
        - In my benchmarking, in production builds, this component always takes well under 1ms to render. 
            And since Vue heavily caches components and we also do prerendering, this will usually only run a few times when the page loads (idk why it runs at all after prerendering actually?). It will not run while the user is using the page. So it's totally fast enough without optimizations (as of September 2024, running on M1 MacBook Air, these conclusions are based on very superficial testing - don't believe them - but I do think it's fast enough.)
*/

import * as vue from 'vue'
import * as vueServerRenderer from '@vue/server-renderer'
import * as NodeHTMLParser from 'node-html-parser'
import * as intlify from '@intlify/shared'
import { stringf_getArray, createTextVNode} from '../utils/util'
import { defineNuxtComponent } from 'nuxt/app'

// Setup benchmark
let totalRenderingTime = 0;

export default defineNuxtComponent({
    
    // Set component name
    name: 'StringF',
    
    // Turn off attribute fallthrough.
    // Explanation: 
    //  Attribute fallthrough makes it so when you use <StringF SomeAttribute>, then the root HTML element that StringF renders will have `SomeAttribute`. However, Vue will fail to do this if we render multiple root nodes, and then it will print errors to the console.
    //  In case we still wanna use the attrs passed to <StringF>, we can use ctx.attrs I think.
    // Notes:
    //  - 'attribute inheritance' is also called 'attribute fallthrough' in the Vue docs (If I understood correctly.)
    inheritAttrs: false,
    
    // Define props
    props: intlify.assign({
        replacements: Object,
    }),
    
    // Define setup fn
    setup(props, ctx) {

        // Signal missing attribute fallthrough explicitly
        //      (See `inheritAttrs: false` above)
        //      (We tried to `throw new Error()` instead of console.error(), but that results in super cryptic errors.)
        if (Object.keys(ctx.attrs).filter((k) => k != 'data-v-inspector').length != 0)
            console.error(`<StringF> has attributes which would be silently swallowed instead of passed on to its child VNodes (I think). ctx.attrs: ${objectDescription(ctx.attrs)}`)


        // Get ref to current component instance
        const self = getCurrentInstance();

        // Define helper funcs
        
        function getInnerHTML(instance: vue.ComponentInternalInstance | null): string {

            // Get the HTML that the <StringF> component renders into the DOM.
            //  Notes:
            //      - This is a debug helper function
            //      - Should only work after the instance is mounted.

            // Edge cases
            if (!instance) { return '' }
            if (!instance.subTree.children) { return '' }

            // Assemble dom tree
            //      We need to do this weird stuff since the root VNode of this component is a vue.Fragment, so it renders multiple children into its parent in the DOM tree. We first need to combines these multiple dom nodes as children under one domNode to use .innerHTML effectively.
            let root = document.createElement('div');

            // Ensure that instance.subTree.children is iterable
            const children = Array.isArray(instance.subTree.children) ? instance.subTree.children : [instance.subTree.children];

            for (const child of children) {
                if (child === null || child === undefined) { continue }
                const vnode = child as VNode
                if (Object.hasOwn(vnode, 'el')) {
                    let domNode = vnode.el?.cloneNode(true); // We need to clone the node! Otherwise the node will be removed from its original parent (nodes can only have one parent.) which breaks the whole page.
                    if (domNode) {
                        root.appendChild(domNode);
                    }
                    
                }
            }

            // Get innerHTML
            const result = root.innerHTML;

            // Return
            return result;
        }

        async function getInnerHTML_Server(root: VNode): Promise<string> {
            
            //  Notes:
            //      - Same as getInnerHTML() but this should work anytime - even before mounting.

            const result = await vueServerRenderer.renderToString(root, undefined);
            return result;
        }

        // Lifecycle
        
        if (false) {
            onMounted(() => {

                // DEBUG: Print innerHTML
                const innerHTML = getInnerHTML(self);
                console.log(`<StringF> mounted with innerHTML:\n\n${innerHTML}\n`);
            })
        }   

        // Return rendering fn
        return () => {

            // Parse context
            const { attrs, slots, emit, expose } = ctx;
            
            // Get nodes from default slot
            const defaultSlotRenderer = slots['default'];
            if (defaultSlotRenderer === undefined) {
                return undefined
            }

            // Get format string from default slot
            let format: string = getPlaintextSlotContent(defaultSlotRenderer);

            // Debug Log
            if (false) console.log(`StringF - rendering format:\n\n${format}`);

            // Benchmark
            const doBenchmark = false;
            
            var tsStart = 0; // Init to silence warnings
            if (doBenchmark) tsStart = performance.now();

            // Remove indent from default slot content
            //  Notes: 
            //      This is was for when we used the 'preserve-whitespace vite complier option, which makes it so whitespace and indents of text passed into vue slots is not cleaned automatically. (See in nuxt.config.ts: ```vite: { vue: { template: { compilerOptions: { whitespace: 'preserve' } } } }```)
            //      We did that to be able to write markdown directly in the slot, but we don't need that anymore.

            if (false) 
                format = removeIndent(format);

            // Render format specifier slots
            let renderedFormatSpecifierSlots: { [slotName: string]: vue.VNode[] } = {};
            for (const [slotName, slotRenderingFn] of Object.entries(slots)) {
                if (slotName == 'default') continue; // Skip the default slot, since we handle that separately. It contains our 'format string', and the other slots, which we're handling here, contain the content we want to insert into the format string.
                if (slotRenderingFn === undefined) continue;
                // @ts-ignore
                renderedFormatSpecifierSlots[slotName] = slotRenderingFn();
            }

            // innerHTML optimization
            //  Turning this off since it's actually way slower than the unoptimized variant. (Based on my superficial benchmarks. Din't test overall page-loading times.)

            if (false) {

                // Analyze format specifier slots
                let someFormatSpecifiersAreDynamic = false;
                outerLoop: for (const [slotName, vnodes] of Object.entries(renderedFormatSpecifierSlots)) {
                    for (const vnode of vnodes) {
                        const nodeIsStatic = (vnode.type == vue.Text) || (vnode.type == vue.Comment) || (vnode.type == vue.Static)
                        if (!nodeIsStatic) {
                            someFormatSpecifiersAreDynamic = true;
                            break outerLoop;
                        }
                    }
                }

                // Function to convert non-dynamic VNodes to HTML strings
                function staticVnodeToHTMLString(vnode: vue.VNode): string {
                    if (vnode.type === vue.Text) {
                        return vnode.children ?? '';
                    } else if (vnode.type === vue.Comment) {
                        return `<!--${vnode.children}-->`;
                    } else if (vnode.type === vue.Static) {
                        // For Static nodes, `children` is already an array of strings (says ChatGPT)
                        return vnode.children ? vnode.children.join('') : '';
                    } else {
                        // If somehow a dynamic node slipped through, assert false and return an empty string.
                        console.assert(false, 'Dynamic node slipped through.');
                        return '';
                    }
                }

                // Optimize
                if (!someFormatSpecifiersAreDynamic) {

                    // Log
                    console.log(`Using static html optimization in <StringF>. (Format string: ${format})`);
                    
                    // Convert VNodes from slots to HTML strings
                    let formatSpecifierToHTMLMap: { [key: string]: string } = { };
                    for (const [slotName, vnodes] of Object.entries(renderedFormatSpecifierSlots)) {
                        formatSpecifierToHTMLMap[slotName] = vnodes.map((node) => staticVnodeToHTMLString(node)).join('');
                    }

                    // Insert the HTML strings into the format string
                    const innerHTML = stringf(format, formatSpecifierToHTMLMap);

                    console.log(`innerHTML: ${innerHTML}`);
                    
                    // Get result VNode
                    //  Use span instead of vue.Fragment since that has minimal impact on the layout? Still bad. We don't want a to force a root element, since our non-optimized code doesn't do that.
                    //
                    //  Note: Here's a vuejs GH issue with people trying to do a similar thing (render v-html without a root element): https://github.com/vuejs/vue/issues/7431 
                    //          -> They seem to be resorting to creating vnodes, which shouldn't be faster than our unoptimized approach. The point of this optimization was to get away from VNodes.
                    //
                    //  Idea: Maybe we could return a vue.Static vnode and just store the innerHTML in there?
                    //      Update: I tried that and it seems to work! However, this is actually slower than the unoptimized variant! (At least the this rendering function runs slower, maybe once it's rendered it's faster?) 
                    //                  I'm not sure why it's slower. A part might be that coolCreateStaticVNode() needs to find the number of root elements in the innerHTML string, and it does that by rendering the whole string to DOM nodes. 
                    //                  However, we also do that in the unoptimized code, so that doesn't explain why it's slower. (Keep in mind also that my testing was superficial)
                    
                    let result: VNode
                    
                    if (false) {
                        result = coolCreateStaticVNode(innerHTML, undefined);
                        result = vue.h(vue.Fragment, undefined, result);
                    } else {
                        result = h('span', { domProps:{ innerHTML: innerHTML } }); // ChatGPT says that domProps is a Vue 2 thing, not Vue 3.
                    }
                    

                    // Benchmark
                    // console.timeEnd('StringFRendering');

                    // Return
                    return  result;
                }
            }

            // Render format string to DOM nodes
            //  Notes:
            //  - We used to use the browser-native DOMParser() but switched to node-html-parser package since that also works during prerendering.
            //  - We do this whole HTML parsing in case the *format string* contains HTML tags. We want this so we can pass in the result of our markdown renderer (which returns a string with HTML tags), since we like using markdown in our localized strings.
            //          Sidenote: Not sure if this could work when we write html text into the slot directly, (instead of passing a plaintext string containing html markup) since I think vue would automatically render literal HTML markup passed into a slot as VNodes instead of a string with HTML.
            //  - Turning off lowerCaseTagName, to match @vue/server-renderer, since it outputs uppercase tagnames. Not sure it makes a difference.

            const formatAsElementTree: NodeHTMLParser.HTMLElement = NodeHTMLParser.parse(format, { lowerCaseTagName: false }); // (new DOMParser()).parseFromString(format, 'text/html');

            // Define helper 
            //      Iterate HTML nodes and parse them into VNodes
            //      Also insert content from named slots by replacing format-specifers (like e.g. `{ url }`).
            //      Explanation: Why can this return an array of VNodes? 
            //          That happens in case rootNode is a textNode with format specifiers inside the text. 
            //          This text will get split into an array along where the format specifiers start/end. 
            //          Each element in the array of strings will get turned into a text VNode, or – in case of a format specifier, 
            //          it will get replaced with the corresponding Vnode from the renderedFormatSpecifierSlots arg.
            function vNodesFromDomTree(rootNode: NodeHTMLParser.Node, renderedFormatSpecifierSlots: { [slotName: string]: vue.VNode[] }): vue.VNode | vue.VNode[] | undefined {
                
                // Render children
                let childVNodes: vue.VNode[] = []
                if (rootNode.childNodes) {
                    for (let i = 0; i < rootNode.childNodes.length; i++) {

                        // Recurse
                        const n = vNodesFromDomTree(rootNode.childNodes[i], renderedFormatSpecifierSlots);
                        
                        // Store children in array
                        if (n === undefined) {
                            // Do nothing
                        } else if (Array.isArray(n)) {
                            childVNodes.push(...n); // In case recursive call returned multiple VNodes, attach them all as children.
                        } else {
                            childVNodes.push(n);
                        }
                        
                    }
                }

                // Render parent
                let result: vue.VNode | vue.VNode[] | undefined = undefined;
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
                        
                        // Format the string
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
                    if (false) 
                        console.assert((rootNode.tagName) && (rootNode.tagName === rootNode.nodeName), `Our markdown renderer outputted an HTMLElement with an unhandled nodeName: ${rootNode.nodeName}. The nodeName does not match the HTML tag which we don't expect.`);
                    
                    // Get the HTML attributes
                    //      Discussion:
                    //      -  (Last Update: 2024) the HTML markup in the format strings we pass to <StringF> always comes from a markdown parser. The only time that this HTML contains attributes is for [the](links) I think.
                    //         Copying over the attributes might increase the potential to be hacked. We should only use `StringF` with trusted format strings or we could perhaps clean the HTML of javascript and stuff to be safe (I think there's node packages for that).
                    //      - (Last Update: Sep 2024) Using rootNode.rawTagName since the non-raw tagName is all caps. I think that works for the most part, but I saw it cause a couple strange hydration-mismatch warnings all over the project. Specifically I saw it breaks <br> tags.
                    //          It took me like 1.5 days to figure this out. I'm so relieved and happy that I finally did. Nuxt error messages are crazy. 
                    //          Here's an example of a warning that was caused by this:
                    //              ```
                    //              [Vue warn]: Hydration node mismatch:
                    //              - rendered on server: 
                    //              ""
                    //              "
                    //              - expected on client:"
                    //              Symbol(v-txt) 
                    //              ```
                    //          The only way I could figure it out in the end is by making a new nuxt project to minimally reproduce one of the hydration mismatch warnings.
                    //          (Sidenote: The rootNode.tagName being all-caps might be because we turn off `lowerCaseTagName:` on the NodeHTMLParser further up.)

                    const vueProps = rootNode.attributes;
                    const tagName = rootNode.rawTagName; 

                    // Render HTML element to VNode
                    result = vue.h(tagName, vueProps, childVNodes);
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
            //  Results: I've seen the overall time spent rendering <StringF> components during page load around 5ms - 20ms. It's more than fast enough, I think.
            if (doBenchmark) {
                const tsEnd = performance.now();
                const elapsedTime = tsEnd - tsStart;
                totalRenderingTime += elapsedTime;
                
                // Log Benchmark
                console.log(`StringFRendering: ${elapsedTime.toFixed(2)} ms, total StringF rendering time: ${totalRenderingTime.toFixed(2)} ms`);
            }

            // Log
            if (false) {
                getInnerHTML_Server(result).then((innerHTML) => {
                    console.log(`<StringF> rendered VNodes with server-rendered innerHTML:\n\n${innerHTML}\n`);
                });
            }   

            // Return
            return result;
        }


    }
})
function getPlaintextSlotContent(slotGetterFn: () => vue.VNode[]): string {

     // Note: This function is a duplicate of util.plainTextFromVueSlot(). Should probably unify.

    // Get VNodes from slot.
    var slotNodes: vue.VNode[] = slotGetterFn();

    // Strip <!-- comment --> nodes
    slotNodes = slotNodes.filter((node) => node.type != vue.Comment)

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
            //      -> Probably best if we only put *text* VNodes into the default slot of <StringF>, so that this case is never hit.
            
            console.assert(false, `Found sth other than a text-VNode in the default slot. (type: ${String(slotNodes[i].type)}). Not sure we can parse that into a format string.`)
            
            const domElement = slotNodes[i].el
            if (domElement && domElement instanceof Element) {
                result += domElement.innerHTML
            } else {
                console.assert(false, `Not sure this can happen. Reviewwww the code.`)
            }
        }
    }

    // Strip leading/trailling whitespace
    //      [Mar 2025] Saw trailling space sometimes when putting format slots after the default slot using <template #abc>. Not sure why.
    result = result.trim()

    // Return
    return result
}



/* 
---------
OLD STUFF 
---------
*/

// coolCreateStaticVNode

import * as vueCompilerDom from "@vue/compiler-dom"

if (false) {

    function coolCreateStaticVNode(innerHTML: string, rootNodeCount?: number): vue.VNode {
        
        if (rootNodeCount === undefined) {
            if (false) {
                const mode = (import.meta.client && false) ? 'module' : 'function'
                rootNodeCount = vueCompilerDom.compile(innerHTML, { mode: mode, whitespace: 'condense' }).ast.children.length; // Not sure how fast this is.
            } else {
                rootNodeCount = NodeHTMLParser.parse(innerHTML).childNodes.length; // I think this is abit faster than vueCompilerDom, but still not great.
            }
        }
        const result = vue.createStaticVNode(innerHTML, rootNodeCount);

        console.log(`Created static Vnode with children: ${result.children}, childCount: ${rootNodeCount}`);

        return result;
    }

    
}

// MFLocalizedStringNode
//      This was supposed to be a replacement for ```{{ mdRender(MFLocalizedString()) }}``` (which we'd pass into the default slot of <StringF> as a format string.)
//      The goal was to let us write multiline uiStrings more easily, by writing the UIStrings directly into the components slot, instead of wrapping the UIStrings in a {{ "js string" }} and passing that into the slot.
//      But then I remembered, that we can just use `template-literals` to nicely write a multiline string literal and pass it to the MFLocalizedString() js function instead.
//      Also using this requires us to disable whitespace stripping in the vite compiler settings, which lead to weird warnings in the browser console. 
//      So using {{ MFLocalizedStringggg() }} is just better.


if (false) {    
    
    const MFLocalizedStringNode = defineNuxtComponent({

        name: 'MFLocalizedStringNode',
        props: assign({
            key: String,
            comment: String,
            markdown: Boolean,
        }),
        setup(props, ctx) {

            const { $coolI18n: { _localizedString, mdRenderer } } = useNuxtApp();
            const { attrs, slots, emit, expose } = ctx;

            return () => {

                // Guard
                if (!props.key) { return undefined; }

                // Get localized string
                let localizedString = _localizedString(props.key);

                // Validate?
                //  The default slot content should match the _localizedString for the development language. Maybe we could assert this here?
                
                // Render markdown
                if (props.markdown) {
                    localizedString = mdRenderer.render(localizedString);
                }

                // Create VNode
                const vnode = createTextVNode(localizedString);

                // Return
                return vnode;
            }
        }
    });
}