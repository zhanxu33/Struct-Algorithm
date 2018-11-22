/**
 * 2-3树节点结构
 * @param {*} val 
 */
function TreeNode (val) {
  this.leftVal = val
  this.rightVal = null
  this.left = null
  this.mid = null
  this.right = null
}

/**
 * 2-3树构造函数
 * @param {*} arr 
 */
function Tree(arr) {
  this.tree = null
  arr.forEach(item => this.add(item))
}

/**
 * 插入元素
 */
Tree.prototype.add = function (val) {
  const newNode = new TreeNode(val)
  let cur = this.tree
  let parent = null

  if (cur === null) { this.tree = newNode; return }

  while (cur.left !== null) {
    parent = cur
    if (val < cur.leftVal) cur = cur.left
    else if (val < cur.rightVal) cur = cur.mid
    else cur = cur.right
  }

  if (cur.rightVal === null) cur.rightVal = newNode
  else if (val < cur.leftVal) {
    // ToFix
  }
}

var a = new Tree([1,9,8,3,7,4,8,2,6,4,8])
