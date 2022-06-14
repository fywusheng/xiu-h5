/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 */
export default [
  {
    // 老龄卡检测接口(卡是否存在)
    url: "/eac/ec/ec_cert_check",
    type: "post",
    response: config => {
      console.log("老龄卡检测接口(卡是否存在)", config)

      return {
        "appId": "53928a083adb4a7dad2eecf05564873f",
        "code": 0,
        "data": true,
        "encType": "plain",
        "signType": "plain",
        "timestamp": "1602324517"
      }
    }
  }
]