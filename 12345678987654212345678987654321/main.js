var sum = '123456789876543212345678987654321'

function getNum(sum,n) {
  return sum.charAt(((n - 1) % 16))
}

console.log(getNum(sum,1))
console.log(getNum(sum,16))