<!--
 * @Description: 养老金
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-24 14:10:56
-->
<template>
  <div class="page-pension">
    <div class="card">
      <p class="issuingUnit">北京市人力资源和社会保障厅</p>
      <div class="content">
        <p class="avatar">
          <img :src="state.basicInformation.headPortrait" class="img-block" />
        </p>
        <div>
          <p>
            <span class="label">姓名：</span>
            <span class="text">{{ state.basicInformation.name }}</span>
          </p>
          <p>
            <span class="label">社会保障号码：</span>
            <span class="text">{{ state.basicInformation.socSecuNum }}</span>
          </p>
          <p>
            <span class="label">卡号：</span>
            <span class="text">{{ state.basicInformation.cardNum }}</span>
          </p>
          <p>
            <span class="label">发卡日期：</span>
            <span class="text">{{ state.basicInformation.issuDate }}</span>
          </p>
        </div>
      </div>
      <div class="bottomCard">
        卡号：{{ state.basicInformation.bottomCardNum }}
      </div>
    </div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="query.place" :options="optiosState.place" />
      <van-dropdown-item v-model="query.year" :options="optiosState.year" />
    </van-dropdown-menu>
    <section class="container">
      <div v-for="(item, index) in state.detail" :key="index" @click="jumpPage" class="item">
        <p class="date">{{ item.endAccountDate.slice(0, 6) }}</p>
        <div class="content">
          <div class="left">
            <p>{{ item.endAccountDate.slice(6) }}</p>
            <p>{{ strToDate(item.endAccountDate) }}</p>
          </div>
          <div class="right">
            <p class="top">
              <span>{{ item.abstractA }}</span>
              <span>人民币</span>
            </p>
            <p class="bottom">
              <span class="balance">{{ item.balance }}</span>
              <span class="grantAmount">{{ item.grantAmount }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { rightsApi } from "@/api"
import { DropdownMenu, DropdownItem } from "@ylz/vant"
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  data() {
    return {
      query: {
        place: "北京",
        year: "2021"
      },
      state: {
        detail: [],
        basicInformation: {}
      },
      optiosState: {
        place: [
          { text: "北京", value: "北京" },
          { text: "上海", value: "上海" }
        ],
        year: [{ text: "2021", value: "2021" }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await rightsApi.getIndividualRights()
      this.state = data.pension[this.query.year][this.query.place]
    },
    strToDate(datestr) {
      const year = datestr.slice(0, 4)
      const month = datestr.slice(5, 6)
      const date = datestr.slice(7, 8)
      let dayText = ""
      const day = new Date(`${year}-${month}-${date}`).getDay()
      switch (day) {
      case 0:
        dayText = "周日"
        break
      case 1:
        dayText = "周一"
        break
      case 2:
        dayText = "周二"
        break
      case 3:
        dayText = "周三"
        break
      case 4:
        dayText = "周四"
        break
      case 5:
        dayText = "周五"
        break
      case 6:
        dayText = "周六"
        break
      }
      return dayText
    },
    jumpPage() {
      this.$router.push({ path: `./pension/detail` })
    }
  }
}
</script>

<style lang="less" scoped>
.page-pension {
  padding-top: 15px * @ratio;
  background: #fff;
  .card {
    width: 347px * @ratio;
    height: 221px * @ratio;
    margin: 0 auto;
    background: url("~@/assets/imgs/person-rights/defalt-card.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .issuingUnit {
      padding-top: 17px * @ratio;
      padding-left: 18px * @ratio;
      font-size: 18px * @ratio;
      font-weight: 500;
      color: #333333;
      line-height: 25px * @ratio;
    }
    .content {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 20px * @ratio;
      margin-left: 16px * @ratio;
      .label {
        font-size: 14px * @ratio;
        color: #459bf4;
        line-height: 21px * @ratio;
      }
      .text {
        font-size: 14px * @ratio;
        font-weight: 400;
        color: #333333;
        line-height: 21px * @ratio;
      }
    }
    .avatar {
      width: 66px * @ratio;
      height: 92px * @ratio;
      margin-right: 19px * @ratio;
    }
    .bottomCard {
      position: absolute;
      right: 28px * @ratio;
      bottom: 17px * @ratio;
      font-size: 20px * @ratio;
      font-weight: 400;
      color: #333333;
      line-height: 28px * @ratio;
    }
  }
  /deep/.van-dropdown-menu .van-dropdown-menu__item {
    position: relative;
    width: 120px * @ratio;
    flex: inherit;
  }
  /deep/.van-dropdown-menu .van-dropdown-menu__item:nth-child(1) {
    &::after {
      position: absolute;
      top: 50%;
      right: 0px * @ratio;
      transform: translateY(-50%);
      content: "";
      width: 1px * @ratio;
      height: 20px * @ratio;
      background: #f0f0f0;
    }
  }
  .container {
    background: #f5f5f5;
    padding-top: 16px * @ratio;
    padding-bottom: 40px * @ratio;
    .item {
      width: 343px * @ratio;
      margin: 0 auto;
      margin-bottom: 16px * @ratio;
      .date {
        margin-bottom: 12px * @ratio;
        font-size: 18px * @ratio;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .content {
        border-radius: 8px * @ratio;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        align-items: center;
        // background: #459bf4;
        .left {
          display: flex;
          flex-direction: column;
          width: 65px * @ratio;
          height: 97px * @ratio;
          background: #459bf4;
          border-radius: 8px * @ratio 0px * @ratio 0px * @ratio 8px * @ratio;
          padding-top: 24px * @ratio;
          p {
            font-size: 20px * @ratio;
            text-align: center;
            color: #ffffff;
            font-weight: 500;
          }
        }
        .right {
          width: 278px * @ratio;
          height: 97px * @ratio;
          background: #ffffff;
          .top {
            display: flex;
            justify-content: space-between;
            margin-top: 18px * @ratio;
            padding: 0px * @ratio 16px * @ratio;
            span:nth-child(1) {
              font-size: 18px * @ratio;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
            }
            span:nth-child(2) {
              font-size: 20px * @ratio;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 500;
              color: #333333;
            }
          }
          .bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 12px * @ratio;
            padding: 0px * @ratio 16px * @ratio;
            span:nth-child(1) {
              font-size: 18px * @ratio;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
            span:nth-child(2) {
              font-size: 20px * @ratio;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 500;
              color: #da021b;
              margin-top: -6px * @ratio;
            }
          }
          .project-name {
            font-size: 18px * @ratio;
            color: #333333;
          }
          .rmb {
            font-size: 20px * @ratio;
            color: #333333;
            font-weight: 500;
          }
          .balance {
            font-size: 18px * @ratio;
            color: #999999;
          }
          .grantAmount {
            font-size: 20px * @ratio;
            color: #da021b;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
