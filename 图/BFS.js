/**
 * 邻接表存储无向图
 */
class Graph {
  /**
   * 
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
 * 广度优先遍历
 * @param {*} adj 邻接表
 * @param {*} s 从s出发
 * @param {*} t 到t结束
 */
function bfs(adj, s, t) {
  const visit = []
  const parents = []
  visit[s] = true
  const queue = [s]
  while (queue.length > 0) {
    let curIndex = queue.shift()
    for (let i = 0; i < adj[curIndex].length; i++) {
      let cur = adj[curIndex].get(i)
      if (!visit[cur]) {
        parents[cur] = curIndex
        if (cur === t) {
          return parents
        }
        visit[cur] = true
        temp.forEach(x => queue.push(x))
      }
    }
  }
}
