# HTMLCollection 对象(动态实时集合)

## 定义

Collection 对象是 DOM 接口的集合，它代表一组 DOM 元素。

getElementsByTagName() 方法返回 HTMLCollection 对象。

**注意**
* HTMLCollection 不是一个数组！
* HTMLCollection 是一个类似数组的对象，但它不是数组。
* HTMLCollection 对象是动态的，它会实时更新，当文档结构发生变化时，它也会更新。
* HTMLCollection 对象是只读的，不能修改它。
你可以像数组一样，使用索引来获取元素，但不能使用数组的方法。


## 构造函数

Collection 对象是 DOM 接口的集合，它代表一组 DOM 元素。

```javascript
var collection = document.getElementsByTagName("div");
```

## 属性

### length

length 属性返回 Collection 对象中元素的数量。

```javascript
var collection = document.getElementsByTagName("div");
var length = collection.length;
```
## 方法

### item()

item() 方法返回指定索引处的元素。

```javascript
var collection = document.getElementsByTagName("div");
var element = collection.item(0);
```

### namedItem()

namedItem() 方法返回具有指定 ID 的元素。

```javascript
var collection = document.getElementsByName("myForm");
var element = collection.namedItem("myForm");

// 如果没有找到元素，则返回 null。
```

# NodeList 对象(多数为静态集合)

## 定义

NodeList 对象是 DOM 接口的集合，它代表一组 Node 对象。

NodeList 对象是一个从文档中获取的节点列表 (集合) 。

* 一些旧版本浏览器中的方法（如：getElementsByClassName()）返回的是 NodeList 对象，而不是 HTMLCollection 对象。
* 所有浏览器的 childNodes 属性返回的是 NodeList 对象。
  * length 属性会自动更新，不需要重新获取 NodeList 对象。
* 大部分浏览器的 querySelectorAll() 返回 NodeList 对象。
  * length 属性不会自动更新，需要重新获取 NodeList 对象。

**注意**
* NodeList 是一个类似数组的对象，但它不是数组。
* NodeList 对象是动态的，它会实时更新，当文档结构发生变化时，它也会更新。
* NodeList 对象是只读的，不能修改它。
你可以像数组一样，使用索引来获取元素，但不能使用数组的方法。

## 构造函数

NodeList 对象是 DOM 接口的集合，它代表一组 Node 对象。

```javascript
var nodeList = document.querySelectorAll("div");
```

## 属性

### length

length 属性返回 NodeList 对象中元素的数量。

```javascript
var nodeList = document.querySelectorAll("div");
var length = nodeList.length;
```

## 方法

### item()

item() 方法返回指定索引处的元素。

```javascript
var nodeList = document.querySelectorAll("div");
var element = nodeList.item(0);
```

### forEach()

forEach() 方法对 NodeList 对象中的每个元素执行一次指定的函数。

```javascript
var nodeList = document.querySelectorAll("div");
nodeList.forEach(function(element) {
  console.log(element);
});
```