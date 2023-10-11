
export default findChild
export { findChildren }

function findChildren(node: Node, condition: (child: Node) => Boolean): Array<Node> {

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

function findChild(node: Node, condition: (child: Node) => Boolean): Node | null {

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