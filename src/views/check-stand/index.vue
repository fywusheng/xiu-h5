<template>
  <div class="check-stand-page">
    <div class="title">订单应付金额</div>
    <div class="amount">¥{{formData&&formData.payAmount | formaterMoney}}</div>
    <div class="tips"><span>{{allDes}} </span><span>后订单将自动消失，请及时支付</span></div>
    <div class="main-box">
       <div class="alipay">
        <div class="alipay-l">
          <img class="icon-pay" src="@/assets/imgs/pay/wallet.png" alt="">
          <span>惠老钱包</span>
        </div>
        <van-radio-group v-model="payment">
          <van-radio name="1" :disabled="!isBindCard">
            <template #icon="props">
              <span v-if="loading == 2" class="bind-card" @click="goBindCard">去绑卡</span>
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="wechat" v-if="phoneType !='alipay' && phoneType != 'quickapp'">
        <div class="wechat-l">
          <img class="icon-pay" src="@/assets/imgs/pay/icon-wechat-pay.png" alt="">
          <span class="t-gray2">微信支付</span>
        </div>
        <van-radio-group v-model="payment">
          <van-radio name="3">
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="alipay" v-if="phoneType !='weixin' && phoneType != 'quickapp'">
        <div class="alipay-l">
          <img class="icon-pay" src="@/assets/imgs/pay/icon-alipay.png" alt="">
          <span class="t-gray2">支付宝支付</span>
        </div>
        <van-radio-group v-model="payment">
          <van-radio name="2">
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="line"></div>
    <button class="pay-btn" @click="goPay" :disabled="payment === '0'" :style="{opacity: payment !== '0'?'1':'0.5'}">去支付</button>
    <button v-if="['weixin', 'alipay'].includes(mpType)"  class="cancel-btn" @click="handleCancel">放弃支付</button>
    <van-dialog 
        v-model="show" 
        title="提示"
        message="您是否放弃本次支付?" 
        confirmButtonText="放弃" 
        cancelButtonText="继续支付"
        @confirm="goHome"
        show-cancel-button />
  </div>
