/**
 * 后缀树的应用：
 * 1.查找字符串Pattern是否在于字符串Text中:pattern肯定是后缀子串的前缀子串
 * 2.计算指定字符串Pattern在字符串Text中的出现次数:找到符合pattern的后缀子串的前缀子串，统计数字即可
 * 3.查找字符串Text中的最长重复子串:找到后缀树种，最深的那个非叶子节点，且有2个叶子节点
 * 4.查找两个字符串Text1和Text2的最长公共部分:2个构建后缀树，求最深的那个非叶子节点，且有2个不同的叶子节点，使用不同的尾标记
 * 5.查找给定字符串Text里的最长回文:将字符串反转，然后2个字符串构建后缀树，求最深的那个非叶子节点，且有2个不同的叶子节点，使用不同的尾标记
 * Tofix: 构造的时候使用Ukkonen算法
 */

function Node (val) {
  this.val = val
  this.isEnd = false
  this.child = {}
}

/**
 * 后缀树的构造函数
 * @param {传入的字符串数组} arr 
 */
function SuffixTree (arr) {
  this.tree = new Node()
  arr.forEach((str) => {
    const length = str.length
    for (let i = 0; i < length; i++) {
      this.add(str.slice(i))
    }
  })
}

SuffixTree.prototype.add = function (str) {
  let curNode = this.tree
  for (let s of str) {
    if (!curNode[s]) curNode[s] = new Node(s)
    curNode = curNode[s]
  }
  curNode.isEnd = true
}

SuffixTree.prototype.find = function (str) {
  let curNode = this.tree
  for (let s of str) {
    if (!curNode[s]) return false
    curNode = curNode[s]
  }
  return curNode.isEnd
}

let longStr = ''
SuffixTree.prototype.longest = function () {
  let curNode = this.tree
  let curChild = curNode.child

  getLongStr(curChild, '')
  return longStr
}

function getLongStr (obj, str) {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    let tempStr = str + key
    let curNode = obj[key].child
    if (tempStr.length > longStr.length && checkLeaf(curNode)) {
      longStr = tempStr
      getLongStr(curNode, tempStr)
    }
  }
}

function checkLeaf (node) {
  const keys = Object.keys(node)
  if (keys.length > 1) return true
  if (keys.length === 0) return false
  if (keys.length === 1) return checkLeaf(node[keys[0]].child)
}
