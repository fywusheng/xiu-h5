/*
 * @Description: 放置基础接口
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-04-15 15:57:54
 */

import request from "../axios"
// const basePath="/usc/api/userAccount"//本业务模块下的接口基础路径提取
/**
 * 获取字典表数据，本地环境走的是mock，开发时记得修改文件.env.proxy中的变量VUE_APP_MOCK_SERVER=false，走后端真实接口数据
 *
 * @param {*} params
 * @param {*} options
 * @returns
 */
export const getCodeListApi = function(params = {}, options = {}) {
  return request.post("/getCodeApi", {
    data: params
  }, options)
}
