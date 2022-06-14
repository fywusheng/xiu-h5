<!--
 * @Description: 搜索返回联想词
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-05 17:15:37
-->
<template>
  <div class="related-words">
    <ul class="content">
      <li
        v-for="(item, index) in state.list"
        :key="index"
        @click="searchRelatedword(item.ttl)"
        class="item"
      >
        <span class="plugs">
          <img :src="require('@/assets/imgs/discovery/icon-search.png')" />
        </span>
        <span v-html="replace(item.ttl)" class="text overflow"></span>
        <span class="arrow">
          <img :src="require('@/assets/imgs/discovery/icon-arrow.png')" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import local from "@/utils/local-storage"
export default {
  props: {
    keyword: {
      type: String,
      default: ""
    },
    historyList: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      state: {
        historyList: [],
        list: []
      }
    }
  },
  watch: {
    historyList: {
      handler(newVal) {
        this.state.historyList = newVal
      },
      immediate: true
    },
    list: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.state.list = newValue
      }
    }
  },
  methods: {
    /**
     * @description 储存搜索历史记录
     * @param keyword 关键字
     */
    searchRelatedword(keyword) {
      this.addHistory()
      this.$router.replace({ path: "search-result", query: { keyword: encodeURIComponent(keyword) } })
    },
    addHistory() {
      let hisList = this.state.historyList
      if (this.keyword == "" || hisList.includes(this.keyword)) {
        return false
      }
      // 储存个数不超过20
      if (hisList.length > 20) {
        hisList = hisList.slice(0, this.state.history.len - 1)
      }
      hisList.unshift(this.keyword)
      local.setItem("discovery-search", JSON.stringify(hisList))
    },
    // 匹配搜索值，改变搜索值颜色
    replace(text) {
      const res = new RegExp("(" + this.keyword + ")", "g")
      text = text.replace(
        res,
        `<span style='color:#0059ff'>${this.keyword}</span>`
      )
      return text
    }
  }
}
</script>

<style lang="less" scoped>
.related-words {
  .item {
    height: 44px * @ratio;
    line-height: 44px * @ratio;
    padding: 0 16px * @ratio;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .plugs {
      width: 20px * @ratio;
      margin-right: 4px * @ratio;
      img {
        width: 100%;
        display: block;
      }
    }
    .text {
      width: 85%;
      // color: #0059ff;
      color: #333;
      font-size: 20px * @ratio;
      height: 28px * @ratio;
      line-height: 28px * @ratio;
    }
    .arrow {
      width: 20px * @ratio;
      height: 20px * @ratio;
      margin-left: 4px * @ratio;
      img {
        width: 100%;
        display: block;
      }
    }
  }
  .overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
}
</style>