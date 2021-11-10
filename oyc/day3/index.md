# Day3

### 介绍下闭包是什么，以及应用场景

闭包首先 **是一个函数，是一个有权访问另一函数作用域的变量的函数**。类似于背包，这个背包包含了在函数创建时作用域中的所有变量。闭包一般用来创建内部变量，使其不可修改，同时又能通过接口访问到其中的值。

```javascript

function hello() {
    const name = 'world';
    return function getHi() {
        const fullHello = `hello ${name}`;
        console.log(fullHello);
    }
}
const hi = hello();
console.log(hi());  //hello world

```

### 写一个 sum 方法，当使用下面的语法调用时，能正常工作

```javascript

console.log(sum(2, 3，4)); // Outputs 9
console.log(sum(2)(3)(4)); // Outputs 9
console.log(sum(2,3)(4)); // Outputs 9
```

方法一

```javascript
//https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134
function sum(...args) {
    const argsArray = [...args];

    // 一直不断的加入参数
    let res = function(...args2) {
        argsArray.push(...args2);
        return res;
    }

    res.toString = function() {
        return argsArray.reduce((pre, cur) => pre + cur);
    }
    return res;
}
console.log(sum(2, 3，4).toString()); // Outputs 9
console.log(sum(2)(3)(4).toString()); // Outputs 9
console.log(sum(2,3)(4).toString()); // Outputs 9

```

方法2

```javascript

//https://github.com/yygmind/blog/issues/37
function currying(fn, length) {
    length = length || fn.length;

    return function(...args) {
        // 新函数接收的参数长度是否大于等于 fn 剩余参数需要接收的长度
        if (args.length >= length) {
            return fn.apply(this, args);
        } else {
            //length - args.length,为剩余参数的长度
            return currying(fn.bind(this, ...args), length - args.length)
        }
    }
}


function add(...args) {
    const argsArray = [...args];
    return argsArray.reduce((pre, cur) => pre + cur);
}
const sum = currying(add, 4);


console.log('sum(2,3,4,5)====>', sum(2, 3, 4, 5));
console.log('sum(2)(3)(4)(5))====>', sum(2)(3)(4)(5)); //9
console.log('sum(2,3)(4,5))====>', sum(2, 3)(4, 5)); //9
console.log('sum(2)(3,4,5))====>', sum(2)(3, 4, 5)); //9
console.log('sum(2,3,4)(5))====>', sum(2, 3, 4)(5)); //9

```
