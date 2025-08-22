# 数据类型
值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol。  

引用数据类型（对象类型）：对象(Object)、数组(Array)、函数(Function)，还有两个特殊的对象：正则（RegExp）和日期（Date）。

## 动态类型
JavaScript 拥有动态类型。这意味着相同的变量可用作不同的类型：
```
实例
var x;               // x 为 undefined
var x = 5;           // 现在 x 为数字
var x = "John";      // 现在 x 为字符串
```

## 值类型

### 字符串 String
字符串可以是引号中的任意文本。您可以使用单引号或双引号  
您可以在字符串中使用引号，只要不匹配包围字符串的引号即可(双引号不能嵌套单引号，单引号不能嵌套双引号)    
字符串断行需要使用反斜杠(\)  
也可以使用转义字符来表示特殊字符：  
```
\` = `
\' ='   
\" ="   
\\ = \  
```
**字符串模板**  
ES6 引入了模板字符串，允许您在字符串中嵌入变量。  
${} 用来表示变量，可以嵌入表达式。

特定:
* 使用 反引号 ` 包裹字符串内容
* 使用 `${expression}` 语法嵌入表达式
* 支持多行字符串，无需转义字符

**高级用法：标签模板**
基本语法是：标签函数模板字符串
```
function myTag(strings, ...values) {
  // 处理逻辑
}

//第一个参数：包含模板字符串中所有静态部分的数组      ["Hello ", "!"]
//后续参数：模板中所有表达式的值（使用...values收集）    [name]
//strings.raw属性：包含原始未转义的字符串（保留转义字符）
//values 数组中的值顺序与模板中的插值顺序完全一致
/*
strings 数组长度 = 插值数量 + 1
即使模板以插值开头/结尾，也会有空字符串占位：
tag`${a}测试` → strings = ["", "测试"]
*/



const result = myTag`Hello ${name}!`;
```




模板字符串允许你在字符串中引用变量、执行函数调用和进行任意的JavaScript表达式。

**字符串常见属性**
属性	|描述
-|-
constructor|	返回创建字符串属性的函数
length	|返回字符串的长度
prototype|	允许您向对象添加属性和方法

**字符串常见方法**
方法	|描述
-|-
charAt(index)	|返回指定位置的字符
charCodeAt(index)	|返回指定位置的字符的 Unicode 编码
codePointAt(index)	|返回指定索引字符的 Unicode 码点
字符串查找方法|
indexOf(searchStr, start)	|返回子串首次出现的索引
lastIndexOf(searchStr, end)	|返回子串最后出现的索引
includes(searchStr, start)	|是否包含子串
startsWith(searchStr, start)	|是否以子串开头
endsWith(searchStr, length)	|是否以子串结尾
match(regexp)	|返回正则匹配结果
search(regexp)	|返回正则匹配的索引
字符串截取方法|
slice(start, end)	|提取指定索引间的字符
substring(start, end)	|类似 slice，但自动处理负值	
substr(start, length)	|⚠️ 已废弃，不建议使用	
字符串修改方法|
replace(search, replace)	|替换匹配的子串
replaceAll(search, replace)|	替换所有匹配的子串
toLowerCase()	|转为小写
toUpperCase()	|转为大写
trim()	|删除两端空白	
trimStart()|	删除开头空白	
trimEnd()	|删除结尾空白	
padStart(length, padStr)|	开头填充字符串	
padEnd(length, padStr)	|结尾填充字符串	
字符串分割与连接|
split(separator, limit)	|按分隔符拆分为数组
concat(str1, ..., strN)	|连接多个字符串	
Unicode 处理方法|
normalize(form)	Unicode |正规化
fromCodePoint(num1, ..., numN)|	从码点创建字符串
fromCharCode(num1, ..., numN)	|从编码创建字符串



### 数值 Number
JavaScript 只有一种数字类型。数字可以带小数点，也可以不带  
极大或极小的数字可以通过科学（指数）计数法来书写：  
`var y=123e5;      // 12300000`

### 布尔 Boolean
布尔（逻辑）只能有两个值：true 或 false。

### 空值 Null
表示"无"或"空值"，必须显式赋值。

### 未定义 Undefined
表示变量已声明但未赋值。

### Symbol
表示唯一的、不可变的值，常用于对象属性键。

## 引用类型

### 对象 Object
基础的对象类型。  
对象的属性以名称和值对的形式 (name : value) 来定义。  
### 数组 Array
有序的数据集合，实际上是特殊类型的对象。
### 函数 Function
可执行的对象。
### 日期 Date
表示日期和时间。
### 正则表达式 RegExp
用于模式匹配。
### Map（ES6）
键值对集合，键可以是任意类型。
### Set（ES6）
唯一值的集合。

