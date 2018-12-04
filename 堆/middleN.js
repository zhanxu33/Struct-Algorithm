/**
 * 求一个数组中，某个位置的数据
 * 比如求第几名，或者第百分之多少名
 * 使用2个堆，前一个大顶堆，后一个小顶堆，顶上的数据就是所求的数据
 */

function MiddleN (n, arr) {
  this.bigHeap = [undefined]
  this.smallHeap = [undefined]
  this.n = n
  (arr || []).forEach(x => this.add(x))
}

/**
 * 维护两个堆，主要是因为如果是百分之多少，在添加元素的时候需要改变2个堆的元素个数
 */
MiddleN.prototype.add = function (val) {
  const bigLength = this.bigHeap.length - 1
  if (bigLength < this.n) {
    this.bigHeap.push(val)
    bottomRebuild(this.bigHeap, false)
  } else {
    const temp = this.bigHeap[1]
    if (temp >= val) {
      this.smallHeap.push(val)
      bottomRebuild(this.smallHeap, true)
    } else {
      const bigTemp = this.bigHeap[1]
      this.smallHeap.push(bigTemp)
      this.bigHeap[1] = val
      topRebuild(this.bigHeap, false)
      bottomRebuild(this.smallHeap, true)
    }
  }
}

/**
 * 从上向下重建
 * @param {*} arr 
 */
function topRebuild (arr, isSmall) {
  const lastUnLeafIndex = Math.floor((arr.length - 1) / 2)
  let curIndex = 1
  while (curIndex <= lastUnLeafIndex) {
    let cur = arr[curIndex]
    let left = arr[curIndex * 2]
    let right = arr[curIndex * 2 + 1]
    if (isSmall) {
      if (typeof right === 'undefined') {
        if (left < cur) {
          arr[curIndex * 2] = cur
          arr[curIndex] = left
        }
        break
      }
      if (cur <= left && cur <= right) break
      if (left < cur && left <= right) {
        arr[curIndex] = left
        arr[curIndex * 2] = cur
        curIndex = curIndex * 2
      } else {
        arr[curIndex * 2 + 1] = cur
        arr[curIndex] = right
        curIndex = curIndex * 2 + 1
      }
    } else {
      if (typeof right === 'undefined') {
        if (left > cur) {
          arr[curIndex * 2] = cur
          arr[curIndex] = left
        }
        break
      }
      if (cur >= left && cur >= right) break
      if (left > cur && left >= right) {
        arr[curIndex] = left
        arr[curIndex * 2] = cur
        curIndex = curIndex * 2
      } else {
        arr[curIndex * 2 + 1] = cur
        arr[curIndex] = right
        curIndex = curIndex * 2 + 1
      }
    }
  }
}

/**
 * 从下向上重建
 * @param {*} arr 
 */
function bottomRebuild (arr, isSmall) {
  let curIndex = arr.length - 1
  while (curIndex > 1) {
    let parentIndex = Math.floor(curIndex / 2)
    let cur = arr[curIndex]
    let parent = arr[parentIndex]
    if (isSmall) {
      if (cur < parent) {
        arr[parentIndex] = cur
        arr[curIndex] = parent
        curIndex = parentIndex
      } else break
    } else {
      if (cur > parent) {
        arr[parentIndex] = cur
        arr[curIndex] = parent
        curIndex = parentIndex
      } else break
    }
  }
}