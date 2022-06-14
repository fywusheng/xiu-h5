/*
 * @Description: 尊老头条(发现)
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-29 17:32:31
 */
import { post } from "../axios"

// 栏目分类接口(推荐不返回)
export const queryColList = function(params) {
  return post("/cms/iep/web/cms/cmscol/queryColList", { data: params })
}
// 搜索
export const selectArtiListByKey = function(params) {
  return post("/cms/iep/web/cms/cmscont/selectArtiListByKey", { data: params })
}
// 根据栏目Id获取文章列表
export const selectArtiListByColId = function(params) {
  return post("/cms/iep/web/cms/cmscont/selectArtiListByColId", { data: params })
}
// 获取置顶
export const getTopList = function(params) {
  return post("/cms/iep/web/cms/cmscont/getTopList", { data: params })
}
// 热词接口
export const getCmsHotList = function() {
  return post("/cms/iep/web/cms/cmscont/getCmsHotList")
}
// 传关键字回联想词
export const findLenWord = function(params) {
  return post("/cms/iep/web/cms/cmscont/findLenWord", { data: params })
}
// 获取视频列表
export const getVideoList = function(params) {
  return post("/cms/iep/web/cms/cmscont/getVideoList", { data: params })
}
// 根据文章id获取详情
export const getContById = function(params) {
  return post("/cms/iep/web/cms/cmscont/getContById", { data: params })
}
// 刷新文章
export const getCmsReflushList = function(params) {
  return post("/cms/iep/web/cms/cmscont/getCmsReflushList", { data: params })
}
// 随机换视频
export const getRandomVideo = function(params){
  return post("/cms/iep/web/cms/cmscont/getRandomVideo", { data: params })
}
//分类中心
export const getCategoryList = function(params){
  return post("/cms/iep/web/cms/cmscont/getCategoryList", { data: params })
}
