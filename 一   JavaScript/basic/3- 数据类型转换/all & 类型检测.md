# 类型转化
JavaScript 的类型转换分为显式转换（强制转换）和隐式转换（自动转换）两种形式。

## 显示类型转换(强制转换)
1. 转换为数字 (Number)
```
Number("123")     // 123
Number("12.34")   // 12.34
Number("123abc")  // NaN (非数字)
Number(true)      // 1
Number(false)     // 0
Number(null)      // 0
Number(undefined) // NaN
Number([])        // 0 (空数组)
Number([5])       // 5 (单元素数组)
Number([1,2])     // NaN (多元素数组)
```
2. 转换为字符串 (String)
```
String(123)       // "123"
String(true)      // "true"
String(false)     // "false"
String(null)      // "null"
String(undefined) // "undefined"
String({})        // "[object Object]"
String([1,2,3])   // "1,2,3"
```
3. 转换为布尔值 (Boolean)
```
Boolean(0)        // false
Boolean(1)        // true
Boolean("")       // false
Boolean("text")   // true
Boolean(null)     // false
Boolean(undefined) // false
Boolean({})       // true (所有对象都为true)
Boolean([])       // true
```
4. 其他转换方法
```
// parseInt (转换为整数)
parseInt("12.7")   // 12
parseInt("101", 2) // 5 (二进制转换)

// parseFloat (转换为浮点数)
parseFloat("12.34") // 12.34

// 一元加运算符
+"123"  // 123
+true   // 1

// 双波浪线运算符 (快速转整数)
~~"12.7" // 12
~~true   // 1
```
## 隐式类型转换(自动转换)

1. 算术运算符的转换
```
// 加法：优先字符串拼接
"5" + 2     // "52" (字符串拼接)
"5" + true  // "5true"
"5" + null  // "5null"

// 其他算术运算符：优先数字运算
"5" - 2     // 3
"5" * "2"   // 10
"10" / "2"  // 5
"10" - "x"  // NaN
```
2. 比较运算符的转换
```
// 相等比较 (==)
5 == "5"      // true (字符串转数字)
true == 1     // true (布尔转数字)
false == 0    // true
null == undefined // true

// 特殊比较
"" == 0       // true (空字符串转0)
"  " == 0     // true (空白字符串转0)
[] == 0       // true (数组转字符串再转数字)
[1] == 1      // true
[1,2] == "1,2" // true

// 严格相等 (===) 不转换类型
5 === "5"     // false
true === 1    // false
```
3. 逻辑运算符的转换
```
// 逻辑上下文自动转布尔值
if ("hello") { /* 执行 */ } // 字符串转true

// 逻辑与 (&&) 和逻辑或 (||)
0 && "test"   // 0 (返回第一个假值)
"hi" || 0     // "hi" (返回第一个真值)
```
4. 对象到原始值的转换
对象在转换时调用 valueOf() 和 toString() 方法：

      当对象需要转换为原始值时，JavaScript 引擎会遵循以下步骤：
      * 如果对象有 Symbol.toPrimitive 方法，优先调用它
      * 否则，在数值上下文中优先调用 valueOf()，然后是 toString()
      * 在字符串上下文中优先调用 toString()，然后是 valueOf()

```
const obj = {
  valueOf() { return 42; },
  toString() { return "object"; }
};

// 数值上下文
obj + 8       // 50 (valueOf优先)

// 字符串上下文
"Value: " + obj // "Value: 42" (valueOf优先)

// 重写转换行为
const date = new Date();
date.toString() // "Thu Jul 07 2022 12:00:00 GMT+0800"
date.valueOf()  // 1657166400000 (时间戳)
```

# 类型检测  
1. typeof 运算符  
最常用的类型检测方法，但存在局限性：
2. instanceof 运算符  
检测对象是否属于特定类的实例：
3. Object.prototype.toString.call()  
最可靠的内置类型检测方法：

## 方法
检测需求|	推荐方法|	示例
----|----|----
基本类型|	typeof	|typeof 42 → "number"
数组检测|	Array.isArray()	|Array.isArray([]) → true
NaN检测|	Number.isNaN()	|Number.isNaN(NaN) → true
null检测|	value === null	|null === null → true
undefined检测|	value === undefined	|void 0 === undefined → true
内置对象类型|	Object.prototype.toString.call()|	toString.call([]) → "[object Array]"
自定义类实例|	instanceof	|obj instanceof MyClass
通用类型检测|	封装 typeOf 函数	|typeOf(new Map()) → "map"
安全参数校验|	函数入口类型检查	|抛出TypeError