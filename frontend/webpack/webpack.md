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

## 懒加载

```javascript
//import('./print.js').then((mod) => {
//  document.body.appendChild(component(mod.default));
//})
__webpack_require__.e(/* import() */ 569).then(__webpack_require__.bind(__webpack_require__, 569)).then((mod) => {
  document.body.appendChild(component(mod.default));
})
```

``` javascript
(() => {
	__webpack_require__.f = {};
	// This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  // import()懒加载
	__webpack_require__.e = (chunkId) => {
		return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
			__webpack_require__.f[key](chunkId, promises);
			return promises;
		}, []));
	};
})();
```

``` javascript
__webpack_require__.f.j = (chunkId, promises) => {
    // JSONP chunk loading for javascript
    var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
    if(installedChunkData !== 0) { // 0 means "already installed".

      // a Promise means "currently loading".
      if(installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        if(true) { // all chunks have JS
          // setup Promise in chunk cache
          var promise = new Promise((resolve, reject) => {
            installedChunkData = installedChunks[chunkId] = [resolve, reject];
          });
          promises.push(installedChunkData[2] = promise);

          // start chunk loading
          var url = __webpack_require__.p + __webpack_require__.u(chunkId);
          // create error before stack unwound to get useful stacktrace later
          var error = new Error();
          var loadingEnded = (event) => {
            if(__webpack_require__.o(installedChunks, chunkId)) {
              installedChunkData = installedChunks[chunkId];
              if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
              if(installedChunkData) {
                var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                var realSrc = event && event.target && event.target.src;
                error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                error.name = 'ChunkLoadError';
                error.type = errorType;
                error.request = realSrc;
                installedChunkData[1](error);
              }
            }
          };
          __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId);
        } else installedChunks[chunkId] = 0;
      }
    }

    var webpackJsonpCallback = (data) => {
      var [chunkIds, moreModules, runtime] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId, chunkId, i = 0, resolves = [];
      for(;i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
          resolves.push(installedChunks[chunkId][0]);
        }
        installedChunks[chunkId] = 0;
      }
      for(moduleId in moreModules) {
        if(__webpack_require__.o(moreModules, moduleId)) {
          __webpack_require__.m[moduleId] = moreModules[moduleId];
        }
      }
      if(runtime) runtime(__webpack_require__);
      parentChunkLoadingFunction(data);
      while(resolves.length) {
        resolves.shift()();
      }
	  }

    var chunkLoadingGlobal = self["webpackChunktest_name_"] = self["webpackChunktest_name_"] || [];
    var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
    chunkLoadingGlobal.push = webpackJsonpCallback;
};
```

## __webpack_require__.l

``` javascript
/* webpack/runtime/load script */
(() => {
	var inProgress = {};
	var dataWebpackPrefix = "test-[name]:";
	// loadScript function to load a script via script tag
	__webpack_require__.l = (url, done, key) => {
		if(inProgress[url]) { inProgress[url].push(done); return; }
		var script, needAttach;
		if(key !== undefined) {
			var scripts = document.getElementsByTagName("script");
			for(var i = 0; i < scripts.length; i++) {
				var s = scripts[i];
				if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
 			}
 		}
 		if(!script) {
 			needAttach = true;
 			script = document.createElement('script');
 		 			script.charset = 'utf-8';
 			script.timeout = 120;
 			if (__webpack_require__.nc) {
 				script.setAttribute("nonce", __webpack_require__.nc);
 			}
 			script.setAttribute("data-webpack", dataWebpackPrefix + key);
 			script.src = url;
 		}
 		inProgress[url] = [done];
 		var onScriptComplete = (prev, event) => {
 			// avoid mem leaks in IE.
 			script.onerror = script.onload = null;
 			clearTimeout(timeout);
 			var doneFns = inProgress[url];
 			delete inProgress[url];
 			script.parentNode && script.parentNode.removeChild(script);
 			doneFns && doneFns.forEach((fn) => fn(event));
 			if(prev) return prev(event);
 		}
 		;
 		var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
		script.onerror = onScriptComplete.bind(null, script.onerror);
		script.onload = onScriptComplete.bind(null, script.onload);
		needAttach && document.head.appendChild(script);
	};
})();
```

## __webpack_require__.r

```javascript
(() => {
	// define __esModule on exports
	__webpack_require__.r = (exports) => {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
})();
```
