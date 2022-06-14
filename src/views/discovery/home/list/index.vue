<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 15:22:24
-->
<template>
  <div>
    <van-search
      v-model="state.keyword"
      show-action
      left-icon=""
      placeholder="请输入搜索关键词"
      onlyReady
      @click="clickSearchBar"
      class="search-bar"
      maxlength="64"
    >
      <template #action>
         <div class="rightW">
            <span class="line"></span>
            <img src="@/assets/imgs/discovery/_voice.png" alt="">
         </div>
      </template>
    </van-search>
    <van-tabs v-model="state.columnActive" @change="changeCol" swipeable>
      <van-tab
        v-for="(item, index) in state.columns"
        :name="item.colId"
        :title="item.colName"
        :key="index"
      >
        <list-content :col-id="state.colId" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "@ylz/vant"
import { discoveryApi } from "@/api"
import listContent from "./content"
export default {
  components: {
    listContent,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  },
  data() {
    return {
      state: {
        colId: "",
        columns: [],
        columnActive: 0
      }
    }
  },
  created() {
    this.getColumn()
  },
  methods: {
    async changeCol(name) {
      this.state.colId = name
    },
    async getColumn() {
      const { data } = await discoveryApi.queryColList({
        cityCodg: "110105",
        cityName: "北京市"
      })
      if (data[0]) {
        this.state.colId = data[0].colId
      }
      this.state.columns = data
    },
    clickSearchBar() {
      this.$emit("clickSearch")
    }
  }
}
</script>

<style lang="less" scoped>
.line{
  width:1px * @ratio;
  height:13px * @ratio;
  border:0.1px solid #C9C9C9;
  line-height:13px * @ratio;
  margin-right: 5px * @ratio;
}
.rightW{
  img{
    vertical-align:sub;
  }
}
.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.search-bar {
  background: #ffffff;
  border-radius: 22px * @ratio;
  border: 1px solid #ff5500;
  width: 343px * @ratio;
  height: 44px * @ratio;
  margin: 8px auto;
}
/deep/ .van-tab {
  color: #999;
}
/deep/ .van-tab--active {
  color: #333333;
  font-weight: 500;
}
/deep/.van-search__content {
  background-color: #fff;
}
</style>