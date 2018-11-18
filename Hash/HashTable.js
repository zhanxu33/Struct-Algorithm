const HashTable = function() {
  this.myList = new Array(100)
}

/**
 * 需要对数组扩容的时候，需要解决hash重新计算的问题
 * 使用一致性Hash减少增加节点带来的数据hash重新计算的问题
 */
HashTable.prototype.add = function(val) {
  const hashValue = hash(val)
  this.myList[hashValue] = val
}

HashTable.prototype.remove = function(val) {
  const hashValue = hash(val)
  delete this.myList[hashValue]
}

HashTable.prototype.get = function(val) {
  const hashValue = hash(val)
  return this.myList[hashValue]
}

const hash = function(val) {
  // 需要根据val的数据结构设计Hash函数
  // 1.减少散列冲突 2.减少计算复杂度
  return MD5(val)
}