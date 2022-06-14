/*
 * @Description: 
 * @Version: 0.1
 * @Autor: wjn
 * @Date: 2020-06-11 14:28:59
 * @LastEditors: wjn
 * @LastEditTime: 2021-04-08 18:37:01
 */
import Mock from "mockjs"
import { param2Obj } from "../src/utils/common"

import dict from "./dict"
import card from "./card"
import check from "./check"
import common from "./common"
import qrCode from "./qr-code"
import user from "./user"
import city from "./city"
import upload from "./upload"
import map from "./map"
const mocks = [
  ...dict,
  ...card,
  ...check,
  ...common,
  ...qrCode,
  ...user,
  // ...city,
  ...upload,
  ...map
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || "get", XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || "get",
    response(req, res) {
      console.log("request invoke:" + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
