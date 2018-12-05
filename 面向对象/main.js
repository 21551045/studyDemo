// 类的声明

function Animal() {
  this.name = 'animal'
}

class Animal2 {
  constructor(){
    this.name = 'animal'
  }
}

console.log(new Animal(), new Animal2())


// 继承

// 借助构造函数实现继承

function Parent1(){
  this.name = 'parent'
}

Parent1.prototype.sayHi = function(){
  console.log('hi')
}

function Child1() {
  Parent1.call(this)
  this.type = 'child'
}

console.log(new Child1)

// 原理：将父级构造函数的this指向子类的构造函数
// 缺点：Parent1原型链上的东西并没有被Child1所继承


// 借助原型链实现继承

function Parent2(){
  this.name = 'parent2'
  this.play = [1,2,3]
}

function Child2() {
  this.type = 'child2'
}

Child2.prototype = new Parent2()

console.log(new Child2 ())

var child1 = new Child2()
var child2 = new Child2()

console.log(child1.play,child2.play)

child1.play.push(4)

console.log(child1.play,child2.play)

console.log(Child2.prototype)

// 原理：原型链
// 缺点：所有子类的实例共用同一个原型链，导致相互影响

// 使用组合继承
function Parent3(){
  this.name = 'parent3'
  this.play = [1,2,3,4]
}

function Child3() {
  Parent3.apply(this)
  this.type = 'child3'
}

Child3.prototype = new Parent3()

var child3 = new Child3()
var child4 = new Child3()

child3.play.push(4)

console.log(child3.play,child4.play)

// 优点：解决了原型链共用一个问题
// 缺点： Parent3这个函数调用了两次；Child3本身的constructor不是自身的Child3，而是根据原型链找到的Parent3,无法判断出Chil3的子类是不是继承自Child3


// 组合继承的优化方案1
function Parent4(){
  this.name = 'parent4'
  this.play = [1,2,3,4]
}

function Child4() {
  Parent4.apply(this)
  this.type = 'child4'
}

Child4.prototype = Parent4.prototype

var child5 = new Child4()
var child6 = new Child4()

child5.play.push(4)

console.log(child5.play,child6.play)

console.log(child5.constructor === Parent4)

// 优点：Parent4只调用了一次
// 缺点：Child4的constructor不是自身，而是Parent4，这样无法判断出Chil4的子类是不是继承自Child4

// 组合继承的优化方案2

function Parent5(){
  this.name = 'parent5'
  this.play = [1,2,3,4]
}

function Child5() {
  Parent5.apply(this)
  this.type = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype)
Child5.prototype.constructor = Child5
Child5.prototype.constructor = Child5

var child7 = new Child5()
var child8 = new Child5()

child7.play.push(4)

console.log(child7.play,child8.play)

// 优点：解决了上述所有问题，将父类和子类的构造函数进行了隔离
