const arrayLike = {
    0: 'oyc',
    1: 'oyq',
    length: 2
}
Array.prototype.push.call(arrayLike, 'oyt', 'oyb');
console.log(arrayLike)