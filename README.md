# homework

Daily homework

## Day1

1. 介绍下 js 的执行上下文
2. [写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal](https://github.com/lgwebdream/FE-Interview/issues/7)

## Day2

1. 介绍下 js 的作用域
2. [回文数](https://leetcode-cn.com/problems/palindrome-number/)

## Day3

1. 介绍下闭包是什么，以及应用场景

2. [写一个 sum 方法，当使用下面的语法调用时，能正常工作](https://segmentfault.com/a/1190000018180159)

```javascript

console.log(sum(2, 3)); // Outputs 5
console.log(sum(2)(3)); // Outputs 5
```

## Day4

1. 介绍下 javascript 里的 this

2. [请写出以下输出结果](https://segmentfault.com/a/1190000011194676)

第一题

```javascript

function Foo() {
    getName = function () { console.log('1'); };
    return this;
}
Foo.getName = function () { console.log('2');};
Foo.prototype.getName = function () { console.log('3');};
var getName = function () { console.log('4');};
function getName() { console.log('5');}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

```

第二题

```javascript

var = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x);
        var foo = function(){
            console.log(this.x);
            }
        foo();
    }
};
obj.f();

```

第三题

```javascript

function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
var b = foo(10);

console.log(a.a);
console.log(b.a);

```

第四题

```javascript

var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};
var bar = obj.f;
var obj2 = {
    x: 30,
    f: obj.f
}
obj.f();
bar();
obj2.f();

```

## Day5

1. 如何改变this指向

2. [按要求实现 go 函数](https://github.com/lgwebdream/FE-Interview/issues/1058)

```javascript
// 示例
go("l"); //gol
go()("l"); //gool
go()()()("l"); //返回gooool

```

## Day6

1. 介绍下call,apply,bind

2. 重新实现call,apply,bind

## Day7

1. 介绍下js的原型和原型链


2. 重新实现一个new

## Day8

1. 谈一下Promise

2. [Promise面试题](https://jishuin.proginn.com/p/763bfbd2a6b2)

## Day9

1. 介绍下js中的深拷贝，浅拷贝

2. 实现深拷贝，浅拷贝

## Day10

1. 介绍下js事件机制eventloop

2. 如何实现事件的发布订阅

3. 写出下面代码的打印结果

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

```
## Day11

1. 说一下防抖节流

2. 手写防抖节流

## Day12

1. 说下你对MVVM的理解

## Day13

1. 说下你对Vue生命周期的理解

2. 父子组件挂载时，生命周期的顺序是咋样的

## Day14

1. 说下Vue的双向数据绑定

2. 实现响应式函数

```js
// 实现一个响应式函数，对一个对象内的所有key添加响应式特性
const reactive = (obj) => {

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
3. vue中对于数组类型是怎么处理的，简单模拟下对数组方法的监听

```javascript
//vue中对于数组类型是怎么处理的，简单模拟下对数组方法的监听
const reactive = (obj) => {

}
const data = [1,2,3,4];
reactive(data);
data.push(5); //Action=push ,args = 5
data.splice(0, 2) //Action=splice,args=0,2

```

## Day15

1. vue3实现响应式为什么要使用proxy替换Object.defineProperty？Proxy对比Object.defineProperty有啥优缺点？

2. 怎么通过Proxy实现响应式？

