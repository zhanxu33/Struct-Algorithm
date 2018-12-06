/**
 * BF算法，就是一个一个比对
 */

 /**
  * @param {*} s 寻找的
  * @param {*} main 主串
  */
function BF (s, main) {
  const small = s.length
  const big = main.length
  for (let i = 0; i < big - small + 1; i++) {
    for (let n = 0; n < small; n++) {
      if (small[n] !== big[i]) break
      return i
    }
  }
}
