# 盒子模型
CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。  
盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。  
![alt text](box-model.gif)
不同部分的说明：
* **Margin(外边距)** - 清除边框外的区域，外边距是透明的。
* **Border(边框)** - 围绕在内边距和内容外的边框。
* **Padding(内边距)** - 清除内容周围的区域，内边距是透明的。
* **Content(内容)** - 盒子的内容，显示文本和图像。

## 元素的宽度和高度
标准盒子模型（默认）
在标准盒子模型下：
* 元素的总宽度 = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
* 元素的总高度 = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom