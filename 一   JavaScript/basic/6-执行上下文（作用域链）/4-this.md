# this
this 是函数执行的主体(不是上下文): 意思是谁把函数执行的,那么执行主体就是谁

## this 指向

在创建阶段确定，取决于调用方式：

调用方式	|this 值
---|---
全局上下文	|全局对象（浏览器中为 window）
函数调用（非严格模式）	|全局对象
函数调用（严格模式）	|undefined
方法调用	|所属对象
new 调用	|新创建的对象
call/apply/bind	|指定的对象

* 全局作用域里的 this 是 window，严格模式下是 undefined，window.fn() 把 window. 省略了；
* 函数的 this，看执行主体前有没有点，有点，前面是谁，函数里的 this 就是谁，没有点，函数的 this 就是 window，严格模式下是 undefined
* 自执行函数里的 this 是 window，严格模式下是 undefined
* 回调函数里的 this 一般情况下是 window
* 箭头函数没有 this，在箭头函数中使用的 this，是上级作用域或作用域链中找到的 this，直到找到全局的 window。
* 构造函数里的 this 是当前实例
* 实例原型上的公有方法里的 this 一般是当前实例
* 给元素绑定事件行为事件里的 this 就是当前被绑定的元素本身

## 捋一捋

每个执行上下文，都有三个重要属性：变量对象(Variable object，VO)，作用域链(Scope chain)，this。下面结合起来分析：

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

#### 1. 执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈：
```javascript
ECStack = [
    globalContext  // 全局上下文入栈
];
```
#### 2. 全局上下文初始化：
```javascript
globalContext = {
    VO: global,           // 变量对象指向全局对象
    Scope: [globalContext.VO],  // 作用域链
    this: globalContext.VO      // this 指向全局对象
};
```
初始化的同时，`checkscope` 函数被创建，保存作用域链到函数的内部属性 `[[scope]]`:
```javascript
checkscope.[[scope]] = [
    globalContext.VO  // 继承全局作用域
];
```

#### 3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈：
```javascript
ECStack = [
    checkscopeContext,  // 新上下文入栈
    globalContext
];
```
#### 4.checkscope 函数执行上下文初始化：
  * 复制函数 [[scope]] 属性创建作用域链
  * 用 arguments 创建活动对象
  * 初始化活动对象，即加入形参、函数声明、变量声明
  * 将活动对象压入 checkscope 作用域链顶端，同时 f 函数被创建，保存作用域链到 f 函数的内部属性 [[scope]]

```javascript
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope: undefined,
        f: reference to function f(){}
    },
    Scope: [AO, globalContext.VO],
    this: undefined
}
```

#### 5. 执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈
```javascript
ECStack = [
    fContext,
    checkscopeContext,
    globalContext
];
```

#### 6.f 函数执行上下文初始化, 以下跟第 4 步相同：
  * 复制函数 [[scope]] 属性创建作用域链
  * 用 arguments 创建活动对象
  * 初始化活动对象，即加入形参、函数声明、变量声明
  * 将活动对象压入 f 作用域链顶端
```javascript
fContext = {
    AO: {
        arguments: {
        length: 0
        }
    },
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
    this: undefined
}
```

#### 7.f 函数执行，沿着作用域链查找 scope 值，返回 scope 值
#### 8.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出
```javascript
// f 执行完毕
ECStack = [
    checkscopeContext,
    globalContext
];
```
#### 9. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
```javascript
// checkscope 执行完毕
ECStack = [
    globalContext
];
```
