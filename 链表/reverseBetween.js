// 找到需要反转的链接，把最后一个放到第一个，然后改变指向
let reverseBetween = function (head, m, n) {
  let start = { next: head, val: null }
  let pre = start
  let cur = start.next
  for (let i = 1; i < m; i++) {
    pre = pre.next
    cur = cur.next
  }
  for (let i = 1; i <= n - m; i++) {
    let next = cur.next
    cur.next = next.next
    next.next = pre.next
    pre.next = next
  }
  return start.next
}