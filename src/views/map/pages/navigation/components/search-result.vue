<!--
 * @Description: 导航搜索结果页
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-20 12:38:58
-->
<template>
  <div class="page-result">
    <div v-show="state.list.length === 0" class="van-cell mt">
      <van-icon name="search" class="van-icon" />
      <span v-html="replace(state.nofondText)"></span>
    </div>
    <ul class="mt">
      <li v-for="(item, index) in state.list" :key="index" class="item">
        <div class="top" @click="getInfoBysearch(item)">
          <van-icon name="location-o" class="icon-history"></van-icon>
          <p class="text" v-html="replace(item.orgOfficeName)"></p>
        </div>
        <p class="bottom">
          {{ item.orgOfficeAddrArea }}{{ item.orgOfficeAddrDetail }}
        </p>
        <p class="bottom">距离您：{{ item.distance | distance }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "searchResult",
  props: {
    keyword: {
      type: String,
      require: true
    },
    searchResult: {
      type: Array,
      default: () => []
    },
    historyState: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      historyMaxLen: 30,
      state: {
        nofondText: "",
        historyState: [], // 历史记录
        keyword: "",
        list: []
      }
    }
  },
  destroyed() {
    this.state.nofondText =""
    this.state.keyword =""
    this.list = []
  },
  watch: {
    historyState: {
      handler(newVal) {
        this.state.historyState = newVal
      },
      immediate: true
    },
    keyword(newVal) {
      this.state.keyword = newVal
      this.state.nofondText = `查找"${newVal}"`
    },
    searchResult(newVal) {
      this.state.list = newVal
    }
  },
  methods: {
    /**
    * @description 点击搜索项并储存搜索历史记录
    * @param item 关键字
    */
    getInfoBysearch(item) {
      const addr = item.orgOfficeAddrDetail?item.orgOfficeAddrDetail:`${item.adname}${item.address}`
      const obj = {
        distance: item.distance,
        name: item.orgOfficeName,
        addr: addr,
        orgOfficeLon: item.orgOfficeLon,
        orgOfficeLat: item.orgOfficeLat
      }
      if (this.state.historyState.length > 0 && this.state.historyState.indexOf(obj) !== -1) {
        return false
      }
      if (this.state.historyState.length > this.historyMaxLen) {
        this.state.historyState = this.state.historyState.slice(0, this.historyMaxLen - 1)
      }
      this.state.historyState.unshift(obj)
      localStorage.setItem("navhistory", JSON.stringify(this.state.historyState))
      console.log("===搜索出来的结果存入---",this.state.historyState)
      this.$emit("searchItem", item)
    },
    // 匹配搜索值，改变搜索值颜色
    replace(text) {
      const res = new RegExp("(" + this.state.keyword + ")", "g")
      text = text.replace(
        res,
        `<span style='color:#0059ff'>${this.state.keyword}</span>`
      )
      return text
    }
  },
  filters: {
    distance(val) {
      if (val) {
        return val > 1000 ? (val / 1000).toFixed(2) + "公里" : val.toFixed(2) + "米"
      }
      return val
    }
  }
}
</script>

<style lang="less" scoped>
.page-result {
  height: 91vh;
  padding-bottom: 1px * @ratio;
  overflow: auto;
  .mt {
    margin-top: 10px * @ratio;
  }
}
.item {
  padding: 10px * @ratio 13px * @ratio 10px * @ratio 19px * @ratio;
}
.item {
  padding: 12px * @ratio;
  border-bottom: 1px solid #eeeeee;
  background-color: #fff;
  .top {
    font-size: 18px * @ratio;
    line-height: 25px * @ratio;
    color: #333;
    .icon-history {
      display: inline-block;
      margin-right: 6px * @ratio;
    }
    .text {
      display: inline-block;
    }
  }
  .bottom {
    padding-left: 23px * @ratio;
    color: #999999;
  }
}
</style>