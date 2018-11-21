
function tlr (root) {
  if (root === null) return
  console.log(root.value)
  tlr(root.left)
  tlr(root.right)
}

function ltr (root) {
  if (root === null) return
  ltr(root.left)
  console.log(root.value)
  ltr(root.right)
}

function lrt (root) {
  if (root === null) return
  lrt(root.left)
  lrt(root.right)
  console.log(root.value)
}

/**
 * 按层查找
 * @param {*} root 
 */
function byFloor (root) {
  const arr = [root]
  while (arr.length) {
    const first = arr.shift()
    console.log(first.value)
    if (first.left) arr.push(first.left)
    if (first.right) arr.push(first.right)
  }
}