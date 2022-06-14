<!--
 * @Description: 亲情账号绑定(通过短信)
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-04-17 17:22:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-23 15:11:27
-->
<template>
  <div class="bing-account-page">
    <div>
      <img src="@/assets/imgs/family-account/bingAccount.jpg" />
      <img src="@/assets/imgs/family-account/bingAccount2.jpg" />
    </div>
    <div class="tips-container">
      <div class="tips-content">
        <p>
          您的亲友[{{
            name
          }}]正在与您绑定亲情关系并建立亲情账号，绑定后可享受亲情账号专属权益，是否同意
          <span class="red">(有效期24小时）</span>
        </p>
      </div>
    </div>
    <div class="btn-content">
      <p v-show="linkState === '00'" class="btn-disable">已同意</p>
      <p v-show="linkState === '03'" class="btn-disable">已拒绝</p>
      <p v-show="linkState === '04'" class="btn-disable">已过期</p>
      <p
        v-show="linkState === '02'"
        @click="handleRefuse"
        class="btn-item left"
      >
        <img src="@/assets/imgs/common/btn-refuse.png" />
      </p>
      <p v-show="linkState === '02'" @click="handleAccept" class="btn-item">
        <img src="@/assets/imgs/common/btn-agreen.png" />
      </p>
    </div>
  </div>
</template>

<script>
import { commonApi } from "@/api"
export default {
  name: "bind-account",
  data() {
    return {
      familyId: "",
      name: "",
      linkState: ""
    }
  },
  created() {
    this.familyId = this.$route.params && this.$route.params.familyId
    this.getInvitePeople({ familyId: this.familyId })
  },
  methods: {
    async getInvitePeople(params) {
      const ret = await commonApi.getFromAccoutByfamilyId(params)
      if (ret.code === 0) {
        this.name = ret.data.psnName
        this.linkState = ret.data.linkState
      }
    },
    handleRefuse() {
      this.handleFamilyAddByMessage("0")
    },
    handleAccept() {
      this.handleFamilyAddByMessage("1")
    },
    /**
     * 绑定亲情账号
     * @param familyId 亲情关系Id
     * @param optType 操作类型 00：同意 01：取消关联 02:待确认 03:拒绝 04：过期
     */
    async handleFamilyAddByMessage(optType) {
      const ret = await commonApi.familyAddByMessage({
        familyId: this.familyId,
        optType: optType
      })
      if (ret.code === 0) {
        this.$toast("操作成功")
       // this.$router.push("/")
      } else {
        this.$toast(ret.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bing-account-page {
  height: 100vh;
  background: linear-gradient(180deg, #fcc445 0%, #fccf5c 98% #fcd37f 100%);
  img {
    width: 100%;
    display: block;
  }
  .tips-container {
    position: absolute;
    left: 46px * @ratio;
    top: 252px * @ratio;
    width: 284px * @ratio;
    margin: 0 auto;
    .tips-content {
      font-size: 18px * @ratio;
      color: #333333;
      line-height: 32px * @ratio;
      .red {
        color: #eb3030;
      }
    }
  }
  .btn-content {
    position: absolute;
    top: 423px * @ratio;
    width: 100%;
    .btn-item {
      width: 176px * @ratio;
      line-height: 85px * @ratio;
      display: inline-block;
      img {
        width: 100%;
        display: block;
      }
      &.left {
        margin-left: 12px * @ratio;
      }
    }
    .btn-disable {
      width: 164px * @ratio;
      height: 54px * @ratio;
      line-height: 54px * @ratio;
      background: #f6f6f6;
      border-radius: 27px * @ratio;
      color: #999999;
      font-size: 22px * @ratio;
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>