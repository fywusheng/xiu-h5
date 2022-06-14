<!--
 * @Description: 个人权益首页
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-24 12:47:27
-->
<template>
  <div class="page-personal-right">
    <div class="container-right">
      <div class="left">
        <div class="percent-box">
          <span>{{ hasPercent }}%</span>
          <span>已领取</span>
        </div>
        <p class="title">已有的权益</p>
        <van-circle class="circle" size="124px" v-model="hasBroughtEquity" :rate="hasPercent" :speed="100" text="" :color="gradientColor" layer-color="#F2F2F2" stroke-width="100" />
        <div class="color-box">
          <div class="color-piece color-l"></div>
          <p>已领取：{{ hasEquity }}项</p>
        </div>
        <p @click="$router.push('existing-rights')" class="check-btn">
          点击查看 >
        </p>
      </div>
      <div class="left">
        <div class="percent-box">
          <span class="not-percent">{{ notPercent }}%</span>
          <span>已领取</span>
        </div>
        <p class="title">未领取的权益</p>
        <van-circle class="circle" size="124px" v-model="notBroughtEquity" :rate="notPercent" :speed="100" text="" color="#2CA3F6" layer-color="#F2F2F2" stroke-width="100" />
        <div class="color-box">
          <div class="color-piece color-r"></div>
          <p>未领取：{{ notEquity }}项</p>
        </div>
        <p @click="$router.push('existing-rights')" class="check-btn">点击查看 ></p>
      </div>
    </div>
    <div class="cell-item">
      <van-cell title="养老金查询" is-link to="pension" value="查看明细" />
      <div class="top">
        <p>
          您的养老金：
          <span v-if="pensionShow">{{
            state.pension["2021"][place]["detail"][0].grantAmount
          }}</span>
          <span v-else>*****</span>
          元/月
        </p>
        <van-icon v-if="pensionShow" class="icon-view" :name="iconView" @click="showIcon('pensionShow')" />
        <van-icon v-else class="icon-view" :name="iconHidden" @click="showIcon('pensionShow')" />
      </div>
      <div class="bottom">
        本月[
        <span v-show="state.pension['2021'][place]['detail'][0].status === '已到账'" class="active">
          已到账
        </span>
        <span v-show="state.pension['2021'][place]['detail'][0].status === '未到账'" class="active2">
          未到账
        </span>
        ]
      </div>
    </div>
    <div class="cell-item">
      <van-cell title="高龄津贴" is-link to="old-age-allowance" value="查看明细" />
      <div class="top">
        <p>
          您的高龄津贴：<span v-if="oldAgeShow">{{
            state.ageAllowance["2021"][place]["detail"][0].grantAmount
          }}</span>
          <span v-else>*****</span>元/月
        </p>
        <van-icon v-if="oldAgeShow" class="icon-view" :name="iconView" @click="showIcon('old-age-allowance')" />
        <van-icon v-else class="icon-view" :name="iconHidden" @click="showIcon('old-age-allowance')" />
      </div>
      <div class="bottom">
        本月[
        <span v-show="
            state.ageAllowance['2021'][place]['detail'][0].status === '已到账'
          " class="active">
          已到账
        </span>
        <span v-show="
            state.ageAllowance['2021'][place]['detail'][0].status === '未到账'
          " class="active2">
          未到账
        </span>
        ]
      </div>
    </div>
    <div class="cell-item">
      <van-cell title="医保消费记录查询" is-link to="medicare" value="查看明细" />
      <div class="top">
        <p>
          您的医保账户余额(元)：
          <span v-if="medicareShow">{{ state.healInsuConsRecord.restAmount }}</span>
          <span v-else>*****</span>
        </p>
        <van-icon v-if="medicareShow" class="icon-view" :name="iconView" @click="showIcon('medicare')" />
        <van-icon v-else class="icon-view" :name="iconHidden" @click="showIcon('medicare')" />
      </div>
    </div>
    <div class="cell-item">
      <van-cell title="优待政策说明" is-link to="policy-description" value="查看说明" />
      <p class="top">
        您享有<span class="active">北京市</span>老年人证优待政策
      </p>
    </div>
    <div class="cell-item">
      <van-cell title="健康医疗" is-link value="查看明细" />
      <div class="health">
        <div class="left">
          <p class="tit">免费体检</p>
          <p @click="$router.push('physical-examination')" class="btn">
            预约体检
          </p>
          <p @click="moduleBuiding" class="btn">健康档案</p>
        </div>
        <div class="right">
          <p class="tit">家庭医生</p>
          <p @click="show = true" class="btn">电话问诊</p>
          <p @click="moduleBuiding" class="btn">在线问诊</p>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <family-doctor :state="state.familyDoctor.callPhyVisit" />
    </van-overlay>
  </div>
</template>

