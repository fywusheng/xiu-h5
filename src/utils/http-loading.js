/*
 * @Description: 全局加载
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: yjm
 */
import { Toast } from "@ylz/vant"

const hiddenLoadingUrls = [] // 不显示加载接口列表，loading白名单
let count = 0 // 监听计数中间变量

/**
 * 
 * @param {Number} count http请求列队个数
 */
function showLoading(count) {
  let toast
  // 当http请求列队个数为0时关闭loading
  if (count === 0) {
    
    Toast.clear();
    toast = null

  } else if (!toast) {

    // 开启loading
    toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁止背景点击
      message: '加载中...', // 加载提示文本
    });

  }
}

/**
 * http请求列队计数加一
 * @param {String} url http请求地址
 */
export function addHttpLoading(url) {
  // 过滤白名单
  if (!hiddenLoadingUrls.includes(url)) {
    count++
    showLoading(count)
  }
}

// http请求列队计数减一
export function removeHttpLoading() {
  count--
  showLoading(count)
}


export default {
  addHttpLoading,
  removeHttpLoading
}

