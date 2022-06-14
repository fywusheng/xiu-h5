/*
 * @Description: 主入口文件
 * @Version: 0.1
 * @Autor: Chenyt
 */

import Vue from "vue"
import App from "@/App.vue"
import Router from "vue-router"
import router from "@/router"
//vuex存储
import store from "@/store"
import { setCodeList } from "@/store/modules/dictionary"
const localDict = require("@/assets/data.json")

setCodeList({ data: localDict })

// 引入jsbridge
import jsbridge from "@/utils/bridge.js"
Vue.prototype.$jsbridge = jsbridge

//全局函数
import Mixin from "./mixins"
Vue.mixin(Mixin)
//全局过滤函数
import * as filters from "./filters"
Object.keys(filters).map(item => {
  Vue.filter(item, filters[item])
})
//js中的单位转换成vw、vx
import pxToViewport from "@/utils/px-to-viewport"
Vue.prototype.$pxToViewport = pxToViewport

// 自动注册全局的组件
import "@/components/index"

// 全局样式
import "./styles/normalize.less"
import "./styles/iconfonts/iconfont.css"
import "./styles/common.less"
import "./styles/theme/reset-vant.less"

//引入常用的vant组件
import "@/use"

//引入路由处理方法
import { beforeEachHandler, beforeEachToExample } from "@/router/before-each"
//设置路由标题
import afterEachHandler from "@/router/after-each"
//替换演示页使用
router.beforeEach(beforeEachToExample)
// 登录用户信息校验
router.beforeEach(beforeEachHandler)
//标题设置
router.afterEach(afterEachHandler)

//全局提示
import { Toast } from "@ylz/vant"
Vue.use(Toast)
//sessionstorage引入
import SessionUtil from "@/utils/session-storage"

import "@/icons/index.js"

// 挂载工具
Vue.prototype.$sessionUtil = SessionUtil
//全局toast提示
Vue.prototype.$toast = Toast

// 修改路由跳转报错的bug-start
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// 修改路由跳转报错的bug--end

// EventBus总线
var EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus
    }
  }
})
//是否启动mock
if (process.env.VUE_APP_MOCK_SERVER === "true") {
  const { mockXHR } = require("../mock")
  mockXHR()
}
Vue.config.devtools = true
Vue.config.productionTip = false

// 设置页面修改内容，局部热更新
if (module && module.hot) {
  module.hot.accept()
}

window.gvm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

