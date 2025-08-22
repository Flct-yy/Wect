# Promise
Promise 是一个表示异步操作最终完成或失败的对象。它解决了传统回调函数的"回调地狱"问题，提供了更清晰的异步代码组织方式。

**Promise 有两个特点：**
* `对象的状态不受外界影响。`只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
* `一旦状态改变，就不会再变，任何时候都可以得到这个结果(状态不可逆)。`Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。`这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。`

**Promise 有三种状态：**
* pending：初始状态，既没有被兑现，也没有被拒绝。在此状态下可以落定 (settled) 为 fulfilled 或 rejected 状态。
* fulfilled：意味着操作成功完成。Promise 被 resolve 后的状态，状态不可再改变，且有一个私有的值 value。
* rejected：意味着操作失败。Promise 被 reject 后的状态，状态不可再改变，且有一个私有的原因 reason。

![alt text](Promise.png)

```
const myPromise = new Promise((resolve, reject) => {
  // 异步操作代码
 
  if (/* 操作成功 */) {
    resolve('成功的结果'); // 将 Promise 状态改为 fulfilled，并传递一个结果值 value。
  } else {
    reject('失败的原因'); // 将 Promise 状态改为 rejected，并传递一个失败原因 reason（通常是 Error 对象或字符串）。
  }
  //resolve 和 reject 是两个由 JavaScript 引擎自动提供的函数，用于控制 Promise 的最终状态


});
```

## Promise 基本用法
* 1.then()  
    处理 Promise 的完成状态
* 2.catch()  
    捕获 Promise 的拒绝状态
* 3.finally()  
    无论成功或失败都会执行  

then、catch 和 finally 序列可以顺序颠倒，效果完全一样。但不建议这样做，最好按 then-catch-finally 的顺序编写程序。

除了 then 块以外，其它两种块可以多次使用，finally 与 then 一样会按顺序执行，但是 catch 块只会执行第一个，除非 catch 块里有异常。所以最好只安排一个 catch 和 finally 块。

Athen 块默认会向下顺序执行，return 是不能中断的，可以通过 throw 来跳转至 catch 实现中断。

```
promise
  .then(value => console.log(value))
  .catch(error => console.error(error))
  .finally(() => console.log('操作完成'));
```

## Promise 链式调用

Promise 的核心优势在于链式调用(调用多个异步操作)：
```
function asyncStep1() {
  return new Promise(resolve => setTimeout(() => resolve(10), 1000));
}

function asyncStep2(value) {
  return new Promise(resolve => setTimeout(() => resolve(value * 2), 500));
}

function asyncStep3(value) {
  return new Promise(resolve => setTimeout(() => resolve(value + 5), 800));
}

asyncStep1()
  .then(result1 => {
    console.log('步骤1结果:', result1);
    return asyncStep2(result1);
  })
  .then(result2 => {
    console.log('步骤2结果:', result2);
    return asyncStep3(result2);
  })
  .then(finalResult => console.log('最终结果:', finalResult))
  .catch(error => console.error('错误:', error));
```

## Promise 构造方法
Promise()

```javascript
new Promise(executor)
new Promise(function(resolve, reject){...})
```
Promise 的参数 executor 是带有 resolve 和 reject 两个参数的函数。而这两个参数也是函数，由 JavaScript 引擎提供，不用开发者部署。

