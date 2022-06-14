<!--
 * @Description: 生成二维码组件
 * @Version: 0.1
 * @Autor: yjm
-->
<template>
  <div ref="QRCode" class="QR-code"></div>
</template>
<script>
import qrcodejs2 from "qrcodejs2"
export default {
  name: "y-qr-code",
  props: {
    content: {
      type: [String, Number],
      required: true
    },
    width: {
      type: Number,
      default: 110
    },
    height: {
      type: Number,
      default: 110
    },
    label: {
      type: String,
      default: "qr-code"
    }
  },
  watch: {
    content: {
      handler(val) {
        if (val) {
          this.genQrCode(val)
        }
      }
    }
  },
  mounted() {
    this.genQrCode(this.content)
  },
  data() {
    return {
      qrcode: ""
    }
  },
  methods: {
    genQrCode(content) {
      content = content.toString()
      
      if (this.qrcode) {
        this.qrcode.clear()
        this.qrcode.makeCode(content)
        return
      }
      if (this.$refs.QRCode) {
        this.qrcode = new qrcodejs2(this.$refs.QRCode, {
          text: content,
          width: this.width,
          height: this.height,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: qrcodejs2.CorrectLevel.H
        })
      }
    },
    download() {
      const base64 = this.$refs.QRCode.lastChild.src
      const name = this.label

      if (window.navigator.msSaveOrOpenBlob) {
        const bstr = atob(base64.split(",")[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        const blob = new Blob([u8arr])
        window.navigator.msSaveOrOpenBlob(blob, name + ".png")
      } else {
        const a = window.document.createElement("a")
        a.href = base64
        a.setAttribute("download", name + ".png")
        a.click()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.QR-code {
  display: inline-block;
}
</style>
