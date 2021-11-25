## 说下你对MVVM的理解

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/19/16ca75871ec53fba~tplv-t2oaga2asx-watermark.awebp)

MVVM，全称是 Model-View-ViewModel。是一种简化用户界面的事件驱动编程方式。MVVM促进了前端与后端的分离，提高了前端开发效率。

#### View

视图层。用户页面.主要通过HTML,CSS构建界面与用户交互。

#### Model

数据模型，也就是数据来源，就是后端的逻辑处理与数据操控。

#### ViewModel

视图模型层，是连接View和Model中间的桥梁。前端获取到Model返回的数据后,对其二次处理，处理成符合View层预期的数据模型，通过与View层双向绑定，使ViewModel的数据实时反馈在View.这样实现了View和Model的解耦,方便了前后端分离。

## 双向数据绑定

双向数据绑定就是View发生变化，能实时反应到Model，Model发生变化也能实时响应到View。实现双向数据绑定的技术有所不同。主要有以下几种

1. 脏值检测(AngularJS)
2. 数据劫持(Vue2)
3. 发布订阅者模式(backbone.js) MVC
4. Proxy代理(vue3)

#### 脏值检测

AngularJS采用的是 **脏值检测(dirty check)** 的方法，对所有的数据与视图的绑定关系做检测，识别是否有数据发生变更来决定是否需要更新视图。angular只有在指定的事件触发时进入脏值检测，大致如下：

- DOM事件，譬如用户输入文本，点击按钮等。( `ng-click` )

- XHR响应事件 ( `$http` )
- 浏览器Location变更事件 ( `$location` )
- Timer事件( `$timeout` , `$interval` )
- 执行 `$digest()` 或 `$apply()`

#### 数据劫持

Vue采用**数据劫持**的办法进行数据的的双向绑定。通过Object.defineProperty监控对数据的操作，劫持setter,getter触发数据以及视图的同步更新。这里就只做下介绍，详细的内容后面会专门写一篇文章进行细讲。

#### 发布订阅者模式

backbone.js采用的是发布订阅者模式实现双向数据绑定。在数据发送变化的时候，会发布一个事件，视图通过订阅这个事件进行更新。同样的在视图发生改变的时候，也发布一个事件，然后数据层通过订阅这个事件进行相应的更新。

#### Proxy

Vue3通过Proxy实现对目标对象的拦截代理，本质也是数据劫持，不过是替换了Vue2的Object.defineProperty。Proxy 相对于Object.defineProperty效率更高，功能更全。具体的改进优化点，下次会一起详细说明。



## 参考资料

1.  [前端三大框架:数据绑定与数据流](https://segmentfault.com/a/1190000039253156)
2. [Vue MVVM理解及原理实现](https://juejin.cn/post/6844903929298288647)
3. [浅谈vue,angular,react数据双向绑定原理分析](https://www.yisu.com/zixun/184099.html)
