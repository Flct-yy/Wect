# Array 对象

## 创建数组

### 1. 基本创建方式
```
// 字面量创建（推荐）
const fruits = ['Apple', 'Banana', 'Orange'];

// 构造函数创建
const numbers = new Array(1, 2, 3, 4, 5);

// 空数组
const emptyArray = [];
```
### 2. 特殊数组创建
```
// 创建指定长度的空数组
const emptySlots = new Array(5); // [empty × 5]

// 创建并填充数组
const filledArray = Array(5).fill(0); // [0, 0, 0, 0, 0]

// 从类数组对象创建
const fromSet = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]
```

## 数组属性
### 1. length - 数组长度
```
const arr = [1, 2, 3];
console.log(arr.length); // 3

// 修改 length 会改变数组
arr.length = 2; // [1, 2]
arr.length = 5; // [1, 2, empty × 3]
```
### 2. 索引属性
```
const colors = ['red', 'green', 'blue'];

// 访问元素
console.log(colors[0]); // 'red'

// 修改元素
colors[1] = 'yellow'; // ['red', 'yellow', 'blue']

// 添加元素
colors[3] = 'purple'; // ['red', 'yellow', 'blue', 'purple']
```

## 数组方法

### 1. 修改器方法（改变原数组）
方法	|描述|	示例
-|-|-
push()	|尾部添加元素|	arr.push(4) → [1,2,3,4]
pop()	|尾部移除元素|	arr.pop() → [1,2]
unshift()	|头部添加元素|	arr.unshift(0) → [0,1,2,3]
shift()	|头部移除元素|	arr.shift() → [2,3]
splice()	|添加/删除元素|	arr.splice(1,1,'a') → [1,'a',3]
reverse()	|反转数组|	arr.reverse() → [3,2,1]
sort()	|数组排序|	[3,1,2].sort() → [1,2,3]
fill()	|填充数组	|new Array(3).fill(0) → [0,0,0]
copyWithin()|	复制数组部分|	[1,2,3,4].copyWithin(0,2) → [3,4,3,4]

#### splice()基本语法
`array.splice(start[, deleteCount[, item1[, item2[, ...]]])`

参数|	描述
-|-
start|	必需 - 开始修改的索引位置（负数表示从数组末尾开始计算）
deleteCount|	可选 - 要删除的元素数量（若省略或值大于数组长度，则删除从 start 开始的所有元素）
item1, item2, ...|	可选 - 要添加到数组的新元素


返回值  
* 返回一个包含被删除元素的新数组
* 如果没有删除元素，返回空数组



### 2. 访问方法（不改变原数组）
方法	|描述|	示例
-|-|-
concat()|	合并数组|	[1,2].concat([3,4]) → [1,2,3,4]
slice()|	截取子数组|	[1,2,3].slice(1) → [2,3]
join()|	数组转字符串|	['a','b'].join('-') → "a-b"
toString()|	数组转字符串|	[1,2].toString() → "1,2"
indexOf()|	查找元素索引|	[1,2,3].indexOf(2) → 1
lastIndexOf()|	反向查找索引|	[1,2,2].lastIndexOf(2) → 2
includes()|	包含检查|	[1,2,3].includes(2) → true
### 3. 迭代方法（高阶函数）
方法	|描述|	示例
-|-|-
forEach()|	遍历数组|	arr.forEach(x => console.log(x))
map()|	映射新数组|	[1,2,3].map(x => x*2) → [2,4,6]
filter()|	过滤数组|	[1,2,3].filter(x => x>1) → [2,3]
reduce()|	累积计算|	[1,2,3].reduce((a,b) => a+b) → 6
reduceRight()|	反向累积|	['a','b','c'].reduceRight((a,b) => a+b) → "cba"
find()|	查找元素|	[5,12,8].find(x => x>10) → 12
findIndex()|	查找索引|	[5,12,8].findIndex(x => x>10) → 1
some()|	部分满足|	[1,2,3].some(x => x>2) → true
every()|	全部满足|	[1,2,3].every(x => x>0) → true
### 4. ES6+ 新增方法
方法	|描述|	示例
-|-|-
Array.from()|	类数组转数组|	Array.from('hello') → ['h','e','l','l','o']
Array.of()|	创建数组|	Array.of(5) → [5]
findLast()|	从后查找元素|	[1,2,3].findLast(x => x<3) → 2
findLastIndex()|	从后查找索引|	[1,2,3].findLastIndex(x => x<3) → 1
flat()|	数组扁平化	|[1,[2,3]].flat() → [1,2,3]
flatMap()|	映射+扁平化	|[1,2].flatMap(x => [x, x*2]) → [1,2,2,4]
at()|	索引访问（支持负数）|	[1,2,3].at(-1) → 3
toReversed()|	创建反转副本|	[1,2,3].toReversed() → [3,2,1]
toSorted()|	创建排序副本	|[3,1,2].toSorted() → [1,2,3]
toSpliced()|	创建修改副本|	[1,2,3].toSpliced(1,1) → [1,3]
with()|	创建修改元素副本	|[1,2,3].with(1,4) → [1,4,3]


#### 创建副本
"创建副本"指的是创建一个新数组，而不是修改原始数组。

#### 为什么需要创建副本方法？
##### 1. 不可变性（Immutability）
    * 函数式编程原则：避免修改输入数据
    * 状态管理：在 React、Redux 等框架中，状态不可变是核心原则
    * 数据追踪：更容易跟踪数据变化

##### 2. 避免意外修改
    ```
    // 传统方式可能导致意外修改
    function processData(data) {
      const sorted = data.sort(); // 修改了原始数据！
      // ...其他处理
    }

    // 使用创建副本方法
    function safeProcess(data) {
      const sorted = data.toSorted(); // 不修改原始数据
      // ...其他处理
    }
    ```
##### 3. 代码可读性
    ```
    // 传统方式（需要额外步骤避免修改）
    const original = [3, 1, 2];
    const sorted = [...original].sort(); // 需要先复制再排序

    // 新方式（更简洁）
    const sorted = original.toSorted(); // 一步完成
    ```