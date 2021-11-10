//闭包


// function hello() {
//     const name = 'world';
//     return function getHi() {
//         const fullHello = `hello ${name}`;
//         console.log(fullHello);
//     }
// }
// const hi = hello();
// console.log(hi());


//柯里化
// function sum(...args) {
//     const argsArray = [...args];

//     // 一直不断的加入参数
//     let res = function(...args2) {
//         argsArray.push(...args2);
//         return res;
//     }

//     res.toString = function() {
//         return argsArray.reduce((pre, cur) => pre + cur);
//     }
//     return res;
// }


function currying(fn, length) {
    length = length || fn.length;

    return function(...args) {
        console.log(args);
        console.log('fn length: ', length);
        console.log('args length: ', args.length);
        console.log(length - args.length);

        // 新函数接收的参数长度是否大于等于 fn 剩余参数需要接收的长度
        if (args.length >= length) {
            return fn.apply(this, args);
        } else {
            //length - args.length,为剩余参数的长度
            return currying(fn.bind(this, ...args), length - args.length)
        }
    }
}


function add(...args) {
    const argsArray = [...args];
    return argsArray.reduce((pre, cur) => pre + cur);
}
const sum = currying(add, 4);


console.log('sum(2,3,4,5)====>', sum(2, 3, 4, 5));
console.log('sum(2)(3)(4)(5))====>', sum(2)(3)(4)(5)); //9
console.log('sum(2,3)(4,5))====>', sum(2, 3)(4, 5)); //9
console.log('sum(2)(3,4,5))====>', sum(2)(3, 4, 5)); //9
console.log('sum(2,3,4)(5))====>', sum(2, 3, 4)(5)); //9