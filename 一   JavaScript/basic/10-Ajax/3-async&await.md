# async/await

Generator 缺陷：

* 函数外部无法捕获异常
* 多个 yield 会导致调试困难

async 函数对 Generator 函数改进如下：
* 内置执行器
* 更好的语义
* 更广的适用性
* 返回值是 Promise

## async/await 基础

`async/await 做的事情就是将 Generator 函数转换成 Promise，说白了，async 函数就是 Generator 函数的语法糖，await 命令就是内部 then 命令的语法糖。`async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await，仅此而已。其实 async 函数的实现原理，就是将 Generator 函数和自动执行器(比如 co)，包装在一个函数里。

async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。

async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到。

async 是一种语法，Promise 是一个内置对象，两者并不具备可比性，更何况 async 函数也返回一个 Promise 对象。

### async 函数
* 使用 async 关键字声明函数
* 返回值总是被包装为 Promise
* 函数内部可以使用 await

```
async function fetchData() {
  return 'Data fetched';
}

// 等同于
function fetchData() {
  return Promise.resolve('Data fetched');
}

// 使用
fetchData().then(console.log); // "Data fetched"
```

### await 表达式
* 只能在 async 函数内部使用
* 暂停函数执行，等待 Promise 完成
* 返回 Promise 的结果
* 如果 Promise 被拒绝，则抛出异常

```
async function getUser() {
  const response = await fetch('/api/user');
  const data = await response.json();
  return data;
}
```

## 错误处理
### 1. try/catch 方式（推荐）
```
async function loadData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('网络响应异常');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
    // 返回默认值或重新抛出
    return { error: true, message: error.message };
  }
}
```
### 2. 使用 .catch() 方法
```
async function loadData() {
  const response = await fetch('/api/data').catch(handleError);
  if (!response) return;
  
  const data = await response.json().catch(handleError);
  return data;
}

function handleError(error) {
  console.error('发生错误:', error);
  // 可返回替代值
  return null;
}
```

## 手撕 async/await

```javascript
function asyncToGenerator(generatorFn) {
  // 返回的是一个新的函数
  return function() {
    // 先调用generator函数 生成迭代器
    var gen = generatorFn.apply(this, arguments);
    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    return new Promise(function(resolve, reject) {
      // 内部定义一个 step 函数 用来一步一步的跨过 yield 的阻碍
      // key 有 next 和 throw 两种取值，分别对应了gen 的 next 和 throw 方法
      // arg 参数则是用来把 promise resolve 出来的值交给下一个 yield
      function step(key, arg) {
        // 这个方法需要包裹在 try/catch 中
        // 如果报错了就把 promise 给 reject 掉, 外部通过.catch可以获取到错误
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}
```


