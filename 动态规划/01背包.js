/**
 * 在一定承重能力的背包里放入价值最大的东西，使用动态规划解决
 * @param {背包重量数组} weights 
 * @param {背包价值数组} values 
 * @param {背包能承受的最大重量} maxW 
 */
function bag01 (weights, values, maxW) {
  const n = weights.length
  const arr = [0]
  // 构建arr数组，用于全排列
  for (let i = 0; i < n; i++) {
    const value = values[i]
    const weight = weights[i]
    for (let j = maxW; j >= 0; j--) {
      if (typeof arr[j] !== 'undefined' && arr[j] + value > arr[j + weight]) {
        arr[j + weight] = arr[j] + value
      }
    }
  }
  // 找到最大的
  let max = -1
  for (let m = 0; m <= maxW; m++) {
    if (arr[m] > max) max = arr[m]
  }

  return max
}