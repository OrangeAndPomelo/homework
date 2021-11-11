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

2. 请写出以下输出结果：

```javascript

function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

```
