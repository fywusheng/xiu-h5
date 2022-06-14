/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 */

export default [
  {
    // 天气
    url: "/eac/weather/status",
    type: "post",
    response: config => {

      return {
        "appId": "53928a083adb4a7dad2eecf05564873f",
        "code": 0,
        "data": {
          "hum": "63",
          "pres": "999.8",
          "pcpn": "0.0",
          "tmp": "25",
          "cond_txt": "多云",
          "wind_sc": "3",
          "wind_dir": "北风",
          "h5": "https://apip.weatherdt.com/v2/h5.html?bg=1&md=02345&key=BQNILeF2BL&lc=CN101230201",
          "cond_code": "https://apip.weatherdt.com/20200701/icon/c/101d.png"
        },
        "encType": "plain",
        "signType": "plain",
        "timestamp": "1602842712"
      }
    }
  },
  {
    // 城市列表树形结构接口
    url: "/common/cusc/api/usersearch/getRegnAreaTree",
    type: "post",
    response: config => {

      return {
        "code": 0,
        "type": "success",
        "message": "成功",
        "data": [
          {
            "regnCode": "100000",
            "rid": "1",
            "regnName": "北京",
            "admdvsLv": "0",
            "prntRegnCode": "000000",
            "children": [
              {
                "regnCode": "100014",
                "rid": "15",
                "regnName": "北京市",
                "admdvsLv": "1",
                "prntRegnCode": "100000",
                "children": [
                  {
                    "regnCode": "100005",
                    "rid": "6",
                    "regnName": "丰台区",
                    "admdvsLv": "2",
                    "prntRegnCode": "100014",
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
]