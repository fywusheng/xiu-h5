/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-04-15 15:57:54
 */
/*
 * @Description: 路由主入口
 * @Version: 0.1
 * @Autor: Chenyt
 */

import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)
//自动引入模块路由，路由为模块下index.js文件
export let routes = []
const routerContext = require.context("./", true, /index\.js$/)
routerContext.keys().forEach(route => {
  if (route.startsWith("./index")) {
    return
  }
  const routerModule = routerContext(route)
  routes = [...routes, ...(routerModule.default || routerModule)]
})
var router = new Router({
  linkActiveClass: "active",
  // base: process.env.NODE_ENV === "production" ? "/ggfwstatic/chinahrss-unwork/" : "/",
  routes,
  //记住滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepAlive) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
  // mode:"history"
})

export default router