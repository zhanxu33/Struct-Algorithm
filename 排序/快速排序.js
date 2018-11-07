/**
 * leetcode 75
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function(nums) {
  quickSort(nums, 0, nums.length - 1)
};

const quickSort = function(nums, left, right) {
  if (left < right) {
      let mid = partSort(nums, left, right)
      quickSort(nums, left, mid - 1)
      quickSort(nums, mid + 1, right)
  }
}

const partSort = function(nums, left, right) {
  let k = right, curr = nums[right]
  while(left < right) {
    for (let i = left; i < right; i++) { 
      if (nums[left] > curr) {
        nums[k] = nums[left]
        k = left
        break
      } else { 
        left++
      }
    }
    for (let i = right; i > left; i--) { 
      if (nums[right] < curr) {
        nums[k] = nums[right]
        k = right
      } else { 
        right--
      }
    }
  }
  nums[k] = curr
  return k
}