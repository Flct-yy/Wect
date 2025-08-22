# Boolean 对象

Boolean 对象用于表示布尔值，它只有两个实例：`true` 和 `false`。

## 创建 Boolean 对象

可以通过以下方式创建 Boolean 对象：

- `new Boolean(value)`：创建一个 Boolean 对象，`value` 可以是任何值，如果 `value` 为 `true` 则返回 `true`，否则返回 `false`。
- `Boolean(value)`：等同于 `new Boolean(value)`。

假值（falsy） 只有 6 个，其他所有值都是真值（truthy）

**假值列表**
```
false     // 布尔 false
0         // 数字零
-0        // 负零
0n        // BigInt 零
""        // 空字符串
null      // 空值
undefined // 未定义
NaN       // 非数字
```

## Boolean 对象属性

`Boolean.length`
* 值为 1（表示函数期望的形参数量）
* 实际开发中极少使用
## Boolean 对象方法

1. valueOf() - 返回布尔值的原始值（true 或 false）。 
2. toString() - 返回布尔值的字符串形式（"true" 或 "false"）。