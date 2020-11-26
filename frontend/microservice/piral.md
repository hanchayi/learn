## 介绍

Piral生态系统提供了微服务的解决方案。

## 概念

Piral实例（app壳子）
- 应用整体的设计（头部，底部，导航）
- 引用了可以被pilets共享的组件
- 定义pilets怎么加载和pilets怎么集成他们的组件

pilets (功能模块)
- 为应用带来的内容(比如 函数、查询、变化)
- 包含他们的静态资源和依赖
- 定义他们集成的目标

当pilets到了一个成熟的阶段，就可以发布到Pilet Feed。通过Pilet Feed可以被其它开发引用测试。

## API

- 应用壳组件 (块, 页面, ...)
- 和其它pilet共享的功能 (扩展，事件，数据)
- Reflecting capabilities (meta, ....)
- 全局状态管理 (state)

createConnector
``` typescript
import { PiletApi } from 'my-app';
import { MyPage } from './MyPage';
import { MyPageMenu } from './MyPageMenu';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export function setup(app: PiletApi) {
  // 当fetch完成后再渲染MyPage
  const connect = app.createConnector(() => fetch(apiUrl).then(res => res.json()));
  app.registerMenu(MyPageMenu);
  app.registerPage('/my-page', connect(MyPage));
}
```

懒加载意味着组件第一次被挂载的时候，链接器会调用链接函数

## Example
应用程序外壳

``` typescript
import * as React from "react";
import { render } from "react-dom";
import { Redirect } from "react-router-dom";
import { createPiral, Piral, SetRoute } from "piral";
 const piral = createPiral(
  {
    requestPilets() {
      return fetch("https://feed.piral.io/api/v1/pilet/mife-demo")
        .then(res => res.json()).then(res => res.items);
    }
  });
  const app = <Piral instance={piral} />;
  render(app, document.querySelector("#app"));
```

模块

``` typescript
import * as React from "react";
import { PiletApi } from "app-shell";
export function setup(app: PiletApi) {
  app.registerMenu(() =>
    <a href="https://docs.piral.io" target="_blank">Documentation</a>);
  app.registerTile(() => <div>Welcome to Piral!</div>, {
    initialColumns: 2,
    initialRows: 1,
  });
  app.registerPage("/sample",
    () => (    <div>      <h1>Hello World!</h1>      <p>Welcome to your personal pilet :-).</p>    </div>
  );
}
```
