/**
 * 求n个元素中的前K大元素
 * 如果是静态数据，一次排序就可以了
 * 如果是动态数据，就维护一个最小堆
 */

function TopK (k, arr) {
  this.arr = [undefined]
  this.k = k;
  (arr || []).forEach(x => this.add(x))
}

TopK.prototype.add = function (val) {
  const length = this.arr.length - 1
  if (length < this.k) {
    this.insert(val)
  } else {
    const min = this.arr[1]
    if (val > min) this.replaceTop(val)
  }
}

// 直接在堆的最后新增一个元素
TopK.prototype.insert = function (val) {
  this.arr.push(val)
  let curIndex = this.arr.length - 1
  while (curIndex > 1) {
    let cur = this.arr[curIndex]
    let parent = this.arr[Math.floor(curIndex / 2)]
    if (cur <= parent) {
      this.arr[Math.floor(curIndex / 2)] = cur
      this.arr[curIndex] = parent
      curIndex = Math.floor(curIndex / 2)
    } else break
  }
}

// 替换堆顶元素，然后往下建堆
TopK.prototype.replaceTop = function (val) {
  this.arr[1] = val
  const lastNoLeafIndex = Math.floor((this.arr.length - 1) / 2)
  let curIndex = 1
  while (curIndex <= lastNoLeafIndex) {
    let cur = this.arr[curIndex]
    let left = this.arr[curIndex * 2]
    let right = this.arr[curIndex * 2 + 1]
    if (typeof right === 'undefined') {
      if (left < cur) {
        this.arr[curIndex * 2] = cur
        this.arr[curIndex] = left
      }
      break
    }
    if (cur <= left && cur <= right) break
    if (left < cur && left <= right) {
      this.arr[curIndex] = left
      this.arr[curIndex * 2] = cur
      curIndex = curIndex * 2
    } else {
      this.arr[curIndex * 2 + 1] = cur
      this.arr[curIndex] = right
      curIndex = curIndex * 2 + 1
    }
  }
}

// 输出topK元素
TopK.prototype.topK = function () {
  let res = []
  const arr = [...this.arr];
  while (arr.length > 1) {
    res.push(arr[1])
    let last = arr.pop()
    if (arr.length > 1) arr[1] = last
    const lastNoLeafIndex = Math.floor((arr.length - 1) / 2)
    let curIndex = 1
    while (curIndex <= lastNoLeafIndex) {
      let cur = arr[curIndex]
      let left = arr[curIndex * 2]
      let right = arr[curIndex * 2 + 1]
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
    }
  }
  return res
}
