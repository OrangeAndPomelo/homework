let obj1 = {
    a: 10,
    name: 'John',
    list: [1, 2, 3],
    obj2: {
        obj3: 'oo',
        obj4: {
            name: 'oyc'
        }
    }
}

// 判断是否是对象
const isObj = (obj) => typeof obj === 'object' && obj !== null;

const render = (key, val) => {
    console.log(`Render ${key}=${val}`);
}

function reactive(obj) {
    if (!isObj(obj)) {
        return obj;
    }
    const handler = {
        get(target, key) {
            // 对嵌套对象遍历
            if (isObj(target[key])) {
                // 递归
                return reactive(target[key]);
            }
            return Reflect.get(target, key);
        },
        set(target, key, val) {
            // 渲染
            render(key, val);
            return Reflect.set(target, key, val);
        }
    }
    const targetProxyObj = new Proxy(obj, handler);
    return targetProxyObj
}

let myObj = reactive(obj1);

myObj.a = 20; // Render a=20
myObj.b = 30; //新增属性 Render b=30
myObj.list = [1, 2, 5, 6]; //修改数组 //Render list=1,2,5,6
myObj.obj2.obj4.name = 'oyq'; //修改嵌套对象 //Render name=oyq