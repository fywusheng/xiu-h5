<!--
 * @Description: 家庭医生
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-26 14:57:13
-->
<template>
  <div class="page-family-doctor">
    <div class="container">
      <div class="bar">您的签约家庭医生：</div>
      <div class="top">
        <div class="avatar">
          <img :src="state.headPortrait" class="img-block" />
        </div>
        <div class="info">
          <p>
            <span class="name">{{ state.name }} </span>{{ state.title }}
          </p>
          <p>{{ state.department }} {{ state.hospital }}</p>
          <p>{{ state.addr }}</p>
        </div>
      </div>
      <div class="bottom">
        <span class="label">擅长：</span>
        <span>{{ state.skilled }}</span>
      </div>
      <div @click.stop="callPhone" class="phone">
        <svg-icon icon-class="phone" />立即拨打
      </div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" description="请选择拨打电话" close-on-click-action />
  </div>
</template>

<script>
import Vue from "vue"
import { ActionSheet } from "@ylz/vant"

Vue.use(ActionSheet)
export default {
  props: {
    state: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      actions: [{ name: null }]
    }
  },
  created() {
    this.actions[0].name = this.state.tel
    // this.headPortrait = require(this.state.headPortrait)
    // console.log(this.headPortrait)
    // console.log(this.state.headPortrait)
  },
  methods: {
    callPhone() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.page-family-doctor {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .container {
    width: 310px * @ratio;
    padding: 12px * @ratio;
    background: #fff;
    border-radius: 8px * @ratio;
    .bar {
      margin-bottom: 10px * @ratio;
    }
    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 21px * @ratio;
      .avatar {
        width: 87px * @ratio;
      }
      .info {
        width: 188px * @ratio;
        font-size: 18px * @ratio;
        font-weight: 400;
        color: #333333;
        line-height: 2.5;
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .name {
          font-size: 24px * @ratio;
          font-weight: 500;
          color: #333333;
          line-height: 33px * @ratio;
        }
      }
    }
    .bottom {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #999999;
      line-height: 25px * @ratio;
      .label {
        color: #ff5500;
      }
    }
    .phone {
      width: 242px * @ratio;
      height: 48px * @ratio;
      line-height: 48px * @ratio;
      background: linear-gradient(136deg, #ff8800 0%, #ff5500 100%);
      border-radius: 27px * @ratio;
      margin: 0 auto;
      font-size: 18px * @ratio;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
    }
  }
}

/deep/ .van-action-sheet__description {
  color: #333 !important;
  line-height: 30px * @ratio;
  font-size: 24px * @ratio !important;
  background-color: #fff !important;
  text-align: center !important;
}
</style>