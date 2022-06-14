<!--
 * @Description: 亲情账号管理首页
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-22 09:50:16
-->
<template>
  <div class="page-management">
    <div class="header">
      <div class="content">
        <dl
          v-for="(item, index) in state.list"
          :key="index"
          @click="getItem(item)"
          class="item"
        >
          <dt class="top">
            <div class="avatar">
              <img src="@/assets/imgs/common/default-avatar.png" />
            </div>
            <span class="status">{{ item.relationRemark }}</span>
          </dt>
          <dd class="bottom">
            <p>{{ item.userName }}</p>
            <p v-show="state.curItem.uactId === item.uactId" class="active">
              <img
                src="@/assets/imgs/family-account/arrow.png"
                class="img-block"
              />
            </p>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 已绑定亲情关系 -->
    <div v-show="state.curItem.linkState === '00'" class="container">
      <div class="head">
        <p @click="showModule('card')" :class="curPage === 'card'?'active':''">亮证</p>
        <p @click="$router.push('/qr-code-scan')">扫一扫</p>
        <p @click="showModule('code')" :class="curPage === 'code'?'active':''">老年码</p>
      </div>
      <div class="content">
        <elderly-card v-show="curPage === 'card'" :cur-item="state.curItem"></elderly-card>
        <elderly-code v-show="curPage === 'code'" :cur-item="state.curItem"></elderly-code>
      </div>
    </div>
    <!-- 未绑定亲情关系 -->
    <div v-show="state.curItem.linkState === '02'" class="container-nobind">
      <p class="text">
        该亲情账号尚未确认与您的绑定关系，你可以再重新发送绑定请求。
      </p>
      <p class="tips">
        <span class="left"><van-icon name="info" color="#EB3030" /></span>
        <span class="right"
          >平台将会以短信通知和站内消息的方式将您的绑定请求发送给被绑定人确认</span
        >
      </p>
      <!-- <div
        @click="sendMess"
        class="btn"
        :class="state.showCountDown ? 'disable' : ''"
        :disabled
      >
        重新发送
      </div> -->
      <van-button  @click="sendMess"  class="btn" :disabled="state.showCountDown" :class="state.showCountDown ? 'disable' : ''">重新发送</van-button>
      <p v-show="state.showCountDown" class="countDown">
        请{{ state.count }}s后重新尝试
      </p>
    </div>
    <div class="container-btn">
      <div @click="$router.push({ path: './management/list' })" class="left">
        管理
      </div>
      <div @click="$router.push({ path: '/family-account' })" class="right">
        绑定
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "@ylz/vant"
import { familyApi } from "@/api"
import elderlyCard from "./comp/elderly-card" // 亮证组件
import elderlyCode from "./comp/elderly-code" // 二维码
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    elderlyCard,
    elderlyCode
  },
  data() {
    return {
      curPage: "card",
      state: {
        list: [],
        curItem: {},
        active: "1",
        showCountDown: false,
        count: 60
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$store.dispatch("getUserInfo")
      const { data } = await familyApi.findFamilyMemberList({
        pageNum: 1,
        pageSize: 20,
        uactId: res.uactId
      })
      this.state.list = [...this.state.list, ...data.list]
      this.state.curItem = this.state.list[0]
    },
    getItem(item) {
      this.state.curItem = item
    },
    async sendMess() {
      this.countDown()
      try{
       this.state.showCountDown = true
       const { code , message} = await familyApi.retryFamilyInfo({
        regChnl: "h5",
        familyId: this.state.curItem.familyId,
        toUactId: this.state.curItem.uactId
      })
      console.log("===信息没有被定义---",code)
      if (code === 0) {
        console.log("===信息没有被定义code---",code,message)
        this.$toast(message)
        return;
      } 
      }catch(erro){
        console.log("===信息没有被定义error---",erro)
         this.$toast(erro+'')
        //  this.state.showCountDown = false
      }
    },
    showModule(page) {
      this.curPage = page
    },
    // 倒计时
    countDown() {
      let num = 59
      this.timer = null
      this.timer = setInterval(() => {
        this.state.count --;
        if (this.state.count === 1) {
          this.state.showCountDown = false
          clearInterval(this.timer)
          this.state.count = 60;

        }
        // this.$nextTick(() => {
        //   num -= 1
        //   this.state.count = num
        // })
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.page-management {
  .header {
    height: 190px * @ratio;
    background: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
    border-radius: 0px 0px 30px * @ratio 30px * @ratio;
    padding-top: 20px * @ratio;
    .content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 220px * @ratio;
      padding: 10px * @ratio 16px * @ratio;
      overflow-y: auto;
    }
    .item {
      width: 62px * @ratio;
      height: 90px * @ratio;
      margin-right: 18px * @ratio;
    }
    .top {
      position: relative;
      text-align: center;
      .avatar {
        width: 50px * @ratio;
        height: 50px * @ratio;
        border-radius: 50%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        img {
          width: 100%;
          display: block;
        }
      }
      .status {
        width: 56px * @ratio;
        height: 20px * @ratio;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        background: #ffe6d1;
        border-radius: 2px * @ratio;
        border: 1px * @ratio solid #fbfbfb;
        color: #333333;
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 3px * @ratio;
      }
    }
    .bottom {
      margin-top: 5px * @ratio;
      text-align: center;
      color: #fff;
      .active {
        width: 18px * @ratio;
        margin: 0 auto;
      }
    }
  }
  .container {
    width: 343px * @ratio;
    height: 540px * @ratio;
    margin: 0 auto;
    margin-top: -60px * @ratio;
    background: #fff;
    border-radius: 8px * @ratio;
    box-shadow: 0px 4px * @ratio 12px * @ratio 0px rgba(0, 0, 0, 0.12);
    .head {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 22px * @ratio;
      line-height: 44px * @ratio;
      font-weight: 500;
      .active {
        color: #ff5500;
        border-bottom: #ff5500 4px * @ratio solid;
      }
    }
    .content {
      height: 85%;
      overflow: auto;
      margin-top: 2%;
    }
  }
  .container-nobind {
    width: 343px * @ratio;
    height: 512px * @ratio;
    margin: 0 auto;
    margin-top: -60px * @ratio;
    background: #ffffff;
    border-radius: 8px * @ratio;
    box-shadow: 0px 4px * @ratio 12px * @ratio 0px rgba(0, 0, 0, 0.12);
    overflow: auto;
    .text {
      width: 246px * @ratio;
      font-size: 20px * @ratio;
      font-weight: 500;
      color: #333333;
      line-height: 28px * @ratio;
      text-align: center;
      margin: 0 auto;
      margin-top: 56px * @ratio;
      margin-bottom: 82px * @ratio;
    }
    .tips {
      width: 275px * @ratio;
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #999999;
      line-height: 25px * @ratio;
      margin: 0 auto;
      .left {
        width: 20px * @ratio;
        display: inline-block;
        vertical-align: top;
      }
      .right {
        width: 250px * @ratio;
        display: inline-block;
      }
    }
    .btn {
      width: 260px * @ratio;
      height: 50px * @ratio;
      background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
      border-radius: 27px * @ratio;
      font-weight: 500;
      color: #ffffff;
      font-size: 22px * @ratio;
      line-height: 54px * @ratio;
      text-align: center;
      margin: 0 auto;
      margin-top: 16px * @ratio;
      margin-left:38px * @ratio;
      &.disable {
        opacity: 0.7;
      }
    }
  }
  .container-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98px * @ratio;
    background: #ffffff;
    box-shadow: 0px -1px 0px 0px #eeeeee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      width: 160px * @ratio;
      height: 50px * @ratio;
      line-height: 50px * @ratio;
      font-size: 22px * @ratio;
      border-radius: 25px * @ratio;
      color: #ff5500;
      text-align: center;
      border: 1px * @ratio solid #ff5500;
    }
    .right {
      width: 160px * @ratio;
      height: 50px * @ratio;
      line-height: 50px * @ratio;
      font-size: 22px * @ratio;
      border-radius: 25px * @ratio;
      color: #ffffff;
      text-align: center;
      background: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
    }
  }
  .countDown {
    text-align: center;
    color: #ff2600;
  }
}
</style>