<script>
import { Circle, Overlay, Icon } from "@ylz/vant"
import { rightsApi } from "@/api"
import familyDoctor from "./comp/family-doctor"
export default {
  components: {
    [Circle.name]: Circle,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon,
    familyDoctor
  },
  data() {
    return {
      show: false,
      state: {},
      place: "北京",
      currentRate: 0,
      gradientColor: {
        "0%": "#000",
        "100%": "#FF5000"
      },
      hasBroughtEquity: 0,
      notBroughtEquity: 0,
      hasPercent: 0,
      notPercent: 0,
      hasEquity: 0,
      notEquity: 0,
      total: 0,
      iconView: require("@/assets/imgs/person-rights/icon_view.png"),
      iconHidden: require("@/assets/imgs/person-rights/icon_hidden.png"),
      pensionShow: true,
      medicareShow: true,
      oldAgeShow: true
      // gradientColor: "#000"
    }
  },
  computed: {
    hasPercentText() {
      return this.hasPercent + "%" + "已领取"
    },
    notPercentText() {
      return this.notPercent + "%" + "未领取"
    }
  },
  created() {
    this.getData()
  },
  methods: {
    /**
     * @description: 获取数据
     * @param {*}
     * @return {*}
     * @author: shn
     */    
    async getData() {
      const { data } = await rightsApi.getIndividualRights()
      this.state = data
      this.hasBroughtEquity = this.hasEquity =
        this.state.hasBroughtEquity.length
      this.notBroughtEquity = this.notEquity =
        this.state.notBroughtEquity.length
      this.total =
        this.state.hasBroughtEquity.length + this.state.notBroughtEquity.length
      this.hasPercent = parseInt((this.hasBroughtEquity * 100) / this.total)
      this.notPercent = parseInt((this.notBroughtEquity * 100) / this.total)
    },
    moduleBuiding() {
      this.$toast("功能建设中")
    },
    /**
     * @description: 显示隐藏功能
     * @param {*} name
     * @return {*}
     * @author: shn
     */    
    showIcon(name) {
      switch (name) {
      case "pensionShow":
        this.pensionShow = !this.pensionShow
        break
      case "medicare":
        this.medicareShow = !this.medicareShow
        break
      case "old-age-allowance":
        this.oldAgeShow = !this.oldAgeShow
        break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-personal-right {
  padding: 12px * @ratio 16px * @ratio 20px * @ratio;
  background: #f5f5f5;
  .container-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 167px * @ratio;
      height: 221px * @ratio;
      background: #ffffff;
      border-radius: 8px * @ratio;
      background: #ffffff;
      .percent-box {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 70px * @ratio;
        left: 50%;
        transform: translateX(-50%);
        span {
          font-size: 20px * @ratio;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
        }
        .not-percent {
          color: #00BFFF!important;
        }
        span:first-child {
          color: #ff5500;
        }
        span:last-child {
          color: #999999;
        }
      }
      .title {
        font-size: 18px * @ratio;
        font-weight: 400;
        color: #333333;
        margin: 10px * @ratio 0px * @ratio 8px * @ratio 10px * @ratio;
      }
      .circle {
        margin-left: 50%;
        transform: translateX(-50%);
        // /deep/ .van-circle__hover {
        //   stroke: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
        // }
      }
      .color-box {
        display: flex;
        align-items: center;
        margin: 8px * @ratio 0px * @ratio 10px * @ratio 27px * @ratio;
        .color-piece {
          width: 16px * @ratio;
          height: 6px * @ratio;
          border-radius: 3px * @ratio;
          margin-right: 4px * @ratio;
        }
        .color-l {
          background: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
        }
        .color-r {
          background: linear-gradient(133deg, #14c8f7 0%, #2ca3f6 100%);
        }
      }
    }
    .check-btn {
      color: #00b0ff;
      margin-left: 10px * @ratio;
    }
  }
  .cell-item {
    padding-bottom: 20px * @ratio;
    border-radius: 8px * @ratio;
    margin-top: 12px * @ratio;
    background: #ffffff;
    /deep/ .van-cell__title {
      font-size: 20px * @ratio;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    /deep/ .van-cell__value {
      font-size: 16px * @ratio;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #787878;
    }
    .top {
      display: flex;
      justify-content: space-between;
      margin-top: 16px * @ratio;
      padding: 0 16px * @ratio;
      font-size: 18px * @ratio;
      .icon-view img {
        width: 24px * @ratio;
        height: 24px * @ratio;
      }
    }
    .bottom {
      margin: 11px * @ratio 0px * @ratio 0px * @ratio 16px * @ratio;
      width: 138px * @ratio;
      height: 32px * @ratio;
      background: #f5f5f5;
      border-radius: 8px * @ratio;
      text-align: center;
      line-height: 32px * @ratio;

      font-size: 18px * @ratio;
    }
    .active {
      color: #ff5500;
    }
    .active2 {
      color: #006aff;
    }
    /deep/ .van-cell::after {
      left: 0;
      right: 0;
    }
  }
  .health {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 15px * @ratio;
    .left {
      width: 147px * @ratio;
      background: rgba(71, 249, 180, 0.18);
      border-radius: 7px * @ratio;
      padding: 16px * @ratio;
      .btn {
        background: #00c97e;
      }
    }
    .right {
      width: 147px * @ratio;
      background: rgba(213, 239, 254, 0.58);
      border-radius: 7px * @ratio;
      padding: 16px * @ratio;
      .btn {
        background: #007aff;
      }
    }
    .tit {
      font-size: 22px * @ratio;
      font-weight: 500;
      color: #333333;
      line-height: 25px * @ratio;
    }
    .btn {
      width: 115px * @ratio;
      height: 40px * @ratio;
      border-radius: 4px * @ratio;
      margin-top: 12px * @ratio;
      font-size: 18px * @ratio;
      font-weight: 500;
      color: #ffffff;
      line-height: 40px * @ratio;
      text-align: center;
    }
  }
}
</style>
