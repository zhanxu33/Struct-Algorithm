/**
 * 红黑树应该满足的条件：
 * 1.根节点是黑色的
 * 2.根节点到所有叶子节点的黑色节点的和相同
 * 3.不能有2个红色节点相连
 * 4.叶子节点都是黑色空节点
 */

/**
 * 红黑树节点数据结构
 */
function TreeNode(val) {
  this.val = val
  this.left = NIL
  this.right = NIL
  this.color = 'red'
}

// 黑色哨兵节点
const NIL = {
  val: null,
  left: null,
  right: null,
  color: 'black'
}

/**
 * 红黑树构造函数
 * @param {*} arr 
 */
function RedBlackTree(arr) {
  this.tree = NIL;
  (arr || []).foEach(item => this.add(item))
}

/**
 * 添加节点
 */
RedBlackTree.prototype.add = function(val) {
  const newNode = new TreeNode(val)
  if (this.tree === NIL) { newNode.color = 'black'; this.tree.left = newNode; return }

  // 查找元素放置的位置
  let parents = {} // 记录父节点
  let curNode = this.tree.left
  while (curNode !== NIL) {
    let temp = curNode
    if (curNode.val > val) curNode = curNode.left
    else curNode = curNode.right
    parents[curNode] = temp
  }

  // 放置元素
  curNode = parents[curNode]
  if (curNode.val > val) curNode.left = newNode
  else curNode.right = newNode

  // 修复红黑树
  while (curNode !== this.tree) {
    const parent = parents[curNode]
    if (parent.color === 'black') break // 1.父节点是黑色，加个红色子节点，不破坏树结构
    else {
      const gp = parents[parent]
      if (parent.val < gp.val) {
        if (gp.right.color === 'red') { // 2.叔叔节点是红色，父亲和叔叔变为黑色，祖节点变成红色
          gp.right.color = 'black'
          parent.color = 'black'
          gp.color = 'red'
          curNode = gp
        } else {
          if (curNode === parent.right) { // 3.叔叔节点是黑色，关注节点是父亲节点的右节点，父亲节点左旋
            // 根据父亲节点左旋
            leftRotate(parent, gp)
          } else {
            rightRotate(gp, parents[gp]) // 4.叔叔节点是黑色，关注节点是父节点的左子节点，祖父节点右旋，然后父和祖父节点交换颜色，调整结束
            parent.color = 'black'
            gp.color = 'red'
            break
          }
        }
      } else {
        if (gp.left.color === 'red') {
          gp.left.color = 'black'
          parent.color = 'black'
          gp.color = 'red'
          curNode = gp
        } else {
          if (curNode === parent.right) {
            leftRotate(gp, parents[gp])
            parent.color = 'black'
            gp.color = 'red'
            break
          } else {
            rightRotate(parent, gp)
          }
        }
      }
    }
  }
}

/**
 * 左旋转操作
 * @param {*} node 
 */
function leftRotate (node, parent) {
  let right = node.right
  node.right = right.left
  right.left = node
  if (parent.left === node) parent.left = right
  else parent.right = right
}

/**
 * 右旋转操作
 * @param {*} node 
 */
function rightRotate (node, parent) {
  let left = node.left
  node.left = left.right
  left.right = node
  if (parent.left === node) parent.left = left
  else parent.right = left
}

/**
 * 删除节点
 */
RedBlackTree.prototype.delete = function(val) {

}

/**
 * TLR排序，非递归方式
 */
RedBlackTree.prototype.sort = function() {

}
