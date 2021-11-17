/*
原理：
mdn定义new  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

1. 创建一个空对象；
2. 链接该对象(设置该对象的construct)到另一个对象;
3. 将步骤一创建的对象作为this的上下文;
4. 如果函数没有返回对象返回this;
*/

function myNew(fn, ...args) {

    // 创建空对象,并将另一个对象链接到新对象
    const _this = Object.create(fn.prototype);

    // 将创建的对象作为this的上下文
    const result = fn.call(_this, ...args);

    // 确保返回的是对象
    if (result !== null && typeof result === 'object' || typeof result === 'function') {
        return result;
    }

    //如果函数没有返回对象返回this;
    return _this;
}

function myNew1() {

    // 获得构造函数，并删除第一个参数
    const construct = [].shift.call(arguments);

    // 创建空对象,并将另一个对象链接到新对象
    const _this = Object.create(construct.prototype);

    // 将创建的对象作为this的上下文
    const result = construct.apply(_this, arguments);

    // 确保返回的是对象
    if (result !== null && typeof result === 'object' || typeof result === 'function') {
        return result;
    }

    //如果函数没有返回对象返回this;
    return _this;
}

// 不推荐，方便直观理解步骤
function myNew2(fn, ...args) {
    // 创建空对象
    const _this = {};

    // 链接该对象到另一个对象(不推荐这种写法，耗性能,具体原因可见: https://github.com/sisterAn/JavaScript-Algorithms/issues/71)
    _this.__proto__ = fn.prototype;


    // 将创建的对象作为this的上下文
    const result = fn.call(_this, ...args);

    // 确保返回的是对象
    if (result !== null && typeof result === 'object' || typeof result === 'function') {
        return result;
    }

    //如果函数没有返回对象返回this;
    return _this;
}


function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function() {
    console.log(this.name);
}

// const newObj = myNew(Person, 'oyc', 12)
// console.log(newObj.name);
// console.log(newObj.age);
// newObj.getName();

const newObj1 = myNew1(Person, 'oyq', 23);
console.log(newObj1.name);
console.log(newObj1.age);
newObj1.getName();