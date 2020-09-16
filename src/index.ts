const test = require('./test')

function text () {
  let hello = document.createElement('div')
  hello.innerHTML = '666'
  return hello
}

document.querySelector('#root').appendChild(text())
test.testFun()
