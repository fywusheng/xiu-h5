<!--
 * @Description: 首页-尊老头条模块
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-15 23:56:01
-->
<template>
  <div class="page-discory">
    <van-cell value="更多" is-link to="discovery" class="top">
      <template #title>
        <svg-icon icon-class="home-discovery-tit" class-name="custom-class" />
      </template>
      <template #right-icon>
        <van-icon name="arrow" class="search-icon" />
      </template>
    </van-cell>
    <van-swipe autoplay="2000" class="content" style="height: 60px * @ratio;" vertical>
      <van-swipe-item v-for="(item, index) in 4" :index="index" :key="index" class="content-title">
        <div>{{ state.ttl }}十大大苏打大苏打大撒大撒大大阿三大苏打啊实打实大苏打实打实大苏打的</div>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator"></div>
      </template>
    </van-swipe>
    <!-- <div class="content">
      {{ state.ttl }}十大大苏打大苏打大撒大撒大大阿三大苏打啊实打实大苏打实打实大苏打的
    </div> -->
  </div>
</template>

<script>
import { discoveryApi } from "@/api"
import Vue from "vue"
import { Swipe, SwipeItem } from "@ylz/vant"

Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  data() {
    return {
      state: {
        ttl: []
      }
    }
  },
  created() {
    this.getHotWordkey()
  },
  methods: {
    async getHotWordkey() {
      const { data } = await discoveryApi.getCmsHotList({})
      this.state.ttl = data[0].ttl
    }
  }
}
</script>

<style lang="less" scoped>
.page-discory {
  background: #ffffff;
  padding-bottom: 8px * @ratio;
  border-radius: 8px * @ratio;
  overflow: hidden;
  .custom-class {
    font-size: 24px * @ratio;
    width: 7.5em !important;
  }
  .content {
    width: 320px * @ratio;
    height: 60px * @ratio;
    border-radius: 6px * @ratio;
    background: #fef6ee;
    margin: 0 auto;
    .content-title {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 300px * @ratio!important;
        height: 60px * @ratio!important;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 30px * @ratio;
      }
    }
  }
  .search-icon {
    color: #999;
    font-size: 20px * @ratio!important;
    line-height: inherit;
  }
}
/deep/ .van-cell::after {
  border-bottom: none;
}
</style>