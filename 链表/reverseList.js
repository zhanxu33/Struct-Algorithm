// 反转链表
function reverseList (head) {
  let curr = head
  let pre = null
  while(curr !== null) {
    let next = curr.next
    curr.next = pre
    pre = curr
    curr = next
  }
  return pre
}