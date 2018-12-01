
function tlr (root) {
  if (root === null) return
  console.log(root.value)
  tlr(root.left)
  tlr(root.right)
}

function tlr (root) {
  let curNode = root
  const queue = []
  const res = []
  while (queue.length || curNode !== NIL) {

    while (curNode !== NIL) {
      res.push(curNode.val)
      queue.push(curNode)
      curNode = curNode.left
    }

    if (queue.length) {
      curNode = queue.pop()
      curNode = curNode.right
    }
  }
  return res
}

function ltr (root) {
  if (root === null) return
  ltr(root.left)
  console.log(root.value)
  ltr(root.right)
}

/**
 * ltr排序，非递归方式
 */
 function ltr(root) {
  let curNode = root
  const queue = []
  const res = []
  while (queue.length || curNode !== NIL) {

    while (curNode !== NIL) {
      queue.push(curNode)
      curNode = curNode.left
    }

    if (queue.length) {
      curNode = queue.pop()
      res.push(curNode.val)
      curNode = curNode.right
    }    
  }
  return res
}

function lrt (root) {
  if (root === null) return
  lrt(root.left)
  lrt(root.right)
  console.log(root.value)
}

// 非递归方式实现
function lrt (root) {
  let curNode = root
  const queue = []
  const res = []
  while (queue.length || curNode !== NIL) {

    while (curNode !== NIL) {
      curNode.isFirst = 1
      queue.push(curNode)
      curNode = curNode.left
    }

    if (queue.length) {
      curNode = queue.pop()

      if (res.isFirst === 2) {
        res.push(curNode.val)
        curNode = NIL
      }     
      if (res.isFirst === 1) {
        res.isFirst++
        queue.push(curNode)
        curNode = curNode.right
      }
    }
  }
  return res
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
