interface Myv {
  obverse: (data: any) => void
  compile: (ele: HTMLElement) => void
}

interface WatcherUse {
  update: () => void
}

class myv implements Myv {
  config: any     // 暂时any
  element: HTMLElement
  data: { [key: string]: any }
  directives: { [key: string]: any }

  constructor (config) {
    this.config = config
    this.element = document.querySelector(this.config.el)
    this.data = this.config.data
    this.directives = {}
    this.obverse(this.data)
    this.compile(this.element)
  }
  obverse (data) {
    let val

    for (let key in data) {
      this.directives[key] = []

      val = data[key]

      if ( typeof val === 'object' ) {
        this.obverse(val)
      }

      let _dir = this.directives[key]
        
      Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
          return val
        },
        set: function (newVal) {
          if ( val !== newVal ) {
            val = newVal
            _dir.forEach(function (item) {
              item._update()
            })
          }
        }
      })
    }
  }
  compile (ele) {
    let nodes = ele.children
    for( let i = 0 ;  i < nodes.length ; i++ ){
    	let node = nodes[i]
    	if( node.children.length ){
    		this.compile(node)
    	}
    
        if( node.hasAttribute('v-text')){
            let attrValue = node.getAttribute('v-text')
            this.directives[attrValue].push(new Watcher('text', node, this, attrValue, 'innerHTML'))
        }
    
        if( node.hasAttribute('v-model') && ( node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')){
            let _this = this
            node.addEventListener('input',(function(){
            	let attrValue = node.getAttribute('v-model')
            	_this.directives[attrValue].push(new Watcher('input', node, _this, attrValue, 'value'));
                return function () {
                    _this.data[attrValue] = node.value;
            	}
            })())
        }
    }
  }
}

class Watcher implements WatcherUse {
  name: string
  el: HTMLElement
  vm: myv
  exp: string
  attr: string

  constructor (name, el, vm, exp, attr){
    this.name = name
    this.el = el
    this.vm = vm
    this.exp = exp
    this.attr = attr

    //更新操作
    this.update()
  }

  update(){
    this.el[this.attr] = this.vm.data[this.exp]
  }
}