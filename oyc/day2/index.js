/*
给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。
*/

/**
 * @param {number} x
 * @return {boolean}
 */

// 第一种字符串反转
// var isPalindrome = function(x) {
//     // 特殊数值先处理
//     if (x === 0) return true;
//     if (x < 0 || x % 10 === 0) return false;

//     const originalSplitArray = x.toString().split("");

//     const splitArray = x.toString().split("");

//     console.log('splitArray', splitArray);

//     const reverseString = splitArray.reverse().join("");

//     const splitString = originalSplitArray.join("");

//     console.log('splitString', splitString);
//     console.log('reverseString', reverseString);

//     if (splitString === reverseString) {
//         return true;
//     } else {
//         return false;
//     }
// };

// 反推算值
var isPalindrome = function(x) {
    if (x < 0 || x % 10 == 0) return false;
    let reverseNum = 0;
    let num = x;
    let lastNum;

    while (num > 0) {
        lastNum = num % 10;
        reverseNum = reverseNum * 10 + lastNum;
        num = Math.floor(num / 10);
    }

    console.log(reverseNum);
    if (reverseNum == x) {
        return true;
    } else {
        return false;
    }
}

const val = isPalindrome(14141);
console.log(val);