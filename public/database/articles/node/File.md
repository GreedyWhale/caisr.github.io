今天学习 Node.js 的 file 模块

file 模块顾名思义，就是操作文件的模块了，它提供了很多方法供开发者使用，但是我目前只用过 read、write 这些基本的方法，所以下面总结的都只是对这部分的方法的总结。

### 1. 异步和同步

file 模块提供的很多方法都有两种版本，同步和异步，只要方法名上带有`sync`就是同步方法，同步方法会阻塞 Node.js，同步方法的错误需要使用 try...catch...进行捕获，异步方法则是通过传入回调函数的方式获取。

### 2. write 和 writeFile

file 模块中有的方法名上有 File 有的没有比如标题中的 write 和 writeFile，它们的区别是：

1. 不带有 File 的方法，需要先通过 fs.open 打开文件，获取到文件描述符（fd），然后才能操作文件，而且操作文件的一部分。
2. 带有 File 的方法，不需要先调用 fs.open，直接传入文件的路径就可以进行操作，只能对整个文件进行操作。

### 3. flags

flags 是表示用什么模式操作文件，以下是我总结了的它们之间的联系：

- flags：

  - w：写入，新数据会覆盖掉旧数据
  - a：追加，追加指的是在原有的数据后面写入，不会覆盖旧数据
  - r：读取，只能读不能写
  - +：以上命令带`+`表示以读写模式操作文件，比如：'w+'
  - x：以上命令带`x`表示对不存在的文件进行操作，比如：'ax'表示向某个文件进行追加操作，但是如果这个文件已经存在了，则会失败
  - s：以上命令带`s`表示同步的进行操作，比如：'rs'表示以同步的方式读取文件。
  - 不带 x 的写入和追加操作都会在目标文件不存在的时候创建对应的文件，读取则不会，读取一个不存在的文件会报错

### 使用 chrome 调试 Node.js 程序

1. `node --inspect-brk`
2. 通过 chrome 打开任意一个页面，右键检查 -> 点击 Node.js 图标
