// Promise.resolve(console.log(0))
//     .then(() => {
//         console.log(1);
//         Promise.resolve(console.log(5))
//             .then(() => console.log(3))
//             .then(() => console.log(4))
//             .then(() => console.log(6));
//     })
//     .then(() => console.log(2))
//     .then(() => console.log(7));

// Promise.resolve(console.log(0))
//     .then(() => {
//         console.log(1);

//         Promise.resolve(console.log(2))
//             .then(() => console.log(3))
//             .then(() => console.log(4))
//             .then(() => {
//                 Promise.resolve(console.log(5))
//                     .then(() => console.log(6))
//                     .then(() => {
//                         Promise.resolve(7)
//                             .then(() => console.log(13))
//                             .then(() => console.log(14))
//                     })
//                     .then(() => console.log(8))
//             });
//     })
//     .then(() => console.log(9))
//     .then(() => {
//         Promise.resolve(console.log(10))
//             .then(() => console.log(15))
//             .then(() => console.log(16))
//     })
//     .then(() => console.log(11))
//     .then(() => console.log(12))

//0,1,2,3,9,4,10,5,15,11，6,16,12,13，8，14

class EventEmitter {
    // 存放注册的事件还有回调
    constructor() {
        this.events = {}
    }

    // 核心: 将事件回调存放至this._events上
    on(eventName, callback) {
        const callbacks = this.events[eventName] || [];
        callbacks.push(callback);
        this.events[eventName] = callbacks;
    }

    // 获取到对应的回调函数,然后执行
    emit(eventName, ...args) {
        // 获取到对应的回调函数
        const callbacks = this.events[eventName] || [];
        callbacks.forEach(cb => cb(...args));
    }

    // 获取到对应的回调，然后删除该回调
    off(eventName, callback) {
        const callbacks = this.events[eventName] || [];

        // 筛选回调
        const newCallbacks = callbacks.filter(cb => cb != callback && cb.init != callback);
        this.events[callback] = newCallbacks;
    }

    once(eventName, callback) {
        // 处理回调
        const one = (...args) => {
            callback(...args);
            this.off(eventName, one);
        }
        one.init = callback;
        this.on(eventName, one);
    }

}

const events1 = new EventEmitter();

function cb(val) {
    console.log(val);
}

events1.on('test', cb);
events1.on('test2', cb);



events1.off('test', cb);

events1.on('test', cb);

events1.once('test', cb)

events1.emit('test', 'test1');
events1.emit('test2', 'test2');