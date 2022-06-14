<!--
 * @Description: 搜索页面
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-29 15:58:48
-->
<template>
  <div>
    <van-search v-model.trim="state.keyword" :autofocus="true" show-action left-icon="" placeholder="请输入搜索关键词" @input="onInput" @search="onSearch" @cancel="onCancel" class="search-bar">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-notice-bar v-if="state.hotList.length > 0" :scrollable="false">
      <van-swipe vertical :autoplay="3000" :show-indicators="false" class="notice-swipe">
        <van-swipe-item v-for="(item, index) in state.hotList" :key="index">
          {{ item.ttl }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <div v-show="state.keyword === ''" class="history">
      <history :history-list="state.historyList" />
    </div>
    <related-words :keyword="state.keyword" :history-list="state.historyList" :list="state.list" />
  </div>
</template>

<script>
import { NoticeBar, Swipe, SwipeItem, Dialog } from "@ylz/vant"
import { discoveryApi } from "@/api"
import local from "@/utils/local-storage"
import relatedWords from "./comp/related-words"
import history from "./comp/history"
export default {
  components: {
    history,
    relatedWords,
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      state: {
        keyword: "",
        relatedWord: "",
        list: [],
        historyList: [],
        hotList: []
      }
    }
  },
  created() {
    if (local.getItem("discovery-search")) {
      this.state.historyList = JSON.parse(local.getItem("discovery-search"))
    }
    this.getHotWordkey()
  },
  methods: {
    // 获取字符长度
    getByteLen(val) {
      let len = 0
      for (let i = 0; i < val.length; i++) {
        const a = val.charAt(i)
        // /[^\x00-\xff]/ig
        if (a.match(/[^x00-\xff]/ig) != null) {
          len += 2
        } else {
          len += 1
        }
      }
      return len
    },
    onInput(keyword) {
      clearTimeout(this.timer)
      const len = this.getByteLen(keyword)
      if (len > 64) {
        this.$toast("不能超过32个汉字")
        this.state.keyword = keyword.substring(0, 32)
        return false
      }
      this.timer = setTimeout(async() => {
        if (keyword !== "") {
          this.state.keyword = keyword
          const { data } = await discoveryApi.selectArtiListByKey({
            keyWord: keyword,
            pageNum: 1,
            pageSize: 20
          })
          this.state.list = data.list
        } else {
          this.state.keyword = ""
          this.state.list = []
        }
      }, 450)
    },
    onSearch() {
      console.log("搜索")
    },
    onCancel() {
      this.state.keyword = ""
      this.$emit("keyword", "")
    },
    // 获取热点新闻
    async getHotWordkey() {
      const { data } = await discoveryApi.getCmsHotList({})
      this.state.hotList = data
    }
  }
}
</script>

<style lang="less" scoped>
.notice-swipe {
  height: 25px * @ratio;
  line-height: 25px * @ratio;
  background-color: #fff;
  color: #333333;
}
/deep/ .van-notice-bar {
  background-color: #fff;
}
.history {
  padding: 0 16px * @ratio;
}
.search-bar {
  background: #ffffff;
  border-radius: 22px * @ratio;
  border: 1px solid #ff5500;
  width: 313px * @ratio;
  height: 44px * @ratio;
  margin: 4px auto;
}
/deep/ .van-search__content {
  background-color: #fff;
}
</style>