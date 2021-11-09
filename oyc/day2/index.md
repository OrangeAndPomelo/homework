# Day2

### 介绍下 js 的作用域

指变量的作用范围，分为**块级作用域**，**全局作用域**，**函数作用域**，作用域的访问是由内向外扩展的，内层作用域能访问外层作用域的变量，外层无法访问内部作用域的变量。

作用域与执行上下文最大的区别是：**作用域在定义时就确立了，但是执行上下文是在函数调用或者执行的时候确定的。**

```javascript

function init() {
  // 同一作用域下会存在不同的执行上下文
  const a = 1;
  const b = 2
  a(a);
  b(b);
}

function a(a) {
  console.log(a)
}

function b(b) {
  console.log(b)
}

```

### 回文数

给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

解法一

```javascript
var isPalindrome = function(x) {
    // 特殊数值先处理
    if (x === 0) return true;
    if (x < 0 || x % 10 === 0) return false;

    const originalSplitArray = x.toString().split("");

    const splitArray = x.toString().split("");

    console.log('splitArray', splitArray);

    const reverseString = splitArray.reverse().join("");

    const splitString = originalSplitArray.join("");

    console.log('splitString', splitString);
    console.log('reverseString', reverseString);

    if (splitString === reverseString) {
        return true;
    } else {
        return false;
    }
};
```

解法二

```javascript

var isPalindrome = function(x) {
    if (x < 0 || x % 10 == 0) return false;
    let reverseNum = 0;
    let num = x;
    let lastNum;

    //反推计算数值是否与初始值相同
    while (num > 0) {
        lastNum = num % 10;
        reverseNum = reverseNum * 10 + lastNum;
        num = Math.floor(num / 10);
    }

    console.log(reverseNum);
    if (reverseNum == x) {
        return true;
    } else {
        return false;
    }
}

```
