<!--
 * @Description: OCR 身份证识别
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-27 15:24:17
-->
<template>
  <div class="page-ocr">
    <div class="bg"></div>
    <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
    <video id="video" autoplay class="video"></video>
    <canvas id="canvas" class="canvas" hidden></canvas>
    <div class="tips">请将身份证置于镜头方框内<br />对齐扫描边框</div>
    <footer>
      <p @click="handleClickCapture" class="photograph">
        <img src="@/assets/imgs/common/photograph.png" class="img-block" />
      </p>
      <van-uploader v-model="fileList" :after-read="afterRead" class="link">
        <van-button class="text">
          <img
            src="@/assets/imgs/common/PhotoAlbum.png"
            class="img-block"
          />相册</van-button
        >
      </van-uploader>
    </footer>
  </div>
</template>

<script>
import { claimApi } from "@/api"
export default {
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    this.video = document.getElementById("video")
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.init()
  },
  methods: {
    init() {
      if (navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia) {
        this.getUserMediaToPhoto({ video: { width: 480, height: 320 } }, this.success, this.error)
      } else {
        alert("不支持访问用户媒体设备")
      }
    },
    // 调用摄像头拍照
    handleClickCapture() {
      this.ctx.drawImage(this.video, 0, 0, 480, 320)
      const dataURL = this.canvas.toDataURL("image/jpeg")
      this.handleOCR(dataURL.split(",")[1])
    },
    /**
     * @description 进行OCR识别
     * @param {String} file 处理后的base64文件
     */
    async handleOCR(base64) {
      const { data } = await claimApi.getOCR({
        image64: base64
      })
      for (const key in data.data) {
        if (data.data[key] === "") {
          this.$toast("识别失败，请保证身份证拍摄清晰哦")
          return false
        }
      }
      sessionStorage.setItem("cardData", JSON.stringify(data.data))
      const path = this.$route.query && this.$route.query.redirect
      const type = this.$route.query && this.$route.query.type
      this.$router.push({ path: `/${path}`, query: { type } })
    },
    /**
     * @description 选取图片后上传后，回显到图片，进行OCR识别
     * @param {String} file base64文件
     */
    afterRead(file) {
      // this.getUploadFile(file)
      this.handleOCR(file.content.split(",")[1])
    },
    /**
     * @description 调用用户媒体设备
     * @param constraints 配置信息
     * @param success 成功回调函数
     * @param error 失败回调函数
     */
    getUserMediaToPhoto(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
      } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(constraints, success, error)
      } else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(constraints, success, error)
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia(constraints, success, error)
      }
      this.video.play()
    },
    success(stream) {
      var CompatibleURL = window.URL || window.webkitURL
      try {
        this.video.src = CompatibleURL.createObjectURL(stream)
      } catch (e) {
        this.video.srcObject = stream
      }
      this.video.play()
    },
    error(error) {
      console.log("无法访问媒体设备", error)
      this.$toast("无法访问媒体设备")
    },
    // 获取上传文件并放在canvas里
    getUploadFile(file) {
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
        console.log("imageData", imageData)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-ocr {
  width: 100%;
  height: 100%;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.7;
  }
  .video {
    width: 360px * @ratio;
    height: 240px * @ratio;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px * @ratio;
    border: 1px * @ratio dashed #ffffff;
  }
  .canvas {
    position: absolute;
    left: 0;
    bottom: 20px * @ratio;
  }
  /deep/ .van-uploader__preview {
    display: none;
  }
}
.tips {
  color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  margin-top: 150px * @ratio;
}
footer {
  position: fixed;
  bottom: 20px * @ratio;
  width: 100%;
  padding: 0 @space_md_16;
  .photograph {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 64px * @ratio;
    height: 64px * @ratio;
  }
  .link {
    position: absolute;
    right: 5%;
    bottom: 10px * @ratio;
    font-size: 18px * @ratio;
    color: #fff;
    .text {
      color: #fff;
    }
  }
}

/deep/ .van-button--default {
  background: none;
  border: none;
}
.img-block {
  width: 52px * @ratio;
  display: block;
}
.back {
  color: #fff;
  font-size: 18px * @ratio;
  position: absolute;
  top: @space_md_16;
  left: @space_md_16;
}
#loadingMessage {
  text-align: center;
  padding: 40px;
  background-color: #eee;
}
// #canvas {
//   width: 100%;
//   height: 100%;
// }
</style>