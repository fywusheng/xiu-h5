<!--
 * @Description: 养老地图首页
 * @Version: 0.1
 * @Autor: chendh
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-31 15:05:33
-->
<template>
  <div class="map-page">
    <div class="main">
      <!-- 搜索框 -->
      <div class="searcch-cont">
        <van-icon class="leftIcon" name="arrow-left" @click="returnGo" />
        <div class="search-bar">
          <van-search
            v-model="keyword"
            placeholder="搜索地点、美食、景点..."
            show-action
            @click="handleShowSearch"
            left-icon=""
          >
            <template #action>
              <div @click="handleShowSearch" class="search-button">
                <span class="_line">|</span>
                <svg-icon icon-class="voice" class-name="custom-class" />
              </div>
            </template>
          </van-search>
        </div>
      </div>
      <!-- 地图 -->
      <comp-map
        ref="amap"
        :is-search="searchState.isSearch"
        @clickMarker="handleClickMarker"
        @hideSummry="hideSummary"
      />
      <!-- 底部导航 -->
      <bottom-nav v-show="showNav" @setMarkers="setMarkers" />
      <!-- 地点概要 -->
      <div
        v-show="summaryState.show"
        :class="summaryState.down ? 'down' : ''"
        class="container-summary"
      >
       <div class="down_up" @click="_change"> <van-icon color="#cfcfcf" :name="summaryState.down ? 'arrow-up': 'arrow-down'" size="18px" class="arrow" /></div>
       <!--  @handleShow="showSummary" -->
        <summary-info
          :org-office-id="summaryState.orgOfficeId"
          class="detail-popup"
        ></summary-info>
      </div>
      <div class="red-bag" @click="redBagClick">
        <img src="@/assets/svg/map/red-bag.png" alt="red-bag" />
      </div>
    </div>
    <div v-show="searchState.isShow" class="seach-container">
      <search-page
        ref="search"
        :show="searchState.isShow"
        @fuzzySearch="fuzzySearch"
        @preciseSearchKeyword="preciseSearchKeyword"
        :hot-keyword="searchState.hotKeyword"
        @hideSearch="hideSearch"
      />
    </div>
  </div>
</template>
<script>
import compMap from "./amap"
import BottomNav from "./nav"
import SummaryInfo from "./summary"
import SearchPage from "./search"
import Markers from "../../controller/markers"

