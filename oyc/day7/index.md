## 介绍下 js 的原型与原型链

> https://github.com/mqyqingfeng/blog/issues/2

#### 原型

每个 js 对象在创建的时候会关联一个对象，这个对象就是原型，每一个对象都会从原型继承属性。（什么是原型）

###### \_\_proto\_\_

每个对象都会存在一个属性 **\_\_proto\_\_**，通过它指向对象的原型

```javascript
function Person() {

}
var person = new Person();

person.__proto__ === Person.prototype; //true;

```

下图中实例对象 person 通过 **\_\_proto\_\_** 关联实例原型 Person.prototype。

![](https://camo.githubusercontent.com/3dde335faa15d03ffe3b907f6e5c2b5f4d2183caa4c47ac7486794bc407f663c/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065322e706e67)

###### construct

每个原型都有一个属性 construct 指向关联的构造函数，

```javascript
function Person() {

}
console.log(Person === Person.prototype.constructor); // true

```

![](https://camo.githubusercontent.com/0aaf005afda83d4e2fdd2bbe523df228b567a091317a2154181771b2706ea2ef/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065332e706e67)

#### 原型链

在读取实例属性时，如果读取不到，会沿着原型的原型一直向上寻找，这个寻找原型的过程就是原型链。

###### 寻找过程

`person.__proto__ => Person.prototype.__proto__ => Object.prototype.__proto__(null)`

![](https://camo.githubusercontent.com/9a69b0f03116884e80cf566f8542cf014a4dd043fce6ce030d615040461f4e5a/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065352e706e67)

## 重新实现一个 new

```javascript

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

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function() {
    console.log(this.name);
}

const newObj1 = myNew1(Person, 'oyc', 23);
console.log(newObj1.name); //oyc
console.log(newObj1.age); //23
newObj1.getName(); //oyc

```