Promise 构造函数执行时立即调用 executor 函数，resolve 和 reject 两个函数作为参数传入 executor （executor 函数会在 Promise 构造函数返回新建对象前被调用，Promise 新建后就会立即执行。）。
executor 内部通常会执行一些异步操作，一旦完成，可以调用 resolve 函数来将 Promise 状态改成 Fulfilled，或者在发生错误时将它的状态改为 Rejected
无法取消 Promise，一旦新建它就会立即执行，无法中途取消
如果不设置回调函数（executor），Promise 内部抛出错误，不会反应到外部
当处于 Pending 状态时，无法得知目前进展到哪一个阶段（无法得知 pending 状态）
```javascript
const promise = new Promise((resolve,reject) => {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

## Promise 静态方法
* Promise.`resolve`(value)

    返回一个状态由给定 value 决定的 Promise 对象。有时需要`将现有对象转为 Promise 对象，Promise.resolve() 方法就起到这个作用。`从 Pending（待定） 变为 Fullfilled（实现），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。该函数的参数除了正常的值以外，还可能是另一个 Promise 实例。`需要注意的是，立即 resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。`

* Promise.`reject`(reason)

    返回一个状态为失败的 Promise 对象。也会返回一个新的 Promise 实例，该实例的状态为 rejected。从 Pending（待定） 变为 Rejected（否决），在异步失败时调用，并将异步操作报出的错误，作为参数传递出去。该函数的参数通常是 Error 对象的实例，表示抛出的错误。

* Promise.`all`(iterable)：所有成功才成功，失败返回第一个失败。

    这个方法返回一个新的 promise 对象，该 promise 对象在 iterable 参数对象里所有的 promise 对象都成功的时候才会触发成功，一旦有任何一个 iterable 里面的 promise 对象失败则立即触发该 promise 对象的失败。如果这个新的 promise 对象触发了失败状态，它会把 iterable 里第一个触发失败的 promise 对象的错误信息作为它的失败错误信息。Promise.all() 方法接受一个数组作为参数，`数组元素都是 Promise 实例，如果不是，就会先调用 Promise.resolve 方法，将参数转为 Promise 实例`，再进一步处理。另外，Promise.all() 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

    iterable 参数对象里所有的 promise 都执行成功时返回一个数组，数组中存放每个 promise 执行成功的结果，传递给新 promise 的回调函数。若有一个 promise 执行失败，此时第一个被 reject 的实例的返回值，传递给新 promise 的回调函数。`一般 Promise.all(iterable) 中的 promise 都是互相有关联的。`
  ```
  Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // results 是一个包含所有 Promise 结果的数组
    console.log(results);
  })
  .catch((error) => {
    // 任一 Promise 失败就会进入这里
    console.error(error);
  });
  ```

* Promise.`allSettled`(iterable) ES2020：所有状态落定才返回，无论成功与失败。

    等到所有 promises 都已敲定（settled）（每个 promise 都已兑现（fulfilled）或已拒绝（rejected））。返回一个 promise，该 promise 在所有 promise 完成后完成。并带有一个对象数组，每个对象对应每个 promise 的结果。当您`有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个 promise 的结果时，通常使用它。`比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个 reject 时立即结束。
  ```
  Promise.race([promise1, promise2, promise3])
  .then((result) => {
    // 使用最先完成的 Promise 的结果
    console.log(result);
  })
  .catch((error) => {
    // 如果最先完成的 Promise 是失败的
    console.error(error);
  });
  ```

* Promise.`race`(iterable)：任意失败或成功，返回第一个落定的，“跑的最快的”

    当 iterable 参数里的任意一个子 promise 被成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应句柄，并返回该 promise 对象。率先改变状态的 Promise 实例返回，不论结果是否成功或失败。
  ```
  Promise.race([promise1, promise2, promise3])
  .then((result) => {
    // 使用最先完成的 Promise 的结果
    console.log(result);
  })
  .catch((error) => {
    // 如果最先完成的 Promise 是失败的
    console.error(error);
  });
  ```

* Promise.`any`(iterable) ES2021：有一个成功即返回，所有失败才返回，与 all 相反。

    接收一个 Promise 对象的集合，当其中的一个 promise 成功，就返回那个成功的 promise 的值。有一个成功或就返回 ，所有失败后才返回失败。本质上，这个方法和 Promise.all() 是相反的。
  ```
  const backups = [
    fetch('/primary-api').catch(() => 'primary failed'),
    fetch('/backup-api1').catch(() => 'backup1 failed'),
    fetch('/backup-api2').catch(() => 'backup2 failed')
  ];

  Promise.any(backups)
    .then(firstSuccess => console.log('成功获取:', firstSuccess))
    .catch(() => console.error('所有请求都失败'));
  ```

## 注意
```javascript
const p1 = new Promise(function(resolve, reject) {
  // ...
});

