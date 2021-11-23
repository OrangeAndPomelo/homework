## 介绍下js事件机制eventloop

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdd88994142347~tplv-t2oaga2asx-watermark.awebp)

js任务分为同步任务，异步任务。当两种任务一同进入执行栈时，两种任务会进入不同的环境，同步任务会进入主线程，异步任务会进入Event Table并注册回调函数，当异步任务有返回结果时，js会把当前的异步任务放入事件队列。等主线程执行完同步任务闲置后，会去事件队列查找是否有异步任务，如果有就会将排在第一位的任务放入主线程执行，然后异步又注册回调，主线程继续执行同步代码，然后又会开始检索事件队列，由此形成一个循环，就是**事件循环**。



## 异步任务

异步任务分为**宏任务(macro task)**，**微任务(micro task)**

### 宏任务

宏任务优先级低于微任务，宏任务会等待微任务队列清空后才会执行,宏任务主要有

1. setTimeout
2. setInterval
3. postMessage
4. UI交互
5. I/O
6. setImmediate

### 微任务

微任务优先级高，会先与宏任务执行。主要有

1. Promise.then
2. MutationObserver
3. await 下面的代码
4. process.nextTick



## node环境下的事件循环

```text
┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

输入数据 => poll(轮询) => check(检查) => close callback(关闭回调) =>timers(检测定时器) => I/O callback(io事件回调) => idle(闲置阶段)

I/O事件的回调中，setImmediate方法的回调永远在timer的回调前执行



## 如何实现事件的发布订阅

```javascript
class EventEmitter {
    // 存放注册的事件还有回调
    constructor() {
        this.events = {}
    }

    // 核心: 将事件回调存放至this._events上
    on(eventName, callback) {
        const callbacks = this.events[eventName] || [];
        callbacks.push(callback);
        this.events[eventName] = callbacks;
    }

    // 获取到对应的回调函数,然后执行
    emit(eventName, ...args) {
        // 获取到对应的回调函数
        const callbacks = this.events[eventName] || [];
        callbacks.forEach(cb => cb(...args));
    }

    // 获取到对应的回调，然后删除该回调
    off(eventName, callback) {
        const callbacks = this.events[eventName] || [];

        // 筛选回调
        const newCallbacks = callbacks.filter(cb => cb != callback && cb.init != callback);
        this.events[callback] = newCallbacks;
    }

    once(eventName, callback) {
        // 处理回调
        const one = (...args) => {
            callback(...args);
            this.off(eventName, one);
        }
        one.init = callback;
        this.on(eventName, one);
    }

}

const events1 = new EventEmitter();

function cb(val) {
    console.log(val);
}

events1.on('test', cb);
events1.on('test2', cb);



events1.off('test', cb);

events1.on('test', cb);

events1.once('test', cb)

events1.emit('test', 'test1');
events1.emit('test2', 'test2');
```



## 写出一下打印结果

```javascript
setTimeout(() => {
  console.log("A");
  Promise.resolve().then(() => {
    console.log("B");
  });
}, 1000);

Promise.resolve().then(() => {
  console.log("C");
});

new Promise(resolve => {
  console.log("D");
  resolve("");
}).then(() => {
  console.log("E");
});

async function sum(a, b) {
  console.log("F");
}

async function asyncSum(a, b) {
  await Promise.resolve();
  console.log("G");
  return Promise.resolve(a + b);
}

sum(3, 4);
asyncSum(3, 4);
console.log("H");

//D F H C E G A B
```

