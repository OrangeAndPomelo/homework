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

## Day 5

1. 如何改变this指向

2. [按要求实现 go 函数](https://github.com/lgwebdream/FE-Interview/issues/1058)

```javascript
// 示例
go("l"); //gol
go()("l"); //gool
go()()()("l"); //返回gooool

```

## Day 6

1. 介绍下call,apply,bind

2. 重新实现call,apply,bind
