interface Myv {
  obverse: (data: any) => void
  compile: (ele: HTMLElement) => void
}

class myv implements Myv {
  private config
  private element
  private data
  private directives

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

      let _dir = this.directives[key];
        
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

  }
}