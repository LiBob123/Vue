// 获取到最外层节点后， 调用compileElement函数， 对所有子节点进行判断， 如果节点是文本节点且匹配 {
//   {}
// }
// 这种形式指令的节点就开始进行编译处理， 编译处理首先需要初始化视图数据， 对应上面所说的步骤1， 接下去需要生成一个并绑定更新函数的订阅器， 对应上面所说的步骤2。 这样就完成指令的解析、 初始化、 编译三个过程， 一个解析器Compile也就可以正常的工作了。 为了将解析器Compile与监听器Observer和订阅者Watcher关联起来， 我们需要再修改一下类SelfVue函数：
function SelfVue(options) {
  var self = this;
  this.vm = this;
  this.data = options.data;;
  Object.keys(this.data).forEach(function (key) {
    self.proxyKeys(key);
  });

  observe(this.data);
  new Compile(options.el, this.vm);
  return this;
}
SelfVue.prototype = {
  proxyKeys: function (key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function proxyGetter() {
        return self.data[key];
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal;
      }
    });
  }
}