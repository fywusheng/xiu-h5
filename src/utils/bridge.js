/*
 * @Description: jsbridge
 * @Version: 0.1
 * @Autor: shn
 * @Date: 2021-08-31 19:51:45
 * @LastEditors: shn
 * @LastEditTime: 2021-09-01 20:00:41
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = factory())
    : typeof define === 'function' && define.amd ? define(factory) : (global.JSBridge = factory())
})(this, function () {
  'use strict'
  var JSBridge = {
    init() {
      this.ready(function () { })
    },
    ready(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
      } else {
        //register
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function () {
            callback(WebViewJavascriptBridge)
          },
          false
        )
        //register ios
        if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        // 支付宝小程序限制域名，不加载__bridge_loaded__
        if (navigator.userAgent.indexOf('AliApp') === -1 && !navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
          var WVJBIframe = document.createElement('iframe')
          WVJBIframe.style.display = 'none'
          WVJBIframe.src = 'https://__bridge_loaded__'
          document.documentElement.appendChild(WVJBIframe)
          setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
          }, 0)
        }
        
      }
    },
    callHandler(handName = null, param = null, callback = null) {
      window.WebViewJavascriptBridge &&
        window.WebViewJavascriptBridge.callHandler(handName, param, callback)
    },

    registerHandler(handName = null, callback = null) {
      window.WebViewJavascriptBridge &&
        window.WebViewJavascriptBridge.registerHandler(
          handName,
          (data,
            responseCallback => {
              callback(data, responseCallback)
            })
        )
    },
    goPath(fuc, params, callback) {
      // alert(123)
      this.callHandler(fuc, params, response => {
        console.log("params", params);
        callback && callback(response)
      })
      // this.registerHandler(fuc, response => {
      //   callback && callback(response)
      // })
    },
    appSource(params) {
      // alert("ios");
      const u = navigator.userAgent
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        window.webkit.messageHandlers.payOrder.postMessage(params)
      }
    }
  }
  JSBridge.init()
  return JSBridge
})

