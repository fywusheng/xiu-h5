/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 */
export default [
  {
    // 老龄卡解码接口
    url: "/eac/gcode/decrypt_gen_code",
    type: "post",
    response: config => {
      console.log("老龄卡解码接口", config)

      return {
        "appId": null,
        "orgId": null,
        "encType": "plain",
        "encData": null,
        "signType": "plain",
        "signData": null,
        "timestamp": "1602308542543",
        "type": null,
        "success": true,
        "code": 0,
        "message": null,
        "cause": null,
        "data": {
          "userName": "xx",
          "idNo": null,
          "idType": "01",
          "ecToken": "0000001ek8gg3us001011fa8c00000117717f3",
          "insuOrg": null,
          "ecIndexNo": "50C17A5681FDA1D9397B19C9F3EAA00E",
          "chnlId": null,
          "ecQrCode": "78478248068384"
        }
      }
    }
  },
  {
    // 老龄卡二次解码
    url: "/eac/gcode/check_gen_code",
    type: "post",
    response: config => {
      console.log("老龄卡二次解码", config)

      return {
        "appId": null,
        "orgId": null,
        "encType": "plain",
        "encData": null,
        "signType": "plain",
        "signData": null,
        "timestamp": "1602312155965",
        "type": null,
        "success": true,
        "code": 0,
        "message": null,
        "cause": null,
        "data": {
          "data": {
            "org_id": "xx",
            "org_name": "xx",
            "psn_id": "4141",
            "psn_name": "王**",
            "psn_age": 30,
            "check_time": 1602312130889
          }
        }
      }
    }
  }
]