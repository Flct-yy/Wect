# DOM

## HTML DOM (文档对象模型)
当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

HTML DOM 模型被构造为对象的树形结构，每个对象都代表文档中的一个元素。

HTML DOM 定义了用于获取、修改、添加或删除页面元素的接口。

* JavaScript 能够改变页面中的所有 HTML 元素
* JavaScript 能够改变页面中的所有 HTML 属性
* JavaScript 能够改变页面中的所有 CSS 样式
* JavaScript 能够对页面中的所有事件做出反应

## 查找 HTML 元素
三种方法查找 HTML 元素：

1. 通过 ID 选择器：`document.getElementById("myId")`
2. 通过 标签名 选择器：`document.getElementsByTagName("p")`
3. 通过 类名 选择器：`document.getElementsByClassName("myClass")`

## 操作 HTML 元素
`document.write()` 可用于直接向 HTML 输出流写内容。

innerHTML 属性可用于获取或修改元素的内容。
`document.getElementById(id).innerHTML=新的 HTML`

可以设置或修改元素的属性：

* `document.getElementById(id).setAttribute(属性名, 属性值)`
* `document.getElementById(id).attribute=新属性值`

```
document.getElementById("image").src="landscape.jpg";
```

## 改变 HTML 样式

1. `document.getElementById(id).style.property=value`
2. `document.getElementById(id).style[property]=value`

改变 HTML 元素的样式属性，如字体颜色、背景颜色、字体大小、边框样式等。

## 事件处理
HTML DOM 提供了处理事件的接口。

* `onclick、onmouseover、onmouseout、onkeydown、onkeyup、onkeypress` 等事件属性可用于为元素添加事件处理程序。
* `element.addEventListener(event, function, useCapture);` 方法用于为元素添加事件处理程序。
    * 向指定元素添加事件句柄。
    * 添加的事件句柄不会覆盖已存在的事件句柄。
    * 第一个参数是事件的类型 (如 "click" 或 "mousedown").
    * 第二个参数是事件触发后调用的函数。
    * 第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。
* `element.removeEventListener("mousemove", myFunction);` 方法用于移除事件处理程序。

### 冒泡与捕获
事件处理程序可以是冒泡或捕获。

* 冒泡：事件从最具体的元素开始，逐级向上传播到较不具体的元素。
* 捕获：事件从最不具体的元素开始，逐级向下捕获到较具体的元素。

```
如果你将 <p> 元素插入到 <div> 元素中，用户点击 <p> 元素, 哪个元素的 "click" 事件先被触发呢？

在 冒泡 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。

在 捕获 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。
```

##  添加、删除、移动、复制、创建、替换元素

### 创建新的 HTML 元素 (节点)
要创建新的 HTML 元素 (节点)需要先创建一个元素，然后在已存在的元素中添加它。

```
// 创建新元素
const newDiv = document.createElement('div');
const newImg = document.createElement('img');

// 创建文本节点
const textNode = document.createTextNode('Hello World!');

// 创建文档片段（优化批量操作）
const fragment = document.createDocumentFragment();
```

### 添加元素

```
// 添加到父元素末尾
parentElement.appendChild(newDiv);

// 添加到特定位置
parentElement.insertBefore(newDiv, referenceElement);

// 添加到元素内部（会覆盖原有内容）
element.innerHTML = '<p>New content</p>';

// 添加到元素开头
parentElement.prepend(newDiv);

// 添加到元素结尾（支持多个参数）
parentElement.append(newDiv, textNode);

// 在元素后面插入
existingElement.after(newElement);

// 在元素前面插入
existingElement.before(newElement);
```

### 删除元素

```
// 删除子元素
parentElement.removeChild(childElement);

// 直接删除元素自身
childElement.remove();

// 清空所有子元素
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

### 移动元素

```
// 移动到新父元素（自动从原位置移除）
newParent.appendChild(existingElement);

// 插入到特定元素前
referenceElement.parentNode.insertBefore(
  existingElement,
  referenceElement
);

// 交换两个元素位置
function swapElements(el1, el2) {
  const parent = el1.parentNode;
  const next = el2.nextSibling;
  
  if (next === el1) {
    parent.insertBefore(el1, el2);
  } else {
    parent.insertBefore(el2, el1);
    parent.insertBefore(el1, next);
  }
}
```

### 复制元素

```
// 浅拷贝（不包含子元素）
const shallowCopy = element.cloneNode(false);

// 深拷贝（包含所有子元素）
const deepCopy = element.cloneNode(true);

// 添加ID处理（避免重复ID）
deepCopy.id = 'copy-' + element.id;
```

### 替换元素

```
parentNode.replaceChild(newNode, oldNode);

parentNode: 父节点容器
newNode: 要插入的新节点
oldNode: 要被替换的旧节点
返回值: 被替换的旧节点（可被回收或复用）

// 等价于 replaceChild()
oldNode.replaceWith(newNode);
```