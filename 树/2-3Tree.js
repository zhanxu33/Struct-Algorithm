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
  if (newVal !== null) {
    const topNode = new TreeNode(newVal)
    topNode.left = this.tree.leftVal
    topNode.right = this.tree.rightVal
    this.tree = topNode
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
        curNode.mid = curNode.left.rightVal
        curNode.left = curNode.left.leftVal
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
        let temp = curNode.rightVal
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

/**
 * 排序，递归中序遍历
 */
Tree.prototype.sort = function(curNode = this.tree) {
  let res = []
  if (curNode.left === null) {
    // 叶子节点
    res.push(curNode.leftVal)
    if (curNode.rightVal !== null) res.push(curNode.rightVal)
  } else if (curNode.rightVal !== null) {
    // 三树
    res = res.concat(this.sort(curNode.left))
    res.push(curNode.leftVal)
    res = res.concat(this.sort(curNode.mid))
    res.push(curNode.rightVal)
    res = res.concat(this.sort(curNode.right))
  } else {
    // 2树
    res = res.concat(this.sort(curNode.left))
    res.push(curNode.leftVal)
    res = res.concat(this.sort(curNode.right))
  }
  return res
}

/**
 * 查找
 */
Tree.prototype.find = function(val) {
  let curNode = this.tree
  while(curNode !== null) {
    if (val === curNode.leftVal || val === curNode.rightVal) return curNode
    if (val < curNode.leftVal) curNode = curNode.left
    else if (val < curNode.rightVal) curNode = curNode.mid
    else curNode = curNode.right
  }
  return false
}

/**
 * 删除节点
 */
Tree.prototype.delete = function(val) {
  let deleteVal = val
  let parent = null
  let curNode = this.tree
  while(curNode !== null && deleteVal !== curNode.leftVal && deleteVal !== curNode.rightVal) {
    parent = curNode
    if (deleteVal < curNode.leftVal) curNode = curNode.left
    else if (deleteVal < curNode.rightVal) curNode = curNode.mid
    else curNode = curNode.right
  }
  if (curNode === null) return false

  // 叶子节点的时候，需要将
  if (curNode.left !== null) {
    let minNode = curNode.right
    let pMinNode = curNode
    while (minNode.left !== null) {
      pMinNode = minNode
      minNode = minNode.left
    }
    if (deleteVal === curNode.leftVal) curNode.leftVal = minNode.leftVal
    else if (deleteVal === curNode.rightVal) curNode.rightVal = minNode.leftVal

    deleteVal = minNode.leftVal
    parent = pMinNode
    curNode = minNode
  }
}
