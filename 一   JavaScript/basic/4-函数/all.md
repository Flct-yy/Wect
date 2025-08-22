# 函数
## 概念
函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。

**特性**:
* 可重复使用的代码块
* 可以接受参数和返回值
* 具有自己的作用域
* 可以作为值传递(函数式编程基础)
## 自定义函数
1. 函数声明
```
function add(a, b) {
  return a + b;
}
```
2. 函数表达式
```
const multiply = function(a, b) {
  return a * b;
};
```
3. 箭头函数 (ES6)
```
const divide = (a, b) => a / b;
```
4. 构造函数 (不推荐)
```
const subtract = new Function('a', 'b', 'return a - b');
```
5. 生成器函数 (ES6)
```
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}
```
6. 异步函数 (ES7)
```
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
```
## 函数参数

### 默认参数
```
function add(a, b = 0) {
  //y = y || 0;也可以用这个方式设置默认值

  return a + b;
}


add(1); // 1
add(1, 2); // 3
```

### arguments 对象
JavaScript 函数有个内置的对象 arguments 对象。  
arguments 对象包含了函数调用的参数数组。  

## 调用方式

### 自调用
```
(function() {
  console.log('I am a self-invoking function');
})();
```

### 全局调用
```
function showMessage() {
  console.log('Global context:', this);
}

showMessage(); // 浏览器中this指向window，Node.js中指向global
```

### 构造函数调用
```
function Person(name) {
  this.name = name;
}

const john = new Person('John'); // this指向新创建的对象
```
### 函数方法调用
```
const calculator = {
  add: function(a, b) {
    return a + b;
  }
};

calculator.add(2, 3); // this指向calculator对象
```
### apply/call/bind
apply、call 和 bind 是用于 显式绑定函数执行时的 this 值 的方法。
```
function introduce(lang) {
  console.log(`I speak ${lang} and my name is ${this.name}`);
}

const person = { name: 'Alice' };

// call - 参数逐个传递
introduce.call(person, 'English'); 

// apply - 参数作为数组传递
introduce.apply(person, ['Spanish']);

// bind - 创建新函数并永久绑定this
const boundFunc = introduce.bind(person);
boundFunc('French');
```
## 高级函数特性
1. 默认参数 (ES6)
2. 剩余参数 (Rest Parameters)
3. 参数解构
4. 高阶函数
    ```
    可以接收函数作为参数和/或返回函数作为结果的函数。
    高阶函数满足以下至少一个条件：
        接受一个或多个函数作为参数
        返回一个函数作为结果
    function multiplyBy(factor) {
      return function(number) {
        return number * factor;
      };
    }

    const double = multiplyBy(2);
    console.log(double(5)); // 10
    ```
    高阶函数实例:   
    **缓存函数**
    ```
    function memoize(fn) {
      const cache = new Map();
      return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
          return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
      };
    }
    ```
    重试机制
    ```
    function withRetry(fn, maxRetries = 3) {
      return async function(...args) {
        let lastError;
        for (let i = 0; i < maxRetries; i++) {
          try {
            return await fn(...args);
          } catch (error) {
            lastError = error;
            await new Promise(resolve => setTimeout(resolve, 1000 * i));
            //实现指数退避等待(第一次1秒，第二次2秒，第三次3秒)
          }
        }
        throw lastError;
      };
    }
    ```


5. 函数柯里化(也是高阶函数)  
    柯里化（Currying） 函数 curry，它可以将一个多参数函数转换为一系列单参数函数的链式调用。
    ```
    addThree(a, b, c)  // 普通调用
    curriedAdd(a)(b)(c) // 柯里化调用
    curriedAdd(1, 2)(3);    // 6（混合调用）
    curriedAdd(1)(2, 3);    // 6（混合调用）
    curriedAdd(1, 2, 3);    // 6（直接调用）
    ```

    **curry 函数**

    ```
    function curry(fn) {
      return function curried(...args) {
        if (args.length >= fn.length) {
          // 如果传入的参数数量 >= 原函数的参数数量，直接调用原函数
          return fn.apply(this, args);
        } else {
          // 否则，返回一个新函数，继续接收剩余参数
          return function(...args2) {
            return curried.apply(this, args.concat(args2));
          };
        }
      };
    }
    fn.length 是原函数的形参数量（如 addThree 的 length 是 3）。

    curried 是柯里化后的函数，它会检查当前传入的参数数量：

    如果参数足够（args.length >= fn.length），直接调用原函数 fn。
    ```
