<!--
 * @Description: 地点信息概要 分类弹出框
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-21 18:42:07
-->
<template>
  <div>
    <!-- <van-popup
      v-model="value"
      position="bottom"
      :overlay="false"
      get-container="#app"
      class="detail-popup"
    ></van-popup> -->
    <van-swipe
      :initial-swipe="marksState.curIndex"
      :show-indicators="false"
      key="summary"
    >
      <van-swipe-item
        v-for="(item, index) in marksState.list"
        :key="index"
        class="swipe-item"
      >
        <div key="detail">
          <!-- <section @click="handleShow" class="tc">
            <van-icon name="arrow-down" class="arrow" />
          </section> -->
          <section class="header-info">
            <div class="img-cont">
              <p class="picture">
                <img
                  v-if="item.photos && item.photos.length > 0"
                  :src="item.photos[0].url"
                />
                <img
                  v-else
                  :src="require('@/assets/imgs/map/default-place.png')"
                />
              </p>
              <p v-show="state.level" class="bar">{{ state.level }}</p>
            </div>
            <div class="detail">
              <p class="tit line-limit" @click="goDetail(item)">
                {{ item.orgOfficeName }}
              </p>
              <p class="_detail">
                <span class="type"> {{ item.orgOfficeType }}</span>
                <span class="distance">
                  | {{ item.distance | distance }}
                </span>
              </p>
              <p>
                <span v-if="!item.orgOfficeId" class="addr">{{
                  item.address
                }}</span>
                <span v-else class="addr">{{ item.orgOfficeAddrDetail }}</span>
              </p>
              <p v-if="item.orgOfficeOpenTime" class="line-limit">
                开放时间: {{ item.orgOfficeOpenTime }}
              </p>
            </div>
          </section>
          <div class="action-bar">
            <div class="action-cont">
              <dl v-if="item.orgOfficeId">
                <dt>
                  <van-icon
                    v-show="!state.isCollected"
                    name="star-o"
                    @click="handleCollected"
                  />
                  <van-icon
                    v-show="state.isCollected"
                    @click="handleCollected"
                    color="#ffd91a"
                    name="star"
                  />
                </dt>
                <dd>收藏</dd>
              </dl>
              <dl v-if="item.orgOfficeTel || item.tel" @click="callPhone(item)">
                <dt><van-icon name="phone-o" /></dt>
                <dd>电话</dd>
              </dl>
              <dl @click="handleTaxi">
                <dt>
                  <van-icon :name="require('@/assets/svg/map/icon-car.svg')" />
                </dt>
                <dd class="_car">打车</dd>
              </dl>
            </div>
            <y-button @click="onNavigation(item,index)" round class="button">
              <van-icon :name="require('@/assets/svg/map/icon-path.svg')" />路线
            </y-button>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 电话号码弹出层 -->
    <van-action-sheet
      v-model="state.showPhone"
      get-container="#app"
      class="
        van-popup
        van-popup--round
        van-popup--bottom
        van-popup--safe-area-inset-bottom
        van-action-sheet
      "
    >
      <div class="van-action-sheet__description">请选择电话号码</div>
      <div class="van-action-sheet__content">
        <button
          v-for="(item, index) in state.phoneNum"
          :key="index"
          class="van-action-sheet__item"
        >
          <span :tel="item.text" class="van-action-sheet__name">
            <a :tel="item.name">{{ item.name }}</a>
          </span>
        </button>
      </div>

      <div class="van-action-sheet__gap"></div>
      <button
        @click="state.showPhone = false"
        type="button"
        class="van-action-sheet__cancel"
      >
        取消
      </button>
    </van-action-sheet>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "@ylz/vant"
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    orgOfficeId: {
      type: String,
      default: ""
    },
    summaryState: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      showDetail: false,
      state: {
        down: false,
        showPhone: false,
        isCollected: false,
        level: "",
        phoneNum: []
      },
      marksState: {
        curIndex: 0,
        curItem: {},
        list: []
      }
    }
  },
  computed: {
    show: {
      set(val) {
        if (!val) {
          this.showDetail = false
        }
      },
      get() {
        return this.value
      }
    }
  },
  created() {
    console.log("123", this.$store.getters.curPos)
  },
  watch: {
    // value: {
    //   handler(val) {
    //     this.state.show = val
    //   }
    // },
    orgOfficeId: {
      handler(val) {
        const orgOfficeId = val
        console.log("===监听到的id===",val)
        this.marksState.list = this.$store.getters.markersList
        this.marksState.list.forEach((item, index) => {
          if (orgOfficeId === item.orgOfficeId || orgOfficeId === item.id) {
            console.log("===相等的进来了")
            this.marksState.curIndex = index
            this.marksState.curItem = item
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    handle() {
      // if (val.orgOfficeId && val.orgOfficeInfoDetail) {
      //   const tempState = val.orgOfficeInfoDetail.replace(/[\n\r]/g, "")
      //   const tempObj = JSON.parse(tempState)
      //   this.state.level = tempObj.scenic_area_rank || tempObj.hospital_level
      //   this.state.isCollected = val.isCollected
      // }
    },
    // handleShow() {
    //   //TODO 取消处理
    //   this.state.down = !this.state.down
    //   this.$emit("handleShow", this.state.down)
    // },
    handleCollected() {
      const accessToken = localStorage.getItem("accessToken") || ""
      if (!accessToken) {
        this.$toast("请登录账号")
        this.$router.push("/")
        return false
      }
      this.state.isCollected = !this.state.isCollected
      if (this.state.isCollected) {
        this.$toast("收藏成功")
      } else {
        this.$toast("取消收藏")
      }
    },
    /**
     * @description 路线导航
     * @param {string} orgOfficeLon 终点经度
     * @param {string} orgOfficeLat 终点纬度
     * @param {string} orgOfficeName 终点名称
     */
    onNavigation(item, index) {
     // const item = this.marksState.curItem
      this.marksState.curIndex = index
      console.log("===ziji---",item)
      this.$store.dispatch("map/setEndPos", {
        orgOfficeLon: item.orgOfficeLon,
        orgOfficeLat: item.orgOfficeLat,
        orgOfficeName: item.orgOfficeName
      })
      this.$router.push({ path: "navigation/index" })
    },
    onShowDetail() {
      this.showDetail = true
    },
    goDetail(val) {
      let rootPath = ""
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
    callPhone(item) {
      this.state.phoneNum = []
      this.state.showPhone = true
      if (item.orgOfficeTel) {
        const tempArr = item.orgOfficeTel.indexOf(";") !== -1 ? item.orgOfficeTel.split(";") : item.orgOfficeTel.split(",")
        tempArr.forEach(item => {
          this.state.phoneNum.push({ name: item })
        })
      }
      if (item.tel) {
        const tempArr = item.tel.split(";")
        tempArr.forEach(item => {
          this.state.phoneNum.push({ name: item })
        })
      }
    },
    handleTaxi() {
      this.$toast("功能建设中")
      return false
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
.line-limit {
  font-size:22px * @ratio;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
}
// .detail-popup {
//   width: 100%;
//   box-shadow: 0px -2px * @ratio 3px * @ratio 0px rgba(0, 0, 0, 0.08);
//   border-radius: 12px * @ratio;
//   padding: 9px * @ratio;
//   padding-bottom: 35%;
// }
.arrow {
  font-size: 26px * @ratio;
  color: #cccccc;
}
.header-info {
  font-size: 24px * @ratio;
  .img-cont {
    display: inline-block;
    position: relative;
    width: 100px * @ratio;
    .picture {
      width: 100px * @ratio;
      height: 100px * @ratio;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
    }

    .bar {
      width: 100%;
      height: 21px * @ratio;
      position: absolute;
      bottom: -18px * @ratio;
      background: url("~@/assets/imgs/map/bar@2x.png");
      background-size: 100% auto;
      font-size: 16px * @ratio;
      text-align: center;
      color: #fff;
    }
  }
  .detail {
    display: inline-block;
    width: 208px * @ratio;
    font-size: 18px * @ratio;
    margin-left: 9px * @ratio;
    vertical-align: top;
    .tit {
      font-size: 22px * @ratio;
      color: #333;
      text-shadow: 0px -2px * @ratio 3px * @ratio rgba(0, 0, 0, 0.08);
    }
    ._detail{
      font-size:18px * @ratio;
      color:#666666;
    }
  }
}
.action-bar {
  display: flex;
  background-color: #fff;
  width: 100%;
  font-size: 18px * @ratio;
  margin-top: 5px * @ratio;
  // justify-content: space-between;
  flex-flow: row;
  .action-cont {
    width: 55%;
    dl {
      display: inline-block;
      margin-right: 20px * @ratio;
      text-align: center;
    }
    /deep/ .van-icon {
      font-size: 24px * @ratio;
      font-weight: 700;
    }
    ._car{
      font-size:18px * @ratio;
      color:#333;
    }
  }
  .button {
    width: 125px * @ratio;
    height: 50px * @ratio;
    background: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
    box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.08);
    border-radius: 25px * @ratio;
    font-size: 20px * @ratio;
    /deep/ .van-icon {
      vertical-align: middle;
    }
  }
}
.callPhone-container {
  .content {
    padding: 16px 16px 160px;
  }
}
.tc {
  text-align: center;
}
.addr {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size:18px * @ratio;
  color:#666666;
}
.swipe-item {
  background-color: #fff;
}
/deep/ .van-action-sheet{
  z-index: 2022;
}
/deep/ .van-action-sheet__description {
  color: #333 !important;
  line-height: 30px * @ratio;
  font-size: 24px * @ratio !important;
  background-color: #fff !important;
  text-align: center !important;
}
</style>
