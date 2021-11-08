//一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal

//递归
function mySetInterVal(fn, a, b) {
    let timer;

    function loop(fn, a, b) {
        timer = setTimeout(() => {
            console.log(a);
            fn();
            loop(fn, a + b, b);
        }, a)
    }
    loop(fn, a, b);
    return timer;
}

// function mySetInterVal(fn, a, b) {
//     let timer;
//     let count = -1;

//     function loop() {
//         timer = setTimeout(() => {
//             fn();
//             count++;
//             console.log(count, a + count * b);
//             loop();
//         }, a + count * b)
//     }
//     loop();
//     return timer;
// }


// 清除定时器
function myClear(timer) {
    clearInterval(timer);
}

function test() {
    console.log('count');
}

mySetInterVal(() => { console.log('count'); }, 1000, 2000)