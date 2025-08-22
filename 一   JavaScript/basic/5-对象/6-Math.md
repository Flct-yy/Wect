# Math 对象

Math 对象是 JavaScript 的内置对象，提供了一系列数学常数和函数。与其它全局对象不同，Math 不是构造函数，所有属性和方法都是静态的，可以直接通过 Math 调用。

## Math 常量属性
属性	|值	|描述	|近似值
-|-|-|-
Math.E|		自然对数的底数|	e ≈ 2.718	2|.71828
Math.LN2|		2的自然对数|	ln(2)	|0.693
Math.LN10|		10的自然对数|	ln(10)	|2.302
Math.LOG2E|		以2为底e的对数|	log₂(e)	|1.442
Math.LOG10E|		以10为底e的对数|	log₁₀(e)	|0.434
Math.PI|		圆周率|	π	|3.14159
Math.SQRT1_2|		1/2的平方根|	√½	|0.707
Math.SQRT2|		2的平方根|	√2	|1.414

## Math 方法

### 一、基本运算方法
方法|	描述|	示例
---|---|---
Math.abs(x)	|返回绝对值|	Math.abs(-5) // 5
Math.sign(x)|	返回符号（正数=1，负数=-1，0=0）|	Math.sign(-10) // -1
Math.sqrt(x)|	平方根|	Math.sqrt(9) // 3
Math.cbrt(x)|	立方根|（ES6）	Math.cbrt(8) // 2
Math.hypot(x, y, ...)	|参数平方和的平方根（ES6）勾股定理	|Math.hypot(3, 4) // 5
### 二、指数与对数方法
方法|	描述|	示例
---|---|---
Math.pow(x, y)	|返回 x 的 y 次幂	|Math.pow(2, 3) // 8
Math.exp(x)	|返回 e^x	|Math.exp(1) ≈ 2.718
Math.expm1(x)	|返回 e^x - 1（ES6）	|Math.expm1(1) ≈ 1.718
Math.log(x)	|自然对数（ln(x)）	|Math.log(Math.E) // 1
Math.log10(x)	|以 10 为底的对数（ES6）|	Math.log10(100) // 2
Math.log2(x)	|以 2 为底的对数（ES6）	|Math.log2(8) // 3
Math.log1p(x)	|ln(1 + x)（ES6）	|Math.log1p(1) ≈ 0.693
### 三、取整方法
方法|	描述|	示例
---|---|---
Math.round(x)	|四舍五入|	Math.round(4.7) // 5
Math.ceil(x)	|向上取整|	Math.ceil(4.1) // 5
Math.floor(x)	|向下取整|	Math.floor(4.9) // 4
Math.trunc(x)	|直接截断小数（ES6）|	Math.trunc(4.9) // 4
Math.fround(x)|	最接近的单精度浮点数（ES6）|	Math.fround(1.337) // 1.3370000123977661
### 四、三角与双曲函数
方法|	描述|	示例
---|---|---
Math.sin(x)	|正弦（x为弧度）|	Math.sin(Math.PI/2) // 1
Math.cos(x)	|余弦|	Math.cos(Math.PI) // -1
Math.tan(x)	|正切|	Math.tan(0) // 0
Math.asin(x)	|反正弦|	Math.asin(1) // π/2
Math.acos(x)	|反余弦|	Math.acos(-1) // π
Math.atan(x)	|反正切|	Math.atan(1) // π/4
Math.atan2(y, x)	|从X轴到点(x,y)的角度|	Math.atan2(1, 1) // π/4
Math.sinh(x)	|双曲正弦（ES6）|	Math.sinh(0) // 0
Math.cosh(x)	|双曲余弦（ES6）|	Math.cosh(0) // 1
Math.tanh(x)	|双曲正切（ES6）|	Math.tanh(0) // 0
### 五、随机与极值方法
方法|	描述|	示例
---|---|---
Math.random()	|生成 [0,1) 区间的随机数|	Math.random() // 0.123...
Math.max(x1, x2, ...)	|返回最大值|	Math.max(1, 3, 2) // 3
Math.min(x1, x2, ...)	|返回最小值|	Math.min(1, 3, 2) // 1
### 六、位运算相关（ES6）
方法|	描述|	示例
---|---|---
Math.clz32(x)	|32位二进制表示的前导零数量|	Math.clz32(1) // 31
Math.imul(x, y)	|32位整数乘法|	Math.imul(2, 3) // 6
