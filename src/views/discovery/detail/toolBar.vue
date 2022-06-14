<!--
 * @Description: 工具栏
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-04 18:14:09
-->
<template>
  <div>
    <div class="tool">
      <span class="btn">
        <van-icon name="star-o" size="24" /><span class="_c">收藏</span>
      </span>
      <span @click="showShare = true" class="btn">
        <van-icon size="24" :name="require('@/assets/svg/map/icon-share.svg')" /><span class="_c">分享</span>
      </span>
    </div>
    <van-share-sheet v-model="showShare" title="分享到" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import { ShareSheet } from "@ylz/vant"
export default {
  components: {
    [ShareSheet.name]: ShareSheet
  },
  data() {
    return {
      showShare: false,
      options: [
        [
          {
            name: "微信好友",
            icon: require("@/assets/imgs/discovery/icon_wx.png")
          },
          {
            name: "朋友圈好友",
            icon: require("@/assets/imgs/discovery/icon_wx_community.png")
          },
          {
            name: "QQ好友",
            icon: require("@/assets/imgs/discovery/icon_tencent.png")
          }
        ],
        [
          {
            name: "支付宝好友",
            icon: require("@/assets/imgs/discovery/icon_pay.png")
          },
          {
            name: "短信",
            icon: require("@/assets/imgs/discovery/icon_message.png")
          },
          {
            name: "复制链接",
            icon: require("@/assets/imgs/discovery/icon_link.png")
          }
        ]
      ]
    }
  },
  methods: {
    onSelect(option) {
      console.log(option)
      this.showShare = false
    }
  }
}
</script>

<style lang="less" scoped>
.tool {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .btn {
    width: 188px * @ratio;
    height: 67px * @ratio;
    line-height: 67px * @ratio;
    box-sizing: border-box;
    text-align: center;
    background: #fff;
    font-size: 18px * @ratio;
    /deep/ .van-icon {
      top: 4px * @ratio;
    }
    ._c {
      vertical-align: baseline;
      padding-left: 8px * @ratio;
    }
  }
}
/deep/ .van-popup--bottom.van-popup--round {
  background: #f2f2f2;
  .van-share-sheet__options {
    justify-content: space-around;
  }
  .van-share-sheet__options--border::before {
    border: none;
  }
  .van-share-sheet__cancel {
    width: 300px * @ratio;
    height: 54px * @ratio;
    background: #ffffff;
    border-radius: 27px * @ratio;
    font-size: 22px * @ratio;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #666666;
    margin: 24px * @ratio 0px * @ratio 11px * @ratio 50%;
    transform: translateX(-50%);
    &::after {
      width: 0;
    }
    &::before {
      width: 0;
    }
  }
}
</style>