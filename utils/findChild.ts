
export default findChildMatchingCondition

function findChildMatchingCondition(node: HTMLElement, condition: (child: HTMLElement) => Boolean): HTMLElement | null {

  // Returns `node` if `condition(node) == true`, or the first child of `node` for which `condition(child) == true`. Returns null if it can't find any node matching the `condition`. Performs depth-first search of children (I think).

  // Return null if this node is null
  if (node == null) {
    return null
  }

  // Return `node` if it matches the condition
  if (condition(node)) {    
    return node
  }

  // Recurse
  for (var child of node.childNodes) {
    const childMatchingCondition = findChildMatchingCondition(child, condition)
    if (childMatchingCondition != null) {
      return childMatchingCondition
    }
  }

  // Neither `node` nor any of its children match the condition -> return `null`
  return null
}