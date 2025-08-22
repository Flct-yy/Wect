# Number 对象
它封装了数值操作的方法和属性。

## 基本概念
Number 对象是 JavaScript 中用于处理数值的对象。

### 创建 Number 对象
Number 对象可以通过两种方式创建：字面量创建和构造函数创建。
```javascript
// 字面量创建（原始类型）
const num = 42; 

// 构造函数创建（对象类型）
const numObj = new Number(42); 

// 类型检查
console.log(typeof num);     // "number"
console.log(typeof numObj);  // "object"
```
原始值 vs 对象
* 原始值：直接存储在栈内存，效率高
* Number 对象：存储在堆内存，可添加属性和方法

```
var x = 123;             
var y = new Number(123);
(x === y) // 为 false，因为 x 是一个数字，y 是一个对象
```

### 数字长度限制
用 64 位存储数值，其中 0 到 51 存储数字（片段），52 到 62 存储指数，63 位存储符号

### 进制转换
JavaScript 允许以不同的进制表示数字，包括二进制、八进制、十进制和十六进制。

如果前缀为 0，则 JavaScript 会把数值常量解释为八进制数，如果前缀为 0 和 "x"，则解释为十六进制数。

默认情况下，JavaScript 数字为十进制显示。

但是你可以使用 toString() 方法 输出16进制、8进制、2进制。

```
var myNumber=128;
myNumber.toString(16);   // 返回 80
myNumber.toString(8);    // 返回 200
myNumber.toString(2);    // 返回 10000000
```


## 静态属性
属性|	值|	描述
-|-|-
Number.MAX_VALUE|	≈1.79e+308|	JavaScript 能表示的最大正数
Number.MIN_VALUE|	≈5e-324	|JavaScript 能表示的最小正数
Number.MAX_SAFE_INTEGER|	9007199254740991|	最大安全整数 (2⁵³ - 1)
Number.MIN_SAFE_INTEGER|	-9007199254740991|	最小安全整数
Number.POSITIVE_INFINITY|	Infinity	|正无穷大
Number.NEGATIVE_INFINITY|	-Infinity	|负无穷大
Number.NaN|	NaN	|非数字值
Number.EPSILON|	2.22e-16	|1 与大于 1 的最小浮点数之差

## 静态方法
方法|	描述
-|-
Number.parseFloat(string)|	将字符串转换成浮点数，和全局方法 parseFloat(string, radix) 作用一致。
Number.parseInt()|	将字符串转换成整型数字，和全局方法 parseInt() 作用一致。
Number.isFinite(value)|	判断传递的参数是否为有限数字。
Number.isInteger(value)|	判断传递的参数是否为整数。
Number.isNaN(value)|	判断传递的参数是否为 isNaN()。
Number.isSafeInteger(value)|	判断传递的参数是否为安全整数。

string (字符串): 要解析的字符串

radix (整数, 可选): 进制基数（2-36），默认10

value (任意类型): 要检查的值


## 实例方法
方法|	描述
-|-
Number.prototype.toExponential(fractionDigits)|	将数字转换成指数计数法的字符串。
Number.prototype.toFixed(digits)|	将数字转换成指定位数的字符串。
Number.prototype.toLocaleString(locales, options)|	根据本地语言环境格式化数字。
Number.prototype.toPrecision(precision)|	将数字转换成指定的有效数字的字符串。
Number.prototype.toString(radix)|	将数字转换成字符串。
Number.prototype.valueOf()|	返回数字的原始值。


fractionDigits (整数, 0-100): 小数点后位数

digits (整数, 0-100): 小数点后位数

locales (字符串或数组, 可选): 语言/地区代码

options (对象, 可选): 格式化选项

precision (整数, 1-100): 有效数字位数

radix (整数, 2-36, 可选): 进制基数，默认10