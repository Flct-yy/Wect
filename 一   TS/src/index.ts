let str = "hello world";
console.log(str);
//运行
//tsc .\index.ts
//ts-node .\index.ts

let a:string = "123";//string类型 只能赋值给 string类型
let b = "123";//会从 赋值的类型 中推断出为 string类型
let c;//:any 可以赋值任何类型 也可以赋值给其他类型 尽量不要使用 any
let d:unknown;//unknown 类型可以赋值任何类型 但是不能赋值给其他类型(除了 any和unknown)
//:undefined 类型 一般用于变量声明后没有赋值的情况
//:null 类型 一般用于变量声明后赋值为 null 的情况
let nul:string|null = "123";//string|null 类型 可以赋值给 string类型 也可以赋值给 null类型
nul = null;

//:never 类型 一般用于函数永远不会返回的情况
function error(): never {
    throw new Error("error");
}
const n_1 = 1;
if (n_1 != 1) {
  const n_2 = n_1;//n_2:never
}

//断言
let str_1:unknown = "hello world";
let str_2 = <string>str_1;
let str_3 = str_1 as string;
let str_4= <string><string>str_1;//连续断言从右向左进行

//枚举
enum Color {Red, Green, Blue};
/*
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
*/
let color: Color = Color.Red;
console.log(color);

//数组
let arr: [boolean,number,number, string] = [true, 2, 3,'string'];//数组的元素类型必须一致

//非空断言运算符 !
let str_5: string | undefined = "hello world";
let str_6 = str_5!.length;//非空断言 告诉编译器 str_5 肯定不是 undefined 类型(检查会跳过 undefined 类型)   如果是 undefined 类型 还是就会报错

//可选链操作符 ?.
type Student = {
    name: string,
    //?. 表示不存在 address 属性
    address?:{
      city:string
    }
}
const student: Student = {
    name: 'Tom'
}
let city = student?.address?.city;
console.log(city); // undefined

//空值合并操作符 ??
let st: string | undefined = undefined;
console.log(st?? "default value");//?? 运算符 左侧的值为 空值 则返回右侧的值 否则返回左侧的值

//for
for (const i of [1, 2, 3]){
  //i是number类型
  if(i === 2){
    continue;
  }
}

//函数
function add(a:number|null, b?:number):number{
  return a!|| 0 + (b?? 0);
}
console.log(add(1,2));

//类
//protected 保护属性 不能在类的外部访问 只能在类的子类和本身中访问
//private 私有属性 不能在类的外部访问 只能在类的本身中访问
//public 公有属性 可以在类的外部访问

//readonly 只读属性 只能在类的本身中修改
//TS类不能动态添加属性
class Person{
  constructor(name:string, age:number){
    this.name = name;
    this.age = age;
  }

  name:string;
  protected age:number;
}
class Teacher extends Person{
  constructor(name:string, age:number, grade:number){
    super(name, age);
    this.grade = grade;
  }

  private grade:number;
}

//接口
//接口可以定义类的形状 但是不能创建实例
interface Animal{
  name:string;
  age:number;
}
class Dog implements Animal{
  name:string;
  age:number;
  constructor(name:string, age:number){
    this.name = name;
    this.age = age;
  }
}

//type
//type 关键字可以给一个类型起一个别名
type MyString = string;
let myStr: MyString = "hello world";

type Per = {
  name: string,
  age: number
}
// Per 相当于 接口别名
const pe: Per = {
  name: 'Tom',
  age: 20
}


//泛型
//泛型可以定义一个函数或者类可以接收不同类型的数据
//<T> 表示泛型类型 所有基本类型和用户自定义类型都可以作为泛型类型
class Students<T>{
  constructor(code:T){
    this.code = code;
  }
  code:T;
}
let s1 = new Students<number>(123);
let s2 = new Students<string>('456');

//泛型约束
//泛型约束可以限制泛型类型必须符合某种条件
function getFirst<T extends {name:string}>(arr:T[]):T{
  return arr[0];
}
let arr1 = [
  {name: 'Tom', age: 20},
  {name: 'Jerry', age: 25}
];
let first = getFirst(arr1);
console.log(first.name);

//命名空间
//命名空间可以将一组相关的变量、函数、类等声明在一起
//命名空间可以避免命名冲突
namespace Animal{
  export let name:string = 'dog';
}
console.log(Animal.name);

// Pick 允许从一个类型中选择一部分属性
// Omit 允许从一个类型中排除一部分属性
// Partial 允许将一个类型的所有属性都变为可选
// Required 允许将一个类型的所有属性都变为必填
type People = {
  name: string; // 姓名
  phone?: string; // 手机号
  email: string; // 邮箱
  avatar: string; // 头像
  userid: string; // id
  age: number; // 年龄
}
type PartialPeople = Partial<People>;
type RequiredPeople = Required<People>;
type PickPeople = Pick<People, 'name' | 'age'>;
type OmitPeople = Omit<People, 'phone'>;
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
