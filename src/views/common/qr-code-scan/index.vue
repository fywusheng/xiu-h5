<!--
 * @Description: 二维码扫码
 * @Version: 0.1
 * @Autor: yjm
-->
<template>
  <div class="qr-scanner">
    <canvas id="canvas" hidden></canvas>
    <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
    <div class="tip">将方框对准二维码，完成扫描</div>
    <div class="scanner-container">
      <div class="scanner-line"></div>
    </div>
    <footer>
      <router-link class="link" to="/qr-code">二维码</router-link>
      <van-uploader v-model="fileList" :after-read="afterRead">
        <van-button class="link">相册</van-button>
      </van-uploader>
    </footer>
  </div>
</template>
<script>
import jsQR from "jsqr"
import isUrl from "is-url"
import { claimApi, commonApi } from "@/api"
export default {
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    const _this = this
    this.$Loading.show()
    const video = document.createElement("video")
    const canvasElement = document.getElementById("canvas")
    const canvas = canvasElement.getContext("2d")

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        video.srcObject = stream
        video.setAttribute("playsinline", true) // required to tell iOS safari we don't want fullscreen
        video.play()
        this.$Loading.hide()

        setInterval(() => {
          tick()
        }, 200)
      })

    function drawLine(begin, end, color) {
      canvas.beginPath()
      canvas.moveTo(begin.x, begin.y)
      canvas.lineTo(end.x, end.y)
      canvas.lineWidth = 4
      canvas.strokeStyle = color
      canvas.stroke()
    }

    function tick() {

      if (video.readyState === video.HAVE_ENOUGH_DATA) {

        canvasElement.hidden = false

        canvasElement.height = video.videoHeight
        canvasElement.width = video.videoWidth
        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )

        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        })
        if (code) {

          drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            "#FF3B58"
          )
          drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            "#FF3B58"
          )
          drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            "#FF3B58"
          )
          drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            "#FF3B58"
          )

          _this.url(code.data)
        }
      }

    }
  },

  methods: {
    // 读取图片后识别二维码
    afterRead(file) {
      const img = document.createElement("img")
      img.src = file.content
      img.onload = () => {
        const canvasElement = document.createElement("canvas")
        const canvas = canvasElement.getContext("2d")
        const ratio = file.file.size / 1024 / 1024 > 2 ? 0.3 : 1

        canvasElement.height = img.width * ratio
        canvasElement.width = img.height * ratio
        canvas.drawImage(img, 0, 0, canvasElement.width, canvasElement.height)

        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        const code = jsQR(
          imageData.data,
          canvasElement.width,
          canvasElement.height,
          {
            inversionAttempts: "dontInvert"
          }
        )
        if (code) {
          this.url(code.data)
        } else {
          this.$toast.fail("读取图片二维码失败，请重新选择二维码图片")
        }
      }
    },
    // 如果是地址则跳转到该地址
    /* eslint-disable */
    async url(url) {
      if (isUrl(url)) {
        location.href = url
      } else {
        const appId = "53928a083adb4a7dad2eecf05564873f"
        // 调用解码
        const { psnName, idCard, uactId } = this.$store.state["user-info"].user
        if (psnName) {
          const state = await claimApi.ec_cert_state({
            "appId": appId,
            "idNo": idCard,
            "idType": "身份证",
            "userName": psnName
          })
          switch (state.data.authState) {
            case "1": // 已激活已授权 ,
              const authCode = state.data.authCode
              const code = await claimApi.decrypt_gen_code({
                "ecQrCode": url,
                "appId": appId,
                "authCode": authCode,
                "orgId": "91350200MA3470MR5D"
              })
              this.checkGenCode(url, appId, authCode, code.data.ecToken)
              break
            case "2": //已激活 未授权，掉用授权（获取授权码）接口
              const getAutuCode = await commonApi.selcetAutuCode({
                "uactId": uactId,
                "psnName": psnName,
                "certNo": idCard,
                "appId": appId
              })
              const code2 = await claimApi.decrypt_gen_code({
                "ecQrCode": url,
                "appId": appId,
                "authCode": getAutuCode.data.authCode,
                "orgId": "91350200MA3470MR5D"
              })
              this.checkGenCode(url, appId, getAutuCode.data.authCode, code2.data.ecToken)
              break
            case "3": //未激活未授权
              this.$toast("请先申领电子证")
              setTimeout(() => {
                this.$router.push({
                  path: "/claim"
                })
              }, 2000)
              break

            default: // 在申请中
              this.$toast("电子证正在申领中，请审核通过后使用该功能")
              setTimeout(() => {
                this.$router.go(-1)
              }, 2000)
              break
          }
        } else {
          this.$toast("请先申领电子证")
          setTimeout(() => {
            this.$router.push({
              path: "/claim"
            })
          }, 2000)
        }
      }
    },
    /* eslint-disable */
    // 获取用户信息
    async checkGenCode(ecQrCode, appId, authCode, ecToken) {
      const result = await claimApi.check_gen_code({
        ecQrCode, appId, authCode, ecToken
      })
      this.$toast(JSON.stringify(result.data))
    }
  }
}
</script>
<style lang="less" scoped>
.qr-scanner {
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  /deep/ .van-uploader__preview {
    display: none;
  }
}
.scanner-container {
  background: url("~@/assets/svg/home/icon-scanner.svg") no-repeat;
  background-size: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 234px * @ratio;
  height: 234px * @ratio;
}

@height: 243px * @ratio;
@keyframes scan {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
.scanner-line {
  animation: 2s linear 0s infinite alternate scan;
  position: absolute;
  width: 216px * @ratio;
  height: 1px * @ratio;
  left: 50%;
  transform: translateX(-50%);
  border: 2px * @ratio solid;
  z-index: 1;
  border-image: radial-gradient(
      circle,
      rgba(243, 133, 53, 1),
      rgba(255, 212, 98, 0.44)
    )
    2 2;
}
.tip {
  color: #fff;
  position: absolute;
  top: 150px * @ratio;
  width: 100%;
  text-align: center;
}
footer {
  position: fixed;
  bottom: 32px * @ratio;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 @space_md_16;
}
.link {
  padding: 6px * @ratio 15px * @ratio;
  background: #1e1e1e;
  border-radius: 8px;
  color: #fff;
  border: none;
  font-size: 18px * @ratio;
}
.back {
  color: #fff;
  font-size: 18px * @ratio;
  position: absolute;
  top: @space_md_16;
  left: @space_md_16;
}
//**************** */

#loadingMessage {
  text-align: center;
  padding: 40px;
  background-color: #eee;
}

#canvas {
  width: 100%;
  height: 100%;
}
</style>
