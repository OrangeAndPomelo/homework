# Day4

### 介绍下 javascript 里的 this

1. this 是 js 的一个关键字，它是对象自动生成的内部对象，只能在对象内部使用，随着函数调用方式的不同，指向也会不同
2. this 指向完全取决于它在什么地方以什么形式被调用，而不是创建时。

### 绑定情况

- 函数被 new 修饰，this 绑定新创建的对象
- 函数使用 call,apply,bind 调用，this 绑定第一个参数
- 函数在某个上下文被调用，this 绑定那个上下文对象
- 箭头函数 this 绑定父级作用域
- 都不是默认绑定 windows

### 请写出以下输出结果

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
Foo.getName(); //2
getName(); //4
Foo().getName(); //1

getName(); //1  //函数Foo 内的getName覆盖了外层全局的getName

new Foo.getName(); //2  成员访问. 的优先级大于new,所以是先取Foo.getName也就是2，然后再new


new Foo().getName(); //3  (new Foo()).getName()
new new Foo().getName(); //3

```

第二题

```javascript

var = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x); //20
        var foo = function(){
            console.log(this.x);
            }
        foo(); //10  默认绑定
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

console.log(a.a); //this指向全局，实际上这里等价于 window.a = window,函数里this.a = window.a,但是window.a未定义，所以返回undefined
console.log(b.a); //这里经过第一步声明了a，所以foo函数内window.a  = this.a = = 10;

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
obj.f(); //20 //obj是他的上下文
bar(); //10  //默认绑定
obj2.f(); //30 //obj2是他的上下文

```
