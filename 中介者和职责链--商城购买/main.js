var colorSelect = document.getElementById('colorSelect'),
  numberInput = document.getElementById('numberInput'),
  memorySelect = document.getElementById('memorySelect'),
  colorInfo = document.getElementById('colorInfo'),
  numberInfo = document.getElementById('numberInfo'),
  memoryInfo = document.getElementById('memoryInfo'),
  nextBtn = document.getElementById('nextBtn');
var goods = { // 手机库存
  "red|32G": 3,
  "red|16G": 0,
  "blue|32G": 1,
  "blue|16G": 6
};

Function.prototype.after = function (fn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }
    return ret;
  }
};

var colorCheck = function (obj,color,memory,number,stock,nextBtn) {
  if (obj === colorSelect) { // 如果改变的是选择颜色下拉框
    colorInfo.innerHTML = color;
  }
  if(!color) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择手机颜色';
  } else {
    return 'nextSuccessor'
  }
}

var memoryCheck = function (obj,color,memory,number,stock,nextBtn) {
  if (obj === memorySelect) {
    memoryInfo.innerHTML = memory;
  }
  if(!memory) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择内存大小';
  } else {
    return 'nextSuccessor'
  }
}

var numCheck = function (obj,color,memory,number,stock,nextBtn) {
  if (obj === numberInput) {
    numberInfo.innerHTML = number;
  }
  if(!Number.isInteger(number - 0) || number <= 0) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请输入正确的购买数量';
  } else if(number > stock){
    nextBtn.disabled = true;
    nextBtn.innerHTML = '库存不足';
  } else {
    nextBtn.disabled = false;
    nextBtn.innerHTML = '放入购物车';
  }
}

var checkBtn = colorCheck.after(memoryCheck).after(numCheck)

var mediator = (function () {
  var colorSelect = document.getElementById('colorSelect'),
    memorySelect = document.getElementById('memorySelect'),
    numberInput = document.getElementById('numberInput'),
    colorInfo = document.getElementById('colorInfo'),
    memoryInfo = document.getElementById('memoryInfo'),
    numberInfo = document.getElementById('numberInfo'),
    nextBtn = document.getElementById('nextBtn');
  return {
    changed: function (obj) {
      var color = colorSelect.value, // 颜色
        memory = memorySelect.value, // 内存
        number = numberInput.value, // 数量
        stock = goods[color + '|' + memory]; // 颜色和内存对应的手机库存数量
      checkBtn(color,memory,number,stock,nextBtn)
     
    }
  }
})();


// 事件函数：
colorSelect.onchange = function () {
  mediator.changed(this);
};
memorySelect.onchange = function () {
  mediator.changed(this);
};
numberInput.oninput = function () {
  mediator.changed(this);
};