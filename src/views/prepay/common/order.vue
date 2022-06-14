<template>
  <div class="_order">
    <van-dialog v-model="show" title="提示" message="请下载国家老龄服务平台使用该功能" confirmButtonText="下载" show-cancel-button :before-close="beforeClose">
    </van-dialog>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="4000">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img class="img-item" :src="item.bannerUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="_center">
      <div class="_table" v-for="(item, index) in storeList" :index="index" :key="index" @click="download">
        <div class="item">
          <img class="_logo" :src="item.logo" />
          <div class="name">{{ item.supermarketName }}</div>
        </div>
        <div class="_rightTop">{{ item.discount }}折</div>
      </div>
    </div>
    <img class="floatRight" :src="require('@/assets/imgs/pay/myorder.png')" @click="download" />
  </div>
</template>
<script>
import { Swipe, SwipeItem, Dialog } from "@ylz/vant"
import * as prepayApi from "@/api/modules/prepay.js"
const location = {
  lat: "39.944215",
  lon: "116.48247",
  cityCode: "110100"
}
export default {
  components: {
    [Swipe.name]: Swipe,
    [Dialog.Component.name]: Dialog.Component,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      images: [
        require("@/assets/imgs/pay/sicon.png"),
        require("@/assets/imgs/pay/sicon.png")
      ],
      storeList: [],
      bannerList: [],
      show: false
    }
  },
  mounted() {
    this.getStoreList()
    this.getBannerList()
  },
  methods: {
    /**
     * @description: 获取商超列表
     * @param {*}
     * @return {*}
     * @author: shn
     */
    async getStoreList() {
      const ret = await prepayApi.querySupermarket(location)
      this.storeList = ret.data
    },
    /**
     * @description: 获取banner列表
     * @param {*}
     * @return {*}
     * @author: shn
     */
    async getBannerList() {
      const ret = await prepayApi.qryBannerForPay()
      this.bannerList = ret.data
    },
    /**
     * @description: 打开下载弹窗
     * @param {*}
     * @return {*}
     * @author: shn
     */
    download() {
      this.show = true
    },
    /**
     * @description: 选择下载或取消
     * @param {*} action
     * @param {*} done
     * @return {*}
     * @author: shn
     */
    beforeClose(action, done) {
      if (action === "confirm") {
        this.$router.push("/download")
        this.show = false
      } else if (action === "cancel") {
        done()
      }
    }
  }
}
</script>
<style lang="less" scoped>
._order {
  position: relative;
  width: 343px * @ratio;
  margin: 0 auto;
  .floatRight {
    position: fixed;
    right: 0px * @ratio;
    top: 56%;
  }
  .swiper {
    width: 100%;
    height: 99px * @ratio;
    margin-top: 12px * @ratio;
    .my-swipe .van-swipe-item {
      border-radius: 4px * @ratio;
    }
    .img-item {
      width: 343px * @ratio;
      height: 99px * @ratio;
    }
  }
  ._center {
    margin-top: 16px * @ratio;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    justify-content: space-between;
    ._table {
      display: flex;
      position: relative;
      margin-bottom: 9px * @ratio;
      width: 166px * @ratio;
      height: 102px * @ratio;
      background: #ffffff;
      border-radius: 8px * @ratio;
      border: 1px solid #eeeeee;
      .item {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        width: 100%;
        padding-top: 14px * @ratio;
        ._logo {
          width: auto;
          height: 46px * @ratio;
        }
        .name {
          font-weight: 500;
          color: #333333;
          font-size: 20px * @ratio;
        }
      }
      ._rightTop {
        width: 62px * @ratio;
        height: auto;
        background: url("../../../assets/imgs/pay/rightTop.png") 100% 100%
          no-repeat;
        position: absolute;
        right: 0px * @ratio;
        background-size: cover;
        font-size: 16px * @ratio;
        color: #fff;
        background-repeat: no-repeat;
        font-weight: 500;
        line-height: 25px * @ratio;
        text-align: right;
        padding-right: 5px * @ratio;
      }
    }
  }
}
/deep/ .van-dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 310px * @ratio!important;
  height: 184px * @ratio!important;
  background: #ffffff;
  border-radius: 8px * @ratio;
  .van-dialog__header {
    font-size: 22px * @ratio;
    font-weight: 500;
    color: #333333;
  }
  .van-dialog__message {
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #333333;
  }
  .van-button__content .van-button__text {
    font-size: 22px * @ratio;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .van-hairline--left .van-button__content .van-button__text {
    color: #ff5500;
  }
}
</style>

