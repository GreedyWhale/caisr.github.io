---
title: "React学习笔记 - useState"
description: "React学习笔记第二篇 - useState"
time: "2020年10月29日 12:08"
author: "MADAO是不会开花的"
articleType: "react"
articleTypeZH: "React"
name: "ReactUseState"
---

### Hook 简介

官网说的最贴切，直接抄过来：

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

useState 是 React 内置的 hook，它的具体用法如下：

```
const [state, setState] = useState(initialState);
```
返回一个 state，以及更新 state 的函数。

在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。

setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

```
setState(newState);
```

在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。

看下效果

![](/caisr.github.io/articlesImages/react/useState/code.png)

![](/caisr.github.io/articlesImages/react/useState/image.png)

### useState 原理

仔细观察上面给出的例子，每次点击按钮都会执行setCount，每执行一次setCount，控制台会在每次点击按钮的时候将当前的count值打印出来，意味着组件重新渲染了（App重新执行了）。

问题出现了，App每次执行
```
const [count, setCount] = useState(0)
```
这句代码也会被执行，那么count应该被初始化为0才对，但从结果上看，打印出来的count值是正确的，所以问题就是同样的函数，同样的参数但是每次执行的获得的结果却不同，诶！说好的函数式编程呢。

根据例子分析，现在知道的事情有以下几件：
1. setCount会修改某个数据，并存起来，假设这个数据叫x
2. setCount会触发渲染
3. useState会读取x，获取最新的值返回

现在试着自己实现useState

![](/caisr.github.io/articlesImages/react/useState/code1.png)

![](/caisr.github.io/articlesImages/react/useState/image1.png)

虽然写的很丑陋，但是确实实现了useState的效果React的实现肯定不是这样的，原理基本是一样

仔细看上面代码，这个代码有一个bug，如果存在多个state的时候，就会出现冲突，接下来进行优化

![](/caisr.github.io/articlesImages/react/useState/code2.png)

将state的数据结构改为
```
{ value: [], index: 0 }
```
这种格式，value是一个数组，用于储存多个state，index则是为了记录下一次设置state的时候的下标，每次执行setState的时候将index初始化为0，这样组件重新渲染后获取的state顺序就不会乱了。现在测试一下

![](/caisr.github.io/articlesImages/react/useState/code3.png)

![](/caisr.github.io/articlesImages/react/useState/image2.png)

从这个实现就能看出，useState的调用顺序是很重要的，所以在React中是不能在if中写useState的：

![](/caisr.github.io/articlesImages/react/useState/code4.png)

![](/caisr.github.io/articlesImages/react/useState/image3.png)

### 对 useState 的误解

看个例子：

![](/caisr.github.io/articlesImages/react/useState/code5.png)

先 +1，后log
![](/caisr.github.io/articlesImages/react/useState/image4.png)
先 log，后 +1
![](/caisr.github.io/articlesImages/react/useState/image5.png)

先 +1，后log结果符合预期，但是先 log，后 +1，log出的n是旧的n

这是因为setN并不会改变n，它会触发重新渲染，重新渲染之后的n和之前的n是两个不同的n，先log再加1的时候，n还是0，调用setTimeout，2秒后打印n，然后 +1 触发重新渲染获得新的n，由于setTimeout是在重新渲染获之前就调用了，所以它根据作用域找到的n就是重新渲染之前的n，就是0

所以要记住setState并不会修改state
