// tofix
const sortColors = function (nums) {
  let l = 0, k = Math.round(nums.length / 2), r = nums.length
  if (l === r - 1) return nums[l]
  return joinArray(sortColors(nums.slice(l, k)), sortColors(nums.slice(k, r)))
};

const joinArray = function(leftArr, rightArr) {
  const tempArr = []
  const leftLength = leftArr.length
  const rightLength = rightArr.length
  for(let i = 0; i < rightLength; i++) {
      let temp = leftArr[i] > rightArr[i] ? rightArr[i] : leftArr[i]
      tempArr.push(temp)
  }
  const lastTemp = tempArr.pop()
  if (lastTemp > leftArr[leftLength - 1]) {
      tempArr.push(leftArr[leftLength - 1])
      tempArr.push(lastTemp)
  } else {
      tempArr.push(lastTemp)
      tempArr.push(leftArr[leftLength - 1])
  }
  return tempArr
}