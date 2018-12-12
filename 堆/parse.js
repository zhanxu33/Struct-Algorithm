/**
 * parse(`(1,2,3)`) // [1,2,3]
 * parse(`(1,'2a',3)`) // [1,'2a',3]
 * parse(`(1, (3, 4) ,5)`) // [1,[3,4],5]
 * parse(`(1, (3,5), 0)`) // [1,[3,5],0]
 * parse(`(()())`) // [[],[]]
 * parse(`123`) // null
 * parse(`(1,2`) // null
 * parse(`()()`) // null
 * 字符串转为数组
 */

function parse (str) {
  if (str[0] !== '(') return null
  str = str.replace(/\s/g, '')
  let leftStack = []
  let isString = false
  let curItem = ''
  let curArrObj = {
    arr: undefined,
    parent: undefined
  }
  for (let s of str) {
    switch (s) {
      case '(':
        let temp = []
        if (curArrObj.arr && leftStack.length < 1) return null
        if (curArrObj.arr) curArrObj.arr.push(temp)
        else curArrObj.arr = temp
        curArrObj = {
          arr: temp,
          parent: curArrObj
        }
        leftStack.push(curArrObj)
        break
      case '\'':
        isString = !isString
        break
      case ')':
        if (leftStack.length < 1) return null
        if (curItem !== '') curArrObj.arr.push(curItem)
        curArrObj = curArrObj.parent
        leftStack.pop()
        curItem = ''
        break
      case ',':
        if (curItem !== '') curArrObj.arr.push(curItem)
        curItem = ''
        break
      default:
        if (isString) {
          curItem += s
        } else {
          curItem = Number(s)
          if (isNaN(curItem)) return null
        }
    }
  }
  if (leftStack.length > 0) return null
  return curArrObj.arr
}
