油管sass教程视频<https://www.youtube.com/watch?v=_a5j7KoflTs>

vscode扩展

* Live Sass Compiler

  配置导出路径:
  ```json
  "liveSassCompile.settings.formats": [
    //三条格式，分别对应三种输出格式 会生成三个文件

    // 默认格式化
    {
        "format": "expanded", // 输出格式：expanded(展开格式，方便阅读)
        "extensionName": ".css", // 生成的文件扩展名
        "savePath": null, // null 表示保存到当前 scss 文件所在目录
        "savePathReplacementPairs": null // 可替换路径对，默认不用
    },

    // 保存在当前Sass文件所在目录下的dist目录中的css目录
    // 压缩格式化
    {
        "format": "compressed", // 输出格式：compressed(压缩格式，文件体积更小)
        "extensionName": ".min.css", // 生成的文件扩展名
        "savePath": "/dist/css", // 输出到当前目录下的 dist/css 文件夹
    },

    // 保存当前Sass文件所在目录的上层目录中的css目录
    // 压缩格式化
    {
        "format": "compressed", // 输出格式：compressed(压缩格式，文件体积更小)
        "extensionName": ".min.css", // 生成的文件扩展名
        "savePath": "~/../css", // "~" 表示当前 scss 文件目录, "../" 表示上层目录
    },
  ]
  ```
* Live Server 实时刷新

---
# 变量

## SCSS 和 CSS 变量的区别
SCSS 和 CSS 变量的区别主要在于变量的定义方式。

    CSS 变量的定义方式是使用 `--` 作为变量名的前缀，例如 `--primary-color: #0077be;`。
    CSS 变量的作用域是全局的，可以被任何地方使用。
    CSS 变量则需要通过 `@var` 调用。
    CSS 变量的定义方式更加简单，但是只能定义简单的变量，不能定义复杂的计算值。


    SCSS 变量的定义方式是使用 `$` 作为变量名的前缀，例如 `$primary-color: #0077be;`。
    SCSS 变量的作用域是局部的，只能在声明它的地方使用。
    SCSS 变量可以直接在样式中使用。
    SCSS 变量的定义方式更加灵活，可以定义复杂的计算值，但是需要使用嵌套语法。

    SCSS 中写 CSS 变量导出时 还是变量名， 而 SCSS 中写 SCSS 变量导出时 变为 实际的值。

```css
/* CSS 变量 */
:root {
  --primary-color: #0077be;
}

body {
  background-color: var(--primary-color);
}
```
```scss
/* SCSS 变量 */
$primary-color: #0077be;

body {
  background-color: $primary-color;
}
```

---
# map
Map 是 Sass 中一种非常强大的数据结构，它相当于其他编程语言中的“字典”或“对象”。它是以 键: 值 对的形式存储数据的集合，让我们可以更有条理地管理一组相关的变量。
## 1. 定义 Map
Map 使用括号 () 定义，键值对之间用逗号 , 分隔。
```scss
$map: (
  key1: value1,
  key2: value2,
  key3: value3
);
```
## 2. 访问 Map 值
访问 Map 值使用 `map-get()` 函数，传入 Map 变量和键名。
```scss
.element {
  content: map-get($map, key1);
}
```
## 3. 合并 Map
合并 Map 使用 `map-merge()` 函数，传入 Map 变量和要合并的 Map。
```scss
$map1: (
  key1: value1,
  key2: value2
);

$map2: (
  key3: value3,
  key4: value4
);

$merged-map: map-merge($map1, $map2);
```
## 4. 遍历 Map
遍历 Map 使用 `map-keys()` 函数，传入 Map 变量，遍历得到所有键名。
```scss
@each $key $value in map-keys($map) {
  // 处理 $key 对应的 value
  .#{$key} {
    content: $value;
  }
}
```
## 5. 删除 Map 值
删除 Map 值使用 `map-remove()` 函数，传入 Map 变量和要删除的键名。
```scss
$map: (
  key1: value1,
  key2: value2,
  key3: value3
);

$new-map: map-remove($map, key2);
```
## 6. 其他函数
Sass 提供了一些其他函数来处理 Map 数据。
- `map-has-key()`：判断 Map 中是否存在某个键。
- `map-keys()`：返回 Map 中所有键名。
- `map-values()`：返回 Map 中所有值。

---
# 嵌套
Sass 的嵌套功能是其最常用和最有价值的特性之一，它允许您以更直观、更有组织的方式编写 CSS，减少重复代码并提高可读性。

## 基本选择器嵌套

您可以将选择器嵌套在其他选择器内部，Sass 会智能地组合它们。

```scss
// SCSS
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      display: inline-block;
      
      a {
        text-decoration: none;
        padding: 6px 12px;
      }
    }
  }
}
```