const p2 = new Promise(function(resolve, reject) {
  // ...
  resolve(p1);
});
```
p1 和 p2 都是 Promise 的实例，但是 p2 的 resolve 方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作。注意，`这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。`如果 p1 的状态是 pending，那么 p2 的回调函数就会等待 p1 的状态改变；如果 p1 的状态已经是 resolved 或者 rejected，那么 p2 的回调函数将会立刻执行。
```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
`调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行。`上面代码中，调用 resolve(1) 以后，后面的 console.log(2) 还是会执行，并且会首先打印出来。这是因为`立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。本轮同步任务(宏任务) 执行完才去执行异步微任务。`
```javascript
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
});
```
一般来说，调用 resolve 或 reject 以后，Promise 的使命就完成了，后继操作应该放到 then 方法里面，而不应该直接写在 resolve 或 reject 的后面。所以，最好在它们前面加上 return 语句，`return 后面的语句不会执行`，这样就不会有意外。

```javascript
const p = Promise.resolve("Hello");

p.then(function(s) {
  console.log(s);
});
// Hello
```

Promise.resolve() 方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then() 方法。上面代码生成一个新的 Promise 对象的实例 p。由于字符串 Hello 不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是 resolved，所以回调函数会立即执行。Promise.resolve() 方法的参数，会同时传给回调函数。

```javascript
setTimeout(function() {
  console.log("three");
}, 0);

Promise.resolve().then(function() {
  console.log("two");
});

console.log("one");

// one
// two
// three
```
`需要注意的是，立即 resolve() 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。`上面代码中， setTimeout(fn, 0) 在下一轮“事件循环”开始时执行，Promise.resolve() 在本轮“事件循环”结束时执行，console.log('one') 则是立即执行，因此最先输出。

```javascript
new Promise((resolve) => {
  setTimeout(() => { throw 'async error' }, 0);
});
```
## Promise 原型

* Promise.prototype.then(onFulfilled, onRejected)

  * then 方法接受两个函数作为参数，且参数可选
  * 如果可选`参数不为函数时会被忽略`
  * 两个函数都是异步执行，会放入事件队列等待下一轮 tick
  * then 函数的返回值为 Promise
  * then 可以被同一个 Promise 多次调用  

  它的作用是为 Promise 实例添加状态改变时的回调函数。添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来 resolve。then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数，它们都是可选的。

  当then中传递的不是函数时，会被忽略，不会执行。继续链式调用，直到链式调用结束，才会执行then中的回调函数。传入非函数会立即执行

* Promise.prototype.catch(onRejected)

  添加一个拒绝(rejection) 回调到当前 promise, 返回一个新的 promise。当这个回调函数被调用，新 promise 将以它的返回值来 resolve，否则如果当前 promise 进入 fulfilled 状态，则以当前 promise 的完成结果作为新 promise 的完成结果.

* Promise.prototype.finally(onFinally) ES2018

  添加一个事件处理回调于当前 promise 对象，并且在原 promise 对象解析完毕后，返回一个新的 promise 对象。回调会在当前 promise 运行完毕后被调用，无论当前 promise 的状态是完成(fulfilled)还是失败(rejected)。finally() 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。finally 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
```javascript
p.then(val => console.log("fulfilled:", val)).catch(err =>
  console.log("rejected", err)
);

// 等同于
p.then(val => console.log("fulfilled:", val)).then(null, err =>
  console.log("rejected:", err)
);

const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error("test");
  } catch (e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 等同于
const promise = new Promise(function(resolve, reject) {
  reject(new Error("test"));
});
promise.catch(function(error) {
  console.log(error);
});
```
如果该对象状态变为 resolved，则会调用 then() 方法指定的回调函数；如果异步操作抛出错误，状态就会变为 rejected，就会调用 catch() 方法指定的回调函数，处理这个错误。另外，then() 方法指定的回调函数，如果运行中抛出错误，也会被 catch() 方法捕获。如果 Promise 状态已经变成 resolved，再抛出错误是无效的。`一般来说，不要在 then() 方法里面定义 Reject 状态的回调函数（即 then 的第二个参数），总是使用 catch 方法。`
```javascript
const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw new Error("test");
  }, 0);
  resolve("ok");
});
promise.then(function(value) {
  console.log(value);
});
// ok
// Uncaught Error: test

const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw new Error("test");
  }, 0);
});

// 保持 pending 状态，并不会触发 catch() 方法。
```
上面代码中，Promise 指定在下一轮“事件循环”(setTimeout是宏任务)再抛出错误。到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。一般总是建议，Promise 对象后面要跟 catch() 方法，这样可以处理 Promise 内部发生的错误。catch() 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then() 方法

## 手撕Promise

