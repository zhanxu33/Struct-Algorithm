/**
 * 1.从前往后匹配
 * 2.遇到怀字符，从好前缀中找最大可匹配前缀子串的后缀子串
 * 3.核心在构建这个next数组，求next[i]的时候，next[i-1]已经算好了，如果下一个字符匹配，那么就直接是这个值。
 * 如果不匹配，就得求next[i-1]的次大，看次大的下一个字符与最后一个字符是否匹配
 */

function kmp (str, main) {
  // 先构建next数组
  const next = []
  generateNext(next, str)

  const sLength = str.length
  const mLength = main.length
  let curIndex = 0, i = 0
  while (curIndex < mLength - sLength) {
    while (i < sLength) { 
      if (str[i] !== main[curIndex]) break
      else { i++; curIndex++ }
    }
    if (i === sLength) return curIndex - sLength
    const dis = next[i]
    curIndex += i - dis
    i = dis + 1
  }
  return false
}

function generateNext (next, str) {
  next[0] = -1
  const length = str.length
  let k = -1
  for (let i = 1; i < length; i++) {
    while (k !== -1 && str[k + 1] !== str[i]) {
      k = next[k]
    }
    if (str[k + 1] === str[i]) k++
    next[i] = k
  }
}
