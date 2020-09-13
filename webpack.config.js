const path = require('path')
module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js' 
  },
  devServer: {
    hot:true,
    contentBase: './dist',
    port: '8088',
    inline: true,
    historyApiFallback: true
  }
}