// new 一个对象的过程

var o2 = function(func) {
  var o = Object.create(func.prototype)
  var k = func.call(o)
  if(typeof k === 'function') {
    return k
  }
  return o
}

var M = function(){}

var m = o2(M)

console.log(m instanceof(M))
