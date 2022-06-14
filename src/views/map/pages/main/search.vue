<template>
  <div class="search-page">
    
    <!-- 搜索框 -->
    <div class="search-bar">
      <van-icon class="leftIcon" name="arrow-left" @click="returnGo" />
      <van-search
        v-bind="$attrs"
        v-on="$listeners"
        v-model="queryState.orgOfficeName"
        placeholder="搜索地点、美食、景点..."
        :autofocus="true"
        show-action
        @input="realTimeSearch"
        left-icon=""
      >
        <template #action>
          <div
            @click="fuzzySearch(queryState.orgOfficeName)"
            class="search-button"
          >
            搜索
          </div>
        </template>
      </van-search>
    </div>
    <div v-show="initStatus">
      <!-- 搜索记录 -->
      <div class="search-history" v-show="state.history.list.length > 0">
        <div class="search-tit">
          <p>最近搜索</p>
          <p @click="clear" class="clear">
            <van-icon name="delete" class="icon" />清空
          </p>
        </div>
        <div class="search-cont">
          <span
            v-for="(item, index) in state.history.list"
            :key="index"
            @click="fuzzySearch(item)"
            class="search-item"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="search-history hot-search">
        <div class="search-tit">
          <p>大家都在搜</p>
        </div>
        <div class="search-cont">
          <span
            v-for="(item, index) in state.hotKeyword"
            :key="index"
            @click="fuzzySearch(item.value)"
            class="search-item"
            >{{ item.value }}</span
          >
        </div>
      </div>
    </div>
    <!-- 搜索结果  @load="$listeners.load" -->
    <div v-show="!initStatus" class="search-result">
      <p v-show="state.searchResult.length === 0" class="keyword">
        <van-icon name="search" /> 查找
        <span class="text">"{{ queryState.orgOfficeName }}"</span>
      </p>
      <van-list
        v-model="_loading"
        :finished="$attrs.finished"
        :immediate-check="false"
        class="result-cont"
        finished-text="没有更多了"
      >
        <div
          v-for="(item, index) in state.searchResult"
          :key="index"
          class="item"
        >
          <div><van-icon name="location-o" class="icon" /></div>
          <div class="info">
            <p v-html="replace(item.orgOfficeName)"></p>
            <p>
              <span v-if="item.orgOfficeType">
                {{ item.orgOfficeType }} |
              </span>
              <span>
                {{ item.orgOfficeAddrDetail || item.address }}
              </span>
            </p>
            <p>距离您：{{ item.distance | parseKilometer }}</p>
            <p @click="preciseSearchKeyword(item)" class="btn">查看地点</p>
          </div>
        </div>
      </van-list>
    </div>
    <recorder @analysis="analysis"/>
  </div>
