# JavaScript Symbol 深度解析

Symbol 是 ES6 引入的一种**新的原始数据类型**，用于创建唯一的标识符。它是 JavaScript 的第 7 种数据类型（前 6 种是：undefined、null、布尔值、字符串、数值、对象）。

## 一、核心特性

### 1. 创建 Symbol
```javascript
// 基本创建方式
const sym1 = Symbol();
const sym2 = Symbol('description'); // 带描述符

console.log(typeof sym1); // "symbol"
console.log(sym2.toString()); // "Symbol(description)"
```

### 2. 唯一性
```javascript
const sym3 = Symbol('id');
const sym4 = Symbol('id');

console.log(sym3 === sym4); // false
console.log(Symbol() === Symbol()); // false
```

### 3. 不可变性
Symbol 值一旦创建就**不可更改**：
```javascript
const sym = Symbol();
sym.description = 'changed'; // 静默失败
console.log(sym.description); // undefined（原始描述符不变）
```

## 二、Symbol 的描述符

### 1. 访问描述符
```javascript
const sym = Symbol('user_id');
console.log(sym.description); // "user_id" (ES2019)
```

### 2. 描述符的作用
```javascript
const errorSymbol = Symbol('Error: Invalid input');
console.log(errorSymbol); // Symbol(Error: Invalid input)
```

## 三、Symbol 作为对象属性

### 1. 基本用法
```javascript
const id = Symbol('id');
const user = {
    name: 'Alice',
    [id]: 12345 // 使用 Symbol 作为键
};

console.log(user[id]); // 12345
```

### 2. 不可枚举性
```javascript
const age = Symbol('age');
const person = {
    name: 'Bob',
    [age]: 30
};

// 常规方法无法访问 Symbol 属性
console.log(Object.keys(person)); // ["name"]
console.log(JSON.stringify(person)); // {"name":"Bob"}

// 专门方法访问 Symbol 属性
console.log(Object.getOwnPropertySymbols(person)); // [Symbol(age)]
```

## 四、全局 Symbol 注册表

### 1. Symbol.for()
```javascript
// 创建或获取全局 Symbol
const globalSym1 = Symbol.for('app_id');
const globalSym2 = Symbol.for('app_id');

console.log(globalSym1 === globalSym2); // true
```

### 2. Symbol.keyFor()
```javascript
// 获取全局 Symbol 的键
const symKey = Symbol.keyFor(globalSym1);
console.log(symKey); // "app_id"

// 非全局 Symbol 返回 undefined
console.log(Symbol.keyFor(Symbol())); // undefined
```

## 五、内置 Symbol (Well-known Symbols)

### 1. Symbol.iterator
```javascript
const customIterable = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
};

console.log([...customIterable]); // [1, 2, 3]
```

### 2. Symbol.toStringTag
```javascript
class CustomClass {
    get [Symbol.toStringTag]() {
        return 'MyCustomClass';
    }
}

const obj = new CustomClass();
console.log(obj.toString()); // [object MyCustomClass]
```

### 3. Symbol.hasInstance
```javascript
class MyArray {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance);
    }
}

console.log([] instanceof MyArray); // true
console.log({} instanceof MyArray); // false
```

### 4. 其他重要内置 Symbol
| Symbol | 用途 |
|--------|------|
| `Symbol.match` | 自定义字符串匹配行为 |
| `Symbol.replace` | 自定义字符串替换方法 |
| `Symbol.search` | 自定义字符串搜索方法 |
| `Symbol.split` | 自定义字符串分割方法 |
| `Symbol.species` | 指定派生对象的构造函数 |
| `Symbol.toPrimitive` | 自定义对象转原始值的行为 |
| `Symbol.isConcatSpreadable` | 控制数组连接时的展开行为 |

## 六、实际应用场景

### 1. 避免属性冲突
```javascript
// 第三方库1
const library1 = (function() {
    const internalKey = Symbol('internal');
    return {
        setValue(obj, value) {
            obj[internalKey] = value;
        },
        getValue(obj) {
            return obj[internalKey];
        }
    };
})();

// 第三方库2
const library2 = (function() {
    const internalKey = Symbol('internal');
    return {
        process(obj) {
            if (obj[internalKey]) {
                // 不会干扰 library1 的数据
            }
        }
    };
})();

const obj = {};
library1.setValue(obj, 'secret1');
library2.process(obj); // 互不干扰
```

### 2. 定义枚举类型
```javascript
const LogLevel = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
    ERROR: Symbol('error')
};

function log(message, level = LogLevel.INFO) {
    if (level === LogLevel.DEBUG) {
        console.debug(message);
    } else if (level === LogLevel.ERROR) {
        console.error(message);
    }
    // ...
}
```

### 3. 实现私有属性（伪私有）
```javascript
const Person = (() => {
    const privateProps = {
        age: Symbol('age'),
        salary: Symbol('salary')
    };

    return class Person {
        constructor(name, age, salary) {
            this.name = name;
            this[privateProps.age] = age;
            this[privateProps.salary] = salary;
        }

        getAge() {
            return this[privateProps.age];
        }
    };
})();

const john = new Person('John', 30, 5000);
console.log(john.name); // "John"
console.log(john.age); // undefined
console.log(john.getAge()); // 30
```

### 4. 元编程
```javascript
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return this.celsius;
        }
        if (hint === 'string') {
            return `${this.celsius}°C`;
        }
        return this.celsius;
    }
}

const temp = new Temperature(25);
console.log(temp + 5); // 30 (hint: "number")
console.log(String(temp)); // "25°C" (hint: "string")
```

## 七、Symbol 的注意事项

1. **类型转换限制**
   ```javascript
   const sym = Symbol('test');
   console.log(sym + ' string'); // TypeError
   console.log(Number(sym)); // TypeError
   ```

2. **对象属性访问**
   ```javascript
   const obj = { [Symbol('key')]: 'value' };
   console.log(obj[Symbol('key')]); // undefined (不同 Symbol)
   ```

3. **JSON 序列化**
   ```javascript
   const obj = { 
        regular: 'value',
        [Symbol('symbol')]: 'secret'
   };
   console.log(JSON.stringify(obj)); // {"regular":"value"}
   ```

4. **for...in 循环**
   ```javascript
   for (const key in obj) {
        console.log(key); // 只输出 "regular"
   }
   ```

## 八、最佳实践

1. **使用描述符增强可读性**
   ```javascript
   // 良好实践
   const CACHE_KEY = Symbol('api_response_cache');
   ```

2. **优先使用全局 Symbol 注册表**
   ```javascript
   // 跨模块共享
   // module1.js
   export const CACHE_SYMBOL = Symbol.for('app.cache');
   
   // module2.js
   import { CACHE_SYMBOL } from './module1.js';
   console.log(CACHE_SYMBOL); // 相同的 Symbol
   ```

3. **结合 Reflect API**
   ```javascript
   const obj = { [Symbol('key')]: 'value' };
   const symbols = Reflect.ownKeys(obj);
   console.log(symbols); // [Symbol(key)]
   ```

4. **避免过度使用**
   ```javascript
   // 只适合特殊场景，普通属性仍应使用字符串
   ```

## 九、Symbol 的浏览器支持

Symbol 在以下环境中得到支持：
- Chrome 38+
- Firefox 36+
- Safari 9+
- Edge 12+
- Node.js 0.12+

对于旧版浏览器，可以使用 Babel 的 `@babel/plugin-transform-symbols` 进行转译。

Symbol 为 JavaScript 带来了真正的唯一标识符能力，在元编程、避免命名冲突和定义特殊行为等方面发挥着重要作用，是现代 JavaScript 开发中的重要工具。