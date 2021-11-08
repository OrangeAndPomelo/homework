# Day1

### 介绍下 js 的执行上下文

执行上下文指的是当前执行环境中的 **变量，作用域链，函数声明，this，参数** 等信息。

分 **全局执行上下文** 还有 **函数执行上下文**

执行上下文生命周期分 **创建阶段** 还有 **执行阶段**

在创建阶段主要做 3 件事：**生成变量对象（函数，变量声明，arguments)，建立作用域链，确立 this 指向**

在执行阶段：**变量赋值，函数引用，执行其他代码**

js 是单线程的，通过栈来管理控制执行上下文，也就是后进先出（取出只能从上到下），所以全局上下文永远在栈底

### **一个 mySetInterVal(fn, a, b), 每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal**

```javascript
//递归
function mySetInterVal(fn, a, b) {
    let timer;

    function loop(fn, a, b) {
        timer = setTimeout(() => {
            console.log(a);
            fn();
            loop(fn, a + b, b);
        }, a)
    }
    loop(fn, a, b);
    return timer;
}

// function mySetInterVal(fn, a, b) {
//     let timer;
//     let count = -1;

//     function loop() {
//         timer = setTimeout(() => {
//             fn();
//             count++;
//             console.log(count, a + count * b);
//             loop();
//         }, a + count * b)
//     }
//     loop();
//     return timer;
// }


// 清除定时器
function myClear(timer) {
    clearInterval(timer);
}

function test() {
    console.log('count');
}

mySetInterVal(() => { console.log('count'); }, 1000, 2000)

```
