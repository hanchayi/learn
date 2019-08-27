
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



