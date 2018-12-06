/**
 * 使用hash计算，然后在比对hash是否相同
 */

/**
 * @param {*} s 寻找的串
 * @param {*} main 主串
 */
function RK (s, main) {
  const n = main.length - s.length - 1
  const sHash = hash(s)
  let prev = 0
  for (let i = 0; i < n; i++) {
    
  }
}

/**
 * hash算法
 * @param {*} str 
 */
function hash (str) {
  let res = 0
  const length = str.length
  for (let i = 0; i < length; i++) {
    res += (str[i] - 'a') * 26 ^ (length - i - 1)
  }
  return res
}
