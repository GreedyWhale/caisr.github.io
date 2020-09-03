---
title: 'JavaScript学习笔记 - 构造函数，原型，原型链'
description: '这次来说说JavaScript中的构造函数，原型，原型链'
time: '2018年09月13日'
author: 'MADAO是不会开花的'
articleType: 'javascript'
name: 'Prototype'
tags:
  - "JavaScript"
  - "构造函数"
  - "prototype"
  - "__proto__"
---


- ### 构造函数

在说构造函数之前，先看一下这样的需求：

```
需要创建10个对象，表示10个僵尸，这些僵尸名字，身高，年龄，性别不一样，但是行
为都一样，比如：攻击，行走，喊叫。要怎样创建这10个对象。


function createZombie(config = {}) {
    function eat() {
        console.log('eat')
    }
    function walk() {
        console.log('walk')
    }
    function shouting() {
        console.log('shouting')
    }
    const zombie = Object.assign({}, config, {eat, walk, shouting});
    
    return zombie;
}

let zombieRed = createZombie({
  name: '小红',
  age: 18,
  height: '180cm',
  sex: 'male'
})

...

let zombieBlack = createZombie({
  name: '小黑',
  age: 20,
  height: '170cm',
  sex: 'female'
})

这样就可以创建出10个对象，它们都具有eat,walk,shouting方法，而且名字等信息都不同。

但是这有一个问题，那就是对象识别问题，或者说无法判断创建出的对象是由谁创建的。例子：

let zombieRed = createZombie({
  name: '小红',
  age: 18,
  height: '180cm',
  sex: 'male'
})

let zombieBlack = createZombie({
  name: '小黑',
  age: 20,
  height: '170cm',
  sex: 'female'
})

zombieRed instanceof createZombie;   // false
zombieBlack instanceof createZombie; // false

zombieRed instanceof Object;   // true
zombieBlack instanceof Object; // true

为了解决这个问题，可以使用构造函数模式
```

构造函数和普通函数的区别就在于调用方式，构造函数是通过new调用的，构造函数命名时第一个字母一般都用大写。

现在用构造函数模式对上面的例子进行改写：

```
function CreateZombie(config = {}) {
    for(let key of Object.keys(config) ) {
       this[key] = config[key]
    }
    this.eat = function() {
        console.log('eat')
    }
    this.walk = function() {
        console.log('walk')
    }
    this.shouting = function() {
        console.log('shouting')
    }
}

let zombieRed = new CreateZombie({
  name: '小红',
  age: 18,
  height: '180cm',
  sex: 'male'
})

let zombieBlack = new CreateZombie({
  name: '小黑',
  age: 20,
  height: '170cm',
  sex: 'female'
})
```

通过构造函数创建的对象，可以解决对象识别问题，如图：


