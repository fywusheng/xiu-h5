<!--
 * @Description: 列表内容
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 16:27:28
-->
<template>
  <div>
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
      <van-list
        v-model="state.loading"
        :finished="state.finished"
        offset="100"
        finished-text="暂无更多内容"
        @load="onLoad"
      >
        <div class="top-article">
          <p
            v-for="(item, index) in state.topList"
            :key="index"
            class="item-top overflow"
          >
            <span class="icon-top">置顶</span>
            <span>{{ item.ttl }}</span>
          </p>
        </div>
        <div class="content">
          <component
            v-for="(item, index) in state.list"
            :key="index"
            :is="handleTempType(item.tempType)"
            :item="item"
            class="item"
          ></component>
        </div>
      </van-list>
    </van-pull-refresh>
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
  props: {
    colId: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      state: {
        loading: false,
        refreshing: false,
        finished: false,
        topList: [],
        list: []
      },
      queryState: {
        colId: "",
        pageNum: 1,
        pageSize: 20
      },
      refreshState: {
        colId: "",
        randStr: "",
        cityCodg: ""
      }
    }
  },
  watch: {
    colId: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.queryState.colId = newValue
        this.refreshState.colId = newValue
      }
    }
  },
  methods: {
    // 分页加载
    async onLoad() {
      const { data } = await discoveryApi.selectArtiListByColId(this.queryState)
      if (!data.list) {
        this.state.finished = true
        return false
      }
      this.filterArtType(data.list)
      this.state.list = [...this.state.list, ...data.list]
      this.state.loading = false
      this.queryState.pageNum = this.queryState.pageNum + 1
      if (data.list.length < this.queryState.pageSize) {
        this.state.finished = true
      }
      this.getTopArticle()
    },
    // 下拉刷新
    async onRefresh() {
      if (this.refreshState.colId.indexOf("cityCodg") > -1) {
        this.refreshState.colId = ""
      }
      const { data } = await discoveryApi.getCmsReflushList(this.refreshState)
      this.state.refreshing = false
      this.$nextTick(() => {
        this.state.list = data.artiDTOList.concat(this.state.list)
      })
    },
    //获取置顶文章
    async getTopArticle() {
      let colId = "", cityCodg = ""
      if (this.colId.indexOf("cityCodg") !== -1) {
        cityCodg = this.colId.slice(this.colId.indexOf("g") + 1, this.colId.length)
      } else {
        colId = this.colId
      }
      const { data } = await discoveryApi.getTopList({
        colId: colId,
        cityCodg: cityCodg
      })
      this.state.topList = data
    },
    // 动态模板类型
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
    },
    /**
     * 过滤文章类型
     * @param list 文章列表
     */
    filterArtType(list) {
      const audioList = list.filter(item => item.artiType === "0")
      this.$store.dispatch("discovery/getAudioList", audioList)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 16px * @ratio;
  &:last-child {
    border-bottom: none;
  }
  .item {
    margin-top: 15px * @ratio;
  }
}
.top-article {
  padding: 0 16px * @ratio;
  .item-top {
    padding: 18px * @ratio 0;
    font-size: 20px * @ratio;
    color: #323233;
    .icon-top {
      display: inline-block;
      width: 50px * @ratio;
      height: 30px * @ratio;
      background: #ff9a00;
      border-radius: 4px * @ratio;
      line-height: 30px * @ratio;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      margin-right: 9px * @ratio;
    }
  }
}
.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>