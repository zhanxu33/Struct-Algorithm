/**
 * parse(`(1,2,3)`) // [1,2,3]
 * parse(`(1,'2a',3)`) // [1,'2a',3]
 * parse(`(1, (3, 4) ,5)`) // [1,[3,4],5]
 * parse(`(1, (3,5), 0)`) // [1,[3,5],0]
 * parse(`(()())`) // [[],[]]
 * parse(`123`) // null
 * parse(`(1,2`) // null
 * parse(`()()`) // null
 * @param {*} str 
 */

function parse (str) {
  let res = []
  let index = 0
  for (let s of str) {
    switch (s) {
      case '(':
        
        break
      case '\'':
        break
      case '\'':
        break
      case ')':
        break
      default:
    }
  }
  return res
}