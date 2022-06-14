/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 */

export default [
  {
    // 用户信息
    url: "/nun/api/token/getUserAccount",
    type: "post",
    response: config => {

      return {
        "code": 0,
        "type": "success",
        "message": "成功",
        "data": {
          "uactId": "62",
          "sourceId": "22",
          "uact": "18016755583", // 用户账号
          "idCard": "350524199401224531", // 身份证号
          "email": null, //电子邮箱
          "uactStas": "1", //账号状态
          "regChnl": "app", //账号渠道
          "userNknm": null, //用户昵称
          "userIcon": null, //用户头像
          "crtfStas": null, //认证状态 0:未认证 1:实名、实人认证 2：实名认证（身份证正反面）
          "psnId": "22", //用户个人信息ID
          "psnName": "王嘉南", //用户真实姓名
          "tel": "18820147215", //手机号
          "certType": "01", //认证类型 01:身份证 02:户口本
          "cerTno": "350524199401224531", //身份证号
          "gend": null, //性别 1:男 2:女 3:未知
          "naty": null, // 名族具体查看名族枚举
          "hsregAddr": null, // 住址
          "brdy": null, //出生
          "uactAttribution": "130123", //地区编号
          "uactAttributionName": "河北省/石家庄市/正定县",
          "emergencyPhone": "18820147215", //紧急电话,
          "eleCradStas": "0", //0:未领卡 1:已领卡
          "eleCradPwdFlag": "0" //0:未设置密码 1:已设置密码
        }
      }
    }
  },
  {
    // 获取各个分类的未读信息列表
    url: "/ngabn/msg/msgtype/list",
    type: "post",
    response: config => {
      console.log("获取各个分类的未读信息列表", config)

      return {
        "code": 0,
        "type": "success",
        "message": "成功",
        "data": {
          "isSignRed": true,
          "allNReadCnt": 8,
          "systemNotice": {
            "msgType": 3,
            "msgTypeName": "通知公告",
            "readStas": 1,
            "latestMsgCont": "公告内容11111",
            "latestMsgTime": 1602510944000,
            "detailUrl": "native://HSAMessageNotice/electronicDocument?msgType=3&msgTypeName=%e9%80%9a%e7%9f%a5%e5%85%ac%e5%91%8a",
            "iconImageURL": "https://fuwu.nhsa.gov.cn/bucket-iep-usc//resource/message/announcement.png",
            "nreadCnt": 0
          },
          "systemMessage": {
            "msgType": 2,
            "msgTypeName": "系统提醒",
            "readStas": 0,
            "latestMsgCont": "您已绑定手机号,新的手机号是1312345678",
            "latestMsgTime": 1602658904000,
            "detailUrl": "native://HSAMessageNotice/electronicDocument?msgType=2&msgTypeName=%e4%b8%9a%e5%8a%a1%e9%80%9a%e7%9f%a5",
            "iconImageURL": "https://fuwu.nhsa.gov.cn/bucket-iep-usc//resource/message/BusinessNotice.png",
            "nreadCnt": 2
          },
          "serviceMessage": {
            "msgType": 1,
            "msgTypeName": "服务消息",
            "readStas": 0,
            "latestMsgCont": "adsgf",
            "latestMsgTime": 1602672924000,
            "detailUrl": "native://HSAMessageNotice/electronicDocument?msgType=1&msgTypeName=%e5%8c%bb%e4%bf%9d%e7%94%b5%e5%ad%90%e5%87%ad%e8%af%81",
            "iconImageURL": "https://fuwu.nhsa.gov.cn/bucket-iep-usc//resource/message/Medicare.png",
            "nreadCnt": 6
          }
        }
      }
    }
  },
  {
    // 用户新增意见
    url: "/ngabn/app/prb/add",
    type: "post",
    response: config => {
      console.log("用户新增意见", config)

      return {
        "code": 0,
        "data": true,
        "message": "成功",
        "timestamp": "1602576468",
        "type": "success"
      }
    }
  }
]