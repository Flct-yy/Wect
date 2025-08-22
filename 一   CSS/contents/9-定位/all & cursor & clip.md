# 定位 Position
Position 决定了元素在文档中的定位方式及其与其他元素的关系。

## static(静态定位)
**默认值**，元素按照正常文档流排列  

**特点：**
* **不**受 top、right、bottom、left 影响
* 不创建新的层叠上下文

## relative(相对定位)
**特点：**
* 相对于元素自身原始位置进行偏移
* 保留原有空间（其他元素不会填补位置）
* 可以设置 z-index  

**使用场景：** 微调元素位置，或作为 absolute 定位的参照

## absolute(绝对定位)
**特点：**
* 相对于最近的`非 static` 定位祖先元素定位
* 脱离文档流（不占据空间）
* 可以设置 z-index
* 元素变为块级元素（display 计算为 block）

**使用场景：** 弹出层、自定义下拉菜单等

## fixed(固定定位)
**特点：**
* 相对于视口（viewport）定位
* 脱离文档流
* 不随页面滚动而移动
* 可以设置 z-index  

**使用场景：** 固定导航栏、悬浮按钮等

## sticky(粘性定位)

**特点：**
* 混合了 relative 和 fixed 的特性
* 在阈值范围内表现为 relative，超过后表现为 fixed
* 必须指定至少一个阈值（top/right/bottom/left）

**使用场景：** 吸顶/吸底效果  

**注意：**
* 必须指定阈值：top、bottom、left或right至少一个  
`top: 20px; /* 当视口顶部距离元素顶部≤20px时固定 */`  

**父容器限制：**
* 粘性元素不能有overflow: hidden的父元素
* 在表格中使用时，需要确保表格有足够高度

## 定位偏移属性
1. `top / right / bottom / left`接受长度值（px, em, %等）或 auto

2. 层叠顺序  
  `z-index`：控制定位元素的堆叠顺序  
  只对定位元素（非 static）有效  
  数值越大越靠前  
  可以负值

## cursor
**cursor** 属性属于 CSS 用户界面（UI）属性，它控制当鼠标指针移动到元素上时显示的光标类型。

1. **通用光标类型**  

值	|描述	|典型使用场景  
|----|----|----|  
auto |	浏览器自动决定光标	| 默认行为  
default |	默认箭头光标	| 常规状态  
pointer |	手形指针	| 可点击元素（链接、按钮）  
text |	I形文本光标	文本输入区域  
move |	十字箭头（可移动）	| 可拖拽元素  
wait |	等待/加载状态（通常为沙漏或旋转圈）	| 系统繁忙时  
help |	帮助光标（带问号）	| 帮助提示区域  
2. **调整大小光标**

值|	描述
|----|----|
n-resize|	向上调整大小（北）
e-resize|	向右调整大小（东）
s-resize|	向下调整大小（南）
w-resize|	向左调整大小（西）
ne-resize|	向右上调整大小（东北）
nw-resize|	向左上调整大小（西北）
se-resize|	向右下调整大小（东南）
sw-resize|	向左下调整大小（西南）
ew-resize|	双向水平调整
ns-resize|	双向垂直调整
nesw-resize|	双向斜角调整（东北-西南）
nwse-resize|	双向斜角调整（西北-东南）

3. **特殊状态光标**

值	|描述
----|----
not-allowed	|禁止操作（带禁止符号）
no-drop	|不能放置（与禁止类似）
crosshair	|十字线
progress	|进度状态（通常为箭头+沙漏）
context-menu	|上下文菜单可用
4. **自定义光标**  
  `cursor: url('cursor.png'), auto;`
* 可以指定自定义图像光标
* 必须提供备用光标（如auto）

## clip(废弃) => clip-path
`clip` 属性用于剪裁绝对定位（position: `absolute` 或 position: `fixed`）的元素，显示元素的指定区域而隐藏其余部分。  
`clip: auto | rect(top, right, bottom, left) | inherit;`  

**rect()参数：**  
语法：`rect(top, right, bottom, left)`
* 四个值分别表示从元素边界剪裁的距离
* 参数顺序固定且不可更改


`clip-path` 是现代 CSS 提供的强大裁剪属性，可以创建各种复杂的形状来裁剪元素的可视区域，比传统的 clip 属性更灵活强大。  
`clip-path: <clip-source> | [ <basic-shape> || <geometry-box> ] | none`
