## 介绍下js中的深拷贝，浅拷贝



![](https://segmentfault.com/img/bVbrl56?w=310&h=227)



### 数据类型

基本数据类型: String,Number,Boolean,undefined,null,Symbol,BigInt

引用数据类型：Object

他们区别在于存储方式的不同，基本数据类型存储在栈中，引用数据类型真实数据存储在堆内存中，但是会在栈中通过指针存储真实数据的引用。

### **浅拷贝**

浅拷贝复制，只是复制指针，复制该指针的引用，新旧内存还是共享一块内存。**浅拷贝只拷贝第一层的原始类型值，和第一层的引用类型地址**

**Object.assign**,**slice**,**concat**,还有**扩展运算符**都是属于浅拷贝

### 深拷贝

深拷贝，是完完全全的复制，会开辟一块新的内存存储新的对象

### 浅拷贝，深拷贝，赋值区别

![](https://segmentfault.com/img/bVbrl7m?w=620&h=189)

赋值操作

```javascript
let obj1 = {
    name: 'oyc',
    otherName: ['cc', ['cz', 'cf']]
}

//赋值操作会和原数据指向同一个对象，会将基本类型和引用类型的原数据一起改变，两个对象是共同变化的
let obj2 = obj1;

obj2.name = 'oyy';
obj2.otherName = ['yz','yy'];

console.log(obj1);//{ name: 'oyy', otherName: [ 'yz', 'yy' ] }
console.log(obj2);//{ name: 'oyy', otherName: [ 'yz', 'yy' ] }
```

浅拷贝

```javascript
let obj1 = {
    age: 18,
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
shallowObj.age = 24;
shallowObj.name.name1 = 'oyq';
shallowObj.otherName = ['qq'];

//通过age,otherName可以看到浅拷贝不能改变原数据第一层中的基本数据类型和引用类型，但是改变了第二层中的name1，说明shallowObj只复制了第一层中的基本数据类型和引用类型。

console.log(obj1); //{ age: 18,name: { name1: 'oyq', name2: 'cz' },otherName: [ 'cc', [ 'cz', 'cf' ] ]}

console.log(shallowObj); //{age: 24, name: { name1: 'oyq', name2: 'cz' },otherName: [ 'qq' ]}
```

深拷贝

```javascript
let obj1 = {
    age: 18,
    name: {
        name1: 'cc',
        name2: 'cz'
    },
    otherName: ['cc', ['cz', 'cf']]
}

function deepCopy(origin) {
  const target = JSON.parse(JSON.stringify(origin));
  return target;
}

let deepCopyObj = deepCopy(obj1);
deepCopyObj.age = 24;
deepCopyObj.name.name1 = 'oyq';
deepCopyObj.otherName = ['qq'];


//通过比较两个对象的age,name,otherName可以知道，deepCopyObj已经开辟了一块新的内存空间，不会影响到obj1
console.log(obj1); //{ age: 18,name: { name1: 'cc', name2: 'cz' },otherName: [ 'cc', [ 'cz', 'cf' ] ]}

console.log(deepCopyObj); //{age: 24, name: { name1: 'oyq', name2: 'cz' },,otherName: [ 'qq' ]}
```





## 实现深拷贝，浅拷贝

### 浅拷贝

```javascript
function shallowCopy(origin) {
    let target = {};
    for (let item in origin) {
        if (Object.prototype.hasOwnProperty.call(origin,item)) {
            target[item] = origin[item];
        }
    }
    return target;
}
```

### 深拷贝

第一种,通过json,但是无法深拷贝循环引用

```javascript
function deepCopy(origin) {
  const target = JSON.parse(JSON.stringify(origin));
  return target;
}
```

第二种,浅拷贝 + 递归

```javascript
// 关键点 浅拷贝 + 递归 判断子项是不是对象或者数组，如果是就执行递归deepCopy
function deepCopy(origin) {
  const isObj = item => typeof item === 'object'&& item !== null;

  //如果不是对象，返回数据本身
  if(!isObj(origin)) return origin;

  //如果是数组，初始化成数组，否则初始化成obj
  let target = Array.isArray(origin)?[]:{};

  for (let item in origin) {
    if(Object.prototype.hasOwnProperty.call(origin,item)){
      //如果是对象,递归deepCopy
      if(isObj(origin[item])){
        target[item] = deepCopy(origin[item]);
      }else{
        target[item] = origin[item];
      }
    }
  }
  return target;
}
```

测试

```javascript
let obj1 = {
    age: 18,
    p1: null,
    name: {
        name1: 'cc',
        name2: 'cz'
    },
    otherName: ['cc', ['cz', 'cf']]
}
let deepCopyObj = deepCopy(obj1);
deepCopyObj.age = 24;
deepCopyObj.name.name1 = 'oyq';
deepCopyObj.otherName = ['qq'];


console.log(obj1); //{ age: 18,p1: null,name: { name1: 'cc', name2: 'cz' },otherName: [ 'cc', [ 'cz', 'cf' ] ]}

console.log(deepCopyObj); //{age: 24,p1: null, name: { name1: 'oyq', name2: 'cz' },,otherName: [ 'qq' ]}
```



## 参考资料

1. https://segmentfault.com/a/1190000018874254
2. https://segmentfault.com/a/1190000018879536#item-8

