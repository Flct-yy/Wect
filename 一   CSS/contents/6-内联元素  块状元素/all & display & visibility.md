# 内联元素 / 块状元素

|特性	|内联元素	|块状元素|
|----|----|----|
|默认 display 值	|inline	|block|
|宽度/高度|	由内容决定，设置无效|	可设置，默认占满父容器宽度|
|边距/内边距|	水平方向有效，垂直方向不影响布局|	四个方向都有效|
|换行|	不会强制换行|	独占一行，自动换行|
|包含关系|	只能包含文本和其他内联元素|	可包含任何元素|


# 隐藏元素 - display:none或visibility:hidden
**区别:**  
display:none可以隐藏某个元素，且隐藏的元素不会占用任何空间。  
visibility:hidden可以隐藏某个元素，但隐藏的元素仍需占用与未隐藏之前一样的空间。

# display
**值:**

* /* **块级元素** */  
`display: block;  `
* /* **行内元素** */  
`display: inline;  `
* /* **行内块元素 - 兼具两者特性** */  
  `display: inline-block;  `
  * 特点：  
  * 像内联元素一样水平排列
  * 像块元素一样可以设置宽高和边距  
* /* **弹性盒子** */  
`display: flex;  `
* /* **网格布局** */  
display: grid;  
* /* **表格相关** */  
`display: table;`  
`display: table-cell;`  
`display: table-row;`  
* /* **隐藏元素并移除布局空间** */  
`display: none;  `

# visibility
**值:**
* /* **默认值，元素可见** */  
`visibility: visible;`
* /* **元素不可见但仍占据空间** */  
`visibility: hidden;`
* /* **表格行/列专用，移除空间** */  
`visibility: collapse;`