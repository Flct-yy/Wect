# RegExp 对象

RegExp（正则表达式）对象是 JavaScript 中用于模式匹配的强大工具，它提供了一种灵活、高效的方式来处理文本搜索、替换和验证操作。

## 创建 RegExp 对象

### 1. 字面量语法（推荐）
```
const regex = /pattern/flags;
```

### 2. 构造函数语法
```
const regex = new RegExp('pattern', 'flags');
```

## 属性

属性	|描述|	示例
---|---|---
flags (ES6)	|返回修饰符字符串（如 "gi"）	|/abc/gi.flags → "gi"
dotAll (ES2018)	|是否启用 s 修饰符（. 匹配换行符）	|/./s.dotAll → true
global	|是否启用 g 修饰符（全局匹配）	|/a/g.global → true
ignoreCase	|是否启用 i 修饰符（忽略大小写）	|/a/i.ignoreCase → true
multiline	|是否启用 m 修饰符（多行模式）	|/^/m.multiline → true
sticky (ES6)	|是否启用 y 修饰符（粘性匹配）	|/a/y.sticky → true
unicode (ES6)	|是否启用 u 修饰符（Unicode 模式）	|/a/u.unicode → true
source	|返回正则模式字符串（不含修饰符）	|/ab\\/c/.source → "ab\\/c"
lastIndex	|下次匹配起始位置（可读写）	

**注:** RegExp 的静态属性（已弃用）  静态属性已过时，不同浏览器实现不一致，不推荐使用

## 常用方法

### 1. test() 方法
**功能**：检测字符串中是否包含匹配模式的子串，返回布尔值（true/false）。

**特点**：

* 全局匹配（g 标志）时，每次调用会更新 lastIndex 属性，记录下一次匹配的起始位置47。
* 匹配空字符串时始终返回 true4。

示例：
```
const regex = /a/g;
const str = 'abcabc';
console.log(regex.test(str)); // true（匹配第一个 'a'）
console.log(regex.lastIndex); // 1（下次从索引 1 开始）
console.log(regex.test(str)); // true（匹配第二个 'a'）
console.log(regex.lastIndex); // 4
console.log(regex.test(str)); // false（无更多匹配）
```

### 2. exec() 方法
**功能**：返回匹配结果的详细信息数组（匹配文本、分组捕获、位置等），无匹配时返回 null。

**特点**：
* 非全局模式：始终返回第一个匹配结果46。
* 全局模式（g）：重复调用可遍历所有匹配，更新 lastIndex 实现增量匹配57。

* 返回数组包含额外属性：

    * index：匹配的起始位置。
    * input：原始字符串。

示例：
```
const regex = /a(b+)/g;
const str = 'abbb abb';
let result;
while ((result = regex.exec(str)) !== null) {
  console.log(`匹配: ${result[0]}，分组捕获: ${result[1]}，位置: ${result.index}`);
  // 第一次: 匹配 "abbb", 分组 "bbb", 位置 0
  // 第二次: 匹配 "abb", 分组 "bb", 位置 5
}
```

### 3. compile() 方法
**功能**：动态修改正则表达式的模式和修饰符（如将 g 改为 i）56。

**应用场景**：需重用同一正则对象但改变匹配规则时（现代开发中较少使用）。

示例：
```
let regex = /a/;
console.log(regex.test("ABC")); // false（区分大小写）
regex.compile(/a/i); // 改为忽略大小写
console.log(regex.test("ABC")); // true
```