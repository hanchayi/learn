# CSS性能优化

## 使用简写

``` css
p {
  margin-top: 1px;
  margin-right: 2px;
  margin-bottom: 3px;
  margin-left: 4px;
}

p {
  margin: 1px 2px 3px 4px
}
```

## 查找并删除未使用的CSS

- 进入谷歌浏览器`Sources`面板
- `Cmd+Shift+P`打开命令面板
- 输入`Show Coverage`
- 或者直接使用