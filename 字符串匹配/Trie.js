/**
 * Trie树，节点使用数组，将多个字符组成一个树形结构，便于查找
 * 1.由于节点使用数组，内存开销太大，于是采用Js对象(也就是红黑树)，查找O(klogn)
 * 2.普通的字符串查找，使用红黑树，散列表。但是多个字符的模糊查找，使用Trie树更加高效
 */

function Trie (arr) {
  this.trie = {}
  arr.forEach(str => this.add)
}

Trie.prototype.add = function (str) {
  let curNode = this.trie
  for (let s of str) {
    if (!curNode[s]) curNode.s = {}
    curNode = curNode[s]
  }
}

Trie.prototype.query = function (str) {
  let res = []
  let curNode = this.trie
  for (let s of str) {
    curNode = curNode[s]
  }
  countRes(res, curNode, str)
  return res
}

function countRes (res, node, str) {
  let keys = Object.keys(curNode)
  if (keys.length <= 0) res.push(str)
  else {
    keys.forEach((x) => countRes (res, node[x], str + x))
  }
}
