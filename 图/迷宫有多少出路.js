/**
 * 求图的一个点到另一个点有多少种路
 */

function num_of_path (map, point) {
  const startX = point[0]
  const startY = point[1]
  if (map[startX][startY] === 1) return 0
  if (map[startX][startY] === 2) return 1
  const already = []
  if (already[startX]) already[startX][startY] = 1
  else {
    already[startX] = []
    already[startX][startY] = 1
  }
  return getCurrentWay (map, point, already)
}

function getCurrentWay (map, point, already) {
  const x = point[0]
  const y = point[1]
  if (map[x][y] === 2) return 1
  const way = []
  if (x > 0 && map[x - 1][y] !== 1 && (!already[x - 1] || already[x - 1][y] !== 1)) way.push([x - 1, y])
  if (x < map.length - 1 && map[x + 1][y] !== 1 && (!already[x + 1] || already[x + 1][y] !== 1)) way.push([x + 1, y])
  if (y > 0 && map[x][y - 1] !== 1 && (!already[x] || already[x][y - 1] !== 1)) way.push([x, y - 1])
  if (y < map[x].length - 1 && map[x][y + 1] !== 1 && (!already[x] || already[x][y + 1] !== 1)) way.push([x, y + 1])
  let res = 0
  way.forEach(x => {
    const curAlready = already.map(x => [...x])
    if (curAlready[x[0]]) curAlready[x[0]][x[1]] = 1
    else {
      curAlready[x[0]] = []
      curAlready[x[0]][x[1]] = 1
    }
    res += getCurrentWay (map, x, curAlready)
  })
  return res
}

var a = num_of_path([
  [0, 0, 0, 0, 2],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]
], [2, 0]) // 69
