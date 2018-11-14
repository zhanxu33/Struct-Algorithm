/**
 * 节点结构
 * @param {*} val
 * @param {*} node
 */
const SkipNode = function (val, node) {
  this.val = val
  this.next0 = node
}

/**
 * 构建跳表的数据结构
 * @param {*} nums
 * @param {*} i
 */
const getNode = function (nums, i) {
  const max = nums.length - 1
  if(i === nums.length) return new SkipNode(undefined) // 尾部添加哨兵
  const nextNode = getNode(nums, i + 1)
  const currNode = new SkipNode(nums[i], nextNode)
  const maxLevel = getMaxLevel(max, i)
  for (let n = 1; n <= maxLevel; n++) {
    currNode[`next${n}`] = getNextNode(currNode, n)
  }
  return currNode
}

/**
 * 获取当前元素的层级
 * @param {*} max
 * @param {*} i
 */
const getMaxLevel = function (max, i) {
  let m = i
  if (i === 0) m = max
  if (i % 3 === 0) {
    let n = 1
    while (3 ** n < m) {
      n++
    }
    return n
  } else {
    return 0
  }
}

/**
 * 获取跳表的下个节点
 * @param {*} currNode
 * @param {*} n
 */
const getNextNode = function (currNode, n) {
  let tempNode = currNode[`next${n - 1}`]
  let i = 1
  while (i <= 2) {
    if (typeof tempNode === 'undefined') break
    tempNode = tempNode[`next${n - 1}`]
    i++
  }
  return tempNode
}

/**
 * 跳表构造函数
 * @param {*} nums
 */
const SkipList = function (nums) {
  this.maxLevel = getMaxLevel(nums.length - 1, 0)
  this.skipList = getNode(nums, 0)
}

/**
 * 跳表查询
 */
SkipList.prototype.find = function(val) {
  let level = this.maxLevel
  let currNode = this.skipList
  while (currNode.val !== val) {
    const key = `next${level - 1}`
    if (currNode[key].val > val) level--
    else currNode = currNode[key]
    if (!currNode[key]) level--
    if (level <= 0) return false
  }
  return currNode
}

/**
 * 增加节点
 */
SkipList.prototype.add = function (val) {
  const random = Math.random()
  const node = new SkipNode(val)
  let curr = this.skipList
  let level = 0
  if (random > 0.5) level = this.maxLevel - 1
  for (let i = level; i >= 0; i--) {
    const key = `next${i}`
    while (curr[key].val < val) {
      curr = curr[key]
      if(!curr[key]) break
    }
    const temp = curr[key]
    curr[key] = node
    node[key] = temp
  }
}

/**
 * 删除节点
 */
SkipList.prototype.delete = function (val) {
  const level = this.maxLevel
  let curr = this.skipList
  if (curr.val === val) {
    const nextNode = curr.next0
    this.skipList = nextNode
    while (level >= 0) {
      const key = `next${level}`
      nextNode[key] = curr[key]
      level--
    }
    return true
  }
  let flag = false
  for (let i = level - 1; i >= 0; i--) {
    const key = `next${i}`
    while (curr[key].val < val) {
      curr = curr[key]
      if (!curr) break
    }
    if (curr[key].val === val) {
      curr[key] = curr[key][key]
      flag = true
    }
  }
  return flag
}
