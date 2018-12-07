/**
 * 使用hash计算，然后在比对hash是否相同
 */

/**
 * @param {*} s 寻找的串
 * @param {*} main 主串
 */
function RK (s, main) {
  const n = main.length - s.length + 1
  const l = s.length
  const sHash = hash(s)
  let prev = hash(main.substr(0, l))
  if (prev === sHash) return 0

  for (let i = 1; i < n; i++) {
    let curHash = 26 * (prev - (main[i - 1].charCodeAt() - 96) * getNumber(l - 1)) + (main[i + l - 1].charCodeAt() - 96)
    if (curHash === sHash) return i
    prev = curHash
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
    res += (str[i].charCodeAt() - 96) * 26 ** (length - i - 1)
  }
  return res
}

/**
 * 存储26次方的数字
 */
const cacheNumber = []
function getNumber(n) {
  if (!cacheNumber[n]) {
     cacheNumber[n] = 26 ** n
  }
  return cacheNumber[n]
}
