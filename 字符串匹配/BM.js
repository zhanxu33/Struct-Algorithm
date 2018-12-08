/**
 * BM算法，取好坏部分，进行模式串的移动
 * 1.主串从左往右匹配模式串
 * 2.模式串从右往左每个字符匹配
 * 3.如果出现不匹配的字符，取坏字符规则和好字符规则中较大的值进行移动
 * 4.坏字符规则：看不匹配的值在模式串前面是否还有出现过，进行相应的移动
 * 5.好字符规则：先看好字符串在前面是否有出现，没有就看好字符的后缀子串是否是模式串的前缀子串，进行相应的移动
 * 6.技巧，模式串是固定的，可以预先构建一个查找某个字符在模式串位置的对象(方便后面查找坏字符)，构建一个后缀串是否在模式串出现和后缀串是否是前缀串的数组(方便进行好字符规则进行匹配)
 */

/**
 * @param {*} s 模式串
 * @param {*} m 主串
 */
function BM(s, m) {
  const bc = {}
  generateBC(bc, s)
  const suffix = [] // 模式串后缀串在模式串前面是否有出现
  const prefix = [] // 模式串后缀串是否是模式串前缀串
  generateSP(s, suffix, prefix)

  const mLength = m.length
  const sLength = s.length

  let i = sLength - 1
  while (i < mLength) {
    let j = sLength - 1
    while (j >=0 && m[i] === s[j]) {
      i--
      j--
    }
    if (j === -1) return i + 1
    const badMove = j - bc[m[i]]
    const goodMove = moveByGood(s, j, suffix, prefix)
    i += Math.max(badMove, goodMove)
  }
  return false
}

/**
 * 计算好后缀规则需要移动的步数
 * @param {} s 
 * @param {*} j 
 * @param {*} suffix 
 * @param {*} prefix 
 */
function moveByGood(s, j, suffix, prefix) {
  const m = s.length
  const k = m - j - 1
  if (typeof suffix[k] !== 'undefined') return j - suffix[k]
  for (let i = k; i > 0 ; i--) {
    if (prefix[i] === true) return m - i
  }
  return m
}

/**
 * 构建坏字符
 * @param {*} bc 
 * @param {*} s 
 */
function generateBC(bc, s) {
  const length = s.length
  for(let i = 0; i< length - 1; i++) {
    bc[s[i]] = i
  }
}

/**
 * 构建模式串后缀和前缀的数组
 * @param {*} s 
 * @param {*} suffix 
 * @param {*} prefix 
 */
function generateSP(s, suffix, prefix) {
  const length = s.length
  for(let i = 0; i < length - 1; i++) {
    let j = i
    let k = 0
    while(j >= 0 && s[j] === s[length - k - 1]) {
      j--
      k++
    }
    if (k !== 0) suffix[k] = j
    if (j === -1) prefix[k] = true
  }
}
