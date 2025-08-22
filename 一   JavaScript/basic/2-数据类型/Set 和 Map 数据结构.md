# JavaScript Set 和 Map 数据结构详解

Set 和 Map 是 ES6 引入的两种强大的`数据结构`，它们提供了比传统数组和对象更高效的数据处理能力，特别适合处理唯一值和键值对集合。

Set 和 Map 主要的应用场景在于 `数据重组` 和 `数据储存`

Set 是一种叫做 `集合` 的数据结构，Map 是一种叫做 `字典` 的数据结构

## 一、Set 数据结构

### 1. 核心特性
- **唯一值存储**：自动去重，相同的值只能存在一个
- **值类型多样**：可以存储任何类型的值（包括原始类型和对象引用）
- **有序集合**：元素按插入顺序排列
- **高效操作**：基于哈希表实现，查找、添加、删除操作接近 O(1) 时间复杂度

Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

### 2. 静态属性
* Set.prototype.constructor：构造函数，默认就是 Set 函数。
* Set.prototype.size：返回 Set 实例的成员总数。
### 3. 操作方法
用于操作数据

(* Set.prototype.add(value)：添加某个值，返回 Set 结构本身。`Set 结构不会添加重复的值。`
(* Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
(* Set.prototype.has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
(* Set.prototype.clear()：清除所有成员，没有返回值。
### 4. 遍历方法
用于遍历成员

* Set.prototype.keys()：返回键名的遍历器
* Set.prototype.values()：返回键值的遍历器
* Set.prototype.entries()：返回键值对的遍历器
* Set.prototype.forEach()：使用回调函数遍历每个成员

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 keys 方法和 values 方法的行为完全一致。默认遍历器生成函数就是它的 values 方法，可以省略 values 方法，直接用 for...of(value) 循环遍历 Set。

### 5. 特性
* 成员的值都是唯一的，没有重复的值。
* 利用 Set 去除数组重复成员。
* 向 Set 加入值的时候，不会发生类型转换。类似 === 的算法判断两个值是否不同，主要的区别是向 Set 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。
* keys 方法和 values 方法的行为完全一致。原因是 Set 结构没有键名，只有键值（或者说键名和键值是同一个值）
* 直接用 for...of(value) 循环遍历 Set
* 实现并集（Union）、交集（Intersect）和差集（Difference）。
```javascript
let set1 = new Set([1, 2, 3])
let set2 = new Set([4, 3, 2])

// 交集{2, 3}
let intersect = new Set([...set1].filter(value => set2.has(value)))
// 并集{1, 2, 3, 4}
let union = new Set([...set1, ...set2])
// 差集{1}
let difference = new Set([...set1].filter(value => !set2.has(value)))
```

### 6. 迭代方法
```javascript
const colors = new Set(['red', 'green', 'blue']);

// forEach 遍历
colors.forEach(color => {
  console.log(color);// 'red', 'green', 'blue'
});

// for...of 循环
for (const color of colors) {
  console.log(color);// 'red', 'green', 'blue'
}

// 转数组
const colorArray = [...colors];
console.log(colorArray); // ['red', 'green', 'blue']

// 获取迭代器
const iterator = colors.values();
console.log(iterator.next().value); // 'red'
```

### 7. 实际应用场景

#### 数组去重
```javascript
const duplicateNumbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(duplicateNumbers)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]
```

#### 集合运算
```javascript
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// 并集
const union = new Set([...setA, ...setB]);

// 交集
const intersection = new Set([...setA].filter(x => setB.has(x)));

// 差集 (A - B)
const difference = new Set([...setA].filter(x => !setB.has(x)));

console.log([...union]);     // [1, 2, 3, 4, 5]
console.log([...intersection]); // [3]
console.log([...difference]);   // [1, 2]
```

#### 追踪唯一对象
```javascript
const userLogs = new Set();

function logUserActivity(user) {
  if (!userLogs.has(user)) {
    userLogs.add(user);
    console.log(`New activity from ${user.name}`);
  }
}

const user1 = { id: 1, name: 'Alice' };
logUserActivity(user1); // New activity from Alice
logUserActivity(user1); // 无输出（已存在）
```

## 二、Map 数据结构

### 1. 核心特性
- **键值对存储**：类似对象，但键可以是任意类型（包括对象）
- **有序集合**：键值对按插入顺序排列
- **高效操作**：查找、添加、删除操作接近 O(1) 时间复杂度
- **大小追踪**：内置 size 属性，无需手动计算

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如 0 和 -0 就是一个键，布尔值 true 和字符串 true 则是两个不同的键。另外，undefined 和 null 也是两个不同的键。虽然 NaN 不严格相等于自身，但 Map 将其视为同一个键。
#### 扩展

Map 的插入总是保持着先后顺序（删除了中间元素也会保持顺序），这和传统 Hash 并不一样。传统 Hash 是一种散列结构，元素并不具备顺序性，而 Map 很明显， 后插入的元素就在最后，保持着这种先后顺序。Map 的底层数据结构，使用了 Hash + 链表 实现。用 Hash 思想来存储数据，达到 O(1) 的查找时间，用链表思想来维持插入数据的先后顺序。

### 2. 静态属性
* Map.prototype.size：size 属性返回 Map 结构的成员总数。
### 3. 操作方法
* Map.prototype.set(key, value)：set 方法设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键。set 方法返回的是当前的 Map 对象，因此可以采用链式写法。
* Map.prototype.get(key)：get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。
* Map.prototype.has(key)：has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
* Map.prototype.delete(key)：delete方法删除某个键，返回 true。如果删除失败，返回 false。
Map.prototype.clear()：clear 方法清除所有成员，没有返回值。
### 4. 遍历方法
* Map.prototype.keys()：返回键名的遍历器。
* Map.prototype.values()：返回键值的遍历器。
* Map.prototype.entries()：返回所有成员的遍历器。等同于 for (let [key, value] of map.entries()) {}
* Map.prototype.forEach()：遍历 Map 的所有成员。
### 5. 特性
* Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
* Map 的键若是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等(===)，Map 将其视为一个键
* Map 的 set 方法返回的是当前的 Map 对象，因此可以采用链式写法。
* Map 结构转数组结构，可用扩展运算符（...）

```javascript
// Map 转 Array
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map]) // [[1, 1], [2, 2], [3, 3]]

// Array 转 Map
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map) // Map {1 => 1, 2 => 2, 3 => 3}

// Map 转 object
// 因为 Object 的键名都为字符串，而Map 的键名为对象，所以转换的时候会把非字符串键名转换为字符串键名。
function mapToObj(map) {
    let obj = Object.create(null)
    for (let [key, value] of map) {
        obj[key] = value
    }
    return obj
}
const map = new Map().set('name', 'An').set('des', 'JS')
mapToObj(map) // {name: "An", des: "JS"}

// Object 转 Map
function objToMap(obj) {
    let map = new Map()
    for (let key of Object.keys(obj)) {
        map.set(key, obj[key])
    }
    return map
}

objToMap({'name': 'An', 'des': 'JS'}) // Map {"name" => "An", "des" => "JS"}

// Map 转 JSON
function mapToJson(map) {
    return JSON.stringify([...map])
}

let map = new Map().set('name', 'An').set('des', 'JS')
mapToJson(map) // [["name","An"],["des","JS"]]

// JSON 转 Map
function jsonToStrMap(jsonStr) {
  return objToMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"name": "An", "des": "JS"}') // Map {"name" => "An", "des" => "JS"}
```
### 6. 迭代方法
```javascript
const settings = new Map([
  ['theme', 'dark'],
  ['fontSize', 16],
  ['notifications', true]
]);

// forEach 遍历
settings.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// for...of 循环
for (const [key, value] of settings) {
  console.log(`${key} = ${value}`);
}

// 获取键集合
const keys = [...settings.keys()];

// 获取值集合
const values = [...settings.values()];

// 获取条目
const entries = [...settings.entries()];
```

### 7. 与 Object 的对比

| 特性                | Map                            | Object                      |
|---------------------|--------------------------------|-----------------------------|
| 键类型              | 任意类型                       | String 或 Symbol            |
| 键顺序              | 插入顺序                       | 复杂（整数属性排序+插入顺序） |
| 大小获取            | `map.size`                     | 手动计算 `Object.keys().length` |
| 性能                | 频繁增删场景更优               | 未优化                      |
| 序列化              | 无原生支持                     | 支持 JSON 序列化            |
| 默认键              | 无默认键                       | 有原型链上的键              |

### 8. 实际应用场景

#### 对象元数据存储
```javascript
const userMetadata = new Map();

function setUserMetadata(user, metadata) {
  userMetadata.set(user, metadata);
}

function getUserMetadata(user) {
  return userMetadata.get(user) || {};
}

const user = { id: 1, name: 'Alice' };
setUserMetadata(user, { lastLogin: new Date(), role: 'admin' });

console.log(getUserMetadata(user).role); // 'admin'
```

#### 高效缓存系统
```javascript
class DataCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100;
  }

  get(key) {
    if (this.cache.has(key)) {
      // 更新访问时间
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // 删除最早添加的项
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
```

#### 复杂键值映射
```javascript
const coordinateMap = new Map();

function addPoint(x, y, value) {
  coordinateMap.set(`${x},${y}`, value);
}

function getPoint(x, y) {
  return coordinateMap.get(`${x},${y}`);
}

addPoint(10, 20, 'Treasure');
console.log(getPoint(10, 20)); // 'Treasure'
```

## 三、WeakSet

### 1. WeakSet 特性
与 Set 类似，也是不重复的值的集合。WeakSet 对象允许你将弱引用对象储存在一个集合中。

- 只能存储对象引用
- 弱引用（不计入垃圾回收引用计数）
- 不可迭代
- 没有 size 属性
- 方法：add, has, delete


### 2. 操作方法
* WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
* WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
* WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
### 3. 与 Set 的区别
* WeakSet 的成员只能是对象，而不能是其他类型的值。
* WeakSet 中的对象都是弱引用
* WeakSet 没有 size 静态属性
* WeakSet 没有 clear 方法
* WeakSet 没有遍历方法，WebSet 不能遍历

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

### 4. 特性
* 成员的值都是唯一的，没有重复的值
* 成员只能是对象，而不能是其他类型的值
* WeakSet 中的对象都是弱引用，引用不计入垃圾回收机制
* WeakSet 中的对象都是弱引用，所以不会引发内存泄漏
* WeakSet 中的对象都是弱引用，所以 WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息
* WeakSet 的成员是不适合引用的，因为它会随时消失
* WeakSet 不可遍历。因为 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行。
* WeakSet 没有 size 属性，因为 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，没有 size 也就没法遍历。
* WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
```javascript
const weakSet = new WeakSet();
let obj = {};

weakSet.add(obj);
console.log(weakSet.has(obj)); // true

obj = null; // 对象可被垃圾回收
```

## 四. WeakMap
### 1. WeakMap 特性
- 键必须是对象
- 弱引用（键不计入垃圾回收引用计数）
- 不可迭代
- 没有 size 属性
- 方法：get, set, has, delete

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。`注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。` WeakMaps 保持了对键名所引用的对象的弱引用。

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。

### 2. 与 Map 的区别
* WeakMap 只接受对象、Symbol作为键名（null除外），不接受其他类型的值作为键名。（ES2023 扩展了 WeakMap 的功能，允许使用 Symbol 类型的键）
* WeakMap 的键名所指向的对象都是弱引用，不计入垃圾回收机制。
* WeakMap 没有 size 静态属性
* WeakMap 没有 clear 方法
* WeakMap 没有遍历方法，WeakMap 不能遍历
* WeakMap 只有四个方法可用：get()、set()、has()、delete()。

WeakMap 的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除。WeakMap 的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap 结构有助于防止内存泄漏。WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。


### 3. 使用场景

#### 对象关联元数据（避免内存泄漏）
```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  
  getName() {
    return privateData.get(this).name;
  }
}

const user = new User('Alice');
console.log(user.getName()); // 'Alice'
// 当 user 被回收时，关联数据自动清除
```

#### DOM 元素跟踪
```javascript
const domListeners = new WeakMap();

function addListener(element, event, handler) {
  const listeners = domListeners.get(element) || {};
  if (!listeners[event]) {
    const eventHandler = (e) => handler(e);
    element.addEventListener(event, eventHandler);
    listeners[event] = eventHandler;
    domListeners.set(element, listeners);
  }
}

function removeListener(element, event) {
  const listeners = domListeners.get(element);
  if (listeners?.[event]) {
    element.removeEventListener(event, listeners[event]);
    delete listeners[event];
  }
}
```
## 五、WeakRef
WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 (opens new window)更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。
```javascript
let target = {};
let wr = new WeakRef(target);
```
上面示例中，target是原始对象，构造函数WeakRef()创建了一个基于target的新对象wr。这里，wr就是一个 WeakRef 的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用，也就是说，wr的引用不会妨碍原始对象target被垃圾回收机制清除。


### 方法与用途
* deref()：返回原始对象  
WeakRef 实例对象有一个deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined。
```javascript
let target = {};
let wr = new WeakRef(target);

let obj = wr.deref();
if (obj) { // target 未被垃圾回收机制清除
  // ...
}
```
上面示例中，deref()方法可以判断原始对象是否已被清除。 弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。
```javascript
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);
```
上面示例中，makeWeakCached()用于建立一个缓存，缓存里面保存对原始文件的弱引用。

    注意:
    标准规定，一旦使用WeakRef()创建了原始对象的弱引用，
    那么在本轮事件循环（event loop），原始对象肯定不会被清除，
    只会在后面的事件循环才会被清除。


## 六、性能对比

### 1. Set vs Array

| 操作      | Set (1000元素) | Array (1000元素) |
|----------|---------------|-----------------|
| 查找      | ~0.01ms       | ~0.1ms          |
| 添加      | ~0.02ms       | ~0.01ms         |
| 删除      | ~0.02ms       | ~0.1ms          |
| 去重操作  | 即时           | 需要 O(n²) 算法  |

### 2. Map vs Object

| 操作      | Map (1000键值对) | Object (1000属性) |
|----------|-----------------|-------------------|
| 查找      | ~0.01ms         | ~0.01ms           |
| 添加      | ~0.02ms         | ~0.02ms           |
| 删除      | ~0.02ms         | ~0.1ms            |
| 迭代      | ~0.1ms          | ~0.3ms            |

## 五、最佳实践

1. **使用场景选择**
   - 需要唯一值 → `Set`
   - 键值对，键非字符串 → `Map`
   - 需要弱引用 → `WeakSet/WeakMap`
   - 需要序列化 → 使用 `Object` 或数组

2. **性能优化**
   ```javascript
   // 使用 Map 替代频繁修改的对象
   const dynamicConfig = new Map();
   
   // 使用 Set 进行高效存在性检查
   const validStatuses = new Set(['active', 'pending', 'completed']);
   if (validStatuses.has(user.status)) { ... }
   ```

3. **数据转换**
   ```javascript
   // Map 转对象
   const map = new Map([['a', 1], ['b', 2]]);
   const obj = Object.fromEntries(map);
   
   // Set 转数组
   const set = new Set([1, 2, 3]);
   const arr = Array.from(set);
   ```

4. **结合使用**
   ```javascript
   // 复杂数据结构：Map of Sets
   const departmentEmployees = new Map();
   
   function addEmployee(department, employee) {
     if (!departmentEmployees.has(department)) {
       departmentEmployees.set(department, new Set());
     }
     departmentEmployees.get(department).add(employee);
   }
   
   addEmployee('IT', 'Alice');
   addEmployee('IT', 'Bob');
   console.log([...departmentEmployees.get('IT')]); // ['Alice', 'Bob']
   ```

## 六、浏览器支持与兼容

- 现代浏览器全面支持（Chrome 38+, Firefox 13+, Safari 8+, Edge 12+）
- Node.js 从 0.12 版本开始支持
- 旧环境需使用 Babel 转译或 polyfill（如 core-js）

Set 和 Map 是现代 JavaScript 开发中不可或缺的数据结构，它们提供了比传统数组和对象更高效、更灵活的数据处理能力，特别适合处理需要唯一性、复杂键值或高效查找的场景。