```javascript
// 定义Promise的 3 种状态
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

// Promise 构造函数
function Promise(execute) {
  var that = this;
  that.state = PENDING; // 状态初始化

  that.value = undefined; // 成功结果 放在this上便于then访问
  that.reason = undefined; // 失败结果 放在this上便于catch访问

  that.onFulfilledFn = []; // 已兑现回调队列
  that.onRejectedFn = []; // 已拒绝回调队列

  // 这里用 setTimeout 是为了模仿异步微任务，真正的微任务只有通过浏览器底层才可以调用
  function resolve(value) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = FULFILLED;
        // 为了后面在 then 的回调中可以得到 resolve 传递的参数,将其保存在构造函数里。
        that.value = value;
        // 此时 onFulfilledFn 还是空的又怎么执行里面的回调呢？
        // 大家注意看这里我们采用的 setTimeout 异步任务，
        // 虽然没有延时时间但在执行时其还是会被放在宏任务队列里，等待同步任务执行完再执行
        that.onFulfilledFn.forEach(function(f) {
          f(that.value);
        });
      }
    });
  }

  function reject(reason) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.reason = reason;
        that.onRejectedFn.forEach(function(f) {
          f(that.reason);
        });
      }
    });
  }

  try {
    // 把内部的 resolve 和 reject 传入 executor，用户可调用 resolve 和 reject
    execute(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 原型属性(方法) then
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function(x) {
          return x;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(e) {
          throw e;
        };
  var that = this;
  var promise;
  if (that.state === FULFILLED) {
    promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        // onFulfilled有可能执行失败
        try {
          // 判断x返回的是不是一个promise
          var x = onFulfilled(that.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  if (that.state === REJECTED) {
    promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = onRejected(that.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  if (that.state === PENDING) {
    promise = new Promise(function(resolve, reject) {
      that.onFulfilledFn.push(function() {
        try {
          var x = onFulfilled(that.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
      that.onRejectedFn.push(function() {
        try {
          var x = onRejected(that.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  return promise;
};

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError("x 不能与 promise 相等"));
  }
  if (x instanceof Promise) {
    if (x.state === FULFILLED) {
      resolve(x.value);
    } else if (x.state === REJECTED) {
      reject(x.reason);
    } else {
      x.then(function(y) {
        resolvePromise(promise, y, resolve, reject);
      }, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    var executed;
    try {
      var then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function(y) {
            if (executed) return;
            executed = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function(e) {
            if (executed) return;
            executed = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (executed) return;
      executed = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

module.exports = {
  deferred() {
    var resolve;
    var reject;
    var promise = new Promise(function(res, rej) {
      resolve = res;
      reject = rej;
    });
    return {
      promise,
      resolve,
      reject
    };
  }
};

// 静态方法 resolve
Promise.resolve = function(value) {
  if (value instanceof Promise) {
    return value; // 如果是Promise实例直接返回
  }

  return new Promise(function(resolve, reject) {
    resolve(value);
  });
};

// 静态方法 reject
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  });
};

// 原型属性(方法) catch
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

// 原型属性(方法) finally
Promise.prototype.finally = function(fn) {
  return this.then(
    function(value) {
      return Promise.resolve(fn()).then(function() {
        return value;
      });
    },
    function(error) {
      return Promise.resolve(fn()).then(function() {
        throw error;
      });
    }
  );
};

// 静态方法 all
Promise.all = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;
    if (length === 0) {
      return resolve(result);
    }
    // promiseArr 不一定是数组，可以是任何迭代器，所以用for...of更好
    for (let [i, p] of promiseArr.entries()) {
      // 这里不直接promiseArr[i].then是为了防止传入的不是Promsie对象的情况
      Promise.resolve(p).then(
        function(data) {
          result[i] = data;
          count++;
          if (count === length) {
            resolve(result);
          }
        },
        function(reason) {
          reject(reason);
        }
      );
    }
  });
};

// 静态方法 race
Promise.race = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    if (length === 0) {
      return resolve();
    }

    for (let item of promiseArr) {
      Promise.resolve(item).then(
        function(value) {
          return resolve(value);
        },
        function(reason) {
          return reject(reason);
        }
      );
    }
  });
};

// 静态方法 any
Promise.any = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;
    if (length === 0) {
      return resolve(result);
    }

    for (let [i, p] of promiseArr.entries()) {
      Promise.resolve(p).then(
        value => {
          return resolve(value);
        },
        reason => {
          result[i] = reason;
          count++;
          if (count === length) {
            reject(result);
          }
        }
      );
    }
  });
};

// 静态方法 allSettled
Promise.allSettled = function(promiseArr) {
  return new Promise(function(resolve) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;

    if (length === 0) {
      return resolve(result);
    } else {
      for (let [i, p] of promiseArr.entries()) {
        Promise.resolve(p).then(
          value => {
            result[i] = { status: "fulfilled", value: value };
            count++;
            if (count === length) {
              return resolve(result);
            }
          },
          reason => {
            result[i] = { status: "rejected", reason: reason };
            count++;
            if (count === length) {
              return resolve(result);
            }
          }
        );
      }
    }
  });
};

// 使用 Promise.finally 实现 Promise.allSettled
Promise.allSettled = function(promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises];
  const promiseArr = Array.from(promises);
  return new Promise(resolve => {
    const result = [];
    const len = promiseArr.length;
    let count = len;
    if (len === 0) {
      return resolve(result);
    }
    for (let i = 0; i < len; i++) {
      promiseArr[i]
        .then(
          value => {
            result[i] = { status: "fulfilled", value: value };
          },
          reason => {
            result[i] = { status: "rejected", reason: reason };
          }
        )
        .finally(() => {
          if (!--count) {
            resolve(result);
          }
        });
    }
  });
};

// 使用 Promise.all 实现 Promise.allSettled
Promise.allSettled = function(promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises];
  const promiseArr = Array.from(promises);
  return Promise.all(
    promiseArr.map(p =>
      Promise.resolve(p).then(
        res => {
          return { status: "fulfilled", value: res };
        },
        error => {
          return { status: "rejected", reason: error };
        }
      )
    )
  );
};
```

