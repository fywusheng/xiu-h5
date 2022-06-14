<!--
 * @Description: 短信校验码
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: Please set LastEditors
-->
<template>
  <van-button
    :size="size"
    :type="type"
    native-type="button"
    @click="handleClick"
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ tip }}
  </van-button>
</template>
<script>
export default {
  name: "sms-code",
  props: {
    type: {
      type: String,
      default: "info"
    },
    startText: {
      type: String,
      default: "获取验证码"
    },
    changeText: {
      type: String,
      default: "X秒重新获取"
    },
    endText: {
      type: String,
      default: "重新获取"
    },
    size: {
      type: String,
      default: "mini"
    },
    seconds: {
      type: Number,
      default: 60
    },
    getCode: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      tip: "",
      disabled: false
    }
  },
  created() {
    this.tip = this.startText
  },
  methods: {
    // 倒计时
    countDown(end, change, seconds = this.seconds) {
      let count = seconds

      const timer = setInterval(() => {
        change(count)
        count--
        if (count <= 0) {
          end()
          clearInterval(timer)
        }
      }, 1000)
    },
    async handleClick() {
      if (this.disabled) {
        return
      }
      if (await this.getCode()) {
        this.tip = this.startText
        this.disabled = true
        this.$emit("start")

        this.countDown(
          () => {
            this.tip = this.endText
            this.disabled = false
            this.$emit("end")
          },
          count => {
            this.tip = this.changeText.replace(/X/, count)
            this.$emit("change", count)
          }
        )
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
