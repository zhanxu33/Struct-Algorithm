function kmp(str, main) {
  // 先构建next数组
  const next = []
  generateNext(next)

  const sLength = str.length
  const mLength = main.length
  let curIndex = 0
  while(curIndex < mLength - sLength) {
    for (let i = curIndex; i < sLength; i++) {
      if (str[i] !== main[curIndex]) break
      return curIndex
    }
    curIndex = next[i]
  }
  return false
}