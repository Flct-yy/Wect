# javascript:void(0) 含义
`void(0)` 是一个表达式，它的值是 `undefined`。

`void` 运算符是 JavaScript 中的一个运算符，它的作用是返回 `undefined`。

* **void操作符**：计算任意表达式并始终返回undefined
* **0参数**：只是一个占位符，可以是任何值（void(1), void("hello")等）
* **整体效果**：执行一个无操作（no-op）的JavaScript语句，返回undefined
## 为什么使用它？
主要用途是阻止链接的默认行为(但不在推荐使用)：
```
<!-- 传统链接会跳转 -->
<a href="https://example.com">跳转到示例</a>

<!-- 使用 # 会滚动到页面顶部 -->
<a href="#">点击我</a> 

<!-- 使用 javascript:void(0) 阻止所有默认行为 -->
<a href="javascript:void(0)" onclick="myFunction()">执行JS但不跳转</a>
```

## 现代阻止链接替代方案（推荐）
### 1. 使用 event.preventDefault()
```
<a href="#" onclick="handleClick(event)">点击我</a>

<script>
function handleClick(event) {
  event.preventDefault(); // 阻止默认行为
  // 执行自定义逻辑
}
</script>
```
### 2. 返回 false（简单场景）
` <a href="#" onclick="return false;">完全阻止</a> `
### 3. 使用按钮代替链接
```
<!-- 最佳实践：使用按钮处理操作 -->
<button onclick="handleAction()">执行操作</button>
```
### 4. 使用 #! 或空片段
`<a href="#!" onclick="handleClick()">现代替代方案</a>`