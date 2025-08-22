# Node.js
Node.js 是一个`基于 Chrome V8 引擎的 JavaScript 运行时环境` ( 不是编程语言 )

核心组成:
+ V8 引擎：与 Chrome 同源，负责 JS 代码解析执行 ( 单线程JS执行 )
+ libuv：提供事件循环（处理异步 I/O）和线程池（文件/CPU任务）
+ 核心模块：fs、http 等浏览器中没有的 API

    `单线程`指 JavaScript 执行线程，但底层通过线程池+事件循环实现`高并发`

## 适用场景
场景	|Node.js 适合度|	原因分析
---|---|---
API服务/RESTful	|✅ 极佳	|高并发I/O处理
实时应用(WebSocket)	|✅ 极佳|	事件驱动模型匹配
微服务网关	|✅ 优秀	|低内存开销+快速路由
CPU密集型计算	|❌ 不推荐|	阻塞事件循环（需用Worker Threads）
大数据批处理	|⚠️ 中等|	Stream流式处理可缓解内存压力

## 初次使用
终端 `node [文件名]`直接使用

G:\Front_End\Node.js

## 全局对象
+ 运行环境不同
  + `window` 是浏览器环境中的全局对象
  + `global` 是 Node.js 运行时环境中的全局对象
+ 可用 API 不同
  + `window` 包含浏览器特有的 API，如：
    + DOM 操作 (document, alert, location 等)
    + Web API (fetch, localStorage, sessionStorage 等)
    + 浏览器事件 (onclick, onload 等)
  + `global` 包含 Node.js 特有的 API，如：
    + 文件系统 (fs, path 等)
    + 网络 (http, https 等)
    + 进程控制 (process, Buffer 等)
+ 模块系统影响
  + 在 Node.js 中，使用 var 声明的变量不会自动成为 `global` 的属性
  + 在浏览器中，使用 var 声明的变量会成为 `window` 的属性
+ 全局 this 的指向
  + 在浏览器顶层作用域中，this 指向 `window`
  + 在 Node.js 模块顶层作用域中，this 指向当前模块的 `exports` 对象
+ 全局变量污染
  + 浏览器中的 `window` 对象更容易被污染，因为所有脚本共享同一个全局对象
  + Node.js 的模块系统提供了更好的隔离性

## 模块
每一个文件都是一个模块,并且该文件中定义的变量和函数的作用域仅限于该模块

### 模块通信
传统模块交互模式
+ 导出模块 (moduleA.js):
  ```javascript
  // 方式1: 导出单个值
  module.exports = functionA;

  // 方式2: 导出多个值
  exports.functionA = functionA;
  exports.variableB = variableB;
  ```
+ 导入模块 (moduleB.js):
  ```javascript
  const moduleA = require('./moduleA');

  // 使用导出的内容
  moduleA.functionA();
  console.log(moduleA.variableB);
  ```

### 模块包装机制
Node.js 在执行模块代码前，会将其包装在一个函数中：
```javascript
(function(exports, require, module, __filename, __dirname) {
  // 模块代码实际在这里执行
});
```
这种包装实现了：
* 保持顶层变量作用域在模块内而非全局
* 提供模块专用的变量如 `__filename` 和 `__dirname`
* 确保模块导出机制的一致性