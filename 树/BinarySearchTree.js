/**
 * 二叉查找树，节点
 * @param {*} val 
 */
function BinaryNode (val) {
  this.val = val
  this.left = null
  this.right = null
}

/**
 * 二叉查找树构造函数
 * @param {*} arr 传入的数组
 */
function BinarySearchTree (arr) {
  this.tree = null;
  (arr || []).forEach((item) => {
    this.add(item)
  })
}

BinarySearchTree.prototype.add = function (val) {
  const newNode = new BinaryNode(val)
  if (this.tree === null) {
    this.tree = newNode
    return
  }
  let curNode = this.tree
  while (curNode !== null) {
    if (curNode.val <= val) {
      if (curNode.right === null) {
        curNode.right = newNode
        return
      }
      curNode = curNode.right
    } else {
      if (curNode.left === null) {
        curNode.left = newNode
        return
      }
      curNode = curNode.left
    }
  }
}

BinarySearchTree.prototype.find = function (val) {
  const res = []
  let curNode = this.tree
  while (curNode !== null) {
    if (curNode.val <= val) {
      if (curNode.val === val) {
        res.push(curNode)
      }
      curNode = curNode.right
    } else {
      curNode = curNode.left
    }
  }
  return res
}

// 每次只删一个节点
BinarySearchTree.prototype.delete = function (val) {
  let pNode = null
  let curNode = this.tree
  while (curNode !== null && curNode.val !== val) {
    pNode = curNode
    if (val > curNode.val) curNode = curNode.right
    else curNode = curNode.left
  }
  if (curNode === null) return false

  // 有2个子节点
  if (curNode.left !== null && curNode.right !== null) {
    let parent = curNode
    let cur = curNode.right
    while (cur.left !== null) {
      parent = cur
      cur = cur.left
    }
    pNode.val = cur.val
    pNode = parent // 用于后面的删除
    curNode = cur
  }

  var temp = null
  if (curNode.left !== null) temp = curNode.left
  else if (curNode.right !== null) temp = curNode.right
  else temp = null

  if (pNode === null) this.tree = temp
  else if (pNode.left === curNode) pNode.left = temp
  else pNode.right = temp
}

// 二叉树搜索树线性排序 O(n)
BinarySearchTree.prototype.LTR = function (node = this.tree) {
  if (node === null) return
  this.LTR(node.left)
  console.log(node.val)
  this.LTR(node.right)
}
