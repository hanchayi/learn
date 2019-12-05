# 调用堆栈

调用堆栈是解释器追踪函数执行的一种方式。当执行环境中调用多个函数时，通过这种机制，我们能够追踪到哪个函数正在执行。
- 没调用一个函数这个函数会被压栈并开始执行
- 当调用站中的函数调用其他函数时，那么新的函数会被压栈，并执行，每个进入调用栈的都成为`__调用帧__`
- 当函数执行完毕后，会出栈。
- 当分配的调用栈空间被占满时会出现栈溢出。


## JavaScript引擎

JavaScript引擎主要包含两部分，内存堆和调用栈。
- 内存堆：这是内存分配的地方。
- 调用栈：这是代码执行的地方。

## 运行时

除去JavaScript引擎，我们还有许多API，比如setTimeout，XMLHttpRequest，DOM等。

然后我们还拥有事件循环和回调队列。

## 事件循环

当我们打开网站的时候，网站的渲染就是一大堆的同步任务，比如页面的骨架和页面元素的渲染。而像加载图片音乐就是异步任务。

- 同步任务进入主线程，异步任务进入EventTable中，并注册回调函数
- 当指定的事情完成时，EventTable会将回调放到Event Queue
- 当主线程的任务执行完毕，就回去Event Queue读取对应的函数进入主线程执行
- Event Loop

> JS引擎存在监控进程，持续不断的检查主线程栈是否为空，一旦为空就会去Event Queue中检查是否有等待的函数。

## 任务
除了广义的同步异步，还有微任务和宏任务
- 宏任务：setTimeout script
- 微任务：Promise process.nextTick

> 执行顺序,先执行微任务，微任务执行完毕后找出一个宏任务执行，执行完后，继续寻找微任务执行，结束后再执行下一个宏任务


## 执行上下文

每当JavaScript代码在运行的时候它都是在执行上下文中运行。

### 执行上下文的类型
- 全局执行上下文 
- 函数执行上下文
- Eval函数执行上下文


## 怎么创建执行上下文

执行上下文的创建分为两个阶段
- 创建阶段
- 执行阶段

### 创建阶段
- 1，绑定this
- 2，创建词法环境
- 3，创建变量环境

### this绑定
在全局执行上下文中，绑定全局对象
在函数执行上下文中绑定调用者或全局对象

### 词法环境

> 词法环境是一种规范类型，基于ECMAScript代码的词法嵌套结构来定义标志符和函数的关联。一个词法环境由环境记录器和一个可能引用外部词法环境的空值组成。

词法环境内部有两个部分：环境记录器和外部环境引用

- 环境记录器是存储变量函数声明的位置
- 外部环境的引用意味着它可以访问父级词法环境（作用域）

环境记录器有两种类型：
- 声明式环境记录器 存储变量、函数、参数
- 对象式环境记录器 定义出现在全局上下文中的变量和函数的关系

简而言之
- 在全局上下文中，环境记录器是对象环境记录器
- 在函数上下文中，环境记录器是申明式环境记录器

> <b>注意</b>：对于<b>函数环境的申明式环境记录器</b>里面包含了一个传递给函数的`arguments`对象（此对象存储索引和参数的映射）和传递给参数的`length`


### 变量环境

它同样是一个词法环境，其环境记录器持有<b>变量申明语句</b>在执行上下文中创建的绑定关系。

词法环境中包含用`var`声明的变量。

在创建阶段，引擎检查代码找出变量和函数声明，虽然函数申明完全存储在环境中，但是变量最初设置为`undefined`或者未初始化。

这就是为什么可以在`var`变量未申明的时候就访问它，也就是我们所说的变量提升。

### 执行阶段

完成变量分配后会进行代码执行

> 如果在源码声明的实际位置未找到`let`变量的值，它会被赋值成`undefined`

## 伪代码示例
  
``` typescript
const v8 = new V8(new Window())
v8.exec(`
  var a =1;
  let b

  function say(message) {
    echo message;
  }
  say('hello world');
`)
```

=> 

``` typescript
// 词法环境
interface LexicalEnvironment {
  environmentRecord: {
    type: 'object' | 'decalre'
    // ...标志符
  },
  // 外部环境引用,函数中是外部函数或全局对象，全局中是null
  outer: any
}

// 全局词法环境
interface GlobalLexicalEnvironment extends LexicalEnvironment {
  environmentRecord: {
    type: 'object'
    // ...标志符
  },
  outer: null
}

// 函数词法环境
interface FunctionLexicalEnvironment extends LexicalEnvironment {
  environmentRecord: {
    type: 'declare';
    // ...标志符
    arguments: any[];
  },
  // 外部环境引用,函数中是外部函数或全局对象
  outer: GlobalLexicalEnvironment | FunctionLexicalEnvironment
}

// 变量环境
interface VariableEnvironmenet extends LexicalEnvironment {
  environmentRecord: {
    type: 'object' | 'decalre'
    // ...标志符
  },
  // 外部环境引用,函数中是外部函数或全局对象，全局中是null
  outer: any
}


class Context {
  protected params: {};
  // this 绑定的对象
  protected thisBinding: any;
  // 词法环境
  protected lexicalEnvironment: LexicalEnvironment;
  // 变量环境
  protected variabelEnvironment: VariableEnvironmenet;

  contructor (
    lexicalEnvironment: LexicalEnvironment, 
    variabelEnvironment: VariableEnvironmenet
  ) {
    this.lexicalEnvironment = lexicalEnvironment
    this.variabelEnvironment = variabelEnvironment
    this.bindThis()
  }
  // 绑定this
  abstact protected bindThis() {}
}
// 全局上下文
class GlobalContext extends Context {
  protected globalObj: any
  constructor (globalObj: any, lexical: LexicalEnvironment, variable: ) {
    super();
    this.globalObj = globalObj
    this.lexicalEnvironment.window = window;
  }

  // 直接绑定全局对象
  protected bindThis() {
    this.thisBinding = this.globalObj;
  }
}

// 函数上下文
class FunctionContext extends Context {
  private caller: any
  constructor (
    caller, 
    lexical: FunctionLexicalEnvironment,
    variable: VariableEnvironment
  ) {
    super();
    this.caller = caller;
  }

  // 根据调用方式绑定this
  protected bindThis() {
    // 如果是对象调用或者用call/apply方法的调用，this指向调用者，否则this指向全局对象
    this.thisBinding = this.caller || this.globalObj;
  }
}

// eval上下文
class EvalContext extends Context {}

class V8 {
  private globalObj: any;
  constructor (globalObj) {
    this.globalObj = gobalObj;
  }

  public function exec () {
    const callStacks: Context[] = []
    // var = 1 之前会执行
    callStacks.push(new GlobalContext(this.globalObj, {
      environmentRecord: {
        type: 'object',
        a: <uninitlized>,
        say: <function>
      },
      outer: null
    }, {
      environmentRecord: {
        type: 'object',
        c: undefined
      },
      outer: null
    }))
    // say()执行时
    callStacks.push(new FunctionContext({
      environmentRecord: {
        type: 'declare',
        arguments: {0: 'helloworld', length: 1},
        outer: <GlobalLexicalEnvironment>
      }
    }, {

    }))
    // say执行完
    callStacks.pop()
    // 全部执行完
    callStacks.pop()
  }
}
```


