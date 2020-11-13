---
title: "Vue学习笔记 - Vue组件测试"
description: "测试这块我完全是一片空白，最近在学习饥人谷的使用Vue造轮子课程，课程里有讲到测试这块，所以写写，作为备忘："
time: "2018年09月06日 14:00"
author: "MADAO是不会开花的"
articleType: "vue"
articleTypeZH: "Vue"
name: "ComponentTest"
---

测试这块我完全是一片空白，最近在学习饥人谷的使用 Vue 造轮子课程，课程里有讲到测试这块，所以写写，作为备忘：

### 一、需要了解的概念

- 断言
  查了下维基百科发现解释的好长啊，直接举个例子看下：

  ![image.png](/caisr.github.io/articlesImages/vue/component_test/image.png)

  可以使用 console.assert 在控制台进行简单的断言
  第一句我认为 1 完全等于 1，断言成功了，就什么也不发生。
  第二句我认为 1 完全等于 2，断言失败了，控制台会展示一个错误，告诉你断言失败了

- BDD
  行为驱动开发（英语：Behavior-driven development，缩写 BDD）
  维基百科[行为驱动开发](https://zh.wikipedia.org/wiki/%E8%A1%8C%E4%B8%BA%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91)

- TDD
  测试驱动开发（英语：Test-driven development，缩写为 TDD）
  维基百科[测试驱动开发](https://zh.wikipedia.org/wiki/%E6%B5%8B%E8%AF%95%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91)

- 无头浏览器
  无头浏览器就是没有操作界面的浏览器，自动化测试的时候会用到。

其实还有个自然语言的概念，我不知道怎么说，后面用到了应该能看懂

### 二、工具

需要用到的库有：

- chai，断言库
  [官网](http://www.chaijs.com/)
  看下它给出的用法
  ![image.png](/caisr.github.io/articlesImages/vue/component_test/image1.png)

  它用来测试的语句和英语的语法很像，就好像用英语的语法去写测试代码，我觉得这就是自然语言 😁

  按照它给出的步骤简单做下测试：

  ```

  <!DOCTYPE html>

  <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <meta http-equiv="X-UA-Compatible" content="ie=edge">

      <title>Document</title>

      <style>

        .red-button {

          background-color: red;

        }

      </style>

    </head>

    <body>

      <button class="red-button">点我</button>

      <script src="https://cdn.bootcss.com/chai/4.1.2/chai.min.js"></script>

      <script>

        const expect = chai.expect;

        const button = document.querySelector('.red-button');

        const buttonBg = window.getComputedStyle(button).backgroundColor;

        expect(buttonBg).to.equal('red');

      </script>

    </body>

  </html>

  ```

  用浏览器打开这个 html 文件，然后打开控制台，你会看到一个报错信息，如下图

  ![image.png](/caisr.github.io/articlesImages/vue/component_test/image2.png)

  它说断言失败了，实际的值是 rgb(255, 0, 0)这个字符串，期待 red 字符串等于 rgb(255, 0, 0)字符串是不成立的。

  那改一下测试用例

  ```
  expect(buttonBg).to.equal('rgb(255, 0, 0)');
  ```

  刷新浏览器，只要打开浏览器控制台没有报错信息，那么就证明测试通过了

- Karma，Karma 是一个测试运行器，它可以自动的调用浏览器去执行你写的测试脚本，然后生成测试报告。
  [官网](https://karma-runner.github.io/2.0/index.html)

- Mocha，Mocha 是测试框架，可以用它写测试用例。
  [官网](https://mochajs.org/)
  [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- Sinon，测试辅助工具，比如我们要测一个函数是否被调用过，就可以用到它提供的 spy 方法来测试
  [github 地址](https://github.com/sinonjs/sinon)
  [译-Sinon 入门:利用 Mocks，Spies 和 Stubs 完成 javascript 测试](https://blog.kazaff.me/2016/11/11/%E8%AF%91-Sinon%E5%85%A5%E9%97%A8%EF%BC%9A%E5%88%A9%E7%94%A8Mocks%EF%BC%8CSpies%E5%92%8CStubs%E5%AE%8C%E6%88%90javascript%E6%B5%8B%E8%AF%95/)

用到的主要几个库和框架大概就这么多了

### 三、使用

1. 新建项目 test，初始化 package.json
2. 安装依赖
   `npm i chai karma karma-chrome-launcher karma-mocha karma-sinon-chai mocha sinon sinon-chai karma-chai karma-chai-spies -D`
   多了很多依赖，我也很绝望，暂时先按照老师讲的安装，有空再.......
3. 创建 karma 的配置文件
   `./node_modules/karma/bin/karma init`
   然后会有一些配置项供你选择
   一路回车就好，因为还要手动的改动
   [官方配置文档](http://karma-runner.github.io/2.0/config/configuration-file.html)
   [Karma 中文配置 API](https://blog.csdn.net/maomaolaoshi/article/details/78542837)

    ```

    // Karma configuration

    // Generated on Tue Aug 07 2018 15:02:42 GMT+0800 (CST)



    module.exports = function(config) {

      config.set({



        // base path that will be used to resolve all patterns (eg. files, exclude)

        basePath: '',





        // frameworks to use

        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter

        frameworks: ['mocha'],





        // list of files / patterns to load in the browser

        files: [

          'test'

        ],





        // list of files / patterns to exclude

        exclude: [

        ],





        // preprocess matching files before serving them to the browser

        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

        preprocessors: {

        },





        // test results reporter to use

        // possible values: 'dots', 'progress'

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter

        reporters: ['progress'],





        // web server port

        port: 9876,





        // enable / disable colors in the output (reporters and logs)

        colors: true,





        // level of logging

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG

        logLevel: config.LOG_INFO,





        // enable / disable watching file and executing tests whenever any file changes

        autoWatch: true,





        // start these browsers

        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

        browsers: ['Chrome'],





        // Continuous Integration mode

        // if true, Karma captures browsers, runs the tests and exits

        singleRun: false,



        // Concurrency level

        // how many browser should be started simultaneous

        concurrency: Infinity

      })

    }



    ```

    生成的文件大概是这个样子，会根据之前不同的选项有稍微的偏差，不过没关系，都要改的。

    - frameworks 改为`frameworks: ['mocha', 'sinon-chai']`
    - files 改为`files: ['dist/**/*.test.js','dist/**/*.test.css']`
      这里也可以根据你想放的文件位置改动
    - browsers 改为` browsers: ['ChromeHeadless']`

    其他的就不用改了。

4.  使用 parcel + vue 写一个小组件进行测试
    `npm i parcel-bundler -D`
    `npm i vue`
5.  根据 vue 官方文档给 package.json 添加一项配置
    `"alias": { "vue" : "./node_modules/vue/dist/vue.common.js" }`
    组件实现过程略.....

最终结果：
![image.png](/caisr.github.io/articlesImages/vue/component_test/image3.png)

这是一个简单的按钮组件，支持图标，图标位置，禁用，loading 状态，可以响应点击事件，现在就来使用我们搭好的测试框架测试一下功能

目前的目录结构是这样的

![image.png](/caisr.github.io/articlesImages/vue/component_test/image4.png)

现在就开始写测试用例

需要知道的 mocha 的 API 有:

- describe
- it
- 异步代码测试 done

VButton 组件接受这些参数

```

props: {

    iconName: {

      type: String,

      default: ''

    },

    iconPosition: {

      type: String,

      default: 'left'

    },

    loading: {

      type: Boolean,

      default: false

    },

    disable: {

      type: Boolean,

      default: false

    }

 }

```

- 在 package.json 中 scripts 添加一个 test 的命令
  `parcel build test/* --no-minify && karma start --single-run`
  注意这里没有使用 parcel 的压缩功能 --no-minify，这是因为 parcel 的 html 压缩会把 slot 标签删掉，然后还有需要注意的一点是使用 parcel 在作为构建工具开发的时候要在启动项目的命令上加上--no-cache 禁用缓存，如果不这样会出现一些奇怪的报错。

- 首先测试 VButton 组件是存在的，写在 Vbutton.test.js 中：

  ```

  import Vue from 'vue';

  import VButton from '../src/components/VButton.vue';

  const expect = chai.expect;

  const Constructor = Vue.extend(VButton)



  describe('VButton 组件测试', function () {

    it('VButton 组件存在', function () {

      expect(VButton).to.exist

    })

  })

  ```

  执行 npm test
  如果看到下图这样的输出则证明测试通过：

  ![image.png](/caisr.github.io/articlesImages/vue/component_test/image5.png)

  为了证明测试是有效的，故意写错测试下：
  把之前的断言写成这样

  ```
  /*断言它不存在 */
  expect(VButton).to.not.exist
  ```

  得到结果是这样：

  ![image.png](/caisr.github.io/articlesImages/vue/component_test/image6.png)

  他告诉我们 VButton 组件存在这个测试用例失败了。

- 接下来测试 VButton 组件接受的这些 props

  ```

   /*  iconName */

  it('VButton 组件可以设置icon', function () {



    const constructor = Vue.extend(VButton)



    const vm = new Constructor({

      propsData: { iconName: 'warning' }

    }).$mount()



    const element = vm.$el.querySelector('use')



    expect(element.getAttribute('xlink:href')).to.equal('#i-warning')



    vm.$destroy()

  })

  ```

  在测试的时候如果不确定组件的 html 结构，可以将他们打印出来，这样方便我们断言，用上面的测试用例来举个例子

  ```

  it('VButton 组件可以设置icon', function () {



    const vm = new Constructor({

      propsData: { iconName: 'warning' }

    }).$mount()



    console.log(vm.$el)



    const element = vm.$el.querySelector('use')



    expect(element.getAttribute('xlink:href')).to.equal('#i-warning')

    vm.$destroy()

  })

  ```

  得到的结果：
  ![image.png](/caisr.github.io/articlesImages/vue/component_test/image7.png)

  ```

  /* iconPosition  */

  it('VButton 组件可以设置icon的位置', function () {



    const div = document.createElement('div')



    document.body.appendChild(div)



    const vm = new Constructor({

      propsData: {

        iconName: 'phone',

        iconPosition: 'right'

      }

    }).$mount(div)



    const element = vm.$el.querySelector('.icon')



    expect(getComputedStyle(element).order).to.equal('1')



    vm.$el.remove()



    vm.$destroy()

  })

  /* 因为组件的icon位置是通过flex布局的order改变实现的，所以测试icon的样式的order值即可 */

  ```

  loading 和 disable 测试过程就跳过了，因为测试用例写法和测试 icon 差不多（有兴趣可以看我后面的源码），主要看下事件的测试。

  事件的测试主要就是测试绑定的函数是否执行，这时候就要用到 Sinon 了的 spy 功能了：

  ```

   it('VButton 组件可以响应点击事件', function () {



    const vm = new Constructor({}).$mount()



    const callback = sinon.spy()



    vm.$on('click', callback)



    vm.$el.click()



    expect(callback).to.have.been.called



    vm.$destroy()

  })

  ```

  基本的测试用例就这些了，然后有一种测试异步代码的没有说到，下面看下异步代码的测试用例怎么写：

  ```

  it('测试异步代码', function (done) {



    const div = document.createElement('div')



    document.body.appendChild(div)



    const vm = new Constructor({}).$mount(div)



    setTimeout(() => {

      expect(getComputedStyle(vm.$el).backgroundColor).to.equal('rgba(0, 0, 0, 0)')

      done()

    }, 200)



  })

  ```

主要就是这个 done 了，如果有异步代码，必须要手动的调用一下 done 才可以。

[GitHub 地址](https://github.com/GreedyWhale/test-demo)
