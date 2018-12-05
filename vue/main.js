// 响应式，通过defineProperty，当设置新的value时，会触发更新视图的函数
class Dep{
	constructor(){
		Watch.target = this
	}
	update(){
		console.log('视图更新啦')
	}
}

class Watch{
	constructor(){
		this.subs = []
	}
	addSub(sub){
		this.subs.push(sub)
	}
	notify(){
		this.subs.forEach((sub)=>{
			sub.update()
		})
	}
}

function observer(obj){
	if(!obj || typeof obj !== 'Object') return
	
	Object.keys(obj).forEach((key)=>{
		const val = obj[key]
		if(typeof val === 'Object')
			return observer(val)
		defineReactive(obj,key,obj[key])
	})
}

function cb(newVal){
	console.log('更新视图了！')
}

function defineReactive(obj,key,val) {
	var watcher = new Watch()
	Object.defineProperty(obj,key,{
		enumerable:true,
		configurable:true,
		get: function(){
			watcher.addSub(Watch.target)
			return val
		},
		set: function(newVal){
			if(val === newVal) return
			watcher.notify()
		}
	})
}

class Vue{
	constructor(options){
		this._data = options.data
		observer(this._data)
		new Watch()
		console.log('render',this._data.test)
	}
}

let o = new Vue({
	data: {
			test: "I am test."
	}
});
o._data.test = "hello,test.";

Dep.target = null;

// VNode —— 一个js对象，对DOM节点的抽象

class VNOde {
	constructor(tag,data,children,text,elm){
		this.tag = tag//标签名
		this.data = data//节点的数据信息，如props,attrs等
		this.children = children//子节点，一个数组
		this.text = text//节点的文本
		this.elm = elm//当前虚拟节点对应的真实dom节点
	}
}

function createEmptyNode(){
	var node = new VNOde()
	node.text = ''
	return node
}

function createTextNode(val){
	return new vNode(undefined,undefined,undefined,String(val))
}

function cloneNode(node){
	return new VNOde(node.tag,node.data,node.children,node.text,node.elm)
}