# Vue的双向绑定

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/19/16ca75871f729d89~tplv-t2oaga2asx-watermark.awebp)

## MVVM

Vue的双向绑定是建立在MVVM(Model-View-ViewModel)模型上的。MVVM分为三部分,**数据层**, **视图层**,**业务逻辑层**.

1. 数据层Model主要用于存放数据，一般是指后端的相关数据操作
2. 视图层View是最接近用户的一层，用户肉眼可看到的页面效果交互都是属于这层
3. 业务逻辑层，就是视图模型层，这层主要是起到沟通数据层与逻辑层的作用，关联View和Model

双向就是 **数据变化更新视图，视图变化更新数据**

## 双向数据绑定

这里主要包含两部分

1. 监听器Observer,这部分用来劫持并监听所有的属性
2. 解析器Compile,这部分用来对每个元素节点指令进行扫描和解析，根据指令替换数据，并绑定对应的更新函数

![](https://jonny-wei.github.io/blog/images/vue/vue%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%861.png)

### 具体实现原理

#### 初始

new Vue()执行初始化会遍历递归data，在Observer中通过Object.defineProperty的get,set对数据进行响应化处理。

#### 视图变化更新数据

在对模板进行编译时，Compiler会对v-开头的指令进行解析，找到动态绑定的数据，从data中获取数据并初始化视图。如果遇到v-model,会根据不同的元素使用不同的属性并抛出不同的事件，处理完成后更新data中的数据。

1. text和textarea，会使用value属性和input事件
2. checkbox和radio使用checked和change事件
3. select使用value和change事件

#### 数据变化更新视图

解析指令时会定义更新函数render和watcher,watcher是Observer和Compiler之间的桥梁，主要是订阅Observer中的数据，watcher和Observer通过由发布订阅者模式实现的dep依赖收集器实现通知的实时响应。当数据发生变化时,watcher订阅收到通知后会通过更新函数进行视图的更新。



## 练习题

1. 实现一个响应式函数，对一个对象内的所有key添加响应式特性

```javascript
const isObj = (obj) => obj && typeof obj === 'object';

const render = (key, val) => {
    console.log(`Set key=${key} val=${val}`);
}

const defineReactive = (obj, key, val) => {
    Object.defineProperty(obj, key, {
        get() {
            return val;
        },
        set(newVal) {
            if (newVal === val) {
                return;
            }
            render(key, val);
        }
    })
}

const reactive = (obj) => {
    if (!isObj(obj)) return obj;
    for (const item in obj) {
        //如果是对象，递归
        isObj(obj[item]) ? reactive(obj[item]) : defineReactive(obj, item, obj[item]);
    }
}

const data = {
    a: 1,
    b: 2,
    c: {
        c1: {
            af: 999
        },
        c2: 4
    }
}

reactive(data);
data.a = 5; //Set key=a val=5
data.b = 7; //Set key=b val=7
data.c.c2 = 4; //
data.c.c1.af = 121; //Set key=af val=121
```

2. vue中对于数组类型是怎么处理的，简单模拟下对数组方法的监听

```javascript
//规范了一些特殊的数组处理方法，然后通过原型完成劫持并触发更新

const render = (actionName, ...args) => {
        console.log(`Action=${actionName} args=${args.join(',')}`);
    }
// 规范了一列数组方法
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

const arrayPrototype = Array.prototype;
const newArrayPrototype = Object.create(arrayPrototype);

methodsToPatch.forEach(method => {
    newArrayPrototype[method] = (...args) => {
        // 执行原生方法
        arrayPrototype[method].call(this, ...args);
        render(method, ...args);
    }
})

const reactive = (obj) => {
    if (Array.isArray(obj)) {
        obj.__proto__ = newArrayPrototype;
    }
}

const data = [1, 2, 3, 4];
reactive(data);

data.push(5); //Action=push ,args = 5
data.splice(0, 2) //Action=splice,args=0,2
```

