const hasOwn = Object.prototype.hasOwnProperty

function is(x,y) {
  if (x === y) {
    // 为了让+0和-0比较返回false
    return x !== 0 || y !== 0 || 1/x === 1/y
  } else {
    // 为了使NaN和NaN比较返回true
    return x !==x && y !== y
  }
}

function shallowCompare(x,y) {
  if (is(x, y)) {
    return true
  }
  // 因为is只是对基本类型的比较，对于Object 两个键值对完全相等但不是同一个的对象对比，返回的是false， 这个是误判，所以要判断类型是不是对象，如果不是，就直接返回false
  if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) {
    return false
  }

  if (x.length !== y.length) return false
  for (const key in x) {
    if (!hasOwn.call(y,key) || !is(x[key],y[key])) {
      return false
    }
  }

  return true
}