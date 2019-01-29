/**
 * dijkstra是单源最短路径搜索，就是一个点到另一个点的路径
 * 1.维护一个2维数组，邻接矩阵
 * 2.维护一个数组，是一个点到其余几个点的最短路径
 * 3.每次找当前可达的最短路径，确定相邻的最短长度，然后将值更新到最短路径数组里面
 */

/**
 * 直接输出第一个点到后面所有点的最短路径
 * @param {邻接矩阵} arr 
 */
function dijkstra (arr) {
  const dist = arr[0]
  const queue = [{ value: dist, index: 0 }]

  while (queue.length) {
    const temp = queue.pop()
    const p = temp.value
    const curIndex = temp.index
    let min = { value: Infinity, index: -1 }

    p.forEach((value, index) => {
      if (typeof value !== 'undefined') {
        if (value < min.value) min = { value, index }
        
        const curValue = dist[curIndex] + value
        if (curValue < dist[index]) dist[index] = curValue
      }
    })

    if (min.index !== -1) queue.push({ value: arr[min.index], index: min.index })
  }

  return dist
}
