/**
 * 节点的构造函数
 * @param {*} val 
 */
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * 链表归并排序 leetcode 148
 * @param {*} head 
 */
let sortList = function(head) {
  if(head === null || head.next === null) return head
  let fast = new ListNode(0)
  let slow = new ListNode(0)
  slow.next = head
  fast.next = head
  while (fast && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }
  const mid = slow.next
  slow.next = null
  return merge(sortList(head), sortList(mid))
};

/**
 * 合并方法
 * @param {*} l1 
 * @param {*} l2 
 */
let merge = function(l1, l2) {
  let dummy = new ListNode(0)
  let head = dummy
  while(l1 && l2) {
    if (l1.val > l2.val) {
      dummy.next = l2
      l2 = l2.next
    } else {
      dummy.next = l1
      l1 = l1.next
    }
    dummy = dummy.next
  }
  if(l1) dummy.next = l1
  if(l2) dummy.next = l2
  return head.next
}
