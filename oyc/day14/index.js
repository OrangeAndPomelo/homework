/*
// 实现一个响应式函数，对一个对象内的所有key添加响应式特性

//判断对象类型
const isObj = (obj) => typeof obj === 'object' && obj !== null;

const render = (key, val) => {
    console.log(`Set key=${key} val=${val}`);
}

// 响应式
const defineReactive = (obj, key, val) => {
    Object.defineProperty(obj, key, {
        get() {
            return val;
        },
        set(newVal) {
            // 如果相等不打印
            if (val === newVal) {
                return;
            }
            val = newVal;
            render(key, val);
        }
    })
}

const reactive = (obj) => {
    if (!isObj(obj)) {
        console.log('不是对象');
        return obj;
    }
    for (const key in obj) {
        if (!isObj(obj[key])) {
            defineReactive(obj, key, obj[key]);
        } else {
            reactive(obj[key]);
        }
    }

}

const data = {
    a: 1,
    b: 2,
    c: {
        c1: {
            af: 999
        },
        c2: 4
    }
}

reactive(data);
data.a = 5; //Set key=a val=5
data.b = 7; //Set key=b val=7
data.c.c2 = 4; //
data.c.c1.af = 121; //Set key=af val=121
*/

/*
//vue中对于数组类型是怎么处理的，简单模拟下对数组方法的监听
const render = (action, ...args) => {
    console.log(`Action=${action},args=${args.join(',')}`);
}

// 原数组原型
const arrayPrototype = Array.prototype;
// 新的数组原型
const newArrayPrototype = Object.create(arrayPrototype);

// 获取数组原型上的方法名
const arrayMethodsName = Object.getOwnPropertyNames(arrayPrototype);

arrayMethodsName.forEach(methodName => {
    newArrayPrototype[methodName] = (...args) => {
        // 执行原有方法
        arrayPrototype[methodName].call(this, ...args);
        render(methodName, ...args);
    }
})

const reactive = (obj) => {
    if (Array.isArray(obj)) {
        // 将新的原型对象指向obj
        obj.__proto__ = newArrayPrototype;
    }
}


const data = [1, 2, 3, 4];
reactive(data);

data.push(5); //Action=push ,args = 5
data.splice(0, 2) //Action=splice,args=0,2
data.fill(1, 2, 3) //Action=splice,args=0,2
*/



// 能否监听对象属性的删除操作？基于Proxy实现一下响应式

// let user = {};
// user = makeObservable(user);

// user.observe((action, key, value) => {
//     console.log(`${action} key=${key} value=${value || ''}`);
// })

// user.name = "John"; //Set key=name value=John
// console.log(user.name); //Get key=name value=John  //John
// delete user.name; //Detele key=name value=
// const isObj = (obj) => obj && typeof obj === 'object';

//vue中对于数组类型是怎么处理的，简单模拟下对数组方法的监听

//规范了一些特殊的数组处理方法，然后通过原型完成劫持并触发更新

const render = (actionName, ...args) => {
        console.log(`Action=${actionName} args=${args.join(',')}`);
    }
    // 规范了一列数组方法
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

const arrayPrototype = Array.prototype;
const newArrayPrototype = Object.create(arrayPrototype);

methodsToPatch.forEach(method => {
    newArrayPrototype[method] = (...args) => {
        // 执行原生方法
        arrayPrototype[method].call(this, ...args);
        render(method, ...args);
    }
})

const reactive = (obj) => {
    if (Array.isArray(obj)) {
        obj.__proto__ = newArrayPrototype;
    }
}

const data = [1, 2, 3, 4];
reactive(data);

data.push(5); //Action=push ,args = 5
data.splice(0, 2) //Action=splice,args=0,2