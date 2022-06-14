<!--
 * @Description: 列表模板
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-27 10:40:24
-->
<template>
  <div class="page-service">
    <van-tabs v-model="query.orgOfficeTypeSecondClass" swipe-threshold="4" @change="changeTab">
      <van-tab v-for="(item, index) in state.nav" :key="index" :title="item.serviceName" :name="item.serviceId">
      </van-tab>
    </van-tabs>
    <van-list v-model="state.loading" :finished="state.finished" offset="100" finished-text="暂无更多内容" @load="onLoad" class="list">
      <div v-for="(item, index) in state.list" :key="index" class="service-item">
        <div class="left">
          <p class="picture">
            <img :src="getImg(item)" />
          </p>
        </div>
        <div class="right">
          <div @click="goDetail(item)" class="tit">
            {{ item.orgOfficeName }}
          </div>
          <div class="addr overflow">
            <svg-icon icon-class="home-location" />
            <span>{{ item.orgOfficeAddrDetail }}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "@ylz/vant"
import { serviceApi } from "@/api"
export default {
  props: {
    firstClass: {
      type: String,
      default: ""
    },
    secondClass: {
      type: String,
      default: ""
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List
  },
  data() {
    return {
      state: {
        loading: false,
        finished: false,
        nav: [],
        list: []
      },
      query: {
        orgOfficeTypeFirstClass: "",
        orgOfficeTypeSecondClass: "",
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.state.firstClass = this.$route.query && this.$route.query.classId
    this.getSecondClass()
  },
  watch: {
    firstClass: {
      immediate: true,
      handler(newValue) {
        this.query.orgOfficeTypeFirstClass = newValue
      }
    }
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: `detail/${encodeURIComponent(item.orgOfficeId)}`
      })
    },
    changeTab(name) {
      this.query.orgOfficeTypeSecondClass = name
      this.state.list = []
      this.query.currentPage = 1
      this.onLoad()
    },
    onLoad() {
      this.getList()
    },
    async getList() {
      if (this.query.orgOfficeTypeSecondClass !== "") {
        const { data } = await serviceApi.getOfficeByTypeWithPage(this.query)
        if (data.list.length < this.query.pageSize) {
          this.state.finished = true
        } else {
          this.state.loading = false
        }
        this.state.list = [...this.state.list, ...data.list]
        this.query.currentPage += 1
      }
    },
    // 获取二级分类
    async getSecondClass() {
      const { data } = await serviceApi.getSecondClass({
        serviceId: this.state.firstClass
      })
      this.state.nav = data
      this.state.list = []
      this.query.orgOfficeTypeSecondClass = data[0].serviceId
      this.onLoad()
    },
    getImg(item) {
      const tempState = item.orgOfficeInfoDetail.replace(/[\n\r]/g, "")
      const photos = JSON.parse(tempState).social_service_photos
      return photos.split(",")[0]
    }
  }
}
</script>

<style lang="less" scoped>
.page-service {
  background: #f2f2f2;
  min-height: 100vh;
  .list {
    margin-top: 8px * @ratio;
    background: #ffffff;
  }
}
.service-item {
  display: flex;
  justify-content: space-around;
  padding-top: 12px * @ratio;
  padding-bottom: 12px * @ratio;
  margin-left: 12px * @ratio;
  margin-right: 12px * @ratio;
  border-bottom: 1px * @ratio solid #eeeeee;
  .left {
    .picture {
      width: 107px * @ratio;
      height: 88px * @ratio;
      border-radius: 8px * @ratio;
      img {
        width: 100%;
        display: block;
        height: 100%;
      }
    }
    .text {
      height: 25px * @ratio;
      background: rgba(0, 0, 0, 0.6);
    }
  }
  .right {
    width: 203px * @ratio;
    .tit {
      font-size: 20px * @ratio;
      font-weight: 500;
      color: #333333;
      line-height: 1.5;
      max-height: 3em;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: justify;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    .addr {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #666666;
      line-height: 25px * @ratio;
      margin-top: 12px * @ratio;
    }
  }
}
/deep/ .van-tab {
  font-size: 18px * @ratio;
  line-height: 36px;
  font-weight: 400;
  color: #999999;
}
/deep/ .van-tab--active {
  font-size: 20px * @ratio;
  color: #333333;
  font-weight: 500;
}
/deep/ .van-list__finished-text {
  background: #f2f2f2;
}
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>