</template>
<script>
import { RadioGroup, Radio, Dialog } from "@ylz/vant"
import { mapApi } from "@/api"
import CompleteApi from "../../model/merge-data"
import Markers from "../../controller/markers"
import recorder from "./recorder"
const completeApi = new CompleteApi()
export default {
  name: "search",
  components: {
    recorder
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    },
    lonLat: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      state: {
        searchResult: [],
        hotKeyword: [],
        history: {
          len: 30,
          list: []
        }
      },
      queryState: {
        orgOfficeName: ""
      }
    }
  },
  created() {
    if (localStorage.getItem("search")) {
      this.state.history.list = JSON.parse(localStorage.getItem("search"))
    }
  },
  watch: {
    show: {
      immediate: true,
      deep: true,
      handler(newValue) {
      }
    }
  },
  computed: {
    initStatus() {
      return this.queryState.orgOfficeName.length === 0
    },
    _loading: {
      get() {
        return this.loading
      },
      set(val) {
        this.$emit("update:loading", val)
      }
    }
  },
  methods: {
    returnGo(){
      console.log(11111)
      this.$emit('hideSearch')
    },
    /**
     * @description：监听input变化 实时搜索
     * @param {string} orgOfficeName:关键字 
     * @param {int} orgOfficeLon: 经度
     * @param {int} orgOfficeLat：纬度
     * @param {int} size:每页展示数据
     */
    async realTimeSearch(val) {
      const len = this.getByteLen(val)
      if (len > 64) {
        this.$toast("不能超过32个汉字")
        this.queryState.orgOfficeName = val.substring(0, 32)
        return false
      }
      this.state.searchResult = await completeApi.getKeywordSearchResult(val)
    },
    /**
     * @description：地点精确搜索，显示地点概要、标记
     * @param {string} orgOfficeName:关键字 
     * @param {int} orgOfficeLon: 经度
     * @param {int} orgOfficeLat：纬度
     * @param {int} size:每页展示数据 
     */
    async preciseSearchKeyword(item) {
      sessionStorage.setItem('keyword',JSON.stringify(item))
      const keyword = item.orgOfficeName
      this.state.searchResult = []
      this.$store.dispatch("map/setMarkersList", [item])
      this.setSearchHistory(this.queryState.orgOfficeName)
      this.queryState.orgOfficeName = ""
      this.$emit("preciseSearchKeyword", { item, keyword })
    },
    /**
     * @description 模糊搜索，历史搜索记录、热词搜索，并将查询结果反馈到地图做点标记
     * @param {string} keyword
     */
    async fuzzySearch(keyword) {
      //TODO 存储关键字
      const fn = this.$parent.handleClickMarker
      const data = await completeApi.getKeywordSearchResult(keyword)
      const markers = new Markers()
      const ret = await markers.setMultipleMark(fn, data)
      this.$parent.searchState.isShow = false
      this.$parent.setMarkers(ret)
      this.$emit("fuzzySearch", { data, keyword })
    },
    /**
     * @description 储存搜索历史记录
     * @param keyword 关键字
     */
    setSearchHistory(keyword) {
      let hisList = this.state.history.list
      if (keyword == "" || hisList.includes(keyword)) {
        return false
      }
      // 储存个数不超过30
      if (hisList.length > 30) {
        hisList = hisList.slice(0, this.state.history.len - 1)
      }
      hisList.unshift(keyword)
      localStorage.setItem("search", JSON.stringify(hisList))
    },
    analysis(val) {
      this.queryState.orgOfficeName = val
    },
    // 获取搜索热词
    async getTopKeyWord() {
      const { cityCode } = this.$store.getters.curPos || JSON.parse(sessionStorage.getItem("curPos"))
      const ret = await mapApi.findKeyWord({
        "areaCode": cityCode,
        "size": 10
      }, {
        authorization: "ec_token"
      })
      this.state.hotKeyword = ret.data
    },
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
    // 匹配搜索值，改变搜索值颜色
    replace(text) {
      const res = new RegExp("(" + this.queryState.orgOfficeName + ")", "g")
      text = text.replace(
        res,
        `<span style='color:#0059ff'>${this.queryState.orgOfficeName}</span>`
      )
      return text
    },
    // 清空历史记录
    clear() {
      Dialog.confirm({
        title: '确认要删除所有记录吗?',
        message: '删除后数据不再恢复',
        cancelButtonColor:'black'
      }).then(() => {
          this.state.history.list = []
          localStorage.removeItem("search")
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  filters: {
    parseKilometer(val) {
      if (val) {
        return val > 1000 ? (val / 1000).toFixed(2) + "公里" : val.toFixed(2) + "米"
      }
      return val
    }
  }
}
</script>
<style lang="less" scoped>
.search-page {
  height: 100vh;
  z-index: 999;
  background: @main_bg_color;
  min-height: 100%;
  /deep/ .van-search__content {
    background-color: #fff;
  }
  /deep/ .van-search {
    padding: 0px;
    background-color:none;
    width: 88%;
  }
  /deep/ .van-grid-item__content--center {
    background-color: #fffaf6;
    -webkit-justify-content: end !important;
    justify-content: end !important;
  }
  .icon {
    font-size: @font_size_lg;
    color: @second_text_color;
  }
  /deep/ .van-grid-item__text {
    font-size: 20px * @ratio;
    text-align: center;
    color: #333333;
  }
}
.search-bar {
  box-shadow: 0px 1px * @ratio 8px * @ratio 0px rgba(223, 213, 206, 0.54);
  border: 1px * @ratio solid #ececec;
  height: 52px * @ratio;
  border-radius: 8px * @ratio;
  // margin: 0 16px * @ratio;
  display: flex;
  background-color:#fff;
  width:95%;
  margin:0 auto;
  .leftIcon{
    width: 38px * @ratio;
    text-align: center;
    line-height: 50px * @ratio;
    font-size: 23px * @ratio;
  }
  /deep/.van-search__content {
    border: 1px solid #ff5000;
    border-radius: 24px * @ratio;
  }
  /deep/ .van-search__content {
    background: none;
  }
}
.navbar {
  background: #fff;
  padding: @space_sm_12 0;
  margin: @space_md_16;
  border-radius: @border_radius_lg;
}

.search-history {
  margin-top: 16px;
  border-radius: @border_radius_lg;
  padding: 0 12px * @ratio;
  border-radius: 8px * @ratio;
  .search-tit {
    font-size: 20px * @ratio;
    display: flex;
    justify-content: space-between;
  }
  .search-cont {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    .search-item {
      font-size: 20px * @ratio;
      color: #666666;
      padding: 2px * @ratio 6px * @ratio;
      margin-top: 10px * @ratio;
      margin-right: 12px * @ratio;
      border-radius: 4px * @ratio;
      background: #fff;
    }
  }
  img {
    width: 22px * @ratio;
    display: inline-block;
    position: relative;
    top: 4px * @ratio;
  }
  .clear {
    font-size: 18px * @ratio;
    line-height: 25px * @ratio;
    color: #666666;
    .icon {
      font-size: 24px * @ratio;
      line-height: 25px * @ratio;
    }
  }
}
.search-result {
  font-size: 20px * @ratio;
  background: #fff;
  .keyword {
    font-size: 18px * @ratio;
    padding: 12px * @ratio;
    border-bottom: 1px * @ratio solid #eeeeee;
    .text {
      color: #0059ff;
    }
  }
  .result-cont {
    padding: 0 16px * @ratio;
    height: 90vh;
    overflow: auto;
    margin-top:20px * @ratio;
    .item {
      margin-top: 10px * @ratio;
      padding-bottom: 9px * @ratio;
      border-bottom: 1px * @ratio solid #eeeeee;
      display: flex;
      .info {
        font-size: 18px * @ratio;
        flex: 1;
        padding-right: @space_md_16;
        .btn {
          width: 316px * @ratio;
          line-height: 40px * @ratio;
          text-align: center;
          margin-top: 8px * @ratio;
          background: rgba(0, 89, 255, 0.06);
        }
      }
    }
  }
}
</style>
