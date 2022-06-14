/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 */
import Mock from "mockjs"
export default [
  {
    // 老龄卡申领接口
    url: "/eac/senior/ec_cert_save",
    type: "post",
    response: config => {
      console.log("老龄卡申领接口", config)
     
      return {
        "code": 0,
        "data": {
          "idNo": "340817199811091232",
          "actiAppChnlCodg": "53928a083adb4a7dad2eecf05564873f",
          "dataOr": "0",
          "hsecfc": "8bfbc0fcd30541f191b65c4e89004632",
          "ecCertExtendDTO": {
            "birthday": "生日",
            "emergencyContact": "紧急联系人",
            "sex": "男",
            "memo": "备注",
            "licenceDate": "发证日期",
            "psnNo": "340817199811091232",
            "blood": "O型",
            "licenceAuthority": "发证机关",
            "residentialAddress": "居住地址",
            "name": "o(*￣︶￣*)o",
            "permanentAddress": "户籍地址",
            "emergencyPhone": "紧急联系人，多个手机号"
          },
          "ecShowCardNo": "963408171232000000",
          "ecCertCaregiverInfoDTOList": [
            {
              "psnNo": "340817199811091232",
              "ecCertCaregiverName": "小青",
              "ecCertCaregiverPhone": "手机",
              "ecCertCaregiverCardNo": "340837199511091232",
              "ecCertCaregiverRelation": "儿子"
            },
            {
              "psnNo": "340817199811091232",
              "ecCertCaregiverName": "小红",
              "ecCertCaregiverPhone": "手机",
              "ecCertCaregiverCardNo": "340837199711091232",
              "ecCertCaregiverRelation": "女儿"
            }
          ],
          "ecCertAttachDTOS": [
            {
              "attachFilePath": "证件图片地址",
              "psnNo": "340817199811091232",
              "attachFileName": "军官证"
            },
            {
              "attachFilePath": "证件图片地址",
              "psnNo": "340817199811091232",
              "attachFileName": "居住证"
            }
          ],
          "nwaFlag": "1",
          "name": "o(*￣︶￣*)o",
          "psnCodg": "340817199811091232"
        },
        "message": "成功",
        "timestamp": "1616597529"
      }
    }
  },
  {
    // 老龄卡展码
    url: "/eac/gcode/get_gen_code",
    type: "post",
    response: config => {
      console.log("老龄卡展码", config)
      
      return {
        "appId": null,
        "orgId": null,
        "encType": "plain",
        "encData": null,
        "signType": "plain",
        "signData": null,
        "timestamp": "1602295990783",
        "type": null,
        "success": true,
        "code": 0,
        "message": null,
        "cause": null,
        "data": {
          "ecQrCode": Math.floor(Math.random() * 1000000000000000000000),
          "userName": null,
          "idNo": null,
          "codeType": "3",
          "insuOrg": null,
          "insuName": null,
          "expiration": null,
          "crtfStas": null,
          "bircfeFlag": null
        }
      }
    }
  },
  {
    // 电子老年证展证
    url: "/eac/senior/show_senior_cert",
    type: "post",
    response: config => {
      console.log("电子老年证展证", config)

      return {
        "code": 0,
        "data": {
          "ecCertExtendDTO": {
            "birthday": "生日",
            "emergencyContact": "紧急联系人",
            "sex": "男",
            "memo": "备注",
            "licenceDate": "发证日期",
            "rid": 12,
            "psnNo": "340817199811091232",
            "blood": "O型",
            "licenceAuthority": "发证机关",
            "residentialAddress": "居住地址",
            "name": "o(*￣︶￣*)o",
            "permanentAddress": "户籍地址",
            "emergencyPhone": "紧急联系人，多个手机号"
          },
          "ecShowCardNo": "963408171232000000",
          "ecCertAttachDTOS": [
            {
              "attachFilePath": "证件图片地址",
              "rid": 5,
              "psnNo": "340817199811091232",
              "attachFileName": "居住证"
            },
            {
              "attachFilePath": "证件图片地址",
              "rid": 6,
              "psnNo": "340817199811091232",
              "attachFileName": "军官证"
            }
          ]
        },
        "message": "成功",
        "timestamp": "1616665206"
      }
    }
  }
]