![](https://user-gold-cdn.xitu.io/2018/9/10/165c2a011d6d2c03?w=666&h=596&f=png&s=96995)

知识点回顾：

new 做了什么
  1. 创建一个新对象
  2. 让这个新对象的__proto__ 指向 构造函数的prototype （后面会说到这部分的知识）
  3. 将this绑定到这个新对象
  4. return这个新对象
  
文章推荐 [JS 的 new 到底是干什么的？](https://zhuanlan.zhihu.com/p/23987456?refer=study-fe)

但是，上面这的这个构造函数还是有问题的，那就是创建了太多相同的函数了，


![](https://user-gold-cdn.xitu.io/2018/9/12/165cbcceba6c0a82?w=1362&h=696&f=png&s=127841)
可以看出上面例子无论创建几个僵尸，它们的方法（eat,walk,shouting）都是一样的，所以可以只创建一个函数，然后让这些对象全部引用它就行了。实现这样的需求，就要用到原型的知识了。

补充：

JavaScript中有个奇怪的语法，那就是，构造函数如果没有参数，可以省略()。

例子：

![](https://user-gold-cdn.xitu.io/2018/9/17/165e6f205b828705?w=742&h=252&f=png&s=36649)

- ### 原型

推荐文章：

[对原型、原型链、 Function、Object 的理解](https://zhuanlan.zhihu.com/p/22473059)

[「每日一题」什么是 JS 原型链？](https://zhuanlan.zhihu.com/p/23090041?refer=study-fe)

[JS 中 `__proto__` 和 prototype 存在的意义是什么？](https://www.zhihu.com/question/56770432)

推荐这三篇文章，很不错


好了，现在试着用我的理解解释原型

首先解决上面例子中的构造函数创建多个相同函数，浪费内存的问题，我们只需要这样修改一下：

```
function CreateZombie(config = {}) {
    for(let key of Object.keys(config) ) {
       this[key] = config[key]
    }
}
CreateZombie.prototype.eat = function () {
    console.log('eat')
}
CreateZombie.prototype.walk = function () {
    console.log('walk')
}
CreateZombie.prototype.shouting = function () {
    console.log('shouting')
}

let zombieRed = new CreateZombie({
  name: '小红',
  age: 18,
  height: '180cm',
  sex: 'male'
})
```
看下结果：


![](https://user-gold-cdn.xitu.io/2018/9/12/165cbbecf714bc0a?w=1120&h=826&f=png&s=114742)

可以看到zombieRed中并没有eat等方法，它却可以使用。这就是通过原型机制实现的。

- #### `__proto__`和`prototype`
  每个对象中都有一个属性叫做`__proto__`，`__proto__`属性是一个对象，它指向了创建它的函数的prototype属性，prototype属性也是一个对象，这个函数的prototype属性就叫做这个被创建对象的原型对象，注意prototype这个属性只有函数才有。也可以这样理解：
  ```
  被创建对象.__proto__
      ↓
      ↓
      ↓ （指向）
  创建该对象的构造函数.prototype →→→ (指向) 存放公共属性的内存
  
  
  被创建对象.__proto__ === 创建该对象的构造函数.prototype
  
  
  prototype是只有函数才有的属性
  __proto__是对象有的属性
  ```
  
  既然prototype和`__proto__`都是对象，那么它们本身也就有`__proto__`属性，当去找一个对象的属性的时候，首先会查找对象自身有没有，如果没有那么就去查找对象.`__proto__`，如果还没有那么继续查找对象.`__proto__`，以此类推。所有的 `__proto__` 都被找完了还没找到，那么这个属性就是undefined，例子：
  
  ```
  obj  →→→  obj.__proto__  →→→  obj.__proto__.__proto__  →→→ ...
  
                                                              ↓
                                                              ↓
                                                              ↓
                                               Object.prototype.__proto__
                                                              ↓
                                                              ↓
                                                              ↓
                                                            null
  ```

  像上面例子中查找对象某个属性而通过__proto__连起来的链，就叫做**原型链**
  
  可以看到原型链的终点是Object.prototype.__proto__它指向null。
  
  1. `被创建对象的.__proto__` === `创建它的函数.prototype`。

  2. 函数本身也是对象，而且函数都是由 `Function` 这个函数的创建的。
  
     `被创建函数.__proto__`  === Function.prototype

  3. `prototype`本身也是对象，该对象都是由 Object创建的，所以
  
     `所有函数.prototype.__proto__ ==== Object.prototype`
  4. `Object.prototype.__proto__ `指向null
  
  这有点绕，在控制台上面试一试
  
  
  ![](https://user-gold-cdn.xitu.io/2018/9/12/165ccaf2db212775?w=972&h=436&f=png&s=70832)

   这就是为什么我们只要创建一个对象，它就默认的有toString，valueOf等方法，它就是通过原型链一层一层找到了Object.prototype，而Object.prototype中是有这些方法的。
   
 - #### constructor
   
   每个对象实例都有一个属性叫constructor，这个属性并不是对象实例自身的属性，它是继承自它的原型中的constructor，它指向对象的构造函数。
   
   例子：
   
   普通对象
   ![](https://user-gold-cdn.xitu.io/2018/9/12/165ccbfa0166e020?w=674&h=392&f=png&s=58627)

   函数
   ![](https://user-gold-cdn.xitu.io/2018/9/12/165ccc3dbe39817e?w=812&h=554&f=png&s=84983)
   
   注意例子中的函数的prototype的constructor属性，函数prototype属性中的constructor属性指向的就是该函数。
   
   前面说过 `被创建的对象.__proto__` === `创建它的函数.prototype`;
   
   将上面的例子改写一下：
   ```
     let obj = {};
     
     因为对象都是由Object这个函数创建，
     
     所以obj.__proto__ === Object.prototype
     
     所以obj.__proto__.constructor 可以转换成 Object.prototype.constructor
     
     而函数的Object.prototype.constructor 指向的就是它自己
     
     obj.constructor 继承它的原型中的constructor，所以指向的就是Object这个函数
   ```
   
   假如将函数通过new调用：
   
   ![](https://user-gold-cdn.xitu.io/2018/9/12/165ccf9d662239ca?w=532&h=318&f=png&s=34285)
   
   那么它构造出来的对象的constructor属性，继承自构造该对象的函数的prototype的
   constructor
   
   感觉我自己都要绕晕了。-_-||
   
   在实际的写代码中不推荐直接使用__proto__去获取对象的原型，而是使用
   Object.getPrototypeOf()方法去获取，原因看这里[传送门](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
   
   
   函数的prototype属性用于存放一些公共的属性，让该函数创建的所有对象都可以使用而避免了重复的创建相同的属性浪费内存，我们知道对象是引用类型，改了其中一项，引用同一地址的对象也会跟着改变，例子：
   ```
   function Foo() {}
   Foo.prototype.sayHello = function() { console.log('hello') }
   
   let bar = new Foo();
   let obj = new Foo();
   
   bar.sayHello();  // hello
   obj.sayHello();  // hello
   
   Object.getPrototypeOf(bar).sayHello = function() { console.log('good bye') }
   
   
   bar.sayHello(); // good bye
   obj.sayHello(); // good bye
   ```
  
   ![](https://user-gold-cdn.xitu.io/2018/9/12/165cd0c2297aa3ca?w=1248&h=746&f=png&s=132652)
   
   如何让bar.sayHello 不影响 obj.sayHello呢，那就不要去改原型上的方法，而是直接给bar添加一个sayHello属性，之前说过查找一个对象的属性是先从自身开始找的，只要找到那么就不会去原型链上找了，例子：
   
   ```
   bar.sayHello = function () { console.log('be in another world') }
   
   bar.sayHello();  // be in another world
   obj.sayHello();  // good bye
   ```
   
   ![](https://user-gold-cdn.xitu.io/2018/9/12/165cd117c882181a?w=1004&h=346&f=png&s=57842)
   
   补充：
   
   特殊的prototype：
   ```
   typeof Function.prototype;  // 'function'  
   Function.prototype();
   
   typeof RegExp.prototype;  // 'function'  
   ```
   
- ### 继承
  1. Object.create 
  ```
  function Foo(name, age) {
      this.name = name;
      this.age = age;
  }
  Foo.prototype.sayName = function () {
      console.log(this.name)
  }
  
  function Bar(name,age) {
      Foo.apply(this, arguments);
  }
  Bar.prototype = Object.create(Foo.prototype)
  Bar.prototype.sayAge = function() {
      console.log(this.age)
  }
  
  let a = new Bar('allen', 17);
  
  a.sayName();  // 'allen'
  a.sayAge(); // 17
  
  a.constructor.name;  // Foo
  ```
  
  [Object.create介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  
  上面例子中是存在一个问题的，之前介绍过一个属性constructor，函数中的prototype属性中的constructor属性，默认指向自己，这个属性会被它创建的对象继承过去，当这句代码`Bar.prototype = Object.create(Foo.prototype)`执行过后，Bar函数prototype属性中的constructor属性就指向了Foo，然后使用Bar创建的对象的constructor属性就指向了Foo，这就不对了，因为a是Bar创建的而不是Foo，所以我们要手动改过来：
  ```
  function Foo(name, age) {
      this.name = name;
      this.age = age;
  }
  Foo.prototype.sayName = function () {
      console.log(this.name)
  }
  
  function Bar(name,age) {
      Foo.apply(this, arguments);
  }
  Bar.prototype = Object.create(Foo.prototype);
  Bar.prototype.constructor = Bar;
  Bar.prototype.sayAge = function() {
      console.log(this.age)
  }
  
  let a = new Bar('allen', 17);
  
  a.sayName();  // 'allen'
  a.sayAge(); // 17
  
  a.constructor.name;  // Bar
  ```
  
  小提示：
 
   Object.create是es5中新增的函数，如果要在es5之前的环境中用它，可以用以下代码做兼容：
   ```
   if(!Object.create) {
       Object.create = function(obj) {
           function F(){};
           F.prototype = obj;
           return new F();
       }
   }
   ```
 
   2. Object.setPrototypeOf
   
   es6中添加了这个方法，但是兼容性还不太好。用上面的例子看下用法：
   
   ![](https://user-gold-cdn.xitu.io/2018/9/13/165d1eee3309853f?w=986&h=956&f=png&s=156459)

   [MDN地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
  
   可以看到这种方法都不用手动的修改constructor指向。