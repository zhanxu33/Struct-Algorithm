/**
 * 基于邻接链表的拓扑排序
 * 1. 主要是看多个元素之间的依赖关系，比如，先穿袜子，在穿鞋。
 * 2. 统计每个元素的入度，即是他所有依赖的对象
 * 3. 如果入度为0，即可把它输出了
 */

class ToPo {
  constructor(arrs) {
    this.toPo = {}
    arrs.forEach(([key, value]) => {
      const target = this.toPo[key]
      if (target) {
        target.arr.push(value)
        target.count++
      } else {
        this.toPo[key] = { arr: [value], count: 1 }
      }
    })
  }

  sort() {
    const queue = []
    const res = []
    const keys = Object.keys(this.toPo)
    keys.forEach((key) => {
      const current = this.toPo[key]
      if (current.count === 0) queue.push(key)
    })

    while (queue.length) {
      const head = queue.shift()
      res.push(head)

      keys.forEach((key) => {
        const curr = this.toPo[key]
        const arr = curr.arr
        const count = curr.count

        if (count < 1) return
        if (arr.findIndex(x => x === head) === -1) return

        const newCount = --curr.count
        if (newCount < 1) queue.push(key)
      })
    }

    return res
  }
}