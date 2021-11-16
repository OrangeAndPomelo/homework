## 介绍下 call,apply,bind

三者的作用都是为了改变函数执行时的上下文，在实际开发过程中的主要功能是为了借助已实现的方法，提高代码运行效率

#### 区别

1. call，apply 是改变上下文后会立马执行的，但是 bind 是不会执行的

2. call，apply 是返回函数执行的结果，bind 返回的是函数的拷贝，指定函数 this 指向，保存函数参数

3. call 和 apply 区别主要是传参的不同，call 直接接受参数，但是 apply 接受的是一个数组

### 常见应用场景

#### 判断数据类型

```javascript
function isType(data, type) {
    const typeObj = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Function]': 'function',
        '[object Date]': 'date', // Object.prototype.toString.call(new Date())
        '[object RegExp]': 'regExp',
        '[object Map]': 'map',
        '[object Set]': 'set',
        '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
        '[object WeakMap]': 'weakMap',
        '[object Window]': 'window',  // Object.prototype.toString.call(window)
        '[object Error]': 'error', // new Error('1')
        '[object Arguments]': 'arguments',
        '[object Symbol]': 'symbol'
    }
    let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
    let typeName = typeObj[name] || '未知类型' // 匹配数据类型
    return typeName === type // 判断该数据类型是否为传入的类型
}
console.log(
    isType({}, 'object'), // true
    isType([], 'array'), // true
    isType(new Date(), 'object'), // false
    isType(new Date(), 'date'), // true
)

```

#### 类数组借用数组方法

```javascript

const arrayLike = {
  0: 'oyc',
  1: 'oyq',
  length: 2
}
Array.prototype.push.call(arrayLike, 'oyt', 'oyb');
console.log(arrayLike) //{ '0': 'oyc', '1': 'oyq', '2': 'oyt', '3': 'oyb', length: 4 }

```

## 重新实现 call,apply,bind

```javascript
// 想要让obj能调用getName方法

function getName(age, sex) {
    console.log(this.name, age, sex);
}
let obj = { name: 'oyc' };

// 第一种
// obj.getName = getName;
// obj.getName();
// delete obj.getName;

// 第二种 以obj作为调用方或者执行主体，调用getName
// getName.call(obj);

// 实现call方法 ==》 重写call
!(function(prototype) {
    function checkDefaultContext(context) {
        context = context || window;
        let type = typeof(context);
        if (['string', 'number', 'boolean'].includes(type)) {
            // 如果不是对象,转为对象
            // context = new context.constructor(context);
            context = Object(context);
        }
        return context;
    }

    // apply传入的是对象
    function call2(context, ...args) {
        context = checkDefaultContext(context);
        let symbol = Symbol('fn');
        context[symbol] = this;
        context[symbol](...args);
        delete context[symbol];
    }

    // apply与call区别是,apply传入的参数是数组
    function apply2(context, args) {
        context = checkDefaultContext(context);
        let symbol = Symbol('fn');
        context[symbol] = this;
        context[symbol](...args);
        delete context[symbol];
    }

    // bind会返回一个函数，可以分割参数处理
    function bind2(context, ...outArgs) {
        // this指向调用者，也就是调用bind后返回的函数对象
        return (...args) => this.call(context, ...outArgs, ...args);
    }

    prototype.call2 = call2;
    prototype.apply2 = apply2;
    prototype.bind2 = bind2;
})(Function.prototype)

getName.call2(obj, 25, 'male');
getName.apply2(obj, [23, 'male2']);
const bindGetName = getName.bind2(obj);
bindGetName(29, 'male3');
```
