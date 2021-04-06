module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  css: {
    // ...
    requireModuleExtension: true
  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8081,
  },
  assetsDir: 'static',
  publicPath: './',
  // configureWebpack: {
  //   // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
  //   externals: {
  //    'jquery' : '$',
  //    'axios' : 'axios'
  //   }
  // }
};