<!--
 * @Description: 地点详情-周边搜索
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-27 18:45:01
-->
<template>
  <div>
    <section class="search-bar">
      <van-search
        v-bind="$attrs"
        v-on="$listeners"
        v-model="state.orgOfficeName"
        placeholder="搜索地点、美食、景点..."
        :autofocus="true"
        show-action
      >
        <template #action>
          <div @click="onSearch(state.orgOfficeName)" class="search-button">
            取消
          </div>
        </template>
      </van-search>
      <!-- getClassId -->
      <dropdownMenu
        @filterDistance="filterDistance"
        @filterClass="filterClass"
      ></dropdownMenu>
    </section>
    <van-list
      v-model="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="search-result-list"
    >
      <div v-for="(item, index) in state.list" :key="index" class="item">
        <div class="left">
          <img v-if="item.photos" :src="item.photos[0].url" />
          <img v-else :src="require('@/assets/imgs/map/default-place.png')" />
        </div>
        <div class="right" @click="goDetail(item)">
          <div class="tit">{{ item.orgOfficeName }}</div>
          <div class="text xz-ellipsis">{{ item.orgOfficeType == undefined ? "其它" : item.orgOfficeType}} | {{ item.distance | distance }}</div>
          <div class="text xz-ellipsis">
            <span v-if="!item.orgOfficeId" class="addr">{{
              item.address
            }}</span>
            <span v-else class="addr">{{ item.orgOfficeAddrDetail }}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Rate, DropdownMenu, DropdownItem } from "@ylz/vant"
import CompleteApi from "../../../model/merge-data"
import dropdownMenu from "./dropdown-menu"

const completeApi = new CompleteApi()
export default {
  name: "nearbySearch",
  components: {
    [Rate.name]: Rate,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    dropdownMenu
  },
  data() {
    return {
      state: {
        list: [],
        orgOfficeName: "",
        curIndex: 0,
        loading: false,
        finished: false
      },
      queryState: {
        distance: 0,
        type: "",
        curPage: 1,
        pageSize: 20
      }
    }
  },
  mounted(){
    console.log("====queryname---",this.$route.query.name)
    this.state.orgOfficeName = this.$route.query.name || ""
  },
  methods: {
    goDetail(val) {
      let rootPath = ""
      console.log("===val.orgOfficeId===",val.orgOfficeId,val.orgOfficeType)
      if (val.orgOfficeType === "医院") {
        rootPath = "hospital-details"
      }
      if (val.orgOfficeType === "景点") {
        rootPath = "scenic-details"
      }
      if (val.orgOfficeType === "住宿") {
        rootPath = "hotel-details"
      }
      if (val.orgOfficeType === "商超") {
        rootPath = "store-details"
      }
      if (val.orgOfficeType === "药店") {
        rootPath = "pharmacy-details"
      }
      if (val.orgOfficeType === "养老院") {
        rootPath = "nursing-home-details"
      }
      if (val.orgOfficeType === "政务服务") {
        rootPath = "government-details"
      }
      if (val.orgOfficeType === "日间照料") {
        rootPath = "look-after-details"
      }
      if (val.orgOfficeType === "助餐点") {
        rootPath = "help-meal-details"
      }
      if (val.orgOfficeType === "美食") {
        rootPath = "delicious-food-details"
      }
      if (val.orgOfficeId) {
        this.$router.push({ path: `${rootPath}/${decodeURIComponent(val.orgOfficeId)}` })
      } else {
        this.$toast("暂无详情信息")
      }
    },
    async onLoad() {
      const distance = [500, 1000, 2000, 3000]
      this.queryState.distance = distance[this.state.curIndex]
      const list = await this.getList()
      if (list.length === 0) {
        this.state.curIndex += 1
        this.queryState.distance = distance[this.state.curIndex]
        this.getList()
      }
      if (list.length === 20) {
        this.state.list = [...this.state.list, ...list]
        this.state.loading = false
        this.queryState.curPage += 1
      }
    },
    async getList() {
      const list = await completeApi.getNearBySearch(this.queryState)
      this.state.list = [...this.state.list, ...list]
      if (list.length < 20) {
        this.state.loading = false
        this.state.finished = true
      }
      return new Promise(resolve => {
        resolve(list)
      })
    },
    async filterDistance(val) {
      this.queryState.curPage = 1
      if (val === "null") {
        this.queryState.distance = ""
      }
      this.queryState.distance = val
      this.state.list = []
      await this.getList()
    },
    async filterClass(val) {
      this.queryState.curPage = 1
      this.queryState.type = val
      this.state.list = []
      await this.getList()
    },
    onSearch() {
      console.log("搜索")
      window.history.go(-1)
    }
  },
   filters: {
    distance(val) {
      if (val) {
        return val > 1000 ? (val / 1000).toFixed(2) + "公里" : parseInt(val) + "米"
      } else {
        return "暂无数据"
      }
    }
  }

}
</script>

<style lang="less" scoped>
.search-bar {
  box-shadow: 0px 1px * @ratio 8px * @ratio 0px rgba(223, 213, 206, 0.54);
  border: 1px * @ratio solid #ececec;
  /deep/.van-search__content {
    border: 1px solid #ff5000;
    border-radius: 24px * @ratio;
  }
   /deep/.van-search .van-field__body input{
    font-size: 14px * @ratio;
    color: #666;
  }
  .search-button{
     font-size: 15px * @ratio;
  }
}
.search-result-list {
  padding: 0 16px * @ratio;
  border-top: solid #f2f2f2 8px * @ratio;
  padding-top:10px * @ratio;
  .item {
    margin-bottom: 5px * @ratio;
    display: flex;
    width: 100%;
    .left {
      display: inline-block;
      width: 111px * @ratio;
      height: 110px * @ratio;
      margin-right: 7px * @ratio;
      overflow: hidden;
      // background-color: #333;
      img {
        width: 100%;
        display: block;
        height:100%;
      }
    }
    .right {
      // flex: 0 0 225px * @ratio;
      display: inline-block;
      width: 225px * @ratio;
      .tit {
        width: 100%;
        font-size: 20px * @ratio;
        color: #333;
        line-height: 28px * @ratio;
        margin-bottom: 12px * @ratio;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .text {
        font-size: 16px * @ratio;
        color: #666;
        line-height: 25px * @ratio;
        margin-bottom: 8px * @ratio;
      }
      .labels .item {
        color: #ff5500;
        padding: 2px * @ratio 8px * @ratio;
        background: #ffffff;
        border-radius: 2px * @ratio;
        border: 1px * @ratio solid #ff5500;
        margin-right: 8px * @ratio;
      }
    }
  }
}
</style>