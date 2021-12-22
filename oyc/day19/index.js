//  new的实现
// function myNew() {
//     //获取到第一个参数的，也就是需要被new的对象,shift会剔除第一个参数，剩下的arguments就是构造函数的参数
//     const fn = [].shift.call(arguments);

//     //创建空对象并与被new的对象建立联系
//     const newObj = Object.create(fn.prototype);

//     //为新创建对象绑定执行上下文
//     const resultObj = fn.apply(newObj, arguments);

//     //判断返回是不是对象，如果不是，返回未绑定上下文的创建的空对象
//     if (typeof resultObj === 'object' && resultObj !== null || typeof resultObj === 'function') {
//         return resultObj;
//     }
//     return newObj;
// }

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }
// Person.prototype.getInfo = function() {
//     console.log(`${this.name} is ${this.age}`);
// }
// const n1 = myNew(Person, 'oyc', 24);
// n1.getInfo(); //oyc is 24

//继承

/*
第一种
1. 在子的构造函数中通过call调用父的构造函数，实现继承父构造函数的效果
2. 通过Object.create将子的原型与父的原型建立链接，也就是使得Son.prototype.__proto__ = Father.prototype,实现继承父类原型上的方法与属性
3. 修正子的constructor，使其指向自己

*/

// function Father(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.getFullName = function() {
//         return `${this.firstName}${this.lastName}`;
//     }
// }


// function Son(firstName, lastName, age) {
//     //继承父构造函数
//     Father.call(this, firstName, lastName);
//     this.age = age;
// }

// //将子与父通过原型链建立关系
// Son.prototype = Object.create(Father.prototype);

// //使constructor指向Son自己
// Son.prototype.constructor = Son;

// Son.prototype.getInfo = function() {
//     return `${this.getFullName()} is ${this.age} years old`
// }

// const son1 = new Son('OY', 'C', 24);
// console.log(son1.getInfo()); //OYC is 24 years old

//第二种，extends

class Father {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName() {
        return `${this.firstName}${this.lastName}`;
    }
}

class Son extends Father {
    constructor(firstName, lastName, age) {
        super(firstName, lastName);
        this.age = age;
    }
    getInfo() {
        return `${this.getFullName()} is ${this.age} years old`;
    }
}

const son1 = new Son('OY', 'C', 24);
console.log(son1.getInfo()); //OYC is 24 years old