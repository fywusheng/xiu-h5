<!--
 * @Description: 地点详情页-医院
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-03 17:33:33
-->
<template>
  <div>
    <div v-show="!showMap" class="page">
      <div class="header-info">
        <p class="title">{{ state.hospital_name }}</p>
        <p class="nature">性质：{{ state.hospital_nature }}</p>
        <p class="feature">特色科室：{{ state.hospital_clinic }}</p>
        <addr-distance :distance="state.distance" addr="朝阳公园南路1号" />
        <p class="labels">
          <span class="item">{{ state.hospital_level }}</span>
        </p>
        <p class="bar">
          <span class="item">
            <van-icon @click="getPos" name="location" />位置
          </span>
          <span @click="callPhone" class="item">
            <van-icon name="phone" />电话
          </span>
        </p>
        <p class="status">
          <!-- <span class="label">工作时间</span><span>6:00-22:00开放</span> -->
        </p>
        <div v-show="state.hospital_photos"  class="gallery">
          <van-swipe :show-indicators="false" :loop="false">
            <van-swipe-item @click="gotoGalleryList(state.common_service_photos)" class="item">
              <img :src="state.common_service_photos" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- <div v-show="state.hospital_photos" class="gallery">
          <ul ref="galleryList">
            <li v-for="(item, index) in state.hospital_photos" :key="index" @click="gotoGalleryList(state.common_service_photos)">
              <img :src="item" />
            </li>
          </ul>
        </div> -->
      </div>
      <expand-text id="exp2" title="医院简介" :article="state.hospital_intro" />
      <section>
        <p class="text">创建时间：{{ state.hospital_create_time }}</p>
        <p class="text">职工人数：{{ state.hospital_workers }}</p>
        <p class="text">床位数量：{{ state.hospital_bed }}</p>
        <p class="text">科室数目：{{ state.hospital_clinic_numbers }}</p>
        <p class="text">特色科室：{{ state.hospital_clinic }}</p>
        <p class="text">网址：{{ state.hospital_website }}</p>
      </section>
      <toolbar />
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
import addrDistance from "./comp/addr-distance.vue"
import expandText from "./comp/expand-text"
import toolbar from "./comp/toolbar"
import Markers from "../../../controller/markers"
import { Swipe, SwipeItem } from "@ylz/vant"
import compMap from "../amap"
import summaryInfo from "./summary"

export default {
  name: "hospitalDetails",
  components: {
    addrDistance,
    expandText,
    toolbar,
    compMap,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    summaryInfo
  },
  data() {
    return {
      orgOfficeId: "",
      state: {},
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
      }
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
      console.log("🚀 ~ file: hospital.vue ~ line 152 ~ callPhone ~ this.sheetState", this.sheetState)
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
    }
    .nature,
    .feature {
      font-size: 18px * @ratio;
      font-weight: 500;
      color: #333333;
    }
    .feature {
      margin: 12px * @ratio 0px * @ratio;
    }
    .labels {
      margin-bottom: 12px * @ratio;
      .item {
        color: #fff;
        background: #ff5500;
        display: inline-block;
        border-radius: 2px * @ratio;
        padding: 2px * @ratio 8px * @ratio;
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
        color: #999999;
        margin-right: 10px * @ratio;
        /deep/ .van-icon {
          font-size: 20px * @ratio;
          vertical-align: middle;
          margin-right: 4px * @ratio;
          color: #457de6;
        }
      }
    }
    .status {
      margin-bottom: 14px * @ratio;
      .label {
        display: inline-block;
        padding: 2px * @ratio 8px * @ratio;
        background: rgba(18, 179, 98, 0.2);
        border-radius: 2px * @ratio;
        color: #12b362;
        line-height: 16px * @ratio;
        font-size: 16px * @ratio;
        margin-right: 11px * @ratio;
      }
    }
    .gallery {
      width: 343px * @ratio;
      overflow: scroll;
      li {
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