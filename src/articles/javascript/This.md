---
title: 'JavaScript学习笔记 - this'
description: 'this是一个比较难理解的关键字，它在不同情况下的指向不同，而且它字面意思也很容易让人误解，因为它并不指向函数本身。'
time: '2018年09月06日'
author: 'MADAO是不会开花的'
componentName: 'This'
tags:
  - "JavaScript"
  - "this"
---

this是一个比较难理解的关键字，它在不同情况下的指向不同，而且它字面意思也很容易让人误解，因为它并不指向函数本身。

首先理解this，要记住以下两点：

1. this不指向函数本身
2. this不指向函数的作用域

例子：
```
// this不指向函数本身

function foo(num) {
  console.log(`foo被调用了${num}次`)
  this.count++
}
foo.count = 0

for(let i = 1; i < 6; i++) {
  foo(i)
}

console.log(foo.count)
```
上面代码的运行结果是这样的

![image.png](https://user-gold-cdn.xitu.io/2018/9/6/165adb551b7fd90b?w=456&h=274&f=png&s=30385)


可以看出，foo被调用了5次，但最后打印出的foo.count却是0，这就证明函数foo中的this.count并不指向它自己的count。


```
// this不指向函数的作用域
function foo() {
  let a = 1
  console.log(this.a)
}
foo() // undefined
```
上面代码得到是undefined，说明this.a并不是函数foo作用域中声明的变量a，所以this也不指向函数的作用域

- ### this是什么

  this是执行上下文中的一个属性，其实我一直不懂上下文这个词，所以我把执行上下文想象成一个对象，这个对象中有一个属性叫做this。每当函数被调用的时候都会创建一个执行上下文。除了函数在被调用的时候都创建的执行上下文，还有全局执行上下文（函数之外的执行上下文），全局执行上下文中的this指向*全局对象*（浏览器中是window），但是严格模式下全局执行上下文中的this指向的是undefined

 
- ### 如何确定this的指向

 this的指向由函数的调用方式决定，除了箭头函数

  函数调用可以分为以下几种：

  1. 直接调用

  ```
  function foo() {
    console.log(this)
  }
  foo() // Window
 
  ```
  ```
'use strict'
 function bar() {
   console.log(this)  
 }
 bar()  // undefined
  ```
  如果函数是直接调用，它的this指向全局对象，在浏览器中就是window，严格模式下是undefined

  2. 作为对象的属性调用
  
  ```
  let obj = {
    bar: 1,
    methods() {
      console.log(this.bar)
    }
  }
  let obj2 = {
    bar: 2,
    obj: obj
  }
  obj.methods()  // 1
  obj2.obj.methods()  // 1
  ``` 
  当函数作为对象的属性调用的时候，它的this指向是最后一个调用它的对象。这里有一个小陷阱：
  ```
  let name = 'rose'
  let obj = {
    name: 'jack',
    sayName() {
      console.log(this.name)
    }
  }
  let foo = obj.sayName
  foo()  // rose
  ```
  foo相当于直接调用，所以this指向全局对象window

  3. 通过new调用
 
  构造函数只是使用 new 运算符调用的函数，new做了以下几件事：
  1. 创建一个新对象
  2. 让这个新对象的`__proto__` = 构造函数的prototype
  3. 将函数调用时的this绑定到这个新对象
  4. 如果这个构造函数没有return其他对象，那么将这个新对象return
  
  例子：
  ```
  function CreatePerson({name = '', gender = ''}) {
    this.name = name;
    this.gender = gender
  }
  CreatePerson.prototype = {
    constructor: CreatePerson,
    getName() {
      console.log(this.name)
    },
    getGender() { 
       console.log(this.gender)
    },
    work() {
      console.log('work')
    },
    eat() {
      console.log('eat')
    },
    sleep() { 
      console.log('sleep')
    },
    play() {
      console.log('play')
    }
  }

  const Tom = new CreatePerson({name: 'Tom', gender: 'male'})

  Tom.getName()   //  Tom
  Tom.getGender()  // male
  ```
  看完new操作符做的事情后，很容易得出结论，通过new调用的函数，this指向new出来的新对象。

  4. 使用bind，call，apply方法

  这三种方法都可以改变函数中this的指向
  - bind
  bind方法会返回一个新的函数，这个新的函数的this就是bind方法的第一个参数，例子：
```
function foo() {
  console.log(this.name)
  console.log(this.age)
}

let obj = {
  name: 'alex',
  age: 18
}

foo.bind(obj)()  // alex  18
```
  - call
call方法也能改变this的指向，bind是返回一个新函数，而call则是直接调用这个函数。例子：
```
let obj = {
   a: 1,
   b: 2
}
function foo()  {
  console.log(this.a)
  console.log(this.b)
} 
foo.call(obj)  // 1, 2
```
  - apply
apply用法和call一样，都可以改变函数this的指向，不同点是：
```
fun.call(thisArg, arg1, arg2, ...)
func.apply(thisArg, [argsArray])
```
call方法除了确定this指向的参数之外的参数是一个一个传入的，而apply是数组类型。

4. 事件处理函数中的this
使用addEventListener添加的事件处理函数中的this指向触发事件的元素
内联事件处理函数中的this指向监听器所在的元素

5. 箭头函数的this
箭头函数的this，并不是在调用的时候确定的，而是在它定义的时候确定的，它的this指向的是它外层函数的this，如果外层是全局执行上下文，那么它指向的就是全局对象。
例子：
```
var a = 1
const foo = () => {console.log(this.a)}
const obj = {
  a: 2,
  methods() {
    return () => {console.log(this.a)}
  }
}
const obj1 = {
  a: 3,
  methods: () => {console.log(this.a)}
}
foo()  // 1
obj.methods()()  // 2
obj1.methods()   // 1
```

以上就是确定this指向的几种情况了。

最后推荐一篇文章[this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)，可以在不用记这么多状态下，确定this的指向。
