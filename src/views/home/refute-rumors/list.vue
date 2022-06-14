<!--
 * @Description: 辟谣列表
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 20:30:16
-->
<template>
  <div class="page-refute-rumors">
    <div class="header">
      <img :src="require('@/assets/imgs/common/home-refute-rumors.png')" />
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" offset="400" @load="onLoad" class="list">
      <p v-for="(item, index) in state.list" :key="index" @click="toDetail(item.contId)" class="item">
        <span class="tit">
          {{ item.ttl }}
        </span>
        <span class="date">{{ item.crteTime | parseTimeFn }}</span>
      </p>
    </van-list>
  </div>
</template>

<script>
import { commonApi } from "@/api"
import { parseTime } from "@/utils/dayjs"
export default {
  data() {
    return {
      loading: false,
      finished: false,
      state: {
        pageNum: 1,
        list: []
      }
    }
  },
  methods: {
    async onLoad() {
      this.getList()
      this.state.pageNum += 1
    },
    async getList() {
      const { data } = await commonApi.selectRumorByDTO({
        pageNum: this.state.pageNum,
        pageSize: 10
      })
      if (!data.list) {
        this.finished = true
      }
      this.loading = false
      this.state.list = [...this.state.list, ...data.list]
    },
    toDetail(id) {
      this.$router.push(`../refute-rumors-detail/${id}`)
    }
  },
  filters: {
    parseTimeFn(time) {
      return parseTime(time, "{y}-{m}-{d}")
    }
  }
}
</script>

<style lang="less" scoped>
.page-refute-rumors {
  .header {
    width: 343px * @ratio;
    margin: 12px * @ratio auto 12px * @ratio auto;
    img {
      width: 100%;
      display: block;
    }
  }
  .list {
    border-top: #eeeeee 8px * @ratio solid;
    .item {
      margin: 0 16px * @ratio;
      border-bottom: 2px * @ratio solid #eeeeee;
      height: 60px * @ratio;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px * @ratio;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #323233;
      .tit {
        width: 234px * @ratio;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .date {
        width: 102px * @ratio;
        color: #999999;
        font-size: 18px * @ratio;
        text-align: right;
      }
    }
  }
}
</style>