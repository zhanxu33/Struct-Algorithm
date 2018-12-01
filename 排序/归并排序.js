// mergeSort
const mergeSort = function (nums) {
  let l = 0, k = Math.round(nums.length / 2), r = nums.length
  if (l === r - 1) return nums
  return joinArray(mergeSort(nums.slice(l, k)), mergeSort(nums.slice(k, r)))
};

const joinArray = function(leftArr, rightArr) {
  let tempArr = []
  let leftIndex = 0
  let rightIndex = 0
  while (leftIndex < leftArr.length && rightIndex < rightArr.length) { 
    const temp = leftArr[leftIndex] < rightArr[rightIndex] ? leftArr[leftIndex++] : rightArr[rightIndex++]
    tempArr.push(temp)
  }
  if (leftIndex < rightIndex) {
    tempArr = tempArr.concat(leftArr.slice(leftIndex, leftArr.length))
  } else {
    tempArr = tempArr.concat(rightArr.slice(rightIndex, rightArr.length))
  }
  return tempArr
}
