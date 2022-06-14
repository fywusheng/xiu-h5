<!--
 * @Description: 紧急联系人
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-03 17:47:18
-->
<template>
  <div class="page-item">
    <van-form>
      <van-field
        label-width="122"
        required
        v-model="state.emergencyContact"
        label="姓名(必填)"
        placeholder="请输入联系人姓名"
        :rules="[{ required: true, message: '' }]"
        @blur="getName"
      />
      <van-field
        label-width="122"
        required
        v-model="state.emergencyPhone"
        type="tel"
        label="联系电话(必填)"
        placeholder="请输入联系电话"
        :rules="[{ validator: checkMobile, message: '' }]"
        @blur="getPhone"
      />
    </van-form>
    <p class="bor"></p>
    <div v-show="length > 1" @click="del" class="del">删除</div>
  </div>
</template>

<script>
import { checkMobile } from "@/utils/check"
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    emergencyContact: {
      type: String,
      default: ""
    },
    emergencyPhone: {
      type: String,
      default: ""
    },
    len: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      length: 0,
      state: {
        id: "",
        emergencyContact: "",
        emergencyPhone: ""
      }
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(newValue) {
        this.state.id = newValue
      }
    },
    emergencyContact: {
      immediate: true,
      handler(newValue) {
        this.state.emergencyContact = newValue
      }
    },
    emergencyPhone: {
      immediate: true,
      handler(newValue) {
        this.state.emergencyPhone = newValue
      }
    },
    len: {
      immediate: true,
      handler(newValue) {
        this.length = newValue
      }
    }
  },
  methods: {
    checkMobile,
    getName(e) {
      if (e.target.value !== "") {
        this.$emit("name", {
          id: this.state.id,
          emergencyContact: e.target.value
        })
      }
    },
    getPhone(e) {
      const tag = this.checkMobile(e.target.value)
      if (tag) {
        this.$emit("phone", {
          id: this.state.id,
          emergencyPhone: e.target.value
        })
      }
    },
    del() {
      this.$emit("delItme", this.state.id)
    }
  }
}
</script>

<style lang="less" scoped>
.page-item {
  .bor {
    margin: 0 16px * @ratio;
    border-bottom: 1px * @ratio solid #cecece;
  }
  .del {
    height: 48px * @ratio;
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #eb3030;
    line-height: 48px * @ratio;
    text-align: center;
    border-bottom: 8px * @ratio solid #f5f5f5;
    box-sizing: content-box;
  }
}
</style>