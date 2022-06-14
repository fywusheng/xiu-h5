<!--
 * @Description: 老年证条形码、二维码
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-22 14:12:54
-->
<template>
  <div class="page-elderly-code">
    <div class="info">
      <div class="title">老年人证电子证照</div>
      <div>姓名：{{ state.userName | desensitization("name") }}</div>
      <div>身份证号码：{{ state.toIdCard | desensitization("idCard") }}</div>
    </div>
    <div class="code">
      <canvas id="barcode"/>
      <y-qr-code :content="qrCode" :width="210" :height="210" />
      <div class="tip">
        每隔1分钟自动<span class="refresh" @click="refresh">刷新</span>
      </div>
    </div>
  </div>
</template>

<script>
import YQrCode from "@/components/plugins/y-qr-code" // 二维码组件
import jsbarcode from "@ylz/jsbarcode"
import { claimApi } from "@/api"
export default {
  components: {
    YQrCode
  },
  props: {
    curItem: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      state: {},
      qrCode: ""
    }
  },
  watch: {
    curItem: {
      immediate: true,
      handler(newValue) {
        this.state = newValue
        if (newValue.authCode) {
          this.getCode()
        }
      }
    }
  },
  methods: {
    async getCode() {
      const { code, data } = await claimApi.get_gen_code({
        authCode: this.state.authCode,
        appId: "53928a083adb4a7dad2eecf05564873f"
      })
      if (code === 0) {
        this.showBarcode(data.ecQrCode)
        this.qrCode = data.ecQrCode
      }
    },
    // 条形码
    showBarcode(ecQrCode) {
      jsbarcode("#barcode", ecQrCode, {
        height: "64",
        displayValue: false,
        margin: 0,
        width: 1.2
      })
    },
    refresh() {
      this.getCode()
    }
  }

}
</script>

<style lang="less" scoped>
.page-elderly-code {
  margin: 14px * @ratio 10px * @ratio;
  .info {
    .title {
      font-size: 20px * @ratio;
      font-weight: 500;
      color: #333333;
      line-height: 28px * @ratio;
    }
    .name {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #333333;
      line-height: 25px * @ratio;
      margin-top: 8px * @ratio;
      margin-bottom: 8px * @ratio;
    }
    div {
      margin-top: 16px * @ratio;
    }
    font-size: @font_size_md;
    line-height: 1;
    letter-spacing: 2px;
    padding: 6px * @ratio 20px * @ratio;
  }
  .code {
    padding: @space_md_16;
    background: #fff;
    text-align: center;
    border-radius: @border_radius_lg;
    margin: 10px * @ratio;
    margin-top: 30px * @ratio;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.16);
    height: 421px * @ratio;
    .tip {
      text-align: center;
      margin-top: 18px * @ratio;
    }
    .refresh {
      color: #ff5400;
    }
  }
  #barcode {
    margin: 16px * @ratio auto 30px * @ratio auto;
    display: block;
  }
  .container-code {
    width: 323px * @ratio;
    height: 317px * @ratio;
    background: #f8f8f8;
    border-radius: 8px * @ratio;
    margin-top: 12px * @ratio;
    padding: 15px * @ratio 40px * @ratio;
    .barcode {
      width: 100%;
    }
    .qrcode {
      width: 183px * @ratio;
      height: 183px * @ratio;
      margin: 0 auto;
    }
    
  }
}
</style>