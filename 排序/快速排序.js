/**
 * leetcode 75
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function(nums) {
  quickSort(nums, 0, nums.length - 1)
}

const quickSort = function(nums, left, right) {
  if (left < right) {
    let mid = partSort(nums, left, right)
    quickSort(nums, left, mid - 1)
    quickSort(nums, mid + 1, right)
  }
}

const partSort = function(nums, left, right) {
  let curr = nums[right]
  while(left < right) {
    for (let i = left; i < right; i++) { 
      if (nums[left] > curr) {
        nums[right] = nums[left]
        break
      } else { 
        left++
      }
    }
    for (let i = right; i > left; i--) { 
      if (nums[right] < curr) {
        nums[left] = nums[right]
      } else { 
        right--
      }
    }
  }
  nums[left] = curr
  return left
}
