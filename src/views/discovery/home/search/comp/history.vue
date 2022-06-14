<!--
 * @Description: 搜索历史记录
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-05 17:34:49
-->
<template>
  <div>
    <div v-show="state.historyList > 0" class="bar">
      <p>搜索历史</p>
      <p @click="clear">
        <van-icon :name="require('@/assets/svg/map/icon-delete.svg')" />清空
      </p>
    </div>
    <ul class="content">
      <li v-for="(item, index) in state.historyList" :key="index" class="item">
        <span class="text overflow">{{ item }}</span>
        <span @click="clearItem(index)" class="close">
          <img :src="require('@/assets/imgs/discovery/icon-close.png')" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Dialog } from "@ylz/vant"
import local from "@/utils/local-storage"
export default {
  props: {
    historyList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  watch: {
    historyList: {
      handler(newVal) {
        this.state.historyList = newVal
      },
      immediate: true
    }
  },
  data() {
    return {
      state: {
        historyList: []
      }
    }
  },
  methods: {
    /**
     * @description 清除历史记录中某一项
     * @param index 索引
     */
    clearItem(index) {
      this.state.historyList.splice(index, 1)
      local.setItem("discovery-search", JSON.stringify(this.state.historyList))
    },
    // 清空历史记录
    clear() {
      Dialog.confirm({
        title: "",
        message: "确认删除全部搜索历史？"
      }).then(() => {
        this.state.historyList = []
        local.clear()
      }).catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px * @ratio;
  font-weight: 500;
  color: #333333;
  line-height: 28px * @ratio;
  margin-top: 10px * @ratio;
}
.content {
  .item {
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      width: 85%;
      height: 44px * @ratio;
      line-height: 44px * @ratio;
      color: #333333;
    }
    .close {
      width: 20px * @ratio;
      height: 20px * @ratio;
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>