export default {
  components: {
    compMap,
    SummaryInfo,
    BottomNav,
    SearchPage
  },
  data() {
    return {
      keyword: "", // 搜索关键词
      showNav: true, // 是否展示导航
      searchState: {
        isSearch: false,
        isShow: false,
        hotKeyword: []
      },
      summaryState: {
        orgOfficeId: "",
        show: false,
        down: false,
        info: {}
      }
    }
  },
  destroyed() {
    this.summaryState.show = false
    this.searchState.isShow = false
  },
  created(){
    this.searchState.isShow = false
  },
  watch:{
   keyword:{
      immediate: true,
      handler(newV) {
       sessionStorage.setItem('key_word',newV)
      }
   }
  },
  methods: {
    hideSearch(){
      this.searchState.isShow = false
      this.showNav = true
    },
    returnGo(){
      this.$router.go(-1);
    },
    _change(){
      this.summaryState.down = !this.summaryState.down
      const downFlag = this.summaryState.down ?'down':''
      this.showSummary(downFlag)
    },
    // 设置多个标记点
    setMarkers(val) {
      this.summaryState.show = false
      this.$refs.amap.setMarkers(val)
    },
    /**
     * @description 点击点标记,展示地点概要
     * @param {String} orgOfficeId 标记点id
     */
    async handleClickMarker(item) {
      this.summaryState.orgOfficeId = item.orgOfficeId || item.id
      this.summaryState.show = true
      this.summaryState.down = false
      this.searchState.isShow = false
      window.event.cancelBubble = true
    },
    /**
     * @description: 点击搜索框，获取搜索热词
     * @param {int} size 返回数量
     * @param {String} areaCode 城市代码
     */
    async handleShowSearch() {
      this.showNav = false
      this.searchState.isShow = true
      this.$refs.search.getTopKeyWord()
    },
    showSummary(val) {
      this.summaryState.down = val
    },
    hideSummary() {
      this.summaryState.show = false
    },
    // 关键字模糊搜索
    async fuzzySearch({ data, keyword }) {
      this.keyword = keyword
      const fn = this.handleClickMarker
      this.searchState.isSearch = true
      this.searchState.isShow = false
      this.summaryState.show = false
      this.showNav = true
      const marker = new Markers()
      const ret = await marker.setMultipleMark(fn, data)
      this.$refs.amap.setMarkers(ret, true)
    },
    // 关键字精确搜索，标记地点
    async preciseSearchKeyword({ item, keyword }) {
      this.searchState.isSearch = true
      this.searchState.isShow = false
      this.summaryState.orgOfficeId = item.orgOfficeId || item.id
      const markers = new Markers()
      const ret = await markers.setSingleMark(item)
      this.$refs.amap.setMarkers(ret, true)
      this.summaryState.show = true
      this.showNav = true
      this.keyword = keyword
    },
    // 红包点击
    redBagClick() {
      this.$toast("功能建设中")
      return
      this.$router.push({
        path: "/red-bag"
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  .searcch-cont {
    // width: 100%;
    position: fixed;
    top: 22px;
    z-index: 199;
    background: #fff;
    // padding: 10px * @ratio 0;

    height: 52px * @ratio;
    width: 93%;
    left: 13px * @ratio;
    right: 13px * @ratio;
    box-shadow: 0px * @ratio 1px * @ratio 8px * @ratio 0px * @ratio rgb(223 213 206 / 54%);
    border-radius: 8px * @ratio;
    display:flex;
   .leftIcon{
    width: 36px * @ratio;
    line-height: 54px * @ratio;
    text-align: right;
    font-size: 22px * @ratio;
   }
    .search-bar {
      // margin: 0 16px * @ratio;
      box-shadow: 0px 1px 8px * @ratio 0px rgba(223, 213, 206, 0.54);
      overflow: hidden;
      border-radius: 24px * @ratio;
      border: 1px solid #ff5000;
      height: 40px * @ratio;
      margin: 6px * @ratio 16px * @ratio 8px * @ratio 8px * @ratio;
      width:100%;
      .message {
        font-size: 24px * @ratio;
      }
      .van-search__action {
        line-height: inherit;
      }
      .icon {
        font-size: 24px * @ratio;
        color: @second_text_color;
      }
    }
    /deep/ .van-search__content {
      background: none;
      padding-left:0px * @ratio; 
    }
  }
  .van-search {
    height: 25px * @ratio;
    margin-top: 6px * @ratio;
    margin-left: 10px * @ratio;
    margin-right: 10px * @ratio;
    padding:0px * @ratio;
    .van-cell__value {
      line-height: 40px * @ratio;
    }
    .van-cell {
      flex: 1;
      padding: 4px * @ratio 8px * @ratio 4px * @ratio 0;
    }
    /deep/ .van-field__control {
      font-size: 18px * @ratio;
    }
  }
  .red-bag {
    position: absolute;
    top: 60px * @ratio;
    right: 0;
    z-index: 199;
    img {
      width: 100px * @ratio;
    }
  }
}

.container-summary {
    position: fixed;
    background: #fff;
    bottom: 12%;
    transition: all 0.5s ease-in 0.3s;
    width: 354px * @ratio;
    height: 236px * @ratio;
    background: #FFFFFF;
    // box-shadow: 0px -2px * @ratio 3px * @ratio 0px * @ratio rgb(0 0 0 / 8%);
    border-radius: 12px * @ratio;
    transform: translate(13px * @ratio, 0px * @ratio);
    padding: 0px * @ratio 8px * @ratio 0px * @ratio 10px * @ratio;
    z-index:111;
    .down_up {
    height: 35px * @ratio;
    line-height: 35px * @ratio;
    text-align: center;
}
  &.down {
    bottom: -5%;
  }
  // .detail-popup {
  //   width: 100%;
  //   box-shadow: 0px -2px * @ratio 3px * @ratio 0px rgba(0, 0, 0, 0.08);
  //   border-radius: 12px * @ratio;
  //   padding: 9px * @ratio;
  //   height: 229px * @ratio;
  //   padding-top:0px * @ratio;
  // }
}
.seach-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 299;
}
.search-button{
  ._line{
    color:#c9c9c9
  }
  .custom-class {
    width: 24.94px * @ratio;
    height: 24.94px * @ratio;
    vertical-align: text-top;
    margin-left: 5px * @ratio;
  }
}

</style>
