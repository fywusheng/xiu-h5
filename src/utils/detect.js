/*
 * @Description: 判断设备信息
 * @Version: 0.1
 * @Autor: Chenyt
 */

'use strict'

const detect = {}
const hsaAppTag = 'HSABrowser'

const isBrowser = typeof navigator !== 'undefined'

if (isBrowser) {
  let ua = navigator.userAgent
  
  detect.ua = ua

  detect.isAndroid = ua.indexOf('Android') > -1

  detect.isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  detect.isUserApp = ua.indexOf(hsaAppTag) > -1

  detect.isApp = detect.isUserApp

  detect.isIPhone = ua.indexOf('iPhone') > -1

  detect.isIPhonex = detect.isIPhone && (window.screen.width * window.screen.height === 304500 || window.screen.width * window.screen.height === 370944)

  detect.appVersion = ua.substr(ua.indexOf(hsaAppTag) + hsaAppTag.length + 1, 5).replace(/\./g, '')
}

export default detect
