var Person = {
  name:'111',
  age:12,
  sex:'male'
}

var person = new Proxy(Person,{
  get(target,key){
    return target[key]
  },
  set(target,key,value){
    if(key !== 'sex'){
      target[key] = value
    }
  }
})

console.log(person)
console.table(person)

try {
  person.name = '233'
  console.log(person)
  console.log(Person)
} catch (e) {
  console.log(e)
}