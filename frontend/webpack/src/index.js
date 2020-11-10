import printMe from './print.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
  
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  
    element.appendChild(btn);
    return element;
  }
  
  document.body.appendChild(component());