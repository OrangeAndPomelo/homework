const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');

// 判断是否是原生方法
const isNative = (val) => typeof val === 'function' && /native code/.test(val.toString());


// 使用 MicroTask 的标识符，这里是因为火狐在<=53时 无法触发微任务，在modules/events.js文件中引用进行安全排除
let isUsingMicroTask = false

// 用来存储所有需要执行的回调函数
const callbacks = []

// 用来标志是否正在执行回调函数
let pending = false

// 对callbacks进行遍历，然后执行相应的回调函数
function flushCallbacks() {
    pending = false
        // 这里拷贝的原因是：
        // 有的cb 执行过程中又会往callbacks中加入内容
        // 比如 $nextTick的回调函数里还有$nextTick
        // 后者的应该放到下一轮的nextTick 中执行
        // 所以拷贝一份当前的，遍历执行完当前的即可，避免无休止的执行下去
    const copies = callbcks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

let timerFunc // 异步执行函数 用于异步延迟调用 flushCallbacks 函数

// 优先使用 Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)

        // IOS 的UIWebView, Promise.then 回调被推入 microTask 队列，但是队列可能不会如期执行
        // 因此，添加一个空计时器强制执行 microTask
        if (isIOS) setTimeout(function() {})
    }
    isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString === '[object MutationObserverConstructor]')) {
    // 当 原生Promise 不可用时，使用 原生MutationObserver
    // e.g. PhantomJS, iOS7, Android 4.4
    //MutationObserver is unreliable in IE11
    let counter = 1

    // 创建MO实例，监听到DOM变动后会执行回调flushCallbacks
    const observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true // 设置true 表示观察目标的改变
    })

    // 每次执行timerFunc 都会让文本节点的内容在 0/1之间切换
    // 切换之后将新值复制到 MO 观测的文本节点上
    // 节点内容变化会触发回调
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter) // 触发回调
    }
    isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

function nextTick(cb, ctx) {
    let _resolve;

    // cb 回调函数会经统一处理压入 callbacks 数组
    callbacks.push(() => {
        if (cb) {
            // 给 cb 回调函数执行加上了 try-catch 错误处理
            try {
                cb.call(ctx);
            } catch (e) {
                // handleError(e, ctx, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });

    // 执行异步延迟函数 timerFunc
    if (!pending) {
        pending = true;
        timerFunc();
    }

    // 当 nextTick 没有传入函数参数的时候，返回一个 Promise 化的调用
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}