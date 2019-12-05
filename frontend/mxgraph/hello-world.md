## 完成一个hello-world所需api

```javascript
// 容器
const container = document.getElementById('#container');
// 初始化绘图类
const graph = new Graph(container);

// 允许选中一块矩形区域
new Rubberband(graph);

// 获取默认的根节点
const parent = graph.getDefaultParent();
// 获取模型
const model = graph.getModel();

// 事务开始
model.beginUpdate();
try {
  // 插入一个节点
  const vertex1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30);
  // 插入第二个节点
  const vertex2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30);
  // 连接两个节点
  const edge = graph.insertEdge(parent, null, vertex1, vertex2)
} finally {
  // 事务结束
  model.endUpdate();
}
```