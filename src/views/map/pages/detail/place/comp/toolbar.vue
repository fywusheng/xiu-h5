<!--
 * @Description: 工具栏
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-28 15:57:06
-->
<template>
  <div class="toolbar">
    <div class="top">
      <dl>
        <dt>
          <van-icon
            v-show="!state.collected"
            name="star-o"
            @click="handleCollected"
          />
          <van-icon
            v-show="state.collected"
            name="star"
            @click="handleCollected"
            color="#ffd91a"
          />
        </dt>
        <dd>收藏</dd>
      </dl>
      <dl>
        <dt @click="gotoNearbySearch"><van-icon name="search" /></dt>
        <dd>周边</dd>
      </dl>
      <dl @click="showShare">
        <dt>
          <van-icon :name="require('@/assets/svg/map/icon-share.svg')" />
        </dt>
        <dd>分享</dd>
      </dl>
      <dl @click="takeTaxi">
        <dt><van-icon :name="require('@/assets/svg/map/icon-car.svg')" /></dt>
        <dd>打车</dd>
      </dl>
    </div>
    <div class="bottom">
      <span @click="navigation" class="left">导 航</span>
      <span @click="route" class="right">路 线</span>
    </div>
    <van-share-sheet
      v-model="state.showShare"
      title="立即分享给好友"
      :options="state.options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { ShareSheet } from "@ylz/vant"
// import { getWechatJSSDK } from "@/api/modules/map-api"
import wxapi from "./share.js"
export default {
  name: "toolbar",
  components: {
    [ShareSheet.name]: ShareSheet
  },
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    name: {
      type: String,
      default: ""
    },
    id: {
      id: String,
      default: ""
    }
  },
  data() {
    return {
      state: {
        itemData: {},
        collected: false,
        showShare: false,
        options: [
          [
            { name: "微信好友", type: "onMenuShareAppMessage", icon: "wechat" },
            { name: "微信朋友圈", type: "onMenuShareTimeline", icon: "https://img01.yzcdn.cn/vant/share-sheet-wechat-moments.png" },
            { name: "QQ好友", icon: "qq" }
          ],
          [
            { name: "短信", icon: "poster" },
            { name: "复制链接", icon: "link" }
          ]
        ]
      }
    }
  },
  mounted() {
    console.log("===查询name---",this.name)
    this.websitePath = "https://ggll.e-drink.cn"
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.itemData = newValue
      }
    }
  },
  methods: {
    async onSelect(option) {
      // const url = window.location.href.split("#")[0]
      // const ret = await getWechatJSSDK({
      //   url: this.websitePath
      // })
      const data = {
        appid: "wx26d920162b6b87d9",
        timestamp: "1625219907",
        nonceStr: "b09fc879-ab87-43c1-9496-8a9712ea0236",
        signature: "886ceee9e7b164cabfe3325978be20d16e8ac0d9"
      }
      wxapi.wxRegister(data, {
        title: this.name,
        link: this.websitePath,
        imgUrl: "https://img01.yzcdn.cn/vant/share-sheet-wechat-moments.png",
        desc: "测试"
      })
    },
    showShare() {
      this.state.showShare = true
    },
    navigation() {
      this.$router.push({ path: `../navigation` })
    },
    route() {
      this.$store.dispatch("map/setEndPos", {
        orgOfficeLon: this.itemData.orgOfficeLon,
        orgOfficeLat: this.itemData.orgOfficeLat,
        orgOfficeName: this.itemData.orgOfficeName
      })
      this.$router.push({ path: `../navigation` })
    },
    handleCollected() {
      this.state.collected = !this.state.collected
      if (this.state.collected) {
        this.$toast("收藏成功")
      } else {
        this.$toast("取消收藏")
      }
    },
    takeTaxi() {
      this.$toast("功能建设中")
    },
    gotoNearbySearch() {
      this.$router.push({ path: "../nearby",query:{name:this.name} })
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-top: 7px * @ratio;
  background-color: #fff;
  border-top: solid #f2f2f2 8px * @ratio;
  .top {
    font-size: 18px * @ratio;
    margin-bottom: 15px * @ratio;
    text-align: center;
    display: flex;
    justify-content: space-around;
    dd {
      color: #999;
    }
    /deep/ .van-icon {
      color: #000;
      font-size: 24px * @ratio;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    text-align: center;
    .left {
      display: inline-block;
      width: 164px * @ratio;
      height: 54px * @ratio;
      border-radius: 27px * @ratio;
      border: 1px * @ratio solid #ff5000;
      color: #ff5000;
      line-height: 54px * @ratio;
      font-size: 22px * @ratio;
    }
    .right {
      display: inline-block;
      width: 164px * @ratio;
      height: 54px * @ratio;
      border-radius: 27px * @ratio;
      background: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
      color: #fff;
      line-height: 54px * @ratio;
      font-size: 22px * @ratio;
    }
  }
}
</style>