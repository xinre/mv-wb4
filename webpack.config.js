const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCssWebpack = require('purifycss-webpack')
const glob = require('glob')

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js' 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
      }
    }),
    // new CleanWebpackPlugin(['dist']), // 在打包之前，可以删除dist文件夹下的所有内容
    new CleanWebpackPlugin(), //clean-webpack-plugin3.x版本之后，不需要指定目录删除
    new ExtractTextPlugin('css/index.css'),
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, 'src/*.html')) // 同步扫描所有html文件中所引用的css
    })
  ],
  devServer: {
    hot:true,
    contentBase: './dist',
    port: '8088',
    inline: true,
    historyApiFallback: true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        include:path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname,"node_modules"),
        loader: "babel-loader"
      },
      {
        test: /\.ts$/,
        include:path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname,"node_modules"),
        use: "ts-loader"
      },
      {
        test:/\.(sc|le|c)ss$/,
        use:[{
              loader:'style-loader'
          },{
              loader:'css-loader',
              options:{
                importLoaders:1,
                modules: true
              }
          },{
              loader:"less-loader"
          },{
              loader:"sass-loader"
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,  //使用file-loader对资源文件的引入,i不区分大小写
        include: path.resolve(__dirname, 'src'),
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 20000,   //限制图片的最大字节
                    name: 'assets/[name]-[hash:5].[ext]',  //设置资源图片打包后的地址
                }
            },
            {
                loader: 'image-webpack-loader',  //对图片资源进行压缩处理
            }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  }
}