## 说下你对生命周期的理解

事物从创建到消逝的过程就是生命周期，就像人一样，从出生到死去，这一个阶段就相当于是人的生命周期。Vue的生命周期表示的是Vue内部从初始化到挂载DOM的完整流程。包括以下过程

1. 开始创建
2. 初始化数据
3. 编译模板(parse,optimize,genrate)
4. 挂载DOM
5. 渲染更新
6. 渲染卸载


### Vue的生命周期

![](https://jonny-wei.github.io/blog/images/vue/vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90.png)

vue的生命周期大致分为四个阶段，**初始化阶段**，**模板编译阶段**，**挂载阶段**，**销毁阶段**

#### 初始化阶段

初始化阶段为Vue实例初始化属性，事件以及响应式数据，包括两个生命周期钩子

1. beforeCreate
2. created

##### beforeCreate

在这个钩子函数之前已经初始化了一些默认的事件还有生命周期(Init events && lifecycle),在这个钩子函数执行的时候，data和methods中的数据都还未初始化。这个阶段一般用来初始化非响应式变量。

##### created

此时data和methods都已经初始化好了，data中的数据通过Object.defineProperty(vue2),Proxy(vue3)完成了数据绑定。此时真实DOM还没有生成，$el还不可用。这个阶段一般用来进行异步请求。

#### 模板编译阶段

这个阶段主要将Vue的模板编译成渲染函数。编译通过compiler对模板进行编译，分三个阶段**解析(parse)**,**优化(optimize)**,**生成(generate)**。

##### parse

通过正则解析模板中的指令,class,style...将其转化成抽象语法树(AST)

##### optimize

编译过程优化，这阶段会标记静态节点，后面更新时，vue diff会跳过这些标记节点，从而减小比较过程。

##### generate

generate是将生成的AST转化成渲染函数(render function)。

#### 挂载阶段

挂载阶段是将实例挂载渲染到真实的DOM上,以及对已挂载节点的更新。这个阶段包括4个生命周期钩子

1. beforeMount
2. mounted
3. beforeUpdate
4. update

##### beforeMount

这个阶段，render函数已经生成好了，render函数首次被调用，但是还未挂载到真实DOM上，算是正式渲染前的准备阶段，这个时候的页面无任何变化。

##### mounted

这个钩子函数执行时，代表着真实DOM已经挂载完毕。在beforeMount和mounted之间就是挂载过程，vue会创建vm.$el并替换el,等挂载到实例上之后调用mounted钩子函数，表明此时DOM挂载完毕，执行完mounted之后表明组件已经完成从创建阶段到运行阶段的改变。这个阶段一般用来获取和操作VNode,还有异步请求。

##### beforeUpdate

当数据发生变化时，这个钩子函数可以提前先对现有的DOM做一些预操作，比如移除一些已添加的事件监听器等。执行这个钩子函数时，data中的数据已经发生了变化，但是页面上的数据还是旧数据。

##### 虚拟DOM重新渲染更新

在beforeUpdate和updated之间是虚拟DOM重新渲染并应用更新的过程，在这个过程中，vue会先根据data中的最新数据，在内存中重新渲染出一份最新的DOM树,然后将DOM树重新渲染到真实的页面中去，从而完成数据从data(model)到页面(view)的更新。

##### updated

当执行这个钩子函数时，表明页面已经完成和data的数据同步，更新完毕,此时已经可以执行依赖于DOM的操作。需要注意的是，不要在这个阶段去尝试修改data,否则会再次触发beforeUpdate,updated,导致死循环。

#### 销毁阶段

销毁阶段是将实例从父组件中删除，并且取消绑定以及事件监听器。包括两个生命周期钩子

1. beforeDestory
2. destoryed

##### beforeDestory

这个钩子函数执行时，vue实例已经进入到销毁阶段，但是此时并未真正开始进行销毁工作，此时仍然能访问实例的所有状态以及方法。这个阶段一般用于销毁定时器，解绑全局事件，销毁插件对象等。

##### destoryed

这个钩子函数调用时，表明销毁已经完成，vue实例以及所有的指令，事件监听器都已被销毁。

![](https://jonny-wei.github.io/blog/images/vue/vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%B3%A8%E9%87%8A.png)


## 父子组件挂载时，生命周期的顺序是咋样的

父beforeCreate => 父created => 父beforeMount => 子beforeCreate => 子create => 子beforeMount => 子mounted => 父mounted

总的来说遵循的是: 父先进行到准备阶段(beforeDestory,beforeMount,beforeUpdate)后，然后子完成一个完整流程(before => 完成)，然后最后完成父的操作(mounted,destoryed,updated)。



