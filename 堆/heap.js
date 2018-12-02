/**
 * 堆
 * 1.父亲元素始终大于等于子元素，大顶堆
 * 2.父亲元素始终小于等于子元素，小顶堆
 */

/**
 * 堆，大顶堆，构建O(N)
 * @param {*} arr 
 */
function Heap(arr) {
  let depart = Math.floor(arr.length / 2)
  arr = (arr || []).unshift(undefined)
  for (let i = depart; i > 0; i--) {
    let curIndex = i
    while (curIndex < depart) {
      let cur = arr[curIndex]
      let left = arr[2 * curIndex]
      let right = arr[2 * curIndex + 1]
      if (cur >= left && cur >= right) break
      if (left > cur && left > right) {
        arr[curIndex] = left
        arr[2 * curIndex] = cur
        curIndex = 2 * curIndex
      } else {
        arr[curIndex] = right
        arr[2 * curIndex + 1] = cur
        curIndex = 2 * curIndex + 1
      }
    }
  }
  this.arr = arr
}

/**
 * 加到最后，然后从下往上建堆
 */
Heap.prototype.add = function (val) {
  this.arr.push(val)
  let curIndex = this.arr.length - 1
  while (curIndex !== 0) {
    let cur = this.arr[curIndex]
    let parent = this.arr[Math.floor(curIndex / 2)]
    if (parent >= cur) break
    else {
      this.arr[curIndex] = parent
      this.arr[Math.floor(curIndex / 2)] = cur
      curIndex = Math.floor(curIndex / 2)
    }
  }
}

/**
 * 找到删除的元素，拿最后一个元素来替换，如果最后一个元素大于要删除的元素，向上重建，否则向下重建
 */
Heap.prototype.delete = function (val) {
  let i = 1
  for (; i < this.arr.length; i++) {
    if (val === this.arr[i]) break
  }
  if (i === this.arr.length) return false

  // 用最后一个元素替换
  let last = this.arr[this.arr.length - 1]
  let tempDel = this.arr[i]
  this.arr[i] = last
  this.arr.pop()
  // 如果最后一个元素大于要删除的元素，向上重建，否则向下重建
  if (tempDel > last) {
    const depart = Math.floor(this.arr.length / 2) // 最后一个非叶子节点
    while (i < depart) {
      let cur = this.arr[i]
      let left = this.arr[i * 2]
      let right = this.arr[i * 2 + 1]
      if (cur >= left && cur >= right) break
      if (left > cur && left > right) {
        this.arr[i] = left
        this.arr[i * 2] = cur
        i = i * 2
      } else {
        this.arr[i] = right
        this.arr[i * 2 + 1] = cur
        i = i * 2 + 1
      }
    }
  }
  if (tempDel < last) {
    while (i > 0) {
      let parent = this.arr[Math.floor(i / 2)]
      if (parent >= last) break
      else {
        this.arr[Math.floor(i / 2)] = last
        this.arr[i] = parent
        i = Math.floor(i / 2)
      }
    }
  }
}

/**
 * 堆排序 NLog(N)
 */
Heap.prototype.sort = function () {
  let arr = this.arr
  let res = []
  
  while (arr.length) {
    res.push(arr[1])
    let depart = Math.floor(arr.length / 2)
    let i = 1
    arr[1] = arr.pop()
    while (i < depart) {
      let cur = arr[i]
      let left = arr[i * 2]
      let right = arr[i * 2 + 1]
      if (cur >= left && cur >= right) break
      if (left > cur && left > right) {
        arr[i] = left
        arr[i * 2] = cur
        i = i * 2
      } else {
        arr[i] = right
        arr[i * 2 + 1] = cur
        i = i * 2 + 1
      }
    }
  }

  return res
}
