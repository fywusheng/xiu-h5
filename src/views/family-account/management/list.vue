<!--
 * @Description: 亲情账号管理列表 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-21 20:43:55
-->
<template>
  <div class="page-management-list">
    <p class="title">我的亲情账号(<span>/</span>)</p>
    <van-list
      v-model="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <div v-for="(item, index) in state.list" :key="index" class="item">
        <p class="avatar">
          <img
            src="@/assets/imgs/common/default-avatar.png"
            class="img-block"
          />
        </p>
        <p class="name">{{ item.userName }}</p>
        <p class="tag">{{ item.relationRemark }}</p>
        <p @click="untieItem(item)" class="untie">解除绑定</p>
      </div>
    </van-list>
    <div @click="$router.push({ path: '/family-account' })" class="btn">
      添加亲友
    </div>
  </div>
</template>

<script>
import { familyApi } from "@/api"
import { jumpFaceRecognition } from "@/utils"
import sessionStorage from "@/utils/session-storage"
export default {
  data() {
    return {
      state: {
        pageNum: 1,
        pageSize: 20,
        list: [],
        loading: false,
        finished: false
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
        if (newValue.query.ismatch === "true") {
          this.handleUntie(newValue.query.img)
        }
      }
    }
  },
  methods: {
    onLoad() {
      this.getList()
    },
    async getList() {
      this.$store.dispatch("getUserInfo")
      const { data } = await familyApi.findFamilyMemberList({
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        uactId: this.$store.getters.userInfo.uactId
      })
      this.state.loading = false
      if (data.list < 20) {
        this.state.finished = true
      }
      this.state.pageNum += 1
      this.state.list = [...this.state.list, ...data.list]
    },
    untieItem(item) {
      const { psnName, idCard } = sessionStorage.getItem("userInfo")
      sessionStorage.setItem("familyId", item.familyId)
      jumpFaceRecognition({
        userName: psnName,
        idCard: idCard,
        url: "family-account/management/list"
      })
    },
    async handleUntie(faceImg) {
      const { psnName, idCard } = sessionStorage.getItem("userInfo")
      const familyId = sessionStorage.getItem("familyId")
      const { code } = await familyApi.removeFamily({
        familyId: familyId,
        userName: psnName,
        idCard: idCard,
        faceImg: faceImg // 图片人脸
      })
      if (code === 0) {
        sessionStorage.removeItem("familyId")
        this.$toast("解绑成功")
        this.$router.push("../")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-management-list {
  margin: 0 16px * @ratio;
  margin-top: 26px * @ratio;
  .title {
    font-size: 20px * @ratio;
    font-weight: 500;
    color: #333333;
    line-height: 28px * @ratio;
  }
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 16px * @ratio;
    .avatar {
      width: 50px * @ratio;
      height: 50px * @ratio;
      border-radius: 50%;
      overflow: hidden;
    }
    .name {
      font-size: 22px * @ratio;
      font-weight: 400;
      color: #333333;
      line-height: 30px * @ratio;
    }
    .tag {
      width: 70px * @ratio;
      padding: 0 6px * @ratio;
      line-height: 27px * @ratio;
      background: #ffece3;
      border-radius: 4px * @ratio;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .untie {
      font-size: 20px * @ratio;
      font-weight: 400;
      color: #ff711a;
      line-height: 28px * @ratio;
    }
  }
  .btn {
    width: 343px * @ratio;
    height: 50px * @ratio;
    background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
    border-radius: 27px * @ratio;
    font-weight: 500;
    color: #ffffff;
    font-size: 22px * @ratio;
    line-height: 54px * @ratio;
    text-align: center;
    margin: 0 auto;
    margin-top: 16px * @ratio;
  }
}
</style>
