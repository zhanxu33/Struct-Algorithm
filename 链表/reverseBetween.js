// toFix
var reverseBetween = function (head, m, n) {
  let curr = head, pre = null, count = 1, next = null, start = null , end = null, pstart = null,pend = null
  while (count<=n) {
    next = curr.next
    if (count === m-1) { start = curr; pstart = start.next }
    if (count === n) { end = curr; pend = end.next }
    if (count > m && count <= n) {
        curr.next = pre
    }
    count ++
    pre = curr
    curr = next
  }
  if(start) start.next = end
  if(pstart) pstart.next = pend
  return head
}