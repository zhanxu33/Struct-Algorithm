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
  this.tree = null;
  (arr || []).forEach(item => this.add(item))
}

/**
 * 插入元素
 */
Tree.prototype.add = function (val) {
  if (this.tree === null) { this.tree = new TreeNode(val); return }
  let newVal = addMerge(val, this.tree)
  let left = this.tree.left || { leftVal: null, rightVal: null }
  let mid = this.tree.mid || { leftVal: null, rightVal: null }
  let right = this.tree.right || { leftVal: null, rightVal: null}
  if (newVal !== null) {
    if (this.tree.rightVal !== null) {
      let newNode = null
      if (newVal < this.tree.leftVal) {
        newNode = new TreeNode(this.tree.leftVal)
        newNode.left = new TreeNode(newVal)
        newNode.left.left = left.leftVal
        newNode.left.right = left.rightVal

        newNode.right = new TreeNode(this.tree.rightVal)
        newNode.right.left = mid
        newNode.right.right = right
      } else if (newVal < this.tree.rightVal) {
        newNode = new TreeNode(newVal)
        newNode.left = new TreeNode(this.tree.leftVal)
        newNode.left.left = left
        newNode.left.right = mid.leftVal

        newNode.right = new TreeNode(this.tree.rightVal)
        newNode.right.left = mid.rightVal
        newNode.right.right = right
      } else {
        newNode = new TreeNode(this.tree.rightVal)
        newNode.left = new TreeNode(this.tree.leftVal)
        newNode.left.left = left
        newNode.left.right = mid

        newNode.right = new TreeNode(newVal)
        newNode.right.left = right.leftVal
        newNode.right.right = right.rightVal
      }
      this.tree = newNode
    } else {
      if (newVal < this.tree.leftVal) {
        this.tree.rightVal = this.tree.leftVal
        this.tree.leftVal = newVal
        this.tree.left = left.leftVal
        this.tree.mid = left.rightVal
      } else {
        this.tree.rightVal = newVal
        this.tree.right = right.rightVal
        this.tree.mid = right.leftVal
      }
    }
  }
}

function addMerge (val, curNode) {
  // 叶子节点
  if (curNode.left === null) {
    if (curNode.rightVal === null) {
      // 叶子节点是2节点的情况
      if (val < curNode.leftVal) {
        curNode.rightVal = curNode.leftVal
        curNode.leftVal = val
      } else {
        curNode.rightVal = val
      }
      return null
    } else {
      // 叶子节点是3节点的情况
      let center = null
      if (val < curNode.leftVal) {
        center = curNode.leftVal
        curNode.leftVal = val
      } else if (val < curNode.rightVal) {
        center = val
      } else {
        center = curNode.rightVal
        curNode.rightVal = val
      }
      curNode.leftVal = new TreeNode(curNode.leftVal)
      curNode.rightVal = new TreeNode(curNode.rightVal)
      return center
    }
  } else {
    // 非叶子节点
    if (val < curNode.leftVal) {
      let newVal = addMerge(val, curNode.left)
      if (newVal === null) return null
      if (curNode.rightVal === null) {
        curNode.rightVal = curNode.leftVal
        curNode.leftVal = newVal
        curNode.left = curNode.left.leftVal
        curNode.mid = curNode.left.rightVal
        return null
      } else {
        // 三树
        let temp = curNode.leftVal
        curNode.leftVal = new TreeNode(newVal)
        curNode.leftVal.left = curNode.left.leftVal
        curNode.leftVal.right = curNode.left.rightVal

        curNode.rightVal = new TreeNode(curNode.rightVal)
        curNode.rightVal.left = curNode.mid
        curNode.rightVal.right = curNode.right
        return temp
      }

    } else if (val < curNode.rightVal) {
      let newVal = addMerge(val, curNode.mid)
      if (newVal === null) return null
      // 三树
      curNode.leftVal = new TreeNode(curNode.leftVal)
      curNode.leftVal.left = curNode.left
      curNode.leftVal.right = curNode.mid.leftVal

      curNode.rightVal = new TreeNode(curNode.rightVal)
      curNode.rightVal.left = curNode.mid.rightVal
      curNode.rightVal.right = curNode.right
      return newVal

    } else {
      let newVal = addMerge(val, curNode.right)
      if (newVal === null) return null
      if (curNode.rightVal === null) {
        curNode.rightVal = newVal
        curNode.mid = curNode.right.leftVal
        curNode.right = curNode.right.rightVal
        return null
      } else {
        // 三树
        let temp = curNode.right
        curNode.leftVal = new TreeNode(curNode.leftVal)
        curNode.leftVal.left = curNode.left
        curNode.leftVal.right = curNode.mid

        curNode.rightVal = new TreeNode(newVal)
        curNode.rightVal.left = curNode.right.leftVal
        curNode.rightVal.right = curNode.right.rightVal
        return temp
      }
    }
  }
}

var a = new Tree([1, 2])
a.add(3)
