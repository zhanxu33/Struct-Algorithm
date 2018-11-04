// 保留队列最后一个空位，方便判断空队列和满队列的情况,leetcode 622
/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
  this.CirQueue = new Array(k+1)
  this.count = k+1
  this.head = 0
  this.tail = 0
};

/**
* Insert an element into the circular queue. Return true if the operation is successful. 
* @param {number} value
* @return {boolean}
*/
MyCircularQueue.prototype.enQueue = function(value) {
  if ((this.tail + 1)%this.count ===  this.head) return false
  this.CirQueue[this.tail] = value
  if (this.tail === this.count - 1) {
      this.tail = 0
  } else {
      this.tail++
  }
  return true
};

/**
* Delete an element from the circular queue. Return true if the operation is successful.
* @return {boolean}
*/
MyCircularQueue.prototype.deQueue = function() {
  if (this.head === this.tail) return false
  if (this.head === this.count - 1) {
      this.head = 0
  } else {
      this.head++
  }
  return true
};

/**
* Get the front item from the queue.
* @return {number}
*/
MyCircularQueue.prototype.Front = function() {
  if (this.head === this.tail) return -1
  return this.CirQueue[this.head]
};

/**
* Get the last item from the queue.
* @return {number}
*/
MyCircularQueue.prototype.Rear = function() {
  if (this.head === this.tail) return -1
  const lastIndex = this.tail === 0 ? this.count - 1 : this.tail - 1
  return this.CirQueue[lastIndex]
};

/**
* Checks whether the circular queue is empty or not.
* @return {boolean}
*/
MyCircularQueue.prototype.isEmpty = function() {
  return this.head === this.tail
};

/**
* Checks whether the circular queue is full or not.
* @return {boolean}
*/
MyCircularQueue.prototype.isFull = function() {
  return (this.tail + 1)%this.count ===  this.head
};