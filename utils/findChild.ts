
export default findChildMatchingCondition

function findChildMatchingCondition(node: HTMLElement, condition: (child: HTMLElement) => Boolean): HTMLElement | null {

  // Returns `node` if `condition(node) == true`, or the first child of `node` for which `condition(child) == true`. Performs depth-first search of children (I think).

  // Return null if this node is null
  if (node == null) {
    return null
  }

  // TESTING
  console.log(`Child id is: ${node.id}, condition: ${condition(node)}, children: ${node.childNodes.length}, class: ${node.className}`)

  // Check if `node` matches condition
  if (condition(node)) {

    // TEST
    console.log(`Found child matching condition!`)


    return node
  }

  // Recurse
  for (var child of node.childNodes) {

    const recursiveChild = findChildMatchingCondition(child, condition)
    if (recursiveChild != null) {
      return recursiveChild
    }
  }

  console.log(`Couldn't find child matching conditions - going one level up`)

  // Neither `node` nor any of its children match the condition -> return `null`
  return null
}