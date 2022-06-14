<!--
 * @Description: 搜索结果页
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-05 16:02:34
-->
<template>
  <div>
    <van-search
      v-model="state.keyword"
      show-action
      left-icon=""
      readonly
      placeholder="请输入搜索关键词"
      class="search-bar"
      maxlength="64"
    />
    <template v-if="list.length > 0">
      <van-list
        v-model="loading"
        :finished="state.finished"
        offset="100"
        finished-text="暂无更多内容"
        @load="onLoad"
      >
        <div class="content">
          <component
            v-for="(item, index) in list"
            :key="index"
            :is="handleTempType(item.tempType)"
            :item="item"
            :keyword="state.keyword"
            class="item"
          ></component>
        </div>
      </van-list>
    </template>
    <van-empty
      v-if="list.length === 0"
      class="custom-image"
      :image="require('@/assets/imgs/common/no-data.png')"
      description="没有找到相关资讯，换个词搜搜看吧!"
    />
  </div>
</template>

<script>
import { PullRefresh } from "@ylz/vant"
import { discoveryApi } from "@/api"
import noPicture from "../comp-article/noPicture"
import onePicture from "../comp-article/onePicture"
import threePictures from "../comp-article/threePictures"
import videoItem from "../comp-article/videoItem"
export default {
  components: {
    noPicture,
    onePicture,
    threePictures,
    videoItem,
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      loading: false,
      state: {
        keyword: "",
        pageNum: 1,
        pageSize: 20
      },
      list: []
    }
  },
  created() {
    const keyword = this.$route.query && this.$route.query.keyword
    this.state.keyword = decodeURIComponent(keyword)
  },
  methods: {
    search() {
      this.$emit("search")
    },
    async onLoad() {
      const { data } = await discoveryApi.selectArtiListByKey(this.state)
      this.list = this.list.concat(data.list)
      this.loading = false
      if (data.list.length < 20) {
        this.state.finished = true
      }
    },
    handleTempType(type) {
      if (type === "0") {
        return "noPicture"
      }
      if (type === "1") {
        return "onePicture"
      }
      if (type === "2") {
        return "threePictures"
      }
      if (type === "3") {
        return "videoItem"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 16px * @ratio;
  .item {
    margin-top: 15px * @ratio;
  }
}
.search-bar {
  background: #ffffff;
  border-radius: 22px * @ratio;
  border: 1px solid #ff5500;
  width: 313px * @ratio;
  height: 44px * @ratio;
  margin: 4px auto;
}
/deep/.van-search__content {
  background-color: #fff;
}
/deep/ .custom-image .van-empty__image {
  margin-top: 20%;
  width: 220px * @ratio;
  height: 117px * @ratio;
  .van-empty__description {
    font-size: 18px;
    color: #666666;
  }
}
</style>