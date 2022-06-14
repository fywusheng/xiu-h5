/*
 * @Description: 接口请求统一配置
 * @Version: 0.1
 * @Author: Chenyt
 * @Date: 2021-04-19 17:00:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-11 15:26:10
 */

import axios from "axios"
// import { getToken } from "@/utils/cookie"
import { addHttpLoading, removeHttpLoading } from "@/utils/http-loading" // 加载loading控制工具方法

// 环境变量
const API_BASEURL = process.env.BASE_URL//api接口基础路径
const CLIENT_TIMEOUT = process.env.VUE_APP_TIMEOUT || 8000//链接时间
// const enableMock = process.env.VUE_APP_MOCK_SERVER === "true"//是否开启mock

const service = axios.create({
  baseURL: API_BASEURL,
  timeout: CLIENT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "tsf-metadata": ""
  }
})

// 请求
service.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers["accessToken"] = token
  }
  addHttpLoading(config.url) // http请求列队计数加一

  return config
}, error => {
  return Promise.reject(error)
})
//响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    removeHttpLoading() // http请求列队计数减一
    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0) {
      // if (res.message) {
      //   window.gvm.$toast(res.message)
      // }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //登录失效重新登录操作，
        //1、或者刷新token，获取新token，
        //2、或者清除本地登录信息，跳转到登录页
      }
      return Promise.reject(new Error(res.message || "Error"))
    } else {
      return res
    }
  },
  (error) => {
    removeHttpLoading() // http请求列队计数减一
    window.gvm.$toast(error || "Error")
    return Promise.reject(error)
  }
)

export function post(url, params, options) {
  return new Promise((resolve, reject) => {
    service.post(url, params, { ...options }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function get(url, params, options) {
  return new Promise((resolve, reject) => {
    service.get(url, params, { ...options }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default service