编译后的 CSS:
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
}
nav ul li a {
  text-decoration: none;
  padding: 6px 12px;
}
```
## 使用父选择器引用符: `&`

`&` 符号代表父选择器，在嵌套中非常有用。

### 1. 添加伪类和伪元素

```scss
// SCSS
.button {
  color: blue;
  
  &:hover {
    color: red;
  }
  
  &:active {
    color: green;
  }
  
  &::before {
    content: "»";
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

编译后的 CSS:
```css
.button {
  color: blue;
}
.button:hover {
  color: red;
}
.button:active {
  color: green;
}
.button::before {
  content: "»";
}
.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 2. 修改选择器顺序

```scss
// SCSS
.card {
  .sidebar & {
    width: 100%;
    background-color: #f5f5f5;
  }
}
```

编译后的 CSS:
```css
.sidebar .card {
  width: 100%;
  background-color: #f5f5f5;
}
```

### 3. 添加后缀

```scss
// SCSS
.icon {
  &-small { font-size: 14px; }
  &-medium { font-size: 18px; }
  &-large { font-size: 24px; }
}
```

编译后的 CSS:
```css
.icon-small { font-size: 14px; }
.icon-medium { font-size: 18px; }
.icon-large { font-size: 24px; }
```
## 属性嵌套

Sass 还允许嵌套 CSS 属性，这对于具有相同前缀的属性特别有用。

```scss
// SCSS
.element {
  font: {
    family: Roboto, sans-serif;
    size: 16px;
    weight: bold;
  }
  
  border: 1px solid black {
    radius: 5px;
    left: 0;
    right: 0;
  }
  
  margin: 20px {
    top: 10px;
    bottom: 30px;
  }
}
```

编译后的 CSS:
```css
.element {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px;
  border-left: 0;
  border-right: 0;
  margin: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
}
```
## 媒体查询嵌套

您可以将媒体查询嵌套在选择器内部，使响应式设计与组件样式保持在一起。

```scss
// SCSS
.container {
  width: 100%;
  padding: 0 15px;
  
  @media (min-width: 768px) {
    width: 750px;
    margin: 0 auto;
  }
  
  @media (min-width: 992px) {
    width: 970px;
  }
  
  @media (min-width: 1200px) {
    width: 1170px;
  }
}
```

编译后的 CSS:
```css
.container {
  width: 100%;
  padding: 0 15px;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
```
## 嵌套的注意事项

虽然嵌套非常强大，但过度嵌套会导致选择器过于具体和复杂，这可能会带来问题：

1. **特异性过高**：过于具体的选择器难以覆盖
2. **代码臃肿**：生成的选择器可能很长
3. **性能影响**：浏览器需要处理更复杂的选择器

**不良实践示例（过度嵌套）:**
```scss
// 不要这样做！
.page {
  .content {
    .sidebar {
      .widget {
        .title {
          // 太深了！
        }
      }
    }
  }
}
```

**最佳实践:**
- 尽量将嵌套深度限制在 3-4 层
- 考虑使用 BEM 等方法替代深层嵌套
- 只在真正需要表示父子关系时使用嵌套

---
# 插值 #{}

Sass 提供了一种简单的方法来插入变量值，称为插值。插值使用 `#{}` 将变量名包裹起来，并在编译时替换为变量的值。
## 1. 在选择器中使用变量
当您需要动态生成选择器名称时，必须使用插值：
```scss
$component: "button";
$modifier: "primary";

.#{$component} {
  display: inline-block;
  
  &--#{$modifier} {
    background-color: blue;
    color: white;
  }
}

// 编译为
.button {
  display: inline-block;
}

.button--primary {
  background-color: blue;
  color: white;
}
```
## 2. 在属性值中使用变量
当您需要动态生成属性值时，必须使用插值：
```scss
$property: "border";
$side: "top";

.element {
  #{$property}-#{$side}: 2px solid red;
  #{$property}-radius: 5px;
}

// 编译为
.element {
  border-top: 2px solid red;
  border-radius: 5px;
}
```
## 3. 在字符串中使用变量
当您需要动态生成字符串时，必须使用插值：
```scss
$image-dir: "assets/images";
$icon-name: "arrow";

.icon {
  background-image: url("#{$image-dir}/#{$icon-name}.svg");
}

// 编译为
.icon {
  background-image: url("assets/images/arrow.svg");
}
```
## 4. 在 @ 规则中使用变量
在 @import、@media、@keyframes 等规则中使用变量：
```scss
$breakpoint: "min-width: 768px";

@media (#{$breakpoint}) {
  .container {
    max-width: 720px;
  }
}

// 编译为
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
```
## 5. 在 CSS 自定义属性中使用 Sass 变量
当您需要在 CSS 自定义属性中使用 Sass 变量时，必须使用插值：
```scss
$primary-color: #007bff;

:root {
  --primary-color: #{$primary-color};
  --primary-color-rgb: #{red($primary-color), green($primary-color), blue($primary-color)};
}

// 编译为
:root {
  --primary-color: #007bff;
  --primary-color-rgb: 0, 123, 255;
}
```
## 6. 在注释中使用变量
```scss
$version: "1.2.3";

/* This is version #{$version} of the stylesheet */

// 编译为
/* This is version 1.2.3 of the stylesheet */
```
---
# 文件分离

文件分离是 Sass 中最有价值的特性之一，它允许您将样式代码拆分成多个小文件，然后通过导入机制组合起来。这种方法极大地提高了代码的可维护性、可读性和可重用性。
## 部分文件
Sass 使用一种特殊的命名约定来区分哪些文件应该被编译为独立的 CSS 文件，哪些只是被导入的部分文件。

**命名约定**  
部分文件以下划线 (_) 开头，表示它们不会被编译为独立的 CSS 文件

## 导入部分文件
使用 `@import` 或 `@use` 或 `@forward` 指令导入部分文件时，可以省略下划线和扩展名

@import 是 Sass 早期的导入方式，它将所有导入的内容放入全局命名空间。

- @import 的问题：
  - 全局命名空间：所有导入的变量、混合宏和函数都是全局可用的
  - 容易导致冲突：不同文件中的同名变量会相互覆盖
  - 难以追踪来源：不知道变量或混合宏来自哪个文件
  - 重复代码：如果多个文件导入相同的依赖，可能会生成重复的 CSS
```scss
// 导入部分文件（可以省略下划线和扩展名）
@import 'variables';
@import 'mixins';
@import 'components/button';
```

- @use 特点
  - 命名空间：每个导入的文件都有自己的命名空间，避免命名冲突
  - 局部作用域：变量、混合宏和函数不会污染全局命名空间
  - 明确来源：通过命名空间可以清楚地知道成员来自哪个文件
  - 只加载一次：无论导入多少次，每个文件只会被加载一次
```scss
// 1. 使用默认命名空间（文件名）
@use 'buttons';
.my-button {
  @include buttons.style;
}

// 2. 使用自定义命名空间
@use 'buttons' as btn;
.my-button {
  @include btn.style;
}

// 3. 不使用命名空间（不推荐，可能引起冲突）
@use 'buttons' as *;
.my-button {
  @include style;
}
```

- @forward 特点
  - @forward 允许您将多个模块的成员转发到一个文件中，创建统一的入口点。
  - 转发成员：允许从一个文件访问多个文件的成员
  - 不添加命名空间：只是转发，不直接使用
  - 控制可见性：可以使用 show 和 hide 控制哪些成员被转发
  - 添加前缀：可以为转发的成员添加前缀
```scss
// abstracts/_index.scss
@forward 'variables' show $primary-color, $secondary-color; // 只转发指定的变量
@forward 'mixins' hide legacy-mixin; // 转发除指定混合宏外的所有内容

// 添加前缀
@forward 'buttons' as button-*; // 所有按钮相关的成员都会加上 button- 前缀
```

---
# 函数
Sass 函数是 SassScript 的核心功能之一，它们允许您定义可重用的操作和计算，类似于其他编程语言中的函数。Sass 提供了丰富的内置函数，也允许您创建自定义函数。
## 内置函数
Sass 提供了一些内置函数，可以帮助您处理数据。

### 1. 颜色函数
```scss
$primary-color: #3498db;

// 调整颜色
color: lighten($primary-color, 20%);    // 变亮
color: darken($primary-color, 20%);     // 变暗
color: rgba($primary-color, 0.5);       // 添加透明度
color: mix($primary-color, #fff, 50%);  // 混合颜色

// 获取颜色信息
$red: red($primary-color);      // 获取红色分量
$hue: hue($primary-color);      // 获取色相
```

### 2. 字符串函数
```scss
$text: "Hello World";

content: quote($text);          // 添加引号
content: to-upper-case($text);  // 转为大写
content: str-length($text);     // 获取长度
content: str-index($text, "W"); // 查找索引
```

### 3. 数字函数
```scss
$number: 3.14159;

width: percentage(0.5);         // 转为百分比: 50%
height: round($number);         // 四舍五入: 3
padding: ceil($number);         // 向上取整: 4
margin: floor($number);         // 向下取整: 3
font-size: abs(-16px);          // 绝对值: 16px
```

### 4. 列表函数
```scss
$list: (red, blue, green);

length: length($list);          // 列表长度: 3
first: nth($list, 1);           // 第一个元素: red
joined: join($list, (yellow));  // 合并列表
```

### 5. Map 函数
```scss
$colors: (
  "primary": blue,
  "secondary": green
);

has-key: map-has-key($colors, "primary"); // 检查键是否存在
get-value: map-get($colors, "primary");   // 获取值
keys: map-keys($colors);                  // 获取所有键
```

## 自定义函数

### 基本语法
```scss
@function function-name($parameter1, $parameter2: default-value) {
  // 函数体
  @return $result;
}
```



## 函数与混合宏的区别

| 特性 | 函数 (Function) | 混合宏 (Mixin) |
|------|-----------------|----------------|
| 返回值 | 返回一个值 | 不返回值，输出 CSS 代码块 |
| 用途 | 计算和转换值 | 生成重复的 CSS 代码 |
| 调用方式 | `property: function();` | `@include mixin();` |
| 输出 | 单个值 | CSS 声明块 |