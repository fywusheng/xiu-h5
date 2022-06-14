<!--
 * @Description: 首页
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-15 23:39:38
-->
<template>
  <div class="home-page">
    <y-dialog :show="show" :title="title" :message="message" :confirmButtonText="confirmButtonText" :cancelButtonText="cancelButtonText" :confirmButtonColor="confirmButtonColor" :cancelButtonColor="cancelButtonColor" @closeWindow="closeWindow" />
    <div name="header">
      <searchBar/>
      <toolBar />
    </div>
    <div class="content">
      <discovery />
      <banner />
      <tool />
      <prepay ref="prepay" @openWindow="openWindow" />
      <personal-rights />
      <service class="service" />
    </div>
    <nav-list :select="select" />
  </div>
</template>

<script>
import searchBar from "./comp/search-bar"
import toolBar from "./comp/tool-bar/index" // 亮证、扫一扫、老年码
import discovery from "./comp/discovery" // 尊老头条
import banner from "./comp/banner"
import tool from "./comp/tool" // 辟谣、养老地图
import personalRights from "./comp/personal-rights" // 个人权益
import service from "./comp/service/list" // 个人权益
import navList from "./comp/nav"
import { commonApi } from "@/api"
import prepay from "@/views/prepay" //优惠买单
import yDialog from "@/components/global/y-dialog/index.vue" //弹窗组件

export default {
  components: {
    searchBar,
    toolBar,
    discovery,
    banner,
    tool,
    personalRights,
    service,
    navList,
    prepay,
    yDialog
  },
  data() {
    return {
      state: {
        showStatus: false
      },
      show: false,
      title: "提示",
      message: "您尚未申领电子老年人证，无法使用优惠买单，请申领后使用",
      confirmButtonText: "立即申领",
      cancelButtonText: "放弃申领",
      confirmButtonColor: "",
      cancelButtonColor: "black",
      select: "1"
    }
  },
  created() {
    this.checkEleCradStas()
  },
  methods: {
    async checkEleCradStas() {
      const accessToken = this.$route.query.token || localStorage.getItem("token")
      const { psnId } = await this.$store.dispatch("getUserInfo", accessToken)
      this.status = await commonApi.getHomePop({
        userId: psnId
      })
    },
    /**
     * @description: 打开下载弹窗
     * @param {*} val
     * @return {*}
     * @author: shn
     */    
    openWindow(val) {
      this.show = val
    },
    /**
     * @description: 关闭下载弹窗
     * @param {*} val
     * @return {*}
     * @author: shn
     */    
    closeWindow(val) {
      this.show = val
    }
  }
}
</script>

<style lang="less" scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  font-size: @font_size_md;
  align-items: center;
  margin-bottom: @space_md_16;
  padding: 20px * @ratio @space_md_16 20px * @ratio;
  background: #fff;
  div {
    align-items: center;
    display: flex;
  }
  .arrow-down {
    font-size: 8px * @ratio;
    margin-left: 5px * @ratio;
  }
  .people {
    display: flex;
    align-items: center;
    font-size: @font_size_md;
    /deep/ .van-icon:first-child {
      font-size: 36px * @ratio;
      margin-right: 5px * @ratio;
    }
    /deep/ .van-icon:last-child {
      font-size: 8px * @ratio;
    }
    img {
      border-radius: 50%;
      box-shadow: 0px 2px 2px 2px #eeeeee;
    }
  }
}
.service {
  margin-bottom: 12px * @ratio;
}
.content {
  background: #f5f5f5;
  margin-top: -19px * @ratio;
  padding: 16px * @ratio 16px * @ratio 100px * @ratio;
  border-radius: 14px * @ratio 14px * @ratio 0px 0px;
}
</style>