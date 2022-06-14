/*
 * @Description: 路由跳转设置浏览器title
 * @Version: 0.1
 * @Autor: Chenyt
 */

import setTitle from "@/utils/common"
function afterEachHandler(to, from) {
  let { title } = to.meta
  title || (title = to.name)
  if (title) {
    setTitle(title)
  }
}

export default afterEachHandler