## 实现并行限制的 Promise 调度器
实现有并行限制的 Promise 调度器问题。一个任务并发控制器，要求每次都有两个任务在执行：

```javascript
class Scheduler {
  constructor() {
    this.queue = []; // 任务队列
    this.maxCount = 2; // 最大并行数
    this.runCounts = 0; // 跑了几个任务了
  }
  add(promiseCreator) {
    //push尾部添加
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    // 不同情况要改造
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--; // 这里 this.queue.shift() 和 !this.queue || !this.queue.length 可以用这种办法
        this.request();
      });
  }
}

const timeout = time =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => {
    return timeout(time).then(() => {
      console.log(order);
    });
  });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
//先进入1(1000ms)2(500ms)
//2执行完3(300ms)进入
//1比4(400ms)先执行完

// 2
// 3
// 1
// 4
```

## 实现 Ajax 并发请求控制
实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：

* *求最大并发数 maxNum
* *当有一个请求返回，就留下一个空位，可以增加新的请求
* *有请求完成后，结果按照 urls 里面的顺序依次打出
* *ltiRequest 可以返回一个 promise 或者 直接执行 callback 回调

```javascript
function multiRequest(urls = [], maxNum, callback) {
  const len = urls.length;
  const result = new Array(len).fill(false);
  let runCount = 0;
  return new Promise((resolve, reject) => {
    // 最多同时发送maxNum个请求
    while (runCount < maxNum) {
      sendRequest();
    }
    function sendRequest() {
      let curCount = runCount; // curCount 从 0 开始是 urls 的下标
      runCount++;
      if (runCount >= len) {
        callback(result); // 可以执行回调
        resolve(result); // 也可以返回一个新 promise
        return
      }
      console.log(`开始发送第 ${curCount} 个请求`);
      let curUrl = urls[curCount];
      fetch(curUrl)
        .then(value => {
          console.log(`第 ${curCount} 个请求：${value} 成功了！`);
          result[curCount] = `${value} 成功`;
        })
        .catch(reason => {
          console.log(`第 ${curCount} 个请求：${reason} 失败了！`);
          result[curCount] = `${reason} 失败`;
        })
        .finally(() => {
          if (runCount < len) {
            sendRequest();
          }
        });
    }
  });
}
```

## Promise 对象实现 Ajax 操作

```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });

  return promise;
};

getJSON("/posts.json").then(
  function(json) {
    console.log("Contents: " + json);
  },
  function(error) {
    console.error("出错了", error);
  }
);
```