// 方式一 —— 回调函数 如果 函数f2需要f1的结果后才能执行，但f1执行很耗时，那就将f2当做f1的回调函数

function f1(callback){
  setTimeout(() => {
    //f1的任务代码
    callback()
  }, 1000);
}

function f2(){
  console.log('异步编程')
}

f1(f2)

// 优点：简单，容易理解和部署，缺点：不利于代码的阅读和维护，代码之间高耦合，而且每个任务只能指定一个回调函数

// 方式二 —— 事件监听 

f1.on('done',f2)

function f1(){
  setTimeout(() => {
    f1.trigger('done')
  }, 1000);
}

// 当f1执行完后，立刻触发‘done’事件，从而开始执行f2

// 优点:比较容易理解,低耦合,可以绑定多个事件,每个事件又可以绑定多个回调函数 缺点:整个程序都要变成事件驱动型,运行流程不清晰

// 方式三 —— 发布/订阅

function f1(){
  setTimeout(() => {
    event.trigger('done')
  }, 1000);
}

event.listen('done',f2)

// 制作一个消息中心，当f1执行完后，向消息中心传递消息，消息中心会将消息分发给所有订阅该消息的订阅者，触发执行

// 方式四 —— Promise

function f1(){
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      resolve('111')
    }, 1000);
  })
  
}

f1().then(f2)

// 如果一个任务已经完成，再添加回调函数，这个函数会立刻执行