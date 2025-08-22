# 对象
对象（Object）是 JavaScript 的核心数据类型之一，用于存储 键值对（key-value pairs）。
* 键(key):必须是 **字符串** 或 **Symbol**
* 值:可以是任意类型

**访问对象属性**
点表示法 (obj.property)	|方括号表示法 (obj["property"])
----|----
直接使用属性名（标识符）|	属性名可以是字符串或变量
属性名必须是有效的标识符（不能以数字开头，不能包含空格或特殊字符）	|属性名可以是任意字符串（如 "first-name"、"123"）
静态写法（属性名硬编码）	|动态写法（属性名可通过变量或表达式计算）

注:**Symbol** 属性：必须用方括号访问：


## this
this 指代 当前执行上下文的对象，它的值取决于 调用方式：

调用方式	|this 指向	|示例
---|---|---
方法调用	|所属对象|	obj.method() → this = obj
函数调用	|全局对象（严格模式 undefined）|	func() → this = window（非严格模式）
构造函数	|新创建的对象	|new Person() → this = {}
call/apply/bind|	手动指定的对象|	func.call(obj) → this = obj
箭头函数	|定义时的 this（词法作用域）|	() => {} → this 来自外层

## 原型链和继承

### 原型
每一个 JavaScript 对象( null 除外)在创建时会与之关联另一个对象，这个被关联的对象称之为 `原型`(原型对象)。每一个对象都会从原型中‘继承’（委托）原型对象的属性。原型对象就是用来存放实例中共有的那部分属性。`每个函数都有一个特殊的属性叫作原型（prototype）`，这个属性指向调用该构造函数而创建的实例的原型。原型对象中有一个属性 constructor, 它指向函数对象。

### prototype
显示原型  
prototype 是函数才有的属性，这个属性指向一个对象，该对象正是调用该构造函数而创建的实例的原型。`指向原型对象。箭头函数是没有 prototype 属性的。`在最新 ES 规范里，prototype 被定义为：`给其它对象提供共享属性的对象。`prototype 自己也是对象，只是被用以承担某个职能罢了。prototype 描述的是两个对象之间的某种（委托）关系（其中一个，为另一个提供属性访问权限）。每个函数都有一个 prototype 属性，它默认指向一个 Object 空对象(即称为:原型对象)。

当需要为大量实例添加相同效果的方法时，可以将它们存放在 prototype 对象中，并将该 prototype 对象放在这些实例的构造函数上，达到共享、公用的效果，实质上是为了内存着想。

### `__proto__`
隐式原型  
每一个 JavaScript 对象( null 除外)都有一个属性，叫 `__proto__` ,这个属性`指向该对象的原型。指向原型对象, `原型对象其实就是通过 Object 构造函数生成的。它是历史遗留，在某些环境中，比如 Deno，它是不被支持的。所有函数的 `__proto__` 指向他们的原型对象。

* 所有的函数都是 Function 函数的实例（包括Function自己），所以他们的 `__proto__` 自然也就都指向 Function 原型对象(Function.prototype)
* Object函数是所有对象通过原型链追溯到最根的构造函数。Object 函数的 prototype 中的 `__proto__` 指向 null。

### 原型链
当读取实例对象的属性时，如果找不到，就会查找与该对象关联的原型对象中的属性，如果还查不到，就去找原型的原型，一直找到为止，如果还找不到就是 null（也是对象）。在此过程中，由互相关联的原型组成的链状结构就是 原型链。
### 构造函数 & prototype
构造函数（如 Person）的 prototype 属性会成为 实例对象的原型。

实例的 `__proto__` 指向构造函数的 prototype。
 
```
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, ${this.name}!`);
};

const alice = new Person("Alice");
alice.greet(); // "Hello, Alice!"
```
### new 操作符
new 操作符在执行构造函数时，会自动执行以下操作：
1. 创建一个空的普通 JavaScript 对象（{ }）。
2. 将新对象的 `__proto__` 指向构造函数的 prototype 对象，这样实例就可以访问构造函数原型上的属性和方法。
3. 将构造函数 Person 的 this 指向新创建的对象 obj，并执行构造函数内部的代码（即 Person.call(obj, 参数...);）。
4. 返回新对象（如果构造函数没有显式返回对象）
    * 如果构造函数没有 return 语句，或者返回的是基本类型（如 number、string、boolean），则默认返回新创建的对象 obj。
    * 如果构造函数返回一个对象（如 return { custom: "value" }），则 new 表达式会返回该对象，而不是新创建的 obj。


### 继承
#### ES5 继承（原型链继承）：

1. 原型链继承
```
function Dog(name) {
  this.name = name;
}
Dog.prototype = new Animal(); // 继承 Animal

const myDog = new Dog("Buddy");
myDog.speak(); // "Buddy makes a noise."
```
缺点：
* 所有子类实例共享父类引用属性（如数组/对象）(容易篡改数据)
* 无法向父类构造函数传参

2. 构造函数继承（经典继承）
```
function Dog(name) {
  Animal.call(this, name); // 调用父类构造函数
}

