<!--
 * @Description: 预约体检-单项
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-25 17:07:30
-->
<template>
  <div class="page-physical-examination-item">
    <div key="detail">
      <section class="header-info">
        <div class="img-cont">
          <p class="picture">
            <img v-if="item.photos && item.photos.length > 0" :src="item.photos[0].url" />
            <img v-else :src="require('@/assets/imgs/map/default-place.png')" />
          </p>
          <p v-show="state.level" class="bar">{{ state.level }}</p>
        </div>
        <div class="detail">
          <p class="tit line-limit" @click="goDetail(item)">
            {{ item.orgOfficeName }}
          </p>
          <p>
            <span class="type"> {{ item.orgOfficeType }}</span>
            <span class="distance">
              | 距离：{{ item.distance | distance }}
            </span>
          </p>
          <p class="address">
            <span v-if="!item.orgOfficeId" class="addr">{{
              item.address
            }}</span>
            <span v-else class="addr">{{ item.orgOfficeAddrDetail }}</span>
          </p>
          <p v-if="item.orgOfficeOpenTime" class="line-limit">
            开放时间: {{ item.orgOfficeOpenTime }}
          </p>
        </div>
      </section>
      <div class="action-bar">
        <div class="action-cont">
          <dl v-if="item.orgOfficeId">
            <dt>
              <van-icon v-show="!state.isCollected" name="star-o" @click="handleCollected" />
              <van-icon v-show="state.isCollected" @click="handleCollected" color="#ffd91a" name="star" />
            </dt>
            <dd>收藏</dd>
          </dl>
          <dl v-if="item.orgOfficeTel || item.tel" @click="callPhone(item)">
            <dt>
              <van-icon name="phone-o" />
            </dt>
            <dd>电话</dd>
          </dl>
          <dl @click="handleTaxi">
            <dt>
              <van-icon :name="require('@/assets/svg/map/icon-car.svg')" />
            </dt>
            <dd>打车</dd>
          </dl>
        </div>
        <div class="btn-box">
          <button @click="onNavigation" round class="button">
            <img class="path" src="@/assets/imgs/person-rights/path.png" alt=""> 路线
          </button>
          <button @click="showPopup" round class="button2">立即预约
          </button>
        </div>
        <van-popup class="order-window" v-model="show" round position="bottom" :style="{ height: '30%' }">
          <div>请选择拨打电话</div>
          <a class="tel" href="tel:010 6501 0562">010 6501 0562</a>
          <a class="tel" href="tel:010 6501 0562">010 6501 0562</a>
          <div @click="showPopup">取消</div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return { show: false, item: {} }
  },
  watch: {
    state: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.item = newValue
      }
    }
  },
  methods: {
    onNavigation() {},
    showPopup() {
      this.show = !this.show
    },
    handleTaxi() {
      this.$toast("功能建设中")
      return false
    },
    handleCollected() {
      const accessToken = localStorage.getItem("accessToken") || ""
      if (!accessToken) {
        this.$toast("请登录账号")
        this.$router.push("/")
        return false
      }
      this.state.isCollected = !this.state.isCollected
      if (this.state.isCollected) {
        this.$toast("收藏成功")
      } else {
        this.$toast("取消收藏")
      }
    }
  },
  filters: {
    distance(val) {
      if (val) {
        return val > 1000
          ? (val / 1000).toFixed(2) + "公里"
          : parseInt(val) + "米"
      } else {
        return "暂无数据"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-physical-examination-item {
  padding: 12px * @ratio 16px * @ratio 10px * @ratio;
  background: #ffffff;
  .header-info {
    font-size: 24px * @ratio;
    .img-cont {
      display: inline-block;
      position: relative;
      width: 100px * @ratio;
      .picture {
        width: 110px * @ratio;
        height: 127px * @ratio;
        overflow: hidden !important;
        margin-right: 8px * @ratio;
        img {
          display: block;
          width: 110px * @ratio;
        }
      }
      .bar {
        width: 100%;
        height: 21px * @ratio;
        position: absolute;
        bottom: -18px * @ratio;
        background: url("~@/assets/imgs/map/bar@2x.png");
        background-size: 100% auto;
        font-size: 16px * @ratio;
        text-align: center;
        color: #fff;
      }
    }
    .detail {
      display: inline-block;
      width: 208px * @ratio;
      font-size: 18px * @ratio;
      margin-left: 9px * @ratio;
      vertical-align: top;
      height:100px * @ratio;
      overflow:scroll;
      .tit {
        font-size: 22px * @ratio;
        color: #333;
        text-shadow: 0px -2px * @ratio 3px * @ratio rgba(0, 0, 0, 0.08);
      }
      .address {
        width: 225px * @ratio;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .action-bar {
    display: flex;
    background-color: #fff;
    width: 100%;
    font-size: 16px * @ratio;
    margin-top: 5px * @ratio;
    justify-content: space-between;
    flex-flow: row;
    .action-cont {
      width: 55%;
      dl {
        display: inline-block;
        margin-right: 12px * @ratio;
        text-align: center;
      }
      dl:last-child {
        margin-right: 0px * @ratio;
      }
      /deep/ .van-icon {
        font-size: 28px * @ratio;
        font-weight: 700;
      }
    }
    .btn-box {
      display: flex;
      .button,
      .button2 {
        width: 96px * @ratio;
        height: 48px * @ratio;
        box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.08);
        border-radius: 25px * @ratio;
        font-size: 18px * @ratio;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        /deep/ .van-icon {
          vertical-align: middle;
        }
      }
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px * @ratio solid #ff5000 !important;
        background: #fff !important;
        color: #ff5000 !important;
        margin-right: 10px * @ratio;
        .path {
          width: 24px * @ratio;
          height: 24px * @ratio;
          margin-right: 4px * @ratio;
        }
      }
      .button2 {
        width: 104px * @ratio;
        color: #ffffff;
        background: linear-gradient(136deg, #ff8800 0%, #ff5500 100%);
      }
    }
  }
  .order-window {
    display: flex;
    flex-direction: column;
    div,
    .tel {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 25%;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #323233;
      font-weight: 500;
      font-size: 20px * @ratio;
      border-bottom: 1px * @ratio solid rgb(230, 230, 230);
    }
    div:first-child {
      font-weight: 600;
      font-size: 24px * @ratio;
    }
    div:last-child {
      border-top: 10px * @ratio solid rgb(230, 230, 230);
      border-bottom: 0px solid rgb(230, 230, 230);
    }
  }
}
</style>