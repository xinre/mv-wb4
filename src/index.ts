const test = require('./test')

function text (): HTMLElement {
  let hello:HTMLDivElement = document.createElement('div')
  hello.innerHTML = '666'
  return hello
}

document.querySelector('#root').appendChild(text())
test.testFun()
