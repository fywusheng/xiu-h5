<!--
 * @Description: 地点详情页-助餐点
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-03 17:33:33
-->
<template>
  <div>
    <div v-show="!showMap" class="page">
      <div class="header-info">
        <p class="title">{{ this.state.common_service_name }}</p>
        <!-- <rate-price
          :score="score"
          :price="price"
        ></rate-price> -->
        <addr-distance :distance="state.distance" :addr="state.common_service_addr" />
        <div class="label-box">
          <p class="labels" v-for="(item, index) in labelList" :index="index" :key="index">
            <span class="item">{{ item }}</span>
          </p>
        </div>
        <p class="bar">
          <span @click="getPos" class="item">
            <van-icon name="location" />位置
          </span>
          <span @click="callPhone" class="item">
            <van-icon name="phone" />电话
          </span>
        </p>
        <div class="gallery">
          <van-swipe :show-indicators="false" :loop="false">
            <van-swipe-item @click="gotoGalleryList(state.common_service_photos)" class="item">
              <img :src="state.common_service_photos" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <section>
        <p class="tit">营业时间</p>
        <div class="text">
          <p>{{ state.common_service_open_time }}</p>
        </div>
      </section>
      <expand-text id="exp2" title="信息" :article="state.common_service_intro" />
      <toolbar :item="itemData" :name="state.orgOfficeName" :id="state.orgOfficeId" />
    </div>
    <!-- 地图 -->
    <div v-show="showMap">
      <div class="searcch-cont">
        <div class="search-bar">
          <van-search v-model="state.orgOfficeName" placeholder="搜索地点、美食、景点..." show-action>
            <template #action>
              <div class="search-button">
                <span style="color: #c9c9c9">|</span>
                <svg-icon icon-class="voice" class-name="custom-class" />
              </div>
            </template>
          </van-search>
        </div>
      </div>
      <comp-map ref="amap" />
      <div class="container-summary">
        <summary-info :item="itemData" class="detail-popup"></summary-info>
      </div>
    </div>
    <van-action-sheet v-model="sheetState.show" :actions="sheetState.actions" cancel-text="取消" description="请选择拨打电话" close-on-click-action />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "@ylz/vant"
import addrDistance from "./comp/addr-distance.vue"
import expandText from "./comp/expand-text"
import toolbar from "./comp/toolbar"
import Markers from "../../../controller/markers"
import compMap from "../amap"
import summaryInfo from "./summary"
// import ratePrice from "./comp/rate-price"

