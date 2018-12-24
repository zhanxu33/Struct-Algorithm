/**
 * 1.在一个主串中匹配多个模式串，使用AC自动机
 * 2.主要在于构建fail指针，和KMP的思想一模一样
 */

/**
 * AC自动机的数据结构
 */
function ACNode (val) {
  this.val = val
  this.fail = undefined
  this.length = -1
  this.isEnd = false
  this.child = {}
}

/**
 * 构建AC自动机的构造函数
 */
function ACTree () {
  const arr = [] // 敏感词汇的字符集
  this.trieTree = new ACNode()
  arr.forEach((item) => buildTrieTree(item, this.trieTree))
  buildFailure(this.trieTree)
}

/**
 * 构建字典树
 */
function buildTrieTree (str, node) {
  const length = str.length
  let curNode = node
  for (let i = 0; i < length; i++) {
    const c = str[i]
    if (!curNode[c]) curNode[c] = new ACNode(c) 
    curNode = curNode[c]
    if (i = length - 1) {
      curNode.isEnd = true
      curNode.length = length
    }
  }
}

/**
 * 构建字典树中的失败指针
 */
function buildFailure (root) {
  const queue = []
  root.fail = undefined
  queue.push(root)
  while (queue.length) {
    let curNode = queue.shift()
    const keys = Object.keys(curNode.child)

    for (let key of keys) {
      let curChild = curNode.child[key]
      if (typeof curChild === 'undefined') continue

      if (curNode === root) {
        curChild.fail = root
      } else {
        let temp = curChild.fail
        while (typeof temp != 'undefined') {
          let tempChild = temp[curChild.val]
          if (typeof tempChild != 'undefined') {
            curChild.fail = tempChild
            break
          }
          temp = temp.fail
        }
        if (typeof temp === 'undefined') curChild.fail = root
      }

      queue.push(curChild)
    }
  }
}

/**
 * 匹配字符串
 */
ACTree.prototype.match = function (str) {
  const length = str.length
  let curNode = this.trieTree

  for (let i = 0; i < length; i++) {
    const curChar = str[i]
    while (typeof curNode[curChar] !== 'undefined' && curNode !== this.trieTree) {
      curNode = curNode.fail
    }
    curNode = curNode.child[curChar]
    if (typeof curNode === 'undefined') curNode = this.trieTree
    let temp = curNode
    while (temp !== this.trieTree) {
      if (temp.isEnd) {
        return {
          startIndex: i - temp.length + 1,
          endIndex: i,
          length: temp.length
        }
      }
      temp = temp.fail
    }
  }
}
