<!--
 * @Description: 弹窗组件
 * @Version: 0.1
 * @Autor: shn
 * @Date: 2021-08-31 14:34:55
 * @LastEditors: shn
 * @LastEditTime: 2021-08-31 15:28:05
-->
<template>
  <van-dialog v-model="show" :title="title" :message="message" :confirmButtonText="confirmButtonText" :cancelButtonText="cancelButtonText" :confirmButtonColor="confirmButtonColor" :cancelButtonColor="cancelButtonColor" show-cancel-button>
  </van-dialog>
</template>
<script>
import { Dialog } from "@ylz/vant"
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    message: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonColor: {
      type: String
    },
    cancelButtonColor: {
      type: String
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  name: "y-dialog",
  data() {
    return {}
  },
  methods: {
    /**
     * @description: 选择下载或取消
     * @param {*} action
     * @param {*} done
     * @return {*}
     * @author: shn
     */
    beforeClose(action, done) {
      if (action === "confirm") {
        this.$emit("closeWindow", false)
      } else if (action === "cancel") {
        done()
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
