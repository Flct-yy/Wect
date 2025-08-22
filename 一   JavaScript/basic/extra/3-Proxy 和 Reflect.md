# JavaScript Proxy 和 Reflect 深度解析

Proxy 和 Reflect 是 ES6 引入的强大元编程特性，它们赋予开发者**拦截和自定义对象基本操作**的能力，开启了 JavaScript 元编程的新时代。

## 一、Proxy：对象代理

### 1. 核心概念
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

Proxy 允许你创建一个对象的代理，拦截并自定义对象的基本操作（如属性访问、赋值、枚举等）。

new Proxy() 表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象(包括函数)，handler 参数也是一个对象，用来定制拦截行为。

```javascript
const target = {}; // 目标对象
const handler = {}; // 处理程序对象
const proxy = new Proxy(target, handler); // 创建代理
```
### 2. 实例方法

+ `get(target, propKey, receiver)`

  拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，通过 Proxy 对象访问该属性会报错。

+ `set(target, propKey, value, receiver)`
  拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。

  set 方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。如果目标对象自身的某个属性不可写，那么 set 方法将不起作用。严格模式下，set 代理如果没有返回 true，就会报错。

+ `has(target, propKey)`

  拦截 propKey in proxy 的操作，返回一个布尔值。用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是 in 运算符。has()方法可以接受两个参数，分别是目标对象、需查询的属性名。has() 方法拦截的是 HasProperty 操作，而不是 HasOwnProperty 操作，即 has() 方法不判断一个属性是对象自身的属性，还是继承的属性。另外，虽然 for...in 循环也用到了 in 运算符，但是 has() 拦截对 for...in 循环不生效。

+ `deleteProperty(target, propKey)`
  拦截 delete proxy[propKey] 的操作，返回一个布尔值。

+ `ownKeys(target)`
  
  拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys() 的返回结果仅包括目标对象自身的可遍历属性。

+ `getOwnPropertyDescriptor(target, propKey)`
  
  拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

+ `defineProperty(target, propKey, propDesc)`
  
  拦截 Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

+ `preventExtensions(target)`
  
  拦截 Object.preventExtensions(proxy)，返回一个布尔值。

+ `getPrototypeOf(target)`
  
  拦截 Object.getPrototypeOf(proxy)，返回一个对象。

+ `isExtensible(target)`
  
  拦截 Object.isExtensible(proxy)，返回一个布尔值。

+ `setPrototypeOf(target, proto)`
  
  拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

+ `apply(target, object, args)`
  
  拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

+ `construct(target, args)`
  
  拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。 construct() 方法用于拦截 new 命令。

### 3. 常用拦截操作（Traps）

#### 属性访问拦截
参数|	类型|	描述
---|---|---
target|	Object|	被代理的原始对象
property|	String/Symbol|	要设置的属性名（键）
value|	Any|	要赋给属性的新值
receiver|	Object|	最初被调用的对象（通常是代理本身或继承对象）



```javascript
const handler = {
  get(target, property, receiver) {
    console.log(`访问属性: ${property}`);
    return Reflect.get(...arguments);
  },
  
  set(target, property, value, receiver) {
    console.log(`设置属性: ${property} = ${value}`);
    return Reflect.set(...arguments);
  }
};

const user = new Proxy({}, handler);
user.name = 'Alice'; // 设置属性: name = Alice
console.log(user.name); // 访问属性: name → Alice
```

#### 其他常用拦截器
```javascript
const advancedHandler = {
  // 拦截 in 操作符
  has(target, prop) {
    return prop.startsWith('_') ? false : Reflect.has(...arguments);
  },
  
  // 拦截删除操作
  deleteProperty(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error(`不能删除私有属性: ${prop}`);
    }
    return Reflect.deleteProperty(...arguments);
  },
  
  // 拦截 Object.keys() 等操作
  ownKeys(target) {
    return Reflect.ownKeys(target).filter(key => !key.startsWith('_'));
  },
  
  // 拦截函数调用
  apply(target, thisArg, argumentsList) {
    console.log(`调用函数: ${target.name}(${argumentsList.join(', ')})`);
    return Reflect.apply(...arguments);
  },
  
  // 拦截 new 操作符
  construct(target, args, newTarget) {
    console.log(`创建实例: ${target.name}`);
    return Reflect.construct(...arguments);
  }
};
```