</template>
<script src="https://appx/web-view.min.js"></script>
<script>
import Vue from "vue"
import { RadioGroup, Radio, Dialog } from "@ylz/vant"
import wx from "weixin-js-sdk"
import { payApi } from "@/api"
import CryptoJS from "crypto-js"
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      // 支付方式
      payment: "0",
      mpType: "",
      // 倒计时
      time: "",
      // iconPath
      activeIcon: require("@/assets/imgs/pay/icon-select.png"),
      inactiveIcon: require("@/assets/imgs/pay/icon-noselect.png"),
      iconCancel: "https://ggllstatic.e-drink.cn/static/supermarket/icon-index.png",
      // 显示支付弹窗
      show: false,
      // 运行环境
      phoneType: "",
      // 绑卡标识
      isBindCard: false,
      cashId: null,
      // 订单信息
      formData: {},
      loading:1,
      allTime:0,
      allDes:'',
      timesFlag:null,
      secenType:null //场景类型

    }
  },
  created() {
    this.getEnv()
    if (!this.$route.query.cashId){
      //TODO 没有id时候的提示  无cashId,请重新扫码支付
      this.$dialog.alert({
        title: "提示",
        message: "无id,请重新支付"
      })
      return false
    }
    console.log("===接到---",this.$route.query.cashId)
    // 暂时注释处理 
   // this.cashId = CryptoJS.MD5(this.$route.query.cashId).toString()
   this.cashId = this.$route.query.cashId
  },
  mounted() {
    this.getPageInfo()
  },
  methods: {
    timeRun(endTime,serviceTime){
     // var now = new Date().getTime()
     var now  =  new Date(serviceTime).getTime()
      var end = new Date(endTime).getTime()
      this.allTime = Math.floor((end - now) / 1000)
      this.timesFlag = setInterval(()=>{
        this.allTime--
        this.allDes = this.handlerTime(this.allTime)
        if(this.allTime == 0){
          console.log("===技术---",this.allTime)
          clearInterval(this.timesFlag)
          if(this.secenType === 0){
            this.handleGoPayCodePage()
          }else{
            this.handleGoOrderDetailPage()
          }
        }
      },1000)
    },
    handlerTime(allt){
        var day = Math.floor(allt / (60*60*24))
        var hours = Math.floor((allt - day*60*60*24) / (60*60))
        var minutes = Math.floor((allt - day*60*60*24 - hours*60*60) / 60)
        var seconds = allt - day*60*60*24 - hours*60*60 - minutes*60
        var resutTime = ''
        if(day > 0 ){
          resutTime = day + '天'
        }
        if(hours < 10){
          hours = '0' + hours
        }
        if(minutes < 10){
          minutes = '0' + minutes
        }
         if(seconds < 10){
          seconds = '0' + seconds
        }
        return  minutes + '分' + seconds+'秒'
    },
    // 获取当前运行环境
    getEnv() {
      const u = navigator.userAgent
      // const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (isAndroid) {
        this.phoneType = "android"
      } else {
        this.phoneType = "ios"
      }
      if (navigator.userAgent.indexOf("AliApp") > -1) {
        this.mpType = "alipay"
        this.phoneType = "alipay"
      }
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          this.mpType = "weixin"
          this.phoneType = "weixin" 
        } 
      })
      if (navigator.userAgent.includes('quickapp')) {
        this.mpType = "quickapp"
        this.phoneType = "quickapp"
      }
    },
    // 获取收银台信息
    async getPageInfo() {
      //之前收银台接口
      // const { data } = await payApi.showCheckStand({
      //   cashId: this.cashId
      // })
      //现在收银台接口
      const { data } = await payApi.showCheckStandOrder({
        cashId: this.cashId
      })
      if (!data) {return}
      this.formData = data || {}
      this.formData.payment = this.payment
      this.secenType = data.orderSource
      localStorage.setItem("token", data.uactId)
      this.getCardStatus()
     // this.startTime()
      this.timeRun(data.expirationTime,data.nowTime)
    },
    // 获取卡状态
    getCardStatus() {
      payApi.getCardStatus().then(res => {
        this.isBindCard = res.data? true: false
        if(!res.data){
          this.loading = 2
        }
        const default_pay_way = {"alipay":'2',"weixin":'3','android':'3','ios':'3'}
        this.payment = res.data ? "1" : default_pay_way[this.phoneType]
      })
    },
    // 倒计时
    // startTime() {
    //   this.time = 30
    //   this.timer = setInterval(() => { 
    //     if (this.time === 0){
    //       window.clearInterval(this.timer)
    //       this.handleGoPayCodePage()
    //       return false
    //     }
    //     this.time--
    //   }, 1000)
    // },

    // 跳转到支付码页面
    handleGoPayCodePage() {
      this.$dialog.alert({
        title: "提示",
        message: "支付超时，请重新展示支付码下单"
      }).then(() => {
        this.rePay()
      })
    },
    //其它订单跳转到订单详情页面
    handleGoOrderDetailPage() {
      this.$dialog.alert({
        title: "支付超时",
        message: "订单已关闭,请重新下单"
      }).then(() => {
        this.goOrderDetail()
      })
    },
    goOrderDetail(){
      if (this.phoneType === "ios") {
          this.goIosOrder()
       }
       if (this.phoneType === "android"){
          this.goAndroidOrder()
       }
       if(this.phoneType === "alipay" || this.phoneType === "weixin"){
         wx.miniProgram.reLaunch({url:'/pages/life/orderInfo?orderId='+this.formData.orderId })
        window.my&&window.my.reLaunch({url: '/pages/life/orderInfo?orderId='+this.formData.orderId})
       }
    },
    goIosOrder(){
      window.webkit.messageHandlers.timeoutBtn.postMessage(this.formData)
    },
    goAndroidOrder() {
      this.$jsbridge.goPath(
        "timeoutBtn",
        this.formData,
        (data, responseCallback) => {
          console.log("goAndroidOrder called with:", data)
          responseCallback(data)
        }
      )
    },
    // 重新展示支付码
    rePay() {
      payApi.getPayCodePage({
        supermarketId: this.formData.supermarketId
      }).then(res => {
        localStorage.removeItem("token")
        window.location.replace(res.data.result)
      })
    },
    // 放弃支付
    handleCancel(){
      this.show = true
    },
    /**
     * @description: app android端交互
     * @param {*}
     * @return {*}
     * @author: shn
     */    
    goApp() {
      this.$jsbridge.goPath(
        "payOrder",
        this.formData,
        (data, responseCallback) => {
          console.log("payOrder called with:", data)
          responseCallback(data)
        }
      )
    },
    /**
     * @description: app ios端交互
     * @param {*}
     * @return {*}
     * @author: shn
     */    
    goIos() {
      window.webkit.messageHandlers.payOrder.postMessage(this.formData)
    },
    // 去支付
    goPay(){
      if (this.payment === "0") {
        this.$dialog.alert({
          message: "请选择支付方式"
        })
        return false
      }
      this.formData.payment = parseInt(this.payment)
      this.formData.phoneType = this.phoneType
      this.formData.cashId = this.cashId
      if (this.phoneType === "ios") {
          this.goIos()
       }
       if (this.phoneType === "android"){
          this.goApp()
       }
      if(this.payment === '1'){
          wx.miniProgram.navigateTo({url: "/pages/pay/pay-detail?info=" + encodeURIComponent(JSON.stringify(this.formData))})
          window.my && window.my.navigateTo({url: "/pages/pay/pay-detail?info=" + encodeURIComponent(JSON.stringify(this.formData))})
          window.qa && window.qa.navigateTo({url: "/pages/pay/pay-detail?info=" + encodeURIComponent(JSON.stringify(this.formData))})
      }else if(this.payment === '2'){
       //alipay
        this.formData.payment = parseInt('2')
        wx.miniProgram.navigateTo({url: "/pages/pay/app-pay?info=" + encodeURIComponent(JSON.stringify(this.formData))})
        window.my&&window.my.navigateTo({url: "/pages/pay/app-pay?info=" + encodeURIComponent(JSON.stringify(this.formData))})
      }else {
       //weixin
        this.formData.payment = parseInt('3')
        wx.miniProgram.navigateTo({url: "/pages/pay/app-pay?info=" + encodeURIComponent(JSON.stringify(this.formData))})
        window.my&&window.my.navigateTo({url: "/pages/pay/app-pay?info=" + encodeURIComponent(JSON.stringify(this.formData))})
      }
      
    },
    //alipay
    // alipay_pay(){
    //   const params = {
    //          orderNo:this.formData.orderId,
    //          productName:this.formData.supermarketName,//TODO 此时传入的品牌名称
    //          paymentAmount:this.formData.payAmount,
    //          userId:'',//userid 
    //          channel:'ALI_PUB'
    //   }
    //   this.toPayment(params)
    // },
    // toPayment(params){
    //   const { data } = await payApi.toPayment({
    //          orderNo:params.orderNo,
    //          productName:params.productName,
    //          paymentAmount:params.paymentAmount,
    //          userId:params.userId,
    //          channel:params.channel
    //     })
    //   if (!data) {return}
    //   //TODO 预下单通过之后加入参数 等待接口
    //    my.tradePay({
    //         // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
    //         tradeNO: '2021112322001416795744293765',
    //         success: (res) => {
    //           my.alert({
    //             content: JSON.stringify(res),
    //           });
    //         },
    //         fail: (res) => {
    //           my.alert({
    //             content: JSON.stringify(res),
    //           });
    //       }
    //     })
    // },
    // 去绑卡
    goBindCard() {

      wx.miniProgram.redirectTo({url: "/pages/pay/add-bank-card?source=0&cashId="+this.cashId})
      window.my&&window.my.redirectTo({url: "/pages/pay/add-bank-card?source=0&cashId="+this.cashId})
      window.qa&&window.qa.redirectTo({url: "/pages/pay/add-bank-card?source=0&cashId="+this.cashId})
      if (this.phoneType === "android") {
        this.$jsbridge.goPath(
          "goBindCard",
          this.payment,
          (data, responseCallback) => {
            console.log("payOrder called with:", data)
            responseCallback(data)
          }
        )
      }

      if (this.phoneType === "ios") {
        window.webkit.messageHandlers.goBindCard.postMessage(this.payment)
      }
    },
    goHome() {
      if(this.secenType === 0){
        //附近优惠
        wx.miniProgram.reLaunch({url: "/pages/index/index"})
        window.my&&window.my.reLaunch({url: "/pages/index/index"})
        window.qa&&window.qa.reLaunch({url: "/pages/index/index"})
      }else{
        wx.miniProgram.reLaunch({url: "/pages/index/index?index=3"})
        window.my&&window.my.reLaunch({url: "/pages/index/index?index=3"})
        window.qa&&window.qa.reLaunch({url: "/pages/index/index?index=3"})
      }
      
    }
  },
  filters: {
    formaterMoney(value) {
      if (value === undefined || value === null) {
        return ""
      }
      if (value === "0") {
        return "0.00"
      }
      return (value / 100).toFixed(2)
    }
  }
}
</script>
<style lang="less" scoped>
.check-stand-page {
  background: #F5F5F5;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .icon-cancel {
    width: 40px;
    height: 40rpx;
    position: absolute;
    top: 32px;
    left: 32px;
  }
  .title {
    font-size: 18px * @ratio;
    font-weight: 400;
    color: #666666;
    margin-top: 24px * @ratio;
  }
  .amount {
    font-size: 32px * @ratio;
    font-weight: 500;
    color: #333333;
    margin-top: 12px * @ratio;
  }
  .tips {
    margin-top: 10px * @ratio;
    span {
      font-size: 18px * @ratio;
      font-weight: 500;
    }
    span:nth-child(1) {
      color: #ff5500;
    }
    span:nth-child(2) {
      color: #666666;
    }
  }
  .main-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 343px * @ratio;
    height: 122px * @ratio;
    background: #ffffff;
    box-shadow: 0px * @ratio 4px * @ratio 12px * @ratio 0px * @ratio
      rgba(0, 0, 0, 0.12);
    margin-top: 18px * @ratio;
    overflow: hidden;
    .alipay,
    .wechat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 343px * @ratio;
      height: 61px * @ratio;
      padding: 0px * @ratio 12px * @ratio 0px * @ratio 16px * @ratio;
      .wechat-l,
      .alipay-l {
        display: flex;
        align-items: center;
      }
      /deep/ .van-radio {
        overflow: inherit;
        .van-radio__icon {
          height: 24px * @ratio;
          line-height: 20px * @ratio;
          transform: translateY(-3px * @ratio);
          display: flex;
          align-items: center;
         .bind-card{
            color: #1890FF;
            font-size: 36px;
            margin-right: 16px;
          }
        }
      }
      
      span {
        font-size: 20px * @ratio;
        font-weight: 400;
        color: #333333;
        margin-left: 8px * @ratio;
        &.t-gray{
          color: #999999;
        }
      }
      
      .img-icon,
      .icon-pay {
        width: 24px * @ratio;
        height: 24px * @ratio;
        cursor: pointer;
      }
    }
  }
  .line {
    width: 100%;
    height: 1px * @ratio;
    background: transparent;
    margin-top: 40px * @ratio;
  }
  .pay-btn {
    width: 343px * @ratio;
    height: 54px * @ratio;
    background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
    border-radius: 27px * @ratio;
    font-size: 22px * @ratio;
    font-weight: 500;
    color: #ffffff;
    line-height: 54px * @ratio;
    text-align: center;
    margin-top: 11px * @ratio;
    cursor: pointer;
  }
  .cancel-btn {
    background: #F5F5F5;
    font-size: 18px * @ratio;
    color: #999999;
    margin-top: 12px * @ratio;
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
}
</style>

