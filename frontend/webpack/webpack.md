``` javascript
(() => { // webpackBootstrap
    // 定义所有模块定义的变量
    var __webpack_modules__ = ({
      569: (
        // 每个模块暴露一个函数，入参是module的引用（无用），module.exports,和webpack_require
        (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          // webpack_require.d,入参传入module.exports，和模块定义的导出项
          // 执行后将模块的导出项全都放到exports上
          // 这样由于传入了__webpack_exports__的引用，故传入的module的exports就被转成了实际代码中定义的
          __webpack_require__.d(__webpack_exports__, {
            "Z": () => printMe
          });

          function printMe() {
            console.log('I get called from print.js!');
          }
        }
      )
    });

    // 定义缓存变量
    var __webpack_module_cache__ = {};

    // 所有import，require等都会被转成__webpack_require__
    function __webpack_require__(moduleId) {
      if(__webpack_module_cache__[moduleId]) {
        return __webpack_module_cache__[moduleId].exports;
      }

      // 模块变量
      var module = __webpack_module_cache__[moduleId] = {
        exports: {}
      };

      // 从模块定义中读取该模块，模块定义中会执行__weback_require__.d
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

      // 返回exports
      return module.exports;
    }
(() => {
  // 将定义转到模块的exports上
	__webpack_require__.d = (exports, definition) => {
    for(var key in definition) {
      // 定义上有，exports上没有
      if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
  	}
  };
})();

// __webpack_require__.o 就是hasOwnProperty
(() => {
	__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
})();

(() => {
var _print_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(569);
;

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = _print_js__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z;
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的

    element.appendChild(btn);
    return element;
  }

  document.body.appendChild(component());
})();

/******/
})()
```