### 4. 使用场景

#### 数据验证
```javascript
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value < 0 || value > 120) {
        throw new TypeError('年龄必须是0-120之间的数字');
      }
    }
    return Reflect.set(target, prop, value);
  }
};

const person = new Proxy({}, validator);
person.age = 30; // OK
person.age = 'thirty'; // TypeError: 年龄必须是0-120之间的数字
```

#### 自动填充对象
```javascript
const autoFiller = {
  get(target, prop) {
    if (!(prop in target)) {
      target[prop] = `自动生成:${prop}`;
    }
    return target[prop];
  }
};

const obj = new Proxy({}, autoFiller);
console.log(obj.newProperty); // "自动生成:newProperty"
```

#### 负索引数组
```javascript
function createNegativeArray(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      const index = Number(prop);
      if (index < 0) {
        prop = String(target.length + index);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}

const arr = createNegativeArray(['a', 'b', 'c']);
console.log(arr[-1]); // "c"
console.log(arr[-2]); // "b"
```

## 二、definePropety 与 proxy

### 1. definePropety

ES5 提供了 Object.defineProperty 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。
```javascript
Object.defineProperty(obj, prop, descriptor)

obj: 要在其上定义属性的对象。
prop:  要定义或修改的属性的名称。
descriptor: 将被定义或修改的属性的描述符。

// 例如
var obj = {};
Object.defineProperty(obj, "num", {
    value : 1,
    writable : true,
    enumerable : true,
    configurable : true
});
//  对象 obj 拥有属性 num，值为 1
```
虽然我们可以直接添加属性和值，但是使用这种方式，我们能进行更多的配置。

函数的第三个参数 descriptor 所表示的属性描述符有两种形式：`数据描述符和存取描述符`

两者均具有以下两种键值：

* configurable 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。
* enumerable 当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。 数据描述符同时具有以下可选键值：
* value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
* writable 当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。 存取描述符同时具有以下可选键值：
* get 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
* set 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。 值得注意的是：

`属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者` 。这就意味着你可以：
```javascript
Object.defineProperty({}, "num", {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
});
```
也可以：
```javascript
var value = 1;
Object.defineProperty({}, "num", {
    get : function(){
      return value;
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
});
```
但是不可以：
```javascript
// 报错
Object.defineProperty({}, "num", {
    value: 1,
    get: function() {
        return 1;
    }
});
```
此外，所有的属性描述符都是非必须的，但是 descriptor 这个字段是必须的，如果不进行任何配置，你可以这样：

```javascript
var obj = Object.defineProperty({}, "num", {});
console.log(obj.num); // undefined
```

### 2. Setters 和 Getters

之所以讲到 defineProperty，是因为我们要使用存取描述符中的 get 和 set，这两个方法又被称为 getter 和 setter。由 getter 和 setter 定义的属性称做”存取器属性“。

当程序查询存取器属性的值时，JavaScript 调用 getter方法。这个方法的返回值就是属性存取表达式的值。当程序设置一个存取器属性的值时，JavaScript 调用 setter 方法，将赋值表达式右侧的值当做参数传入 setter。从某种意义上讲，这个方法负责“设置”属性值。可以忽略 setter 方法的返回值。

举个例子：
```javascript
var obj = {}, value = null;
Object.defineProperty(obj, "num", {
    get: function(){
        console.log('执行了 get 操作')
        return value;
    },
    set: function(newValue) {
        console.log('执行了 set 操作')
        value = newValue;
    }
})

obj.num = 1 // 执行了 set 操作

console.log(obj.num); // 执行了 get 操作 // 1
```

### 3. proxy
使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。