const myDog = new Dog("Buddy");
myDog.speak(); // 报错！speak 未定义（未继承原型方法）
```
缺点：
只能继承父类实例属性/方法，无法继承原型方法

3. 组合继承（最常用）
```
function Dog(name) {
  Animal.call(this, name); // 1. 继承实例属性
}
Dog.prototype = new Animal(); // 2. 继承原型方法
Dog.prototype.constructor = Dog; // 修复构造函数指向

const myDog = new Dog("Buddy");
myDog.speak(); // 正常执行
```
优点：
实例属性独立，原型方法共享

缺点：
父类构造函数被调用两次（影响性能）

4. 原型式继承（Object.create()）
```
const animal = { 
  speak() { console.log(`${this.name} makes a noise.`); } 
};
const dog = Object.create(animal, { 
  name: { value: "Buddy" } 
});
dog.speak(); // "Buddy makes a noise."
```
适用场景：简单对象继承

缺点：共享引用属性

5. 寄生式继承
```
function createDog(name) {
  const obj = Object.create(animal);
  obj.name = name;
  obj.bark = function() { console.log("Woof!"); }; // 增强对象
  return obj;
}
```
6. 寄生组合式继承（最优方案）
```
function Dog(name) {
  Animal.call(this, name); // 调用父类构造函数
}
//Object.create()创建一个空对象,并且指定其原型设置为指定的对象。
Dog.prototype = Object.create(Animal.prototype); // 继承父类上的prototype中的方法
Dog.prototype.constructor = Dog;// 修复构造函数

const myDog = new Dog("Buddy");
myDog.speak(); // 正常执行
```
优点：
* 只调用一次父类构造函数
* 避免共享引用属性问题
* 原型链完整

#### ES6 继承（class 语法糖）(底层仍是原型链)：
```
class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
```

## 常用对象


### 数字 Number 对象
Number 对象用于处理数值，包含数值常数和操作数值的方法。

```
// 创建数字
const num1 = 42;          // 字面量
const num2 = Number(42);  // 构造函数
const pi = Math.PI;       // 数学常数

// 常用方法
console.log(num1.toFixed(2));        // "42.00" - 保留两位小数
console.log(num1.toString(16));      // "2a" - 转为十六进制
console.log(Number.isInteger(42.5)); // false - 检查是否为整数

// 特殊值
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_VALUE);        // 5e-324
console.log(Number.NaN);              // NaN (非数字)
```
### 字符串 String 对象
String 对象用于表示和操作字符序列。

```
// 创建字符串
const str1 = "Hello";             // 字面量
const str2 = new String("World"); // 构造函数

// 常用方法
console.log(str1.length);               // 5 - 字符串长度
console.log(str1.toUpperCase());        // "HELLO"
console.log(str1.concat(" ", str2));    // "Hello World"
console.log(str1.includes("ell"));      // true - 是否包含
console.log(str1.slice(1, 4));          // "ell" - 截取子串
console.log(str1.replace("l", "x"));    // "Hexlo" - 替换

// ES6新增方法
console.log("abc".padStart(5, "0"));    // "00abc"
console.log("  text  ".trim());         // "text"
```
### 日期 Date 对象
Date 对象用于处理日期和时间。

```
// 创建日期对象
const now = new Date();                 // 当前时间
const specificDate = new Date(2023, 11, 25); // 2023年12月25日（月份从0开始）

// 获取日期组件
console.log(now.getFullYear());         // 2023
console.log(now.getMonth() + 1);        // 当前月份（0-11）
console.log(now.getDate());             // 当前日期（1-31）
console.log(now.getDay());              // 星期几（0-6，0=星期日）
console.log(now.getHours());            // 当前小时（0-23）

// 设置日期
specificDate.setDate(30);               // 修改日期为30号
specificDate.setFullYear(2024);         // 修改年份为2024

// 格式化日期
console.log(now.toLocaleDateString());  // 本地化日期格式
console.log(now.toISOString());         // ISO格式：2023-07-08T10:30:15.123Z
```
### 数组 Array 对象
Array 对象用于存储和操作有序的数据集合。

```
// 创建数组
const arr1 = [1, 2, 3];              // 字面量
const arr2 = new Array(4, 5, 6);     // 构造函数

// 常用方法
// 添加/删除元素
arr1.push(4);                        // 末尾添加：[1,2,3,4]
arr1.pop();                          // 移除末尾元素：[1,2,3]
arr1.unshift(0);                     // 开头添加：[0,1,2,3]
arr1.shift();                        // 移除开头元素：[1,2,3]

// 遍历数组
arr1.forEach(item => console.log(item)); // 遍历元素
const doubled = arr1.map(x => x * 2);    // [2,4,6]
const sum = arr1.reduce((acc, val) => acc + val, 0); // 6

// 搜索和过滤
console.log(arr1.includes(2));           // true
console.log(arr1.find(x => x > 1));      // 2
const filtered = arr1.filter(x => x > 1); // [2,3]

// 其他操作
const combined = arr1.concat(arr2);      // [1,2,3,4,5,6]
arr1.reverse();                          // [3,2,1]
arr1.sort();                             // [1,2,3]

