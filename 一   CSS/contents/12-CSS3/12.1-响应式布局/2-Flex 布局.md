# FLex 布局

Flex 布局（Flexible Box）是 CSS3 中用于布局的一种新方案。主要用于在容器中对元素进行高效的对齐与分配空间，能够很好地适配不同屏幕和设备。

# 弹性盒子内容
Flex 布局由两部分组成：

* 弹性容器 (Flex container)：通过 display: flex 或 display: inline-flex 定义。
* 弹性子元素 (Flex items)：容器中的直接子元素会成为弹性子元素

# flex-direction
控制 **主轴（main axis）方向**，决定子元素的排列方向。

* row：横向从左到右排列（左对齐），默认的排列方式。
* row-reverse：反转横向排列（右对齐，从后往前排，最后一项排在最前面。
* column：纵向排列。
* column-reverse：反转纵向排列，从后往前排，最后一项排在最上面。

# justify-content
定义子元素在 **主轴方向** 上的对齐方式。

* flex-start：默认值，子元素沿主轴的起点对齐。
* flex-end：子元素沿主轴的终点对齐。
* center：子元素沿主轴居中。
* space-between：子元素平均分布，两端对齐，首个元素放置于起点，末尾元素放置于终点。
* space-around：子元素平均分布，两侧留有空白，每个元素周围分配相同的空间。
* space-evenly：子元素平均分布，两侧留有相同的空白，首尾元素与中间元素间距相等。

# flex-wrap
定义子元素是否**换行**

* nowrap：默认值，不换行。
* wrap：子元素换行，第一行在上方。
* wrap-reverse：子元素换行，第一行在下方。

# align-items
定义子元素在 **交叉轴（cross axis）方向** 的对齐方式（针对**单行**）。

* stretch：默认，子元素拉伸填满交叉轴。
* flex-start：交叉轴起点对齐。
* flex-end：交叉轴终点对齐。
* center：交叉轴居中对齐。
* baseline：基线对齐。

# align-content
定义 **多行** 子元素在**交叉轴**方向上的对齐方式（仅当 flex-wrap 生效时才有效）。

* stretch：默认值，将多行项目拉伸以占据整个交叉轴。项目被拉长以填充可用空间。
* flex-start：所有行紧贴容器交叉轴的起始端（顶部）堆放。
* flex-end：所有行紧贴容器交叉轴的终点端（底部）堆放。
* center：所有行作为一个整体在交叉轴方向上居中。
* space-between：两端对齐。首行在交叉轴起点，末行在交叉轴终点，行与行之间间隔相等。
* space-around：每行两侧的间隔相等。每行上下两边的空间相同，因此行之间的视觉间隔是首末行与边框之间间隔的两倍。
* space-evenly：所有间隔完全相等。行与行之间、首行与容器边框之间、末行与容器边框之间的间隔宽度都完全相同。

# align-self
align-self 属性定义了单个弹性子元素在交叉轴（纵向）方向上的对齐方式。允许单个子元素在交叉轴方向上覆盖 align-items 的设置。

* auto：如果'align-self'的值为'auto'，则其计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。
* flex-start：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。
* flex-end：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。
* center：弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
* baseline：如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。
* stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制

# flex
flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写属性，用来设置弹性子元素的放大比例、缩小比例和占据的主轴长度。

* flex-grow：放大比例（默认 0）。
* flex-shrink：缩小比例（默认 1）。
* flex-basis：主轴初始空间（默认 auto）。

# 排序
order 属性定义了弹性子元素的排列顺序。
用整数值来定义排列顺序，数值小的排在前面。可以为负值。
默认值为 0。

# 对齐
设置"margin"值为"auto"值，自动获取弹性容器中剩余的空间。所以设置垂直方向margin值为"auto"，可以使弹性子元素在弹性容器的两上轴方向都完全居中。

* 水平居中：margin-left: auto; margin-right: auto;
* 垂直居中：margin-top: auto; margin-bottom: auto;
* 完全居中：四个方向都设为 auto。

# 完美的居中
需要设置 margin: auto; 可以使得弹性子元素在两上轴方向上完全居中: