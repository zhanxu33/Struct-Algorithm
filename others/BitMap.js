/**
 * 位图
 * 1.在很多数据中，快速判断某个数据是否存在
 * 2.使用char类型存储数据，每个char占16bit
 * 3.使用数组存储char，将很多数据存在字节里面
 * 4.位图扩展-BloomFilter 布隆过滤器：位图基础上，采用多个hash函数来判断数据是否存在，来减少内存使用
 */

class BitMap {
  constructor(bit) {
    this.bitLength = bit
    this.bitArr = new Array(bit/16 + 1)
  }
  // 默认存储char，占2字节，16bit
  set (k) {
    if (k > this.bitLength) return
    let arrIndex = k / 16
    let bitIndex = k % 16
    this.bitArr[arrIndex] |= 1 << bitIndex
  }

  query (k) {
    if (k > this.bitLength) return false
    let arrIndex = k / 16
    let bitIndex = k % 16
    return (this.bitArr[arrIndex] & (1 << bitIndex)) != 0
  }
}