## Day8

### 谈一下 Promise

Promise 用来表示一个异步操作的结果预期，为异步操作的成功和失败绑定执行函数。

有三种状态： **pending（待定）**，**fulfilled（已兑现）**,**rejected（已拒绝）**;

有以下几个方法：

**Promise.all()**
会等待所有 promise 完成，以数组的形式返回所有的的返回结果，但是如果一个失败，会立马异步的返回失败的结果，不会返回其他成功的结果。（一错全错）

```javascript

const p1 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 1000, 'one');
    resolve('one');
});
const p2 = new Promise((resolve, reject) => {
    resolve('two');
});
const p3 = new Promise((resolve, reject) => {
    resolve('three');
});
const p4 = new Promise((resolve, reject) => {
    resolve('four');
});
const p5 = new Promise((resolve, reject) => {
    reject('报错信息');
});

Promise.all([p5, p1, p2, p3, p4])
    .then(values => {
        console.log(values);
        //如果没有p5就返回的是[one,two,three,four]
    })
    .catch(reason => {
        console.log(reason)
    });

```

**Promise.allSettled()**
这个功能跟 all 一样，但是不同的是，这个如果出现错误也会把错误的结果返回，会返回所有的结果，这个适合几个 promise 不关联的情况

```javascript

const p1 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 1000, 'one');
    resolve('one');
});
const p2 = new Promise((resolve, reject) => {
    resolve('two');
});
const p3 = new Promise((resolve, reject) => {
    resolve('three');
});
const p4 = new Promise((resolve, reject) => {
    resolve('four');
});
const p5 = new Promise((resolve, reject) => {
    reject('报错信息');
});

Promise.allSettled([p1, p2, p3, p4,p5])
    .then(values => {
        console.log(values);
        /*
  { status: 'rejected', reason: '报错信息' },
  { status: 'fulfilled', value: 'one' },
  { status: 'fulfilled', value: 'two' },
  { status: 'fulfilled', value: 'three' },
  { status: 'fulfilled', value: 'four' }
  */
]
    })

```

**Promise.any()**
只要一个成功，就返回那个promise返回的结果,返回第一个成功的结果值

```javascript
const p1 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 1000, 'one');
    resolve('one');
});
const p2 = new Promise((resolve, reject) => {
    reject('two');
});
const p3 = new Promise((resolve, reject) => {
    reject('three');
});

Promise.any([p1, p2, p3]).then((res) => {
  console.log(res); //one
})

```

**Promise.race()**
返回第一个结果值，不管是正确还是失败

```javascript
const p1 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 1000, 'one');
    reject('one');
});
const p2 = new Promise((resolve, reject) => {
    resolve('two');
});
const p3 = new Promise((resolve, reject) => {
    resolve('three');
});

const res = Promise.race([p1, p2, p3]).then((res) => {
    console.log(res); //one
}).catch(err => {
    console.log(err);
})

console.log(res); //one

```



### Promise 面试题

第一题

```javascript

console.log('script start')
async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {console.log('async2 end')}
async1()
setTimeout(function () {console.log('setTimeout')}, 0)
new Promise(resolve => {
    console.log('Promise')
    resolve()
}).then(function () {
        console.log('promise1')
    }).then(function () {
        console.log('promise2')
    })
console.log('script end')

//打印结果
//script start,async2 end,promise,script end,async1 end,promise1,promise2,setTimeout

/*
几个关键解析
1. settimeout是宏任务，promise里面的函数是同步的，promise.then是微任务
2. await 等待的函数是同步的，await下面的代码相当于Promise.then,是属于微任务
3. 需要等所有的微任务执行完毕后才会继续运行下一个宏任务
*/
```

第二题

```javascript
setTimeout(function() {
    console.log(" set1");
    new Promise(function(resolve) {
        resolve();
    }).then(function() {
        new Promise(function(resolve) {
            resolve();
        }).then(function() {
            console.log("then4");
        });
        console.log("then2 ");
    });
});

new Promise(function(resolve) {
    console.log("pr1");
    resolve();
}).then(function() {
    console.log("then1");
});

setTimeout(function() {
    console.log("set2");
});

console.log(2);

new Promise(function(resolve) {
    resolve();
}).then(function() {
    console.log("then3");
});

//pr1,2,then1,then3,set1,then2,then4,set2
```

第三题

期望id按顺序打印 0 1 2 3 4 ，且只能修改 start 函数。

```javascript
function start(id) {
    execute(id)
}
for (let i = 0; i < 5; i++) {
    start(i);
}
function sleep() {
    const duration = Math.floor(Math.random() * 500);
    return new Promise(resolve => setTimeout(resolve, duration));
}
function execute(id) {
    return sleep().then(() => {
        console.log("id", id);
    });
}

```

```javascript

function start(id) {
    this.promise = this.promise ? this.promise.then(() => execute(id)) : execute(id);
}

for (let i = 0; i < 5; i++) {
    start(i);
}

function sleep() {
    const duration = Math.floor(Math.random() * 500);
    return new Promise(resolve => setTimeout(resolve, duration));
}

function execute(id) {
    return sleep().then(() => {
        console.log("id", id);
    });
}

```