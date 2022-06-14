<!--
 * @Description: 跳转App
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-23 17:14:44
-->
<template>
  <div class="page-jumpApp">
    <div v-show="modeType === 'riding' || modeType === 'walking'" class="normal">
      <p class="top">
        全程{{ distance }}，预计<span>{{ time }}分钟</span>
      </p>
      <van-button @click="showActionSheet" color="linear-gradient(to right, #FF8800, #FF5500)" class="btn">
        使用地图导航
      </van-button>
    </div>
    <div v-show="modeType === 'driving'" class="special">
      <p class="top">
        全程{{ distance }}，预计<span class="time"> {{ time }} </span>分钟
      </p>
      <div class="btn-cont">
        <van-button color="#FF5000" plain class="btn-left" @click="tips">
          打车
        </van-button>
        <van-button @click="showActionSheet" color="linear-gradient(to right, #FF8800, #FF5500)" class="btn-left">
          导航
        </van-button>
      </div>
    </div>
    <van-action-sheet v-model="state.show" :actions="state.actions" @select="gotoApp" @cancel="state.show = false" cancel-text="取消" description="请选择地图导航" close-on-click-action />
  </div>
</template>

<script>
export default {
  name: "jumpApp",
  props: {
    distance: {
      type: String,
      default: ""
    },
    time: {
      type: Number,
      default: 0
    },
    modeType: {
      type: String,
      default: "driving"
    }
  },
  data() {
    return {
      state: {
        show: false,
        actions: [
          {
            name: "高德地图",
            iosSchema: "iosamap://",
            androidSchema: "androidamap://",
            iosId: "id461703208"
          },
          {
            name: "腾讯地图",
            iosSchema: "qqmap://",
            androidSchema: "qqmap://",
            iosId: "id481623196"
          },
          {
            name: "百度地图",
            iosSchema: "baidumap://map",
            androidSchema: "baidumap://map",
            iosId: "id452186370"
          }
        ]
      }
    }
  },
  methods: {
    showActionSheet() {
      this.state.show = true
    },
    gotoApp(action) {
      console.log("====kan")
      this.useJump(action)
      this.$emit("jump" , 1)
    },
    useJump(action) {
      var u = navigator.userAgent
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //android终端
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      if (isAndroid) {
        //安卓app的scheme协议
        window.location.href = action.androidSchema
        setTimeout(() => {
          const hidden =
            window.document.hidden ||
            window.document.mozHidden ||
            window.document.msHidden ||
            window.document.webkitHidden
          if (typeof hidden == "undefined" || hidden == false) {
            this.$toast("请前往应用商店下载App")
          }
        }, 2000)
      }
      if (isIOS) {
        //ios的scheme协议
        window.location.href = action.iosSchema
        setTimeout(function() {
          const hidden =
            window.document.hidden ||
            window.document.mozHidden ||
            window.document.msHidden ||
            window.document.webkitHidden
          if (typeof hidden == "undefined" || hidden == false) {
            //App store下载地址
            window.location.href = `https://apps.apple.com/cn/app/${action.iosId}`
          }
        }, 2000)
      }
    },
    tips() {
      this.$toast("功能建设中")
    }
  }
}
</script>

<style lang="less" scoped>
.page-jumpApp {
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  padding-bottom: 9px * @ratio;
  border-radius: 8px * @ratio 8px * @ratio 0px 0px;
  .top {
    text-align: center;
    color: #999;
    margin-top: 16px * @ratio;
    margin-bottom: 12px * @ratio;
    .time {
      color: #333;
    }
  }
  .normal .btn {
    width: 300px * @ratio;
    height: 54px * @ratio;
    line-height: 54px * @ratio;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    border-radius: 27px * @ratio;
  }
  .special .btn-cont {
    display: flex;
    justify-content: space-around;
    .btn-left {
      width: 162px * @ratio;
      height: 54px * @ratio;
      border-radius: 27px * @ratio;
    }
  }
  /deep/ .van-action-sheet__description {
    text-align: center !important;
    color: #333 !important;
    font-weight: 600;
    line-height: 25px * @ratio;
    font-size: 24px * @ratio !important;
    background-color: #fff;
  }
}
</style>