export default {
  name: "hospitalDetails",
  components: {
    addrDistance,
    expandText,
    toolbar,
    compMap,
    summaryInfo,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
    // ratePrice
  },
  data() {
    return {
      orgOfficeId: "",
      showMap: false, // 是否展示地图
      // 电话
      sheetState: {
        show: false,
        callPhone: [],
        actions: []
      },
      itemData: {},
      statePos: {
        lng: "",
        lat: ""
      },
      state: {},
      // 评分
      score: "4.4",
      // 人均价格
      price: "358元/人",
      // 标签列表
      labelList: []
    }
  },
  watch: {
    $route: {
      handler() {
        this.orgOfficeId = this.$route.params && this.$route.params.orgOfficeId
        this.getDetail()
      },
      immediate: true
    }
  },
  methods: {
    async getDetail() {
      const markers = new Markers()
      const ret = await markers.getMarkSummaryInfo(this.orgOfficeId, false)
      const {
        orgOfficeInfoDetail,
        orgOfficeTel,
        orgOfficeId,
        orgOfficeName,
        orgOfficeLon,
        orgOfficeLat
      } = ret
      this.itemData = ret
      const tempState = orgOfficeInfoDetail.replace(/[\n\r]/g, "")
      this.state = JSON.parse(tempState)
      console.log("🚀 ~ file: government.vue ~ line 134 ~ getDetail ~ this.state", this.state)
      this.sheetState.callPhone =
        orgOfficeTel.indexOf(";") !== -1
          ? orgOfficeTel.split(";")
          : orgOfficeTel.split(",")
      this.state.orgOfficeName = orgOfficeName
      this.state.orgOfficeId = orgOfficeId
      this.statePos.lng = orgOfficeLon
      this.statePos.lat = orgOfficeLat
    },
    gotoGalleryList() {
      this.$router.push({ path: "gallery-list" })
    },
    callPhone() {
      const temp = []
      this.sheetState.show = true
      this.sheetState.callPhone.forEach((item) => {
        temp.push({ name: item })
      })
      this.sheetState.actions = temp
    },
    async getPos() {
      const markers = new Markers()
      const item = await markers.getMarkSummaryInfo(this.orgOfficeId, false)
      const ret = await markers.setSingleMark(item)
      this.$refs.amap.setMarkers(ret)
      this.showMap = true
      console.log(this.itemData)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 120px * @ratio;
  .header-info {
    padding: 14px * @ratio 15px * @ratio 12px * @ratio;
    border-bottom: solid #f2f2f2 8px * @ratio;
    .title {
      font-size: 22px * @ratio;
      line-height: 30px * @ratio;
      margin-bottom: 14px * @ratio;
      color: #333333;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
    .label-box {
      display: flex;
      .labels {
        margin: 0px * @ratio 8px * @ratio 12px * @ratio 0px * @ratio;
        .item {
          color: #fff;
          background: #ff5500;
          display: inline-block;
          border-radius: 2px * @ratio;
          padding: 2px * @ratio 8px * @ratio;
          font-size: 16px * @ratio;
          font-weight: 400;
        }
      }
    }
    .bar {
      margin-bottom: 24px * @ratio;
      .item {
        padding: 4px * @ratio 12px * @ratio;
        background: #ffffff;
        border-radius: 17px * @ratio;
        border: 1px * @ratio solid #eeeeee;
        font-size: 18px * @ratio;
        line-height: 25px * @ratio;
        margin-right: 10px * @ratio;
        color: #999999;
        /deep/ .van-icon {
          font-size: 20px * @ratio;
          vertical-align: middle;
          margin-right: 4px * @ratio;
          color: #457de6;
        }
      }
    }
    .gallery {
      width: 343px * @ratio;
      overflow: scroll;
      .item {
        display: inline-block;
        width: 319px * @ratio;
        height: 184px * @ratio;
        border-radius: 7px * @ratio;
        margin-right: 11px * @ratio;
        vertical-align: sub;
        background-color: #000;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
  section {
    padding: 14px * @ratio 15px * @ratio 12px * @ratio;
    border-bottom: solid #f2f2f2 8px * @ratio;
    .tit {
      font-size: 20px * @ratio;
      line-height: 28px * @ratio;
      margin-bottom: 12px * @ratio;
      color: #333;
    }
    .text {
      font-size: 18px * @ratio;
      line-height: 25px * @ratio;
      color: #333333;
    }
  }
  .searcch-cont {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 199;
    background: #fff;
    padding: 10px * @ratio 0;
    .search-bar {
      margin: 0 16px * @ratio;
      box-shadow: 0px 1px 8px * @ratio 0px rgba(223, 213, 206, 0.54);
      overflow: hidden;
      border-radius: 24px * @ratio;
      border: 1px solid #ff5000;
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
    }
  }
}
/deep/ .van-action-sheet__description {
  color: #333 !important;
  line-height: 30px * @ratio;
  font-size: 24px * @ratio !important;
  background-color: #fff !important;
  text-align: center !important;
}
.container-summary {
  position: fixed;
  width: 100%;
  background: #fff;
  bottom: 0;
  transition: all 0.5s ease-in 0.3s;
  .detail-popup {
    width: 100%;
    box-shadow: 0px -2px * @ratio 3px * @ratio 0px rgba(0, 0, 0, 0.08);
    border-radius: 12px * @ratio;
    padding: 9px * @ratio;
  }
}
</style>