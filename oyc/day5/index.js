function go(str, i = 0) {
    const firstPart = 'go';
    let insidePart = '';
    if (str) {
        insidePart = 'o'.repeat(i);
        return `${firstPart}${insidePart}${str}`;
    } else {
        // 返回匿名函数递归执行
        return function(str) {
            return go(str, i + 1)
        };
    }
}


const logGo = go()()()()()()()('l');
console.log(logGo);

// go("l"); //gol
// go()("l"); //gool
// go()()()("l"); //返回gooool