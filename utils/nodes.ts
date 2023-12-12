
export { findChild, findChildren, offsetBetween }

function offsetBetween(child: HTMLElement, parent: HTMLElement) {

  var top = 0
  var left = 0
  var right = 0
  var bottom = 0

  // var node = child

  // while (true) {

  //   offsetTop += node.offsetTop
  //   offsetLeft += node.offsetLeft
  //   offsetRight += node.offsetParent.
  //   node = node.offsetParent as HTMLElement // Why is this cast necessary? Hacks.

  //   if (node == null) { 
  //     console.assert(`Trying to get offset between element A: ${child} and B: ${parent}, but B is not part of the offsetParents/grandparents of A.`)
  //     break
  //   }
  //   if (node == parent) { break }
  // }

  const rChild = child.getBoundingClientRect()
  const rParent = parent.getBoundingClientRect()
  top     = rChild.top      - rParent.top
  left    = rChild.left     - rParent.left
  right   = rParent.right   - rChild.right  
  bottom  = rParent.bottom  - rChild.bottom

  return { top: top, left: left, right: right, bottom: bottom }

}

function findChildren(node: Node, condition: (child: Node) => boolean): Array<Node> {

  // Return empty list if this node is null
  if (node == null) {
    return []
  }

  // Declare result list
  var result: Array<Node> = []

  // Add `node` to list, if it matches the condition
  if (condition(node)) {    
    result.push(node)
  }

  // Recurse
  for (var child of node.childNodes) {
    const childrenMatchingCondition = findChildren(child, condition)
    result.push(...childrenMatchingCondition)
  }

  // Return
  return result
}

function findChild(node: Node, condition: (child: Node) => boolean): Node | null {

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
    const childMatchingCondition = findChild(child, condition)
    if (childMatchingCondition != null) {
      return childMatchingCondition
    }
  }

  // Neither `node` nor any of its children match the condition -> return `null`
  return null
}