
## @babel/plugin-transform-runtime

重用babel插入的helper代码

> 数组的实例方法`includes`需要包含修改的代码（@babel/ployfill）


### Install
```
npm install @babel/plugin-transform-runtime -D
```
```
npm install @babel/runtime
```
transfrom插件只有在开发的时候用到，runtime会在正式版本中直接被依赖


### Why?

babel用了很多helper函数，如_extend。这些函数会被添加到文件开始，如果文件很多，这些重复的代码是不必要的。

所有的helper代码都被指向了@babel/runtime,所以@babel/runtime会被打包进发布的文件

另外提供了沙盒的环境，如果你使用@babel/polyfill并且集成它，那么它提供的Promise，Set，Map等将会污染全局变量

作为一个应用开发没有关系，但是作为库开发，你不知道自己运行的环境，这个可能有隐患

transformer会将这些内嵌的函数重命名`core-js`，所以你不需要引入这些函数。

### Usage

```
{
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "userESModules": false
      }
    ]
  ]
}
```
插件默认认为polyfill的接口都是由用户自己提供。

如果不提供corejs需要设为true

### Options

`corejs`: true | false | 2 | 3

true指向 `@babel/rutime`

2 指向`@babel/runtime-corejs2`

3 指向`@babel/runtime-corejs3`

`helpers`: true | false

决定了helpers是否通过模块调用

`regenerator`: true | false

决定是否污染全局环境

`useESModules`

是否编译成es的模块，可以帮助webpack做treeShaking

`absoluteRuntime`

默认的runtime寻找路径是node_modules下面，但如果是嵌套的代码或者全局的会有问题

所以可以指定runtime的路径

## 技术细节

plugin-transform-runtime做了三件事情：

- 如果指定了regenerator则为需要的polyfill提供一个沙盒
- 如过指定helpers则helper函数指向了`@babel/runtime/helpers`
- 使用core-js引用需要的polyfill


