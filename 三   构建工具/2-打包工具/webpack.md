# webpack
webpack可以把互相依赖的html css javascript以及文件字体等资源文件经过一系列的处理打包成静态的前端项目

## 使用
+ 项目安装webpack依赖  
  放到开发依赖中,因为webpack只有在开发的时候才会用到  
  `yarn add webpack webpack-cli --dev`
+ 打包项目  
  `npx webpack`执行打包命令

## webpack配置

```javascript
const path = require('path');
//插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// 因为导入的是个对象,所以应该导入构造函数
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// webpack使用node.js的模块语法
module.exports = {
  // 入口文件
  entry: './src/index.js',
  
  // 决定如何将编译后的代码映射回原始源代码，方便开发者调试
  devtool: 'inline-source-map',

  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),// 输出目录
    // filename:'dist.js',
    filename: "[name].[contenthash].js",// 输出文件名
    // 避免浏览器进行缓存,使用户总能获取最新版本的文件
/**
 * [name]	使用入口名称 (默认为main)
 * [contenthash]	基于文件内容生成的哈希值
 */
    publicPath: '/'// 资源公共路径
  },

  // 决定了 Webpack 如何查找和解析模块
  resolve:{
    // 自动解析这些扩展名,导入时可省略扩展名 (查找顺序从前往后)
    extensions: ['.js', '.jsx', '.json'],
    // 创建模块导入别名
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }

  }

  // 控制代码优化
  optimization: {
    // 是否要压缩
    minimize: true,
    // 用什么来压缩
    minimizer: [
      new TerserPlugin()
    ]
  }
  
  // 模块处理规则
  module: {
    // 几乎所有和webpack有关的依赖都需要安装在开发者依赖里面
    rules: [
      {
        test: /\.js$/,
        // 去掉 node_modules 目录下的文件
        exclude: /node_modules/,
        use: {
          // 使用 babel-loader 处理 JS 文件
          // 作用: 将 现代 JavaScript（ES6+）代码 转换成 浏览器兼容的 ES5 代码
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env', // 转换 ES6+ 语法
              '@babel/preset-react', // 转换 JSX(如果是 React 项目)              
            ],
          }
        }// 使用对象形式可以给 loader 传递一些自定义的配置
      },
      {
        // 匹配所有的以.css结尾的文件
        test: /\.css$/,
        // 使用合适的loader处理css文件
        // loader加载从右向左 (从后往前) 加载的
        use: ['style-loader', 'css-loader']
      },
      {
        // 匹配图片
        test: /\.(png|jpe?g|gif|svg)$/i,
        // 因为webpack使用内置的loader处理图片
        // 使用使用 type 属性
        type: 'asset/resource'
      }
    ]
  },
  
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 设置网页的标题
      title: "博客列表",
      template: './src/index.html'
    }),
    new BundleAnalyzerPlugin() // 打包分析工具 (可视化)
  ],
  
  // 开发服务器
  // 提供实时重新加载、热模块替换等功能
  devServer: {
    contentBase: './dist', // 告诉服务器从哪个目录提供内容
    hot: true, // 启用热模块替换(HMR)
    open:true, // 自动打开浏览器
  },
  
  // 模式 (默认是production 生产模式)
  // development 开发模式 代码不压缩，便于调试
  mode: 'development' // 或 'production'
};
```