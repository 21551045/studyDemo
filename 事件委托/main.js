var ul = document.getElementById('ul-list')
ul.addEventListener('click',function(e){console.log(e.currentTarget)},true)
ul.addEventListener('click',function(e){console.log('我是冒泡')},false)