<!--
 * @Description: 亲情账号绑定方式
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-21 09:56:14
-->
<template>
  <div class="page-bind">
    <div class="header">亲友账号专享权益</div>
    <div class="tips">
      <img
        src="@/assets/imgs/family-account/index-tips.png"
        class="img-block"
      />
    </div>
    <p class="tit">请选择亲情账号绑定方式</p>
    <div class="banner">
      <img
        src="@/assets/imgs/family-account/index-banner.png"
        class="img-block"
      />
    </div>
    <div class="chebox-group">
      <div @click="change('1')" class="chebox-item">
        <p class="icon-active">
          <span v-show="state.hasPhoneNum">
            <img
              src="@/assets/imgs/family-account/activation.png"
              class="img-block"
            />
          </span>
          <span v-show="!state.hasPhoneNum">
            <img
              src="@/assets/imgs/family-account/inactivated.png"
              class="img-block"
            />
          </span>
        </p>
        <p class="text">被绑定人有手机号</p>
        <p class="icon-phone">
          <img src="@/assets/imgs/family-account/phone.png" class="img-block" />
        </p>
      </div>
      <div @click="change('0')" class="chebox-item">
        <p class="icon-active">
          <span v-show="!state.hasPhoneNum">
            <img
              src="@/assets/imgs/family-account/activation.png"
              class="img-block"
            />
          </span>
          <span v-show="state.hasPhoneNum">
            <img
              src="@/assets/imgs/family-account/inactivated.png"
              class="img-block"
            />
          </span>
        </p>
        <p class="text">被绑定人无手机号</p>
        <p class="icon-nophone">
          <img
            src="@/assets/imgs/family-account/no-phone.png"
            class="img-block"
          />
        </p>
      </div>
    </div>
    <div @click="createItem" class="btn-create">添加亲友</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: {
        hasPhoneNum: true
      }
    }
  },
  methods: {
    createItem() {
      if (this.state.hasPhoneNum) {
        this.$router.push({ path: `hasphone-add` })
      } else {
        this.$router.push({ path: `nophone-add` })
      }
    },
    change(flag) {
      if (flag === "0") {
        this.state.hasPhoneNum = false
      } else {
        this.state.hasPhoneNum = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-bind {
  height: 100vh;
  .header {
    height: 90px * @ratio;
    font-weight: 500;
    line-height: 28px * @ratio;
    font-size: 20px * @ratio;
    color: #fbfbfb;
    padding: 0 16px * @ratio;
    padding-top: 20px * @ratio;
    background: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
  }
  .tips {
    margin: 0 16px * @ratio;
    margin-top: -35px * @ratio;
    background: #ffffff;
    box-shadow: 0px 4px * @ratio 12px * @ratio 0px rgba(0, 0, 0, 0.12);
    border-radius: 8px * @ratio;
  }
  .tit {
    height: 28px * @ratio;
    line-height: 28px * @ratio;
    font-size: 20px * @ratio;
    font-weight: 500;
    color: #333333;
    padding: 0 16px * @ratio;
    margin-top: 24px * @ratio;
    margin-bottom: 12px * @ratio;
  }
  .banner {
    padding: 0 16px * @ratio;
  }
  .chebox-group {
    padding: 0 16px * @ratio;
    .chebox-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54px * @ratio;
      line-height: 54px * @ratio;
      background: #ffffff;
      border-radius: 8px * @ratio;
      border: 1px * @ratio solid #ff5000;
      padding-left: 15px * @ratio;
      padding-right: 26px * @ratio;
      margin-top: 16px * @ratio;
      .icon-active {
        width: 26px * @ratio;
      }
      .text {
        width: 80%;
      }
      .icon-phone {
        width: 20px * @ratio;
      }
      .icon-nophone {
        width: 33px * @ratio;
        margin-right: -5px * @ratio;
      }
    }
  }
  .btn-create {
    width: 343px * @ratio;
    height: 54px * @ratio;
    background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
    border-radius: 27px * @ratio;
    font-weight: 500;
    color: #ffffff;
    font-size: 22px * @ratio;
    line-height: 54px * @ratio;
    text-align: center;
    position: fixed;
    left: 50%;
    bottom: 32px * @ratio;
    transform: translateX(-50%);
  }
}
</style>