# String 对象

## 基本概念

String 对象是 JavaScript 中用于处理和操作字符串的内置对象。

## 创建字符串

### 1. 字符串创建方式
```
// 字面量形式（推荐）
const str1 = 'Hello World';

// 构造函数形式
const str2 = new String('Hello World');

// 模板字符串（ES6）
const name = 'John';
const str3 = `Hello ${name}`;
```

### 2. 原始字符串 vs String 对象
* 原始字符串：直接赋值的字符串（typeof 返回 'string'）
* String 对象：通过 new String() 创建的对象（typeof 返回 'object'）
```
const primitive = 'text'; // 原始类型
const object = new String('text'); // 对象类型

console.log(typeof primitive); // "string"
console.log(typeof object);    // "object"

// 但使用时JavaScript会自动转换
console.log(primitive.length); // 4 (自动包装为String对象)
```

## 字符串属性

属性	|描述	|示例
---|---|---
length|	字符串长度|	'hello'.length // 5
constructor|	返回字符串构造函数|	'text'.constructor // ƒ String()...
prototype|	添加自定义方法的入口|	String.prototype.customMethod = ...

## 字符串方法

### 一、创建与基本信息
方法|	描述|	示例
---|---|---
new String()|	创建字符串对象|	new String('text')
String.fromCharCode()|	从Unicode创建字符串|	String.fromCharCode(65,66,67) // 'ABC'
String.fromCodePoint()|	从码点创建字符串|	String.fromCodePoint(9731, 9733) // '☃★'
### 二、字符访问与查询
方法|	描述|	示例
---|---|---
charAt(index)	|返回指定索引字符|	'hello'.charAt(1) // 'e'
charCodeAt(index)	|返回字符UTF|-16编码	'A'.charCodeAt(0) // 65
codePointAt(index)	|返回字符Unicode码点|	'★'.codePointAt(0) // 9733
at(index)	|ES2022新增，支持负索引|	'hello'.at(-1) // 'o'
indexOf(searchStr)	|返回首次出现位置|	'hello'.indexOf('l') // 2
lastIndexOf(searchStr)	|返回最后出现位置|	'hello'.lastIndexOf('l') // 3
### 三、字符串内容检查
方法|	描述|	示例
---|---|---
includes(searchStr)	|是否包含子串|	'hello'.includes('ell') // true
startsWith(searchStr)	|是否以子串开头|	'hello'.startsWith('he') // true
endsWith(searchStr)	|是否以子串结尾|	'hello'.endsWith('lo') // true
match(regexp)	|正则匹配结果|	'2023'.match(/\d+/) // ['2023']
search(regexp)	|正则匹配位置|	'hello'.search(/[aeiou]/) // 1
### 四、字符串操作与转换
方法|	描述|	示例
---|---|---
concat(str1, ..., strN)	|连接字符串|	'Hello'.concat(' World') // 'Hello World'
slice(start, end)	|提取子串（支持负索引）|	'hello'.slice(1,3) // 'el'
substring(start, end)	|提取子串（不支持负索引）|	'hello'.substring(1,3) // 'el'
substr(start, length)	|从位置提取长度（已弃用）|	'hello'.substr(1,2) // 'el'
split(separator)|	分割为数组	|'a,b,c'.split(',') // ['a','b','c']
toUpperCase()	|转大写|	'Hello'.toUpperCase() // 'HELLO'
toLowerCase()	|转小写|	'Hello'.toLowerCase() // 'hello'
toLocaleUpperCase()	|本地化大写|	'i'.toLocaleUpperCase('tr') // 'İ'
toLocaleLowerCase()	|本地化小写|	'İ'.toLocaleLowerCase('tr') // 'i'
### 五、字符串修改与格式化
方法|	描述|	示例
---|---|---
replace(search, replace)	|替换字符串|	'hi'.replace('hi', 'hello') // 'hello'
replaceAll(search, replace)	|全局替换|	'a-b-c'.replaceAll('-', '') // 'abc'
trim()	|去除两端空白|	' text '.trim() // 'text'
trimStart()	|去除开头空白|	' text '.trimStart() // 'text '
trimEnd()	|去除结尾空白|	' text '.trimEnd() // ' text'
padStart(length, padStr)	|开头填充|	'5'.padStart(3, '0') // '005'
padEnd(length, padStr)	|结尾填充|	'5'.padEnd(3, '0') // '500'
repeat(count)	|重复字符串|	'ha'.repeat(3) // 'hahaha'
### 六、Unicode 处理
方法|	描述|	示例
---|---|---
normalize(form)	|Unicode正规化|	'\u00F1'.normalize('NFC') // 'ñ'
localeCompare(str)	|本地化字符串比较|	'ä'.localeCompare('z', 'de') // -1


# 速查表

任务|	推荐方法
---|---
检查包含关系|	includes(), indexOf()
提取子字符串|	slice()（支持负索引）
大小写转换|	toUpperCase(), toLowerCase()
去除空白|	trim(), trimStart(), trimEnd()
字符串填充|	padStart(), padEnd()
字符串替换|	replace(), replaceAll()
分割字符串|	split()
字符代码转换|	charCodeAt(), codePointAt()
字符串重复|	repeat()
多行/插值字符串	|模板字符串（反引号）