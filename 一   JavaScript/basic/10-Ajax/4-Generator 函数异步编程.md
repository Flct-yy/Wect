# 基本概念
Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会`返回一个遍历器对象`。也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

Generator 函数是一个普通函数，但是有两个特征：

* function 关键字与函数名之间有一个星号(*)；
* 函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。

必须调用遍历器对象的 next 方法，使得指针移向下一个状态。换言之，Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

### 小结 Generator 基本概念
  * 状态机，封装了多个内部状态；
  * 返回一个遍历器对象，通过改对象可以一次遍历 Generator 函数内部的每一个状态
  * 带 * 号，yeild 表达式定义不同的内部状态；
  * 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象；
  * Generator 函数是分段执行的，`yield 表达式是暂停执行的标记，而 next 方法可以恢复执行`
# yield 与 next
## yield
yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。yield 表达式本身没有返回值，或者说总是返回 undefined。next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。

yield 表达式与 return 语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于`每次遇到 yield，函数暂停执行`，下一次再从该位置继续向后执行，`而 return 语句不具备位置记忆的功能`。一个函数里面，只能执行一次（或者说一个）return 语句，但是可以执行多次（或者说多个）yield 表达式。正常函数只能返回一个值，因为只能执行一次 return。

## next
`next()` 方法返回值：`{ value: undefined, done: true/false }`

通过 next 方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值(第二次传参)。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

由于 next 方法的参数表示上一个 yield 表达式的返回值，所以在第一次使用 next 方法时，传递参数是无效的。V8 引擎直接忽略第一次使用 next 方法时的参数，只有从第二次使用 next 方法开始，参数才是有效的。`从语义上讲，第一个 next 方法用来启动遍历器对象，所以不用带有参数。`

遍历器对象的 next 方法的运行逻辑如下：

* （1）遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。
* （2）下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。
* （3）如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。
* （4）如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。

# 与 Iterator 接口的关系
任意一个对象的 `Symbol.iterator` 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 `Symbol.iterator` 属性，从而使得该对象具有 Iterator 接口。
```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable]; // [1, 2, 3]
```
# Generator 原型上的方法
### Generator.prototype.throw()
Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。throw 方法可以接受一个参数，该参数会被 catch 语句接收，建议抛出 Error 对象的实例。如果 Generator 函数内部没有部署 `try...catch` 代码块，那么 throw 方法抛出的错误，将被外部 `try...catch` 代码块捕获。

### Generator.prototype.return()
Generator 函数返回的遍历器对象，还有一个 return() 方法，可以返回给定的值，并且终结遍历 Generator 函数。

  #### next()、throw()、return() 的共同点

    它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。

    next() 是将 yield 表达式替换成一个值。如果 next 方法没有参数，就相当于替换成 undefined。
    throw() 是将 yield 表达式替换成一个 throw 语句。
    return() 是将 yield 表达式替换成一个 return 语句。

# Generator 的自动执行
Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权，Generator 才可以自动执行。
## 多个异步任务
```javascript
var fetch = require("node-fetch");

function* gen() {
  var r1 = yield fetch("https://api.github.com/users/github");
  var r2 = yield fetch("https://api.github.com/users/github/followers");
  var r3 = yield fetch("https://api.github.com/users/github/repos");
}

// 利用递归封装一个多个异步任务执行函数
function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);

    if (result.done) return;

    // 执行 g.next()，yield 返回的是一个 Promise 对象。
    // 给这个 Promise 对象添加 then 方法，当异步操作成功时执行 then 中的 onFullfilled 函数，
    // onFullfilled 函数中又去执行 g.next，从而让 Generator 继续执行，然后再返回一个 Promise，
    // 再在成功时执行 g.next，然后再返回……
    result.value
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        next(data);
      });
  }

  next();
}

// 执行多个异步任务
run(gen);
```

# 手撕 Generator
Generator 的简单实现
```javascript
function webCanteenGenerator(list) {
  var index = 0;
  var len = list.length;
  return {
    next: function() {
      var done = index >= len;
      var value = !done ? list[index++] : undefined;
      return {
        done: done,
        value: value
      };
    }
  };
}
```