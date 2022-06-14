<!--
 * @Description: 惠老服务
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 00:23:13
-->
<template>
  <div class="page-service">
    <van-cell class="top">
      <template #title>
        <span class="bor"></span>
        <span class="custom-title">惠老服务</span>
      </template>
    </van-cell>
    <van-tabs class="tabs" swipe-threshold="4" @click="showList">
      <img class="mask-right" src="@/assets/imgs/home/white_mask.png" alt="">
      <van-tab v-for="(item, index) in navList" :key="index">
        <template #title>
          <dl class="tab">
            <dt class="pic">
              <img :src="item.serviceIcon" class="img-block" />
            </dt>
            <dd class="text">{{ item.serviceName }}</dd>
          </dl>
        </template>
      </van-tab>
    </van-tabs>
    <div class="divider">推荐服务</div>
    <div class="list">
      <service-item v-for="(item, index) in state.list" :key="index" :item="item.value">{{ item }}</service-item>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "@ylz/vant"
import { serviceApi } from "@/api"
import serviceItem from "./item"
export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    serviceItem
  },
  data() {
    return {
      state: {
        list: []
      },
      navList: []
    }
  },
  created() {
    this.getFirstClass()
    this.getHotList()
  },
  methods: {
    showList(name) {
      let path = ""
      if (name === 0) {
        path = "health-check"
      }
      if (name === 1) {
        path = "house-keeping"
      }
      if (name === 2) {
        path = "culture-entertainment"
      }
      if (name === 3) {
        path = "travel"
      }
      if (name === 4) {
        path = "health-care"
      }
      this.$router.push({
        path: `service/${path}`,
        query: { classId: `${this.navList[name].serviceId}` }
      })
    },
    async getHotList() {
      const { data } = await serviceApi.findHotService({
        size: 10
      })
      this.state.list = data
    },
    async getFirstClass() {
      const { data } = await serviceApi.getFirstClass()
      this.navList = data
    }
  }
}
</script>

<style lang="less" scoped>
.page-service {
  border-top: 12px * @ratio solid #f5f5f5;
  border-radius: 18px * @ratio 18px * @ratio 8px * @ratio 8px * @ratio;
  background: #ffffff;
  .top {
    border-radius: 8px * @ratio;
  }
  .tabs {
    position: relative;
    .mask-right {
      position: absolute;
      top: 0;
      right: -1px * @ratio;
    }
    .mask-left {
      position: absolute;
      top: 0;
      left: -1px * @ratio;
    }
  }
  .custom-title {
    font-weight: 600;
    color: #333333;
  }
  .van-tabs {
    margin: 0 auto;
    width: 319px * @ratio;
  }
  .bor {
    height: 85%;
    vertical-align: middle;
    display: inline-block;
    margin-right: 3px * @ratio;
    border-left: 5px * @ratio solid #ff5121;
    border-radius: 5px * @ratio;
  }
  .divider {
    width: 187px * @ratio;
    margin: 0 auto;
    margin-bottom: 9px * @ratio;
    text-align: center;
    background: url("~@/assets/imgs/common/home-service.png") no-repeat center
      center;
    background-size: contain;
  }
  .list:last-child {
    border-bottom: none;
  }
  .tab {
    .pic {
      width: 50px * @ratio;
      height: 50px * @ratio;
      margin: 0 auto;
    }
    .text {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #333333;
      line-height: 25px * @ratio;
    }
  }
  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 100px * @ratio;
  }
  /deep/ .van-tabs__wrap--scrollable .van-tab {
    padding: 0 8px * @ratio;
    &:first-child {
      padding-left: 0px * @ratio;
    }
  }
  /deep/ .van-tabs__line {
    display: none;
  }
}
</style>