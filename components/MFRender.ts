/* Unused. Use StringF instead. */

// import * as intlify from '@intlify/shared'
// import * as vue from 'vue'
// import { stringf_getArray, createTextVNode, plainTextFromVueSlot } from '../utils/util';

// export default defineComponent({

//     // Implementation mostly copied from vue's <i18n-t> source code (GitHub: vue-i18n/packages/vue-i18n-core/src/components/Translation.ts)

//     name: 'MFRender',
//     setup(props: any, context: any): any {

//         const { slots, attrs } = context

//         return () => {

//             // Guard isClient
//             //  Server doesn't support DOMParser() for some reason so we can't run this there
//             if (!import.meta.client) {
//                 return undefined;
//             }

//             // Get plaintext string from default slot
//             //  The plaintext string may contain html markup. We'll render the HTML and inser the nodes into the DOM.
//             const inputString = plainTextFromVueSlot(slots['default']);

//             // Render input string to DOM nodes.
//             //  DOMParse is not available on the server (for some reason?) that's why this whole component has to render client-only.
//             //  This is for when the text content of the default slot VNode contains HTML tags, which is the case when we use a markdown renderer inside the MFLocalizedStringNode component. 
//             //      Not sure we can have html text as the content of text vnode normally, since I think vue would normally render HTML markup passed into a slot as VNodes automatically.
//             const domParser = new DOMParser();
//             const docFormat: Document = domParser.parseFromString(inputString, 'text/html');

//             // Define helper 
//             //      Iterate HTML nodes and parse them into VNodes
//             //      Also insert content from named slots by replacing format-specifers (like e.g. `{ url }`).
//             function vNodesFromDomTree(rootNode: Node, namedSlotMap: { [key: string]: VNode[] }): VNode | VNode[] | undefined {

//                 // Client only
//                 //  Server doesn't support DOMParser() for some reason so we can't run this there
//                 if (!import.meta.client) {
//                     return undefined;
//                 }

//                 // Recurse
//                 let childVNodes: VNode[] = []
//                 if (rootNode.childNodes) {
//                     for (let i = 0; i < rootNode.childNodes.length; i++) {
//                         const n = vNodesFromDomTree(rootNode.childNodes[i]);
//                         childVNodes.push(n);
//                     }
//                 }

//                 // Render root node
//                 let result: VNode|VNode[]|undefined = undefined;
//                 const vueProps = undefined;
//                 if (rootNode.nodeName == '#text') {
//                     // Handle text nodes
//                     console.assert(childVNodes.length == 0, `Text html node had children. Need to adapt code.`) 
//                     if (rootNode.textContent) {
//                         const stringfArray: (string|VNode[])[] = stringf_getArray(rootNode.textContent, namedSlotMap);
//                         let vnodes: VNode[] = [];
//                         for (const item of stringfArray) {
//                             if (typeof item === 'string') {
//                                 vnodes.push(createTextVNode(rootNode.textContent));
//                             } else if (Array.isArray(item)) {
//                                 vnodes.push(...item);
//                             } else {
//                                 console.assert(false, 'Unexpected stuff.')
//                             }
//                         }
//                         result = vnodes;
//                     }
//                 } else if (rootNode instanceof HTMLElement) {
//                     // Handle HTML Elements
//                     console.assert((rootNode.tagName) && (rootNode.tagName === rootNode.nodeName), `Our markdown renderer outputted an HTMLElement with an unhandled nodeName: ${rootNode.nodeName}. The nodeName does not match the HTML tag which we don't expect.`);
//                     result = h(rootNode.tagName, vueProps, childVNodes);
//                 } else {
//                     console.assert(false, `Out markdown renderer outputted an unexpected node of type: ${typeof rootNode}`);
//                 }

//                 // Return
//                 return result;

//             }
            
//             let bodyChildrenAsVNodes: (VNode|undefined)[] = []
//             for (let i = 0; i < docFormat.body.childNodes.length; i++) {
                
//                 // Invoke recursive helper
//                 const nodes: undefined | VNode | VNode[] = vNodesFromDomTree(docFormat.body.childNodes[i], namedSlotMap);

//                 // Assemble childNodeArray
//                 if (!nodes) {
//                     console.assert(false, `Not sureee this can hapeenn.`);
//                 } else if (Array.isArray(nodes)) {          // Not sure this can happen, but we can handle it gracefully
//                     bodyChildrenAsVNodes.push(...nodes); 
//                 } else if (isVNode(nodes)) {
//                     bodyChildrenAsVNodes.push(nodes);
//                 } else {
//                     console.assert(false, `Weeird spooky stuff, shouldn't happen.`);
//                 }
                
//             }

//             // Return
//             const props = undefined;
//             return h(Fragment, undefined, bodyChildrenAsVNodes);

//             // Return
//             return result;
//         }
//     },
// });