使用 proxy 再来写一下 watch 函数:
```javascript
//IIFE立即执行函数 用于封装代码,避免污染全局作用域
(function() {
    var root = this;

    function watch(target, func) {

        var proxy = new Proxy(target, {
            get: function(target, prop) {
                return target[prop];
            },
            set: function(target, prop, value) {
                target[prop] = value;
                func(prop, value);
            }
        });

        return proxy;
    }

    //this 指向全局作用域 将watch暴露给全局作用域
    this.watch = watch;
})()

var obj = {
    value: 1
}

var newObj = watch(obj, function(key, newvalue) {
    //监听value属性变化
    if (key == 'value') document.getElementById('container').innerHTML = newvalue;
})

document.getElementById('button').addEventListener("click", function() {
    newObj.value += 1
    // 点击按钮后，页面显示改变
});
```
我们也可以发现，使用 defineProperty 和 proxy 的区别，当使用 defineProperty，我们修改原来的 obj 对象就可以触发拦截，而使用 proxy，就`必须修改代理对象`，即 Proxy 的实例才可以触发拦截。



## 三、Reflect：反射 API

### 1. 核心概念
Reflect 提供了一套**操作对象的静态方法**，这些方法与 Proxy 的拦截器方法一一对应。Reflect 不是一个函数对象，因此它是不可构造的。

1. 将 Object 对象的一些明显属于 `语言内部` 的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
1. 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc) 在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc) 则会返回 false。
1. 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name) 和 Reflect.deleteProperty(obj, name) 让它们变成了函数行为。
1. `Reflect 对象的方法与 Proxy 对象的方法一一对应`，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在Reflect 上获取默认行为。

### 2. 静态方法

| 方法 | 等效操作 | 描述 |
|------|----------|------|
| `Reflect.get(target, name, receiver)` | `obj[prop]` | 获取属性值 |
| `Reflect.set(target, name, value, receiver)` | `obj[prop] = value` | 设置属性值 |
| `Reflect.has(target, name)` | `prop in obj` | 检查属性是否存在 |
| `Reflect.deleteProperty(target, name)` | `delete obj[prop]` | 删除属性 |
| `Reflect.ownKeys(target)` | `Object.keys()` | 获取所有属性键 |
| `Reflect.construct(target, args)` | `new Fn()` | 创建实例 |
| `Reflect.apply(target, thisArg, args)` | `fn.apply()` | 调用函数 |

* Reflect.defineProperty(target, name, desc)
* Reflect.isExtensible(target)
* Reflect.preventExtensions(target)
* Reflect.getOwnPropertyDescriptor(target, name)
* Reflect.getPrototypeOf(target)
* Reflect.setPrototypeOf(target, prototype)

### 3. Reflect 的优势

#### 更一致的 API
```javascript
// 传统方式
const obj = {};
Object.defineProperty(obj, 'name', { value: 'Alice' });

// Reflect 方式
Reflect.defineProperty(obj, 'age', { value: 30 });
```

#### 安全的函数调用
```javascript
function greet(name) {
  return `Hello, ${name}`;
}

// 传统方式可能出错
const result1 = greet.apply(null, ['Alice']);

// Reflect 更安全
const result2 = Reflect.apply(greet, null, ['Bob']);
```

#### 布尔返回值
```javascript
const obj = Object.freeze({ name: 'Alice' });

// 传统删除
delete obj.name; // 静默失败（严格模式报错）

// Reflect 返回操作结果
const success = Reflect.deleteProperty(obj, 'name');
console.log(success); // false
```

## 四、Proxy 和 Reflect 协同工作

