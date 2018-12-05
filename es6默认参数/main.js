// es6默认参数值，传参会覆盖掉该默认值

{
  function f(x,y=2,z=111){
    return x + y + z
  }
  console.log(f(1))
  console.log(f(1,5))
  console.log(f(1,3,200))
}

// 验证参数不能为空
{
  function checkParameter(){
    throw new Error('参数不能为空')
  }
  function f(x=checkParameter(),y=2,z=111){
    return x+y+z
  }
  try {
    f()
  } catch (e) {
    console.log(e)
  }
}


// 获取所有可变参数
{
  function f(...a) {
    var sum = 0
    a.forEach(item=>{
      sum += item * 1
    })
  }
  console.log(f(1,2,3,4))
}

// 利用扩展运算符合并数组
{
  var params = ['hello',true,1]

  var other = [1,2,...params]
  console.log(other)
}