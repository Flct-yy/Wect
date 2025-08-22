"use strict";
var _a;
let str = "hello world";
console.log(str);
//运行
//tsc .\index.ts
//ts-node .\index.ts
let a = "123"; //string类型 只能赋值给 string类型
let b = "123"; //会从 赋值的类型 中推断出为 string类型
let c; //:any 可以赋值任何类型 也可以赋值给其他类型 尽量不要使用 any
let d; //unknown 类型可以赋值任何类型 但是不能赋值给其他类型(除了 any和unknown)
//:undefined 类型 一般用于变量声明后没有赋值的情况
//:null 类型 一般用于变量声明后赋值为 null 的情况
let nul = "123"; //string|null 类型 可以赋值给 string类型 也可以赋值给 null类型
nul = null;
//:never 类型 一般用于函数永远不会返回的情况
function error() {
    throw new Error("error");
}
const n_1 = 1;
if (n_1 != 1) {
    const n_2 = n_1; //n_2:never
}
//断言
let str_1 = "hello world";
let str_2 = str_1;
let str_3 = str_1;
let str_4 = str_1; //连续断言从右向左进行
//枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
/*
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
*/
let color = Color.Red;
console.log(color);
//数组
let arr = [true, 2, 3, 'string']; //数组的元素类型必须一致
//非空断言运算符 !
let str_5 = "hello world";
let str_6 = str_5.length; //非空断言 告诉编译器 str_5 肯定不是 undefined 类型(检查会跳过 undefined 类型)   如果是 undefined 类型 还是就会报错
const student = {
    name: 'Tom'
};
let city = (_a = student === null || student === void 0 ? void 0 : student.address) === null || _a === void 0 ? void 0 : _a.city;
console.log(city); // undefined
//空值合并操作符 ??
let st = undefined;
console.log(st !== null && st !== void 0 ? st : "default value"); //?? 运算符 左侧的值为 空值 则返回右侧的值 否则返回左侧的值
//for
for (const i of [1, 2, 3]) {
    //i是number类型
    if (i === 2) {
        continue;
    }
}
//函数
function add(a, b) {
    return a || 0 + (b !== null && b !== void 0 ? b : 0);
}
console.log(add(1, 2));
//类
//protected 保护属性 不能在类的外部访问 只能在类的子类和本身中访问
//private 私有属性 不能在类的外部访问 只能在类的本身中访问
//public 公有属性 可以在类的外部访问
//readonly 只读属性 只能在类的本身中修改
//TS类不能动态添加属性
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Teacher extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
}
class Dog {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let myStr = "hello world";
// Per 相当于 接口别名
const pe = {
    name: 'Tom',
    age: 20
};
//泛型
//泛型可以定义一个函数或者类可以接收不同类型的数据
//<T> 表示泛型类型 所有基本类型和用户自定义类型都可以作为泛型类型
class Students {
    constructor(code) {
        this.code = code;
    }
}
let s1 = new Students(123);
let s2 = new Students('456');
//泛型约束
//泛型约束可以限制泛型类型必须符合某种条件
function getFirst(arr) {
    return arr[0];
}
let arr1 = [
    { name: 'Tom', age: 20 },
    { name: 'Jerry', age: 25 }
];
let first = getFirst(arr1);
console.log(first.name);
//命名空间
//命名空间可以将一组相关的变量、函数、类等声明在一起
//命名空间可以避免命名冲突
var Animal;
(function (Animal) {
    Animal.name = 'dog';
})(Animal || (Animal = {}));
console.log(Animal.name);
// PartialPeople = {
//   name?: string;
//   phone?: string;
//   email?: string;
//   avatar?: string;
//   userid?: string;
//   age?: number;
// }
// RequiredPeople = {
//   name: string;
//   phone: string;
//   email: string;
//   avatar: string;
//   userid: string;
//   age: number;
// }
// PickPeople = {
//   name: string;
//   age: number;
// }
// OmitPeople = {
//   name: string;
//   email: string;
//   avatar: string;
//   userid: string;
//   age: number;
// }
