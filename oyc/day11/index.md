## 说一下防抖节流

一些高频率的事件会影响js的执行效率，浪费资源，影响性能，所以需要防抖节流来限制执行的频率。

### 防抖(debounce)

在事件触发n秒后，才执行回调，如果在n秒内又触发了事件，则会重新计时。

#### 应用场景

1. 调整大小，滚动触发统计(resize,scroll)
2. 搜索框输入
3. 表单验证



## 节流(throttle)

在触发事件后，只有大于设置的执行周期n秒后，才能执行下一个周期，持续触发事件时，保证一个执行周期里面只执行一次

#### 应用场景

1. 滚动加载，加载更多
2. 高频表单，表单重复提交
3. 搜索联想



## 手写防抖节流

防抖

```javascript
//immediate设置为第一次是立马触发的，不用等2s后再触发
function debounce(fn, delay, immediate = false) {
    // 通过闭包保存timer
    let timer;
    return (...args) => {
        //获取函数参数
        const param = [...args];
        // 清除定时器，保证在触发时间内，定时器重置
        if (timer) clearTimeout(timer);
        //立马执行
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, delay);
            if (callNow) fn.apply(this, args);
        } else {
            timer = setTimeout(() => {
                // 执行并改变this,通过两个箭头函数使这里的this指向的debounce里的this
                fn.apply(this, param);
            }, delay);
        }
    }
}
```

节流

```javascript
// 第一种利用settimeout
function throttle(fn, delay) {
    let timer;
    return (...args) => {
        const params = [...args];
        //// 里面设置timer确保这这段时间内只能执行一次
        timer = setTimeout(() => {
            fn.apply(this, params);
            timer = null;
        }, delay);
    }
}

//第二种利用时间戳，只要时间间隔大于设定时间，就表明可以继续执行下一次任务
function throttle1(fn, delay) {
    let pre = 0;
    return (...args) => {
        const params = [...args];
        let now = new Date();
        // 时间间隔大于设定周期
        if (now - pre > delay) {
            fn.apply(this, params);
            pre = now;
        }
    }
}
```

