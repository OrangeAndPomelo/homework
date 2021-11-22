/*
浅拷贝测试
let obj1 = {
    name: {
        name1: 'cc',
        name2: 'cz'
    },
    otherName: ['cc', ['cz', 'cf']]
}

function shallowCopy(origin) {
    let target = {};
    for (let item in origin) {
        if (origin.hasOwnProperty(item)) {
            target[item] = origin[item];
        }
    }
    return target;
}

let shallowObj = shallowCopy(obj1);
shallowObj.name.name1 = 'oyq';
shallowObj.otherName[1] = ['qq'];

//可以看到浅拷贝
console.log(obj1); //{ name: 'oyc', otherName: [ 'cc', [ 'qq' ] ] }

console.log(shallowObj); //{ name: 'oyq', otherName: [ 'cc', [ 'qq' ] ] }
*/

//深拷贝
let obj1 = {
    age: 18,
    p1: null,
    name: {
        name1: 'cc',
        name2: 'cz'
    },
    otherName: ['cc', ['cz', 'cf']]
}

// 关键点 浅拷贝 + 递归 判断子项是不是对象或者数组，如果是就执行递归deepCopy
function deepCopy(origin) {
    const isObj = item => typeof item === 'object' && item !== null;

    //如果不是对象，返回数据本身
    if (!isObj(origin)) return origin;

    //如果是数组，初始化成数组，否则初始化成obj
    let target = Array.isArray(origin) ? [] : {};

    for (let item in origin) {
        if (Object.prototype.hasOwnProperty.call(origin, item)) {
            //如果是对象,递归deepCopy
            if (isObj(origin[item])) {
                target[item] = deepCopy(origin[item]);
            } else {
                target[item] = origin[item];
            }
        }
    }
    return target;
}



let deepCopyObj = deepCopy(obj1);
deepCopyObj.age = 24;
deepCopyObj.name.name1 = 'oyq';
deepCopyObj.otherName = ['qq'];


console.log(obj1); //{ age: 18,p1: null,name: { name1: 'cc', name2: 'cz' },otherName: [ 'cc', [ 'cz', 'cf' ] ]}

console.log(deepCopyObj); //{age: 24,p1: null, name: { name1: 'oyq', name2: 'cz' },,otherName: [ 'qq' ]}