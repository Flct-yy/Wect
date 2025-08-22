#  BFC 和 IFC 机制
在 CSS 布局中，格式化上下文（Formatting Context）是页面渲染的核心机制，其中块级格式化上下文（BFC） 和行内格式化上下文（IFC） 是最重要的两种

## 格式化上下文对比表
上下文类型|	触发属性	|布局维度	|主要特点	|浏览器支持
----|----|----|----|----
BFC|	overflow, float 等	|一维垂直	|包含浮动，阻止边距折叠	|全支持
IFC|	行内内容自动创建	|一维水平	|基线对齐，行框计算	|全支持
FFC|	display: flex	|一维弹性	|弹性伸缩，轴向对齐	|全支持
GFC|	display: grid	|二维网格	|网格定位，轨道控制	|全支持
多列|	column-count	|多列流动	|内容分列，列间控制	|全支持
表格|	display: table	|表格结构	|单元格对齐，边框合并	|全支持
容器查询|	container-type	|组件响应	|容器尺寸查询	|现代浏览器
锚定位|	anchor-name	|相对定位	|元素间动态定位	|逐步支持


## 块级格式化上下文（Block Formatting Context - BFC）
### 什么是BFC?
BFC是页面上的一个独立渲染区域,容器内的元素布局不会影响外部元素,同时也不受外部元素影响
### 创建 BFC 的条件
```
/* 以下任一属性值可创建BFC */
.container {
  display: flow-root;       /* 最推荐的方式 */
  overflow: hidden;         /* 非 visible 值 */
  overflow: auto;
  float: left/right;        /* 任意浮动 */
  position: absolute/fixed; /* 绝对定位 */
  display: inline-block;    /* 行内块元素 */
  display: table-cell;      /* 表格单元格 */
  display: flex;            /* 弹性容器 */
  display: grid;            /* 网格容器 */
  contain: layout;          /* 新标准属性 */
}
```
### BFC 的布局规则
* 垂直方向排列：内部块级元素垂直排列
* 外边距折叠阻止：BFC 内外的边距不会折叠
* 包含浮动元素：自动计算浮动元素高度
* 阻止元素环绕：与外部浮动元素互不干扰
* 独立布局空间：不影响外部元素的布局
### BFC 的实际应用
1. 清除浮动（解决高度塌陷）
2. 防止外边距折叠
3. 创建自适应两栏布局

## 行内格式化上下文（Inline Formatting Context - IFC）
### 什么是 IFC？
IFC 是行内级元素（inline-level elements）的布局环境，决定行内元素如何在水平方向上排列。
### 创建 IFC 的条件
当一个块级容器包含行内级元素（非块级元素）时自动创建：
### IFC 的布局规则
* 水平方向排列：元素从左到右水平排列
* 基线对齐：默认基于基线对齐（vertical-align）
* 行框（Line Box）：每行文本生成一个矩形区域
* 高度由行高决定：容器高度由 line-height 决定
* 可能包含空隙：行内元素间的空白符会被渲染
### IFC 的实际应用
1. 垂直居中文本
2. 多行文本的垂直对齐
3. 处理行内元素间隙

## 弹性格式化上下文 (Flex Formatting Context - FFC)
### 触发条件：
display: flex 或 display: inline-flex
### 核心特性：
```
.flex-container {
  display: flex; /* 创建FFC */
  flex-direction: row; /* 主轴方向 */
  justify-content: center; /* 主轴对齐 */
  align-items: stretch; /* 交叉轴对齐 */
  flex-wrap: wrap; /* 换行控制 */
}
```
### 布局规则：
* 单向布局（主轴+交叉轴）
* 子项成为弹性项目(flex items)
* 弹性伸缩（flex-grow/flex-shrink）
* 精确的对齐控制
* 顺序重排能力（order属性）
### 应用场景：
* 响应式导航栏
* 等高卡片布局
* 复杂表单控件
* 移动优先的界面设计

## 网格格式化上下文 (Grid Formatting Context - GFC)
### 触发条件：
display: grid 或 display: inline-grid
### 核心特性：
```
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 列轨道 */
  grid-template-rows: auto 1fr auto; /* 行轨道 */
  gap: 20px; /* 间距控制 */
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}
```
### 布局规则：
* 二维布局系统（行+列）
* 显式和隐式网格轨道
* 网格线定位系统
* 区域命名布局
* 强大的对齐控制
### 应用场景：
* 杂志式复杂布局
* 仪表盘界面
* 响应式图库
* 表单网格系统