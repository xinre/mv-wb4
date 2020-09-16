class myv {
  constructor (config) {
    this.config = config
    this.element = document.querySelector(this.options.el)
    this.data = this.options.data
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
    }
  }
}