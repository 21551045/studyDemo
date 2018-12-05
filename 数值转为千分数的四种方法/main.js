// 正则表达式法

function format1(num){
  var reg = /\d{1,3}(?=(\d{3})+$)/g

  return (num + '').replace(reg,'$&,')
}

format1(12232443434)

// \d{1,3}(?=(\d{3})+$) 表示前面有1-3个数字，后面的至少由一组3个数字结尾

// ?=表示正向引用，可以作为匹配的条件，但匹配到的内容不获取，并且作为下一次查询的开始 $&表示与正则表达式匹配的内容

// 循环法

function format2(num) {
  num = num + ''
  var str = ""
  for(let count = 1,j = num.length - 1; j>= 0;count ++,j--) {
    if(count % 3 === 0 && j != 0) {
      str += num[j] + ','
      continue
    }
    str += num[j]
  }
  return str.split('').reverse().join('')
}

format2(12323434)

// splice和while

function format3(num) {
  num = num + ''
  let arr = []
  let count = num.length
  while(count >= 3) {
    arr.unshift(num.slice(count - 3,count))
    count -= 3
  }

  str.length && str.length % 3 && arr.unshift(num.slice(0, count % 3))

  return str.toString()
}

format3(12334344)

// reduce

function format4(num) {
  num = num + ''
  
  return num.split('').reverse().reduce((total,val,index)=>{
    return (((index % 3) ? val : (val + ',')) + total)
  })
}

format4(32321213)