# JS是什么
* JavaScript 是脚本语言
* JavaScript 是一种轻量级的编程语言。
* JavaScript 是可插入 HTML 页面的编程代码。
* JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。


# JavaScript 用法
HTML 中的 Javascript 脚本代码必须位于 `<script>` 与 `</script>` 标签之间。

Javascript 脚本代码可被放置在 HTML 页面的 `<body>` 和 `<head>` 部分中。

body和head区别:  
head:

* **立即加载执行**：在页面渲染前执行，阻塞后续内容解析。
* **DOM访问问题**：此时DOM树尚未构建完成，无法操作页面元素（需通过DOMContentLoaded事件解决）。
* **适用场景**：需要提前执行的代码

body:

* **最后执行**：在DOM加载完成后执行，不阻塞页面渲染。
* **直接操作DOM**：可安全访问所有页面元素。
* **性能优化**：用户先看到页面内容，体验更流畅。

如需使用外部文件，请在 `<script>` 标签的 "src" 属性中设置该 .js 文件：`<script src="myScript.js"></script>`

# JavaScript 输出

JavaScript 可以通过不同的方式来输出数据：
* 使用 window.alert() 弹出警告框。
* 使用 document.write() 方法将内容写到 HTML 文档中。
* 使用 innerHTML 写入到 HTML 元素。
* 使用 console.log() 写入到浏览器的控制台。

# 变量声明

变量声明规则:
* 变量必须以字母开头
* 变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）
* 变量名称对大小写敏感（y 和 Y 是不同的变量）