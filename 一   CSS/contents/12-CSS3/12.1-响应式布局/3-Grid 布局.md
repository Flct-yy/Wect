# CSS Grid 布局

## 1. 基本概念

* **Grid 布局**：CSS3 的二维网格布局系统。
* **容器 (Container)**：`display: grid | inline-grid`。
* **网格项 (Grid Item)**：容器的直系子元素。

---

## 2. 网格定义

### grid-template-columns

定义列的数量和大小。

```css
grid-template-columns: 200px 1fr 2fr;
```

### grid-template-rows

定义行的数量和大小。

```css
grid-template-rows: 100px auto 50px;
```

### justify-content
设置 整个网格 在容器水平方向的对齐方式  
值：start | end | center | space-between | space-around | space-evenly
### align-content
设置 整个网格 在容器垂直方向的对齐方式  
值：start | end | center | stretch | space-between | space-around | space-evenly


### fr 单位

* **fraction unit**：表示可用空间的分数。
* 例：`1fr 2fr` → 剩余空间按 **1:2** 分配。

### repeat() 函数
* **repeat()**：重复一个值。
* 例：`repeat(3, 1f)` → 重复 `1f` 三次。

---

## 3. 间距

### 现代写法（推荐）

* **column-gap**：列间距
* **row-gap**：行间距
* **gap**：`row-gap` + `column-gap` 简写

```css
gap: 10px 20px; /* 行间10px，列间20px */
```

### 旧写法（废弃）

* grid-column-gap
* grid-row-gap
* grid-gap

---

## 4. 网格定义相关

* **grid**
  一揽子简写（包括模板和自动布局）。

* **grid-template**
  `rows + columns + areas` 的简写。

* **grid-template-areas**
  * 使用命名的区域来定义布局：
  * 每行的区域名用空格隔开，每列的区域名用逗号隔开。
  * . 表示占位符。

```css
grid-template-areas:
  "header header"
  "sidebar main"
  "footer footer";
```

---

## 5. 自动布局

* **grid-auto-rows** → 默认行高
* **grid-auto-columns** → 默认列宽
* **grid-auto-flow** → 自动放置方式

  * `row` → 行方向
  * `column` → 列方向
  * `dense` → 紧密排列，尽量填补空隙

---

## 6. 网格元素定位

* **grid-column**：列的起止位置
  * grid-column-start 和 grid-column-end 属性的简写属性。
  * span 关键字，表示跨越的列数。
  * 简写 → `grid-column: start / end`
* **grid-row**：行的起止位置
  * grid-row-start 和 grid-row-end 属性的简写属性。
  * span 关键字，表示跨越的行数。
  * 简写 → `grid-row: start / end`
* **grid-area**：命名或位置简写
  * grid-row-start, grid-column-start, grid-row-end 以及 grid-column-end 属性的简写。
  * 命名 → `grid-area: name`
  * 位置 → `grid-area: row-start / column-start / row-end / column-end`

start是包含在内的，end是不包含在内的。
```css
.item {
  grid-column: 1 / 3; /* 占两列 */
  grid-row: 2 / 4;    /* 占两行 */
}
```

---

## 7. 速查表

| 分类       | 属性                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------- |
| **网格定义** | grid, grid-template, grid-template-rows, grid-template-columns, grid-template-areas                |
| **自动布局** | grid-auto-rows, grid-auto-columns, grid-auto-flow                                                  |
| **间距**   | gap, row-gap, column-gap （旧：grid-gap, grid-row-gap, grid-column-gap）                               |
| **元素定位** | grid-row, grid-row-start, grid-row-end, grid-column, grid-column-start, grid-column-end, grid-area |