### 1. 最佳实践模式
```javascript
const logger = {
  get(target, prop, receiver) {
    console.log(`获取: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  
  set(target, prop, value, receiver) {
    console.log(`设置: ${prop} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const data = new Proxy({}, logger);
data.name = 'Test'; // 设置: name = Test
console.log(data.name); // 获取: name → Test
```

### 2. 实现观察者模式
```javascript
function createObservable(target, callback) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const oldValue = obj[prop];
      const success = Reflect.set(obj, prop, value);
      if (success && oldValue !== value) {
        callback(prop, oldValue, value);
      }
      return success;
    }
  });
}

const user = createObservable({}, (prop, oldVal, newVal) => {
  console.log(`属性 ${prop} 从 ${oldVal} 变为 ${newVal}`);
});

user.name = 'Alice'; // 属性 name 从 undefined 变为 Alice
user.age = 30; // 属性 age 从 undefined 变为 30
user.age = 31; // 属性 age 从 30 变为 31
```

## 五、高级应用场景

### 1. 实现不可变对象
```javascript
function createImmutable(obj) {
  return new Proxy(obj, {
    set() {
      throw new Error('对象不可修改');
    },
    deleteProperty() {
      throw new Error('对象不可修改');
    },
    defineProperty() {
      throw new Error('对象不可修改');
    },
    setPrototypeOf() {
      throw new Error('对象不可修改');
    }
  });
}

const immutable = createImmutable({ value: 42 });
immutable.value = 100; // Error: 对象不可修改
```

### 2. API 接口代理
```javascript
const apiHandler = {
  get(target, endpoint) {
    return async function(params = {}) {
      console.log(`调用接口: /${endpoint}`);
      const response = await fetch(`https://api.example.com/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(params)
      });
      return response.json();
    };
  }
};

const api = new Proxy({}, apiHandler);

// 使用示例
async function getUserData() {
  const user = await api.user({ id: 123 }); // 调用接口: /user
  const posts = await api.posts({ userId: user.id }); // 调用接口: /posts
  return { user, posts };
}
```

### 3. 自动性能监控
```javascript
function monitorPerformance(fn) {
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const start = performance.now();
      const result = Reflect.apply(target, thisArg, args);
      const duration = performance.now() - start;
      console.log(`${fn.name} 执行时间: ${duration.toFixed(2)}ms`);
      return result;
    }
  });
}

// 使用示例
const heavyCalculation = monitorPerformance(function(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += Math.sin(i);
  return sum;
});

heavyCalculation(1000000); // 控制台输出执行时间
```

### 4. 智能缓存系统
```javascript
function createCached(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args);
      
      if (cache.has(key)) {
        console.log(`缓存命中: ${key}`);
        return cache.get(key);
      }
      
      const result = Reflect.apply(target, thisArg, args);
      cache.set(key, result);
      return result;
    }
  });
}

// 使用示例
const factorial = createCached(function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});

console.log(factorial(5)); // 计算并缓存
console.log(factorial(5)); // 从缓存获取
```

## 六、注意事项与最佳实践

### 1. 性能考量
- **代理有开销**：每个代理操作都会增加额外处理时间
- **避免深层代理**：只在必要时创建代理
- **基准测试**：在性能敏感场景进行测试

### 2. 透明性挑战
```javascript
const target = {};
const proxy = new Proxy(target, {});
console.log(proxy instanceof Proxy); // TypeError: 无法通过 instanceof 检测代理
```

### 3. 最佳实践
1. **结合 Reflect 使用**：确保正确传递上下文
2. **避免修改原始对象**：保持代理和目标分离
3. **谨慎使用撤销代理**：
   ```javascript
   const { proxy, revoke } = Proxy.revocable({}, {});
   revoke(); // 禁用代理
   proxy.name = 'test'; // TypeError: 无法在已撤销的代理上执行操作
   ```
4. **清晰的错误处理**：
   ```javascript
   const safeProxy = new Proxy({}, {
     get(target, prop) {
       try {
         return Reflect.get(...arguments);
       } catch (error) {
         console.error(`访问 ${prop} 失败`, error);
         return null;
       }
     }
   });
   ```

### 4. 适用场景
- ✅ 数据验证和格式化
- ✅ 观察者/发布订阅系统
- ✅ API 封装和拦截
- ✅ 创建特殊数据结构
- ❌ 高性能计算（避免过度使用）
- ❌ 简单对象操作（直接操作更高效）

## 七、浏览器支持与兼容性

- **现代浏览器**：Chrome 49+、Firefox 42+、Safari 10+、Edge 12+
- **Node.js**：6.0.0 及以上版本
- **旧环境**：通过 Babel 的 `@babel/plugin-proxy` 进行转换
- **Polyfill**：core-js 提供部分功能支持

Proxy 和 Reflect 为 JavaScript 带来了前所未有的元编程能力，使开发者能够创建更灵活、更强大的抽象层。合理使用这些特性可以显著提升代码的表达力和可维护性，但需注意性能影响和适用场景。