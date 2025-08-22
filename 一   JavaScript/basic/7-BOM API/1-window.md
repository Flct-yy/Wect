# window 对象
所有浏览器都支持 window 对象。它表示浏览器窗口。

所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。

全局变量是 window 对象的属性。

全局函数是 window 对象的方法。

甚至 HTML DOM 的 document 也是 window 对象的属性之一：

## 1. 窗口操作与控制

```
// 打开新窗口
const newWindow = window.open(
  'https://example.com', 
  '_blank', 
  'width=600,height=400,top=100,left=100'
);

// 关闭当前窗口
window.close();

// 调整窗口大小
window.resizeTo(800, 600); // 绝对大小
window.resizeBy(100, -50); // 相对调整

// 移动窗口位置
window.moveTo(200, 100); // 绝对位置
window.moveBy(50, 30); // 相对移动

// 窗口滚动
window.scrollTo(0, 500); // 滚动到指定位置
window.scrollBy(0, 100); // 相对滚动

// 平滑滚动到页面顶部
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
```

## 2. 窗口状态与信息

```
// 获取窗口尺寸
const windowWidth = window.innerWidth || document.documentElement.clientWidth;
const windowHeight = window.innerHeight || document.documentElement.clientHeight;

console.log(`窗口尺寸: ${windowWidth} × ${windowHeight}`);

// 获取屏幕可用尺寸
const availWidth = window.screen.availWidth;
const availHeight = window.screen.availHeight;

// 窗口是否全屏
const isFullscreen = document.fullscreenElement !== null;

// 窗口焦点状态
const hasFocus = document.hasFocus();
console.log(`窗口${hasFocus ? '有' : '没有'}焦点`);
```

## 3. 对话框与用户交互

```
// 警告框
alert('操作已完成！');

// 确认对话框
const shouldDelete = confirm('确定要删除此项吗？');
if (shouldDelete) {
  // 执行删除操作
}

// 输入对话框
const userName = prompt('请输入您的姓名：', '张三');
if (userName) {
  console.log(`欢迎，${userName}！`);
}

// 打印对话框
window.print();
```

## 4. 定时器与异步操作

```
// 一次性定时器
const timeoutId = setTimeout(() => {
  console.log('5秒后执行');
}, 5000);

// 清除定时器
clearTimeout(timeoutId);

// 周期性定时器
const intervalId = setInterval(() => {
  console.log('每秒执行');
}, 1000);

// 清除周期性定时器
clearInterval(intervalId);

// 动画帧定时器（最佳动画实践）
let animationId;
function animate() {
  // 动画逻辑
  animationId = requestAnimationFrame(animate);
}
animationId = requestAnimationFrame(animate);

// 取消动画
cancelAnimationFrame(animationId);
```

## 5. 窗口事件处理

```
// 页面加载完成
window.addEventListener('load', () => {
  console.log('所有资源加载完成');
});

// DOM 内容加载完成
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM 结构加载完成');
});

// 窗口大小变化
window.addEventListener('resize', () => {
  console.log(`新窗口尺寸: ${window.innerWidth}×${window.innerHeight}`);
});

// 窗口滚动事件
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY || window.pageYOffset;
  console.log(`垂直滚动位置: ${scrollY}px`);
});

// 页面关闭前确认
window.addEventListener('beforeunload', (event) => {
  if (hasUnsavedChanges) {
    event.preventDefault();
    event.returnValue = '您有未保存的更改';
    return '您有未保存的更改';
  }
});

// 窗口获得/失去焦点
window.addEventListener('focus', () => console.log('窗口获得焦点'));
window.addEventListener('blur', () => console.log('窗口失去焦点'));
```


