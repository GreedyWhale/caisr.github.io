---
title: 'JavaScript学习笔记 - 原生函数'
description: '在JavaScript中有一些原生函数，有时候也叫内置函数'
time: '2018年09月29日'
author: 'MADAO是不会开花的'
componentName: 'Function'
tags:
  - "JavaScript"
  - "函数"
---


在JavaScript中有一些原生函数，有时候也叫内置函数，常见的有：

- String()
- Number()
- Object()
- Boolean()
- Array()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()


这些函数都可以被当做构造函数来使用，比如：
```
let str = 'abc';
let str1 = new String('efg');

它们的区别是：

typeof str  // 'string'

typeof str1 // 'object'

```


![](https://user-gold-cdn.xitu.io/2018/9/29/166231364a36d8c1?w=550&h=452&f=png&s=45429)

通过new String('xxx')创建的是字符串'xxx'的“封装对象”，而不是基本类型值'xxx'。
- ### [[class]]

  typeof 返回的值为'object'的对象，都有一个内部属性[[class]]，这个属性可以通过Object.prototype.toString()获得：
  
![](https://user-gold-cdn.xitu.io/2018/9/29/16624bce8bbe9c87?w=746&h=688&f=png&s=132823)

前面说到typeof 返回的值为'object'的对象内部才有[[class]]属性，那么这些基本类型的[[class]]属性是哪里来的呢？

这些基本类型的值JavaScript会自动的为它们包装一个分装对象。基本类型的值是没有`.length`、`toString()`这些方法的，需要通过它们的封装对象才能访问，也就是说当你这样用的时候:
```
let str = 'abc';
str.length; // 3
str.toString(); // 'abc'
```
JavaScript会自动的为基本类型包装一个封装对象，所以一般情况下不需要使用封装对象（let str = new String('123')）,让JavaScript引擎自己决定什么时候用封装对象即可。而且使用封装对象还有些隐蔽的小陷阱：

```
let bool = new Boolean(false);

if(!bool) {
    console.log('here');
}

这个if语句中的console.log是不会执行的的，
因为使用new Boolean为false创建了一个封装对象，而对象转换成布尔值总是true

let arr = new Array(3);

arr.length; // 3

arr  // [empty × 3]

当通过 new Array创建一个数组的时候只有一个数字参数的时候，这个参数就会成为
数组的长度
```

所以，除非真的需要，不建议使用封装对象。

如果想获取封装对象中的基本类型的值，可以通过 valueOf()函数：

```
let str = new String('abc');

str.valueOf(); // "abc"
```



