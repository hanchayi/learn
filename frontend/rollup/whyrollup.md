## 使用rollup的原因

1. 文件大
- 每个独立文件都包了一个模块声明
- __webpack_require__声明
- __webpack_require__工具函数自身体积

2. 性能影响
- __webpack_require__执行耗时
- Object.defineProperty执行耗时

3. es模块支持
- webpack不支持es模块导出

## 缺陷
- 生态，如webpack的CommonChunkPlugin等
- 文档较少，遇到问题难解决

## 