// ES6+ 新增方法
console.log(Array.from("123"));          // ['1','2','3']
console.log(Array.isArray(arr1));        // true
console.log(arr1.findIndex(x => x === 2)); // 1
```
### 布尔 Boolean 对象
Boolean 对象是布尔值的包装对象。

```
// 创建布尔值
const bool1 = true;                // 字面量
const bool2 = new Boolean(false);  // 构造函数（不推荐）

// 布尔运算
console.log(true && false);        // false - 逻辑与
console.log(true || false);        // true  - 逻辑或
console.log(!true);                // false - 逻辑非

// 转换为布尔值
console.log(Boolean(0));           // false
console.log(Boolean("text"));      // true
console.log(Boolean(null));        // false

// 注意：避免使用Boolean构造函数
const falseObj = new Boolean(false);
if (falseObj) {
  console.log("这会被执行，因为对象总是真值");
}
```
### 算数 Math 对象
Math 对象提供基本的数学函数和常数。

```
// 常用常数
console.log(Math.PI);          // 3.141592653589793
console.log(Math.E);           // 2.718281828459045
console.log(Math.LN2);         // 0.6931471805599453

// 舍入方法
console.log(Math.round(4.7));  // 5 - 四舍五入
console.log(Math.ceil(4.2));   // 5 - 向上取整
console.log(Math.floor(4.9));  // 4 - 向下取整
console.log(Math.trunc(4.9));  // 4 - 移除小数部分

// 最大值/最小值
console.log(Math.max(1, 3, 2)); // 3
console.log(Math.min(1, 3, 2)); // 1

// 指数和对数
console.log(Math.pow(2, 3));    // 8
console.log(Math.sqrt(16));     // 4
console.log(Math.log(10));      // 2.302585092994046

// 三角函数
console.log(Math.sin(Math.PI/2)); // 1
console.log(Math.cos(Math.PI));   // -1

// 随机数
console.log(Math.random());      // 0-1之间的随机数
```

## 自定义对象
JavaScript 允许创建自定义对象，有几种常用方式：


### 对象字面量
最简单直接的创建方式，适合创建单个对象
```
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

console.log(person.fullName()); // "John Doe"
```
特点：
* 语法简洁直观
* 适合创建单例对象
* 无法复用对象结构

### 构造函数
使用 new 关键字创建多个相似对象的传统方式
```
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.fullName = function() {
    return this.firstName + " " + this.lastName;
  };
}

const john = new Person("John", "Doe", 30);
console.log(john.age); // 30
```
特点：
* 函数名通常首字母大写
* 使用 this 定义属性和方法
* 每个实例都有独立的方法副本（内存效率低）

### 工厂函数
不使用 new 关键字创建对象的函数式方法
```
function createPerson(firstName, lastName, age) {
  return {
    firstName,
    lastName,
    age,
    fullName() {
      return `${firstName} ${lastName}`;
    }
  };
}

const mary = createPerson("Mary", "Johnson", 25);
console.log(mary.fullName()); // "Mary Johnson"
```
特点：
* 不使用 this 和 new
* 避免原型链的复杂性
* 适合创建多个相似但不需要继承的对象

### 原型创建对象
通过原型共享方法，提高内存效率
```
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

// 方法定义在原型上
Person.prototype.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

const john = new Person("John", "Doe", 30);
console.log(john.fullName()); // "John Doe"
```
特点：
* 方法在原型上共享，节省内存
* 属性在每个实例上独立
* 是 ES6 class 的基础

### ES6 Class 语法
现代 JavaScript 推荐的面向对象创建方式
```
class Person {
  //类的构造函数，这种方法用于创建和初始化一个由 class 创建的对象。
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  // 实例方法
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  // 静态方法
  static compareAge(person1, person2) {
    return person1.age - person2.age;
  }
  
  // Getter
  get birthYear() {
    return new Date().getFullYear() - this.age;
  }
  
  // Setter
  set birthYear(year) {
    this.age = new Date().getFullYear() - year;
  }
}

const john = new Person("John", "Doe", 30);
john.birthYear = 1990; // 使用 setter
console.log(john.birthYear); // 1990 (使用 getter)
```
特点：
* 语法更接近传统面向对象语言
* 支持构造函数、实例方法、静态方法
* 支持 getter/setter
* 本质是构造函数的语法糖

### Object.create()
基于现有对象创建新对象
```
const personPrototype = {
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const john = Object.create(personPrototype);
john.firstName = "John";
john.lastName = "Doe";
john.age = 30;

console.log(john.fullName()); // "John Doe"
```
特点：
* 创建纯净对象（无原型）
* 显式指定原型对象
* 适合实现原型继承

### 类表达式（Class Expression）
类也可以使用表达式形式定义
```
const Person = class {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const john = new Person("John", "Doe");
console.log(john.fullName()); // "John Doe"
```

### 单例模式（Singleton）
确保只有一个实例的对象创建方式
```
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      createdAt: new Date(),
      getTime() {
        return this.createdAt.toLocaleTimeString();
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true (同一个实例)
```
