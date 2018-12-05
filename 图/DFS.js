/**
 * 邻接表存储无向图
 */
class Graph {
  /**
   * @param {*} v 顶点个数
   * @param {*} arr 数组，每个元素存储与该元素相连的点的下标
   */
  constructor(v, arr) {
    this.v = v
    this.adj = arr
  }

  /**
   * 无向图添加一条边，需要在2个点加数据
   * @param {*} s
   * @param {*} t
   */
  addEdge(s, t) {
    this.adj[s].push(t)
    this.adj[t].push(s)
  }
}

/**
 * 深度优先遍历
 * @param {*} adj 邻接表
 * @param {*} s 从s出发
 * @param {*} t 到t结束
 */
function dfs(adj, s, t) {
  const visit = []
  const prev = []
  visit[s] = true
  let res = deepDfs(adj, s, t, visit, prev)
  if (res) return prev
  return false
}

function deepDfs(adj, i, t, visit, prev) {
  if (i === t) return true
  for (let n = 0; n < adj[i].length; n++) {
    let curIndex = adj[i].get(n)
    if (!visit[curIndex]) {
      visit[n] = true
      prev[curIndex] = i
      let res = deepDfs(adj, n, t)
      if (res) return true
    }
  }
  return false
}
