/**leetcode 49
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const tmp = {}
  const res = []
  for(let str of strs) {
    const hashVal = hash(str)
    if (tmp[hashVal]) {
      tmp[hashVal].push(str)
    } else {
      tmp[hashVal] = [str]
    }
  }
  const keys = Object.keys(tmp)
  for(let key of keys) {
    res.push(tmp[key])
  }
  return res
}

let hash = function(str) {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103]
  let k = 1
  for(let s of str) {
    k *= primes[s.charCodeAt(0) - 97]
  }
  return k
}