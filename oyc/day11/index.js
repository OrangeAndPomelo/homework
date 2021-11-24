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