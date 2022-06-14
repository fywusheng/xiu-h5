<!--
 * @Description: 条形码扫描
 * @Version: 0.1
 * @Autor: wjn
 * @Date: 2020-10-12 11:07:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-19 17:48:51
-->
<template>
  <div id="scanner">
    <img
      class="close"
      @click="close"
      src="data:image/png;base64,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"
      alt=""
    />
    <div class="model" v-show="scannerViewShow">
      <div class="scanner-view">
        <div class="scanner-view-arrow arrow1"></div>
        <div class="scanner-view-arrow arrow2"></div>
        <div class="scanner-view-arrow arrow3"></div>
        <div class="scanner-view-arrow arrow4"></div>
        <div class="scanner-line"></div>
      </div>
      <div class="scanner-text">放入框内，自动扫描</div>
    </div>
    <audio id="audio" ref="audio" style="width: 0px; height: 0px"></audio>
    <video
      class="video-view"
      ref="video"
      autoplay
      playsinline="true"
      webkit-playsinline="true"
    ></video>
    <canvas
      ref="canvas1"
      :width="canvas1Width"
      :height="canvas1Height"
      style="display: none"
    ></canvas>
    <canvas
      ref="canvas2"
      :width="scanWidth"
      :height="scanHeight"
      style="display: none"
    ></canvas>
  </div>
</template>

<script>

//下载插件
import jsQR from "jsqr"
import Quagga from "quagga"
export default {
  name: "read-bar-code",
  props: {
    // 视口长宽
    viewportWidth: {
      type: Number,
      default: 400
    },
    viewportHeight: {
      type: Number,
      default: 750
    },
    // 扫描框长宽
    scanWidth: {
      type: Number,
      default: 400
    },
    scanHeight: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      timer: null,
      scannerViewShow: false,
      // 摄像头分辨率
      cameraWidth: 0,
      cameraHeight: 0,
      canvas1Width: 0,
      canvas1Height: 0
    }
  },
  mounted() {
    this.$Loading.hide()
    this.$toast.loading({
      message: "加载中",
      duration: 5000
    })
    // 检测浏览器是否支持getUserMedia
    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      //调用用户媒体设备，访问摄像头
      this.initVideo({
        video: {
          width: window.innerWidth,
          facingMode: {
            // 强制后置摄像头,pc端做测试请注释掉，不然会报错
            exact: "environment"
          }
        }
      })
    } else {
      alert("你的浏览器不支持访问用户媒体设备")
    }

    // Common.getOrientationChange(function (res) {
    //   console.log(res);
    //   if (res) {
    //     window.location.reload();
    //   }
    // });
  },
  methods: {
    close() {
      clearInterval(this.timer)
      navigator.mediaStreamTrack && navigator.mediaStreamTrack.stop()
      this.$emit("ondata", { type: "qrcode", result: "" })
    },
    handleImageSize(video, item1, item2) {
      const videoWidth = this.cameraWidth,
        videoHeight = this.cameraHeight,
        viewWidth = this.viewportWidth,
        viewHeight = this.viewportHeight,
        scanW = this.scanWidth,
        scanH = this.scanHeight
      let w = 0,
        h = 0
      const context1 = item1.getContext("2d"),
        context2 = item2.getContext("2d")
      if (viewWidth / viewHeight > videoWidth / videoHeight) {
        console.log(1)
        // 视口比大于摄像头分辨率比 => 摄像头高度需要裁剪
        w = viewWidth
        h = parseInt(w / (videoWidth / videoHeight))
      } else if (viewWidth / viewHeight < videoWidth / videoHeight) {
        console.log(2)
        // 视口比小于摄像头分辨率比 => 摄像头宽度需要裁剪
        h = viewHeight
        w = parseInt(h * (videoWidth / videoHeight))
      } else {
        console.log(3)
        // 视口比等于摄像头分辨率比 => 摄像头长宽都不需要裁剪
        w = viewWidth
        h = viewHeight
      }
      this.canvas1Width = w
      this.canvas1Height = h
      //context1.drawImage(video, 0, 0, viewWidth, viewHeight, 0, 0, 200, 600);
      // context2.drawImage(video, 0, 0, 2000, 2000, 0, 0, 2000, 2000);
      this.$nextTick(() => {
        context1.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, w, h)
        context2.drawImage(item1, (w / 2) - (scanW / 2), (h / 2) - (scanH / 2), scanW, scanH, 0, 0, scanW, scanH)
      })
    },
    initVideo(constrains) {
      const _this = this
      if (navigator.mediaDevices.getUserMedia) {
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains)
          .then(_this.videoSuccess).catch(_this.videoError)
        // .then(()=>{
        //   _this.MediaStreamTrack=typeof stream.stop==='function'?stream:stream.getTracks()[0];
        //   _this.videoSuccess
        // })
      } else if (navigator.webkitGetUserMedia) {
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError)
      } else if (navigator.mozGetUserMedia) {
        //Firefox浏览器
        navigator.mozGetUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError)
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError)
      }
    },
    videoSuccess(stream) {
      this.$toast.clear()
      this.scannerViewShow = true
      const video = this.$refs.video,
        _this = this
      //将视频流设置为video元素的源
      video.srcObject = stream
      //播放视频
      video.play()
      video.oncanplay = function() {
        // 摄像头分辨率
        console.log("摄像头分辨率")
        console.log(video.videoWidth + "x" + video.videoHeight)
        // 视口分辨率
        console.log("视口分辨率")
        console.log(window.innerWidth + "x" + window.innerHeight)
        _this.cameraWidth = video.videoWidth
        _this.cameraHeight = video.videoHeight
        // 发送图片进行识别
        _this.readImg()
      }
    },
    videoError(error) {
      console.log("访问用户媒体设备失败：", error.name, error.message)
    },
    readImg() {
      const video = this.$refs.video,
        canvas1 = this.$refs.canvas1,
        // context = canvas1.getContext("2d"),
        canvas2 = this.$refs.canvas2,
        context2 = canvas2.getContext("2d"),
        _this = this
      this.timer = setInterval(function() {
        _this.handleImageSize(video, canvas1, canvas2)
        // 扫码条形码
        /* const imgUri = canvas2.toDataURL()
        _this.readBarcode(imgUri, this.timer) */
        //扫描二维码
        const imageData = context2.getImageData(0, 0, _this.scanWidth, _this.scanHeight)
        _this.readQrcode(imageData.data, this.timer)
      }, 2000)
    },
    readBarcode(imgBase64, timer) {
      // console.log(imgBase64)
      const _this = this
      Quagga.decodeSingle({
        decoder: {
          readers: ["code_128_reader"]
        },
        // locate为true程序会自动寻找条码，找不到不会出结果。会对一些清晰度不高的图片有影响
        locate: false,
        src: imgBase64
      }, function(result) {
        console.log(result)
        if (result) {
          if (result.codeResult) {
            // 扫描成功后清除定时器，停止扫描
            clearInterval(timer)
            _this.$emit("ondata", { type: "barcode", result: result.codeResult.code })
          } else {
            console.log("正在扫条形码...not detected1")
          }
        } else {
          console.log("正在扫条形码...not detected2")
        }
      })
    },
    readQrcode(data, timer) {
      const _this = this
      const code = jsQR(data, _this.scanWidth, _this.scanHeight, {
        // 只支持白底黑码，默认支持白底黑码和黑底白码。
        inversionAttempts: "dontInvert"
      })

      if (code) {
        clearInterval(timer)
        _this.$emit("ondata", { type: "qrcode", result: code.data })

        //_this.$refs.audio.play();
      } else {
        console.log("正在扫二维码...")
      }
    }
  },
  destroyed() {
    this.MediaStreamTrack && this.MediaStreamTrack.stop()
  }
}
</script>

<style scoped>
#app {
  /*width: 100%;*/
}
.close {
  width: 60px;
  position: absolute;
  right: 40px;
  top: 40px;
  z-index: 99999;
}
.left,
.right {
  width: 50%;
  float: left;
}
.left {
  background: #f7f7f7;
  height: 100vh;
}
.stockSearch-title {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  position: relative;
  text-align: center;
}
.stockSearch-title a {
  color: #79bbff;
  font-size: 14px;
  position: absolute;
  left: 20px;
}
.stockSearch-title .iconLeft-1 {
  font-size: 14px;
  font-weight: 600;
}
.stockSearch-result {
  background: #fff;
  box-sizing: border-box;
  width: 92%;
  min-height: 500px;
  margin: 20px auto;
  padding: 12px 20px 15px 20px;
}
.stockSearch-result .caption {
  color: #4db3a2;
  font-weight: 600;
  padding: 10px 0;
}
.table .is-waiting {
  color: #c0c4cc;
  font-size: 16px;
  text-align: center;
  padding: 20px;
}
.table .hide {
  display: none;
}
.table table {
  background: #fff;
  border: 1px solid #dddddd;
  border-spacing: 0;
  border-collapse: collapse;
  color: #606266;
  font-size: 14px;
  width: 100%;
}
.td-stock-title {
  font-weight: 600;
  padding: 8px;
  text-align: center;
}
.table tr:nth-of-type(5) {
  color: #428bca;
}
.table td {
  border: 1px solid #ddd;
}
.table td > div div {
  padding: 4px 8px;
}
.table td > div div:nth-child(odd) {
  background: #f9f9f9;
}
.table-num {
  /*color: #303133;*/
  font-weight: 600;
}
.table-current {
  color: #fff;
  background: #64b1f1;
  font-size: 12px;
  padding: 0.2em 0.3em;
  border-radius: 4px;
}
/* 右侧扫码 */
#scanner {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  top: 0;
  left: 0;
}
.model {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 88;
  border-top: calc((100vh - 80vw) / 2) solid rgba(0, 0, 0, 0.2);
  border-bottom: calc((100vh - 80vw) / 2) solid rgba(0, 0, 0, 0.2);
  border-right: 10vw solid rgba(0, 0, 0, 0.2);
  border-left: 10vw solid rgba(0, 0, 0, 0.2);
}
.scanner-view {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 89;
}
.scanner-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #49ff46;
  /*background: radial-gradient(ellipse,#71e52c,#001800);*/
  border-radius: 20px;
  z-index: 90;
  animation: myScan 2s infinite alternate;
}
@keyframes myScan {
  from {
    top: 0;
  }
  to {
    top: 80vw;
  }
}
.scanner-view-arrow {
  position: absolute;
  width: 5vw;
  height: 5vw;
  border: 2px solid #09bb07;
}
.scanner-view-arrow.arrow1 {
  top: -1px;
  left: -1px;
  z-index: 99;
  border-right: none;
  border-bottom: none;
}
.scanner-view-arrow.arrow2 {
  top: -1px;
  right: -1px;
  z-index: 99;
  border-left: none;
  border-bottom: none;
}
.scanner-view-arrow.arrow3 {
  bottom: -1px;
  left: -1px;
  z-index: 99;
  border-right: none;
  border-top: none;
}
.scanner-view-arrow.arrow4 {
  bottom: -1px;
  right: -1px;
  z-index: 99;
  border-left: none;
  border-top: none;
}
.scanner-text {
  color: #fff;
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-top: 20px;
}
.video-view {
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 80;
}
</style>