/*
 * @Description: 
 * @Version: 0.1
 * @Autor: yjm
 */
export default [
  {
    // 用户端批量上传图片
    url: "/ngabn/app/imgRpc/batchUpload",
    type: "post",
    response: config => {
      console.log("用户端批量上传图片", config)

      return {
        "code": 0,
        "data": {
          "absoluteUrl": "http://192.168.1.206/group1/M00/00/01/wKgBzl-JQASAEZbVAAANiZ_i6LU901.png,http://192.168.1.206/group1/M00/00/01/wKgBzl-JQASAO8O6AAANiZ_i6LU245.png"
        },
        "message": "成功",
        "timestamp": "1602830340",
        "type": "success"
      }
    }
  }
]