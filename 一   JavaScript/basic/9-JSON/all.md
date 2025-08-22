# JSON
JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式。它基于ECMAScript的一个子集。它使得数据在不同的系统之间交换变得更加简单。

## JSON基本概念
### 1. 什么是JSON？
* 轻量级数据格式：比 XML 更简洁，占用空间更小
* 语言无关：几乎所有编程语言都支持 JSON
* 数据结构：支持对象、数组、字符串、数字、布尔值和 null
* 易于读写：人类可读的文本格式

### 2.JSON 与 JavaScript 对象的关系
特性	|JSON	|JavaScript 对象
----|----|----
键名|	必须用双引号包裹|	可不用引号或用单/双引号
值类型|	有限类型（无函数、undefined）|	支持所有类型
注释|	不支持|	支持
尾部逗号|	不允许|	允许
用途|	数据交换格式|	内存数据结构

## 核心JSON语法

### 1. JSON.stringify()
将 JavaScript 值转换为 JSON 字符串

`JSON.stringify(value[, replacer[, space]])`
* value (必需)：要转换的 JavaScript 值
* replacer (可选)：控制序列化过程的函数或数组
* space (可选)：美化输出格式的缩进设置

`console.log(JSON.stringify(user,["name", "age", "address"], '--'));`

**不支持的数据类型**
```
const unsupported = {
  undefined: undefined,     // 转换为 null 或完全省略
  function: () => {},       // 被省略
  symbol: Symbol('test'),   // 被省略
  date: new Date(),         // 转换为字符串
  infinity: Infinity,       // 转换为 null
  nan: NaN,                 // 转换为 null
  regexp: /pattern/g,       // 转换为空对象 {}
  set: new Set([1, 2, 3]),  // 转换为空对象 {}
  map: new Map([['a', 1]]), // 转换为空对象 {}
};

console.log(JSON.stringify(unsupported));
// 输出: {"undefined":null,"date":"2023-07-08T12:00:00.000Z","infinity":null,"nan":null,"regexp":{},"set":{},"map":{}}
```


### 2. JSON.parse()
将 JSON 字符串解析为 JavaScript 值

`JSON.parse(text[, reviver])`
* text (必需)：要解析的 JSON 字符串
* reviver (可选)：控制反序列化过程的函数