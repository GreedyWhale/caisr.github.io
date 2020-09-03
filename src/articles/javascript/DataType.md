---
title: 'JavaScript学习笔记 - 数据类型'
description: '一些JavaScript中有关数据类型的知识点'
time: '2018年09月17日'
author: 'MADAO是不会开花的'
articleType: 'javascript'
name: 'DataType'
tags:
  - "JavaScript"
  - "数据类型"
---


#### 1. typeof null === 'object'

>不同的对象在底层都表示为二进制，在Javascript中二进制前三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"。

#### 2. 数组的字符串键值如果可以转换成十进制数组，那么就会变成数组的下标。

例子：

![](https://user-gold-cdn.xitu.io/2018/9/17/165e6531b292b085?w=444&h=338&f=png&s=30039)

#### 3. 函数是可以调用的对象

函数可以像任何其他对象一样具有属性和方法。它们与其他对象的区别在于函数可以被调用，函数的length属性时函数形参的数量。

例子：

![](https://user-gold-cdn.xitu.io/2018/9/17/165e65ac1188d54f?w=804&h=460&f=png&s=57698)

#### 4. 类数组对象

类数组对象具有length属性，也可以通过`[下标]`这种方法获取对应的值，但是它无法使用数组的push，forEach，indexOf等方法，并不是真正的数组。

例子：

![](https://user-gold-cdn.xitu.io/2018/9/17/165e65e510875a91?w=1022&h=410&f=png&s=77895)

可以通过以下两种方法将类数组对象变为数组：

  1. Array.prototype.slice.call(类数组对象)
  2. Array.from(类数组对象)

例子：

![](https://user-gold-cdn.xitu.io/2018/9/17/165e6610902d13ea?w=1002&h=418&f=png&s=76631)


![](https://user-gold-cdn.xitu.io/2018/9/17/165e6619c8cfc1b5?w=986&h=414&f=png&s=72407)

#### 5. 0.1 + 0.2 !== 0.3

JavaScript中数字类型基于IEEE 754标准实现，该标准通常被称为“浮点数”，JavaScript使用的是双精度格式（64位二进制），二进制浮点数的问题就是：

0.1 + 0.2 !== 0.3;

在二进制浮点数中 0.1 + 0.2 = 0.30000000000000004

可以通过设置一个误差范围来判断0.1 + 0.2和0.3是否相等。这个误差范围成为“机器精度”，在JavaScript中，这个值一般是`2.220446049250313e-16`，从ES6开始，可以通过Number.EPSILON获得。

```
function numbersCloseEnoughEqual(num1, num2) {
    return Math.abs(num1 - num2) > Number.EPSILON;
}

let a = 0.1 + 0.2;
let b = 0.3;

numbersCloseEnoughEqual(a, b);   // true
```

#### 6. Number.MAX_VALUE，Number.MIN_VALUE，Number.MAX_SAFE_INTEGER，Number.MIN_SAFE_INTEGER

JavaScript中：
  - Number.MAX_VALUE，定义了能够呈现的最大浮点数
  - Number.MIN_VALUE，定义了能够呈现的最小浮点数
  - Number.MAX_SAFE_INTEGER，定义了能够呈现的最大整数
  - Number.MIN_SAFE_INTEGER，定义了能够呈现的最小整数

![](https://user-gold-cdn.xitu.io/2018/9/17/165e67bbe1b6ddbe?w=428&h=316&f=png&s=45308)

#### 7. `.`运算符

`.`运算符需要注意的一点是：因为它是一个有效的数字字符，会被优先认为是数字的一部分，然后才是对象的属性访问运算符，这就导致了下面这些情况：

![](https://user-gold-cdn.xitu.io/2018/9/17/165e680c9957ee80?w=832&h=314&f=png&s=41788)

#### 8. null 和 undefined

- null，空值
- undefined，未赋值

可以使用 void 运算符获得安全的undefined，比如：`void 0;`

关于安全的undefined，可以看看这篇文章[var undefined = 1 这样赋值有效果吗？](https://zhuanlan.zhihu.com/p/22345132)

#### 9. NaN

NaN指的是“不是一个数字”（not a number）,但是它却是数字类型，而且它是自己和自己不相等：

```
NaN === NaN;  // false

typeof NaN;  // "number"
```
如何检测一个值是不是NaN：

- isNaN和Number.isNaN

  全局方法isNaN并不可靠

  ```
  isNaN('foo'); // true
  ```
  foo并不是NaN，而结果却是true。
  
  所以推荐使用Number.isNaN方法：
  
  ```
  Number.isNaN('foo');  // false
  Number.isNaN(NaN);  // true
  ```
  Number.isNaN是ES6中添加的，ES6之前可以用下面这种方法检测：
  ```
  if(!Number.isNaN) {
      Number.isNaN = function(value) {
        var n = parseInt(value);
        return n !== n;
    };
  }
  ```
#### 10. 基本类型和引用类型

JavaScript中除了对象以外，其他类型都叫基本类型。

它们之间的区别通过一个例子说明：


```
let obj = { 
    a: 1
};

let obj1 = obj;

obj1.b = 2;

console.log(obj);  {a: 1, b: 2}

console.log(obj1); {a: 1, b: 2}

let str = 1;
let str1 = str;

str1 += 1;

console.log(str);  // 1
console.log(str1); // 2

```
因为引用类型传递的是值的地址，所以obj和obj1中的地址指向的是同一个对象，改变其中一个会影响到另一个。基本类型相当于将原始值赋值了一份给目标值，原始值和目标值是独立的，相互不会影响。

对于引用类型来说，一个引用无法改变另一个引用的指向。
例子：

```
let arr = [1,2,3];
let arr1 = arr;

arr1 = [4,5,6];

console.log(arr);   // [1,2,3]
console.log(arr1);  // [4,5,6]
```

  
所以引用类型的值在拷贝的时候分为浅拷贝和深拷贝，浅拷贝就像例子中的一样，直接赋值即可，深拷贝可以使用`JSON.parse(JSON.stringify(obj))`实现。
