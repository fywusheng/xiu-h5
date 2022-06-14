const path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const vConsolePlugin = require("vconsole-webpack-plugin")
const isConsole = process.env.VUE_APP_VCONSOLE === "true"
const isProd = process.env.NODE_ENV === "production"

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: "./", //配置根路径
  // assetsRoot: path.resolve(__dirname, "../dist"),
  outputDir: "dist", //构建输出目录
  assetsDir: "assets", //静态资源目录(js\css\img)
  lintOnSave: false, //是否开启eslint
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    open: true, //是否自动在浏览器打开
    host: "0.0.0.0", //真机测试 0.0.0.0
    port: 9081, //配置端口号
    https: false, //是否配置https
    hot: true,
    hotOnly: true, //是否热更新
    disableHostCheck: true,
    proxy: { //配置跨域
      // http://192.168.1.206:10000/api
      // http://120.42.37.88:10088/nepsp-api
      // https://ggll.e-drink.cn/nepsp-api
      // http://api.gjllfw.cn
      // 开发--192.168.1.206:10000
      //演示--120.42.37.88:10088
      // 测试：https://test.api.hpgjzlinfo.com
      // 开发：https://dev.api.hpgjzlinfo.com
      // 演示：https://api.hpgjzlinfo.com
      "/api": {//设置代理路径
        target: "https://test.api.hpgjzlinfo.com:4443", //设置代理地址  "http://120.42.37.88:10088/nepsp-api" 开发  // "http://192.168.1.206:10000/api" 开发
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "https://test.api.hpgjzlinfo.com:4443//api"  
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //如果需要css热更新就设置为false,打包时候要改为true
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          //"text-color": "#111",
          //"border-color": "#eee"
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.join(
            __dirname,
            "./src/styles/theme/resetui.less"//这个import 的路径必须是绝对路径
          )}";`
          //hack: `true; @import "@/common/resetui.less";`
        }
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },
  configureWebpack: (config) => {
    if (isProd) {
      // 生产环境
      config.plugins.push(
        new CompressionWebpackPlugin({
          // 正在匹配需要压缩的文件后缀
          test: /\.(js|css|svg|woff|ttf|json|html)$/,
          // 大于10kb的会压缩
          threshold: 10240,
          deleteOriginalAssets: false
          // 其余配置查看compression-webpack-plugin
        })
      )
    }
  },
  chainWebpack: config => {
    // less 引入全局变量
    const oneOfsMap = config.module.rule("less").oneOfs.store
    oneOfsMap.forEach(item => {
      item.use("style-resources-loader")
        .loader("style-resources-loader")
        .options({
          // 需要插入的文件路径
          patterns: "./src/styles/theme/theme-params.less"
          // 需要插入的文件路径数组
          // patterns: ["./src/styles/theme-params.less"]
        })
        .end()
    })
    // 别名配置
    config.resolve.alias
      .set("@", resolve("src"))
      .set("~", resolve("config"))
      .set("src", resolve("src"))
    config.resolve.extensions
      .clear()
      .merge([".js", ".vue", ".json"])

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
    // 图片限制 转为64base
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, {
        limit: 20240
      }))
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin("define").tap(args => {
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    config.optimization.splitChunks({
      chunks: "all", // 控制webpack选择哪些代码块用于分割（其他类型代码块按默认方式打包）。有3个可选的值：initial、async和all。
      minSize: 30000, // 形成一个新代码块最小的体积
      maxSize: 0,
      minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数（默认配置的策略是不需要多次引用也可以被分割）
      maxAsyncRequests: 5, // 按需加载的代码块，最大数量应该小于或者等于5
      maxInitialRequests: 3, // 初始加载的代码块，最大数量应该小于或等于3
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: { // 将所有来自node_modules的模块分配到一个叫vendors的缓存组
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 缓存组的优先级(priotity)是负数，因此所有自定义缓存组都可以有比它更高优先级
        },
        default: {
          minChunks: 2, // 所有重复引用至少两次的代码，会被分配到default的缓存组。
          priority: -20, // 一个模块可以被分配到多个缓存组，优化策略会将模块分配至跟高优先级别（priority）的缓存组
          reuseExistingChunk: true // 允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。
        }
      }
    })
    /*
      preload 和 Prefetch 链接将会消耗带宽。如果你的应用很大且有很多 async chunk，
      而用户主要使用的是对带宽较敏感的移动端，
      那么你可能需要关掉 prefetch 链接并手动选择要提前获取的代码区块。
      官方文件很坑爹的官网文档是错的要自己打印出来
      console.log(config)
      他改名字了
    */
    config.plugins.delete("prefetch-index")
    config.plugins.delete("preload-index")

    if (isConsole) {
      config
        .plugin("vConsolePlugin")
        .use(vConsolePlugin, [{
          enable: true
        }])
        .end()
    }
  },
  // 第三方插件配置
  pluginOptions: {}
}
