<!--
 * @Description: 赡养抚养列表 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-19 00:54:15
-->
<template>
  <div class="page-list">
    <div class="header">
      <span
        @click="getRelationType('0')"
        :class="relationType === '0' ? 'active' : ''"
        class="item"
      >
        赡养人
      </span>
      <span
        @click="getRelationType('1')"
        :class="relationType === '1' ? 'active' : ''"
        class="item"
      >
        抚养人
      </span>
    </div>
    <div v-if="list.length > 0" class="list">
      <div v-for="(item, index) in list" :key="index" class="item">
        <p class="name">{{ item.supportName }}</p>
        <p><span class="label">赡养关系：</span>{{ item.supRelName }}</p>
        <p><span class="label">身份证号：</span>{{ item.idCard | idCard }}</p>
        <p class="phone">
          <span class="label">联系电话：</span>{{ item.phone | mobile }}
        </p>
        <div class="btn-cont">
          <span @click="delItem(item)" class="btn-item">删除</span>
          <span @click="updateItem(item)" class="btn-item">编辑</span>
          <span
            v-if="item.isFamillyShip === '0'"
            @click="bindAccount(item)"
            class="bandAccount"
            >绑定亲情账号</span
          >
        </div>
        <div class="pic">
          <img
            v-show="item.supType === '01'"
            src="@/assets/imgs/family-account/support.png"
            class="img-block"
          />
          <img
            v-show="item.supType === '02'"
            src="@/assets/imgs/family-account/support-me.png"
            class="img-block"
          />
          <img
            v-show="item.supType === '11'"
            src="@/assets/imgs/family-account/raised.png"
            class="img-block"
          />
          <img
            v-show="item.supType === '12'"
            src="@/assets/imgs/family-account/raise-me.png"
            class="img-block"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p class="no-data">
        <img src="@/assets/imgs/common/no-data.png" />
      </p>
      <p class="no-data-text">暂无信息</p>
      <p class="tips">
        <img src="@/assets/imgs/common/tips.png" />
      </p>
    </div>
    <div v-show="relationType === '0'" @click="createItem" class="btn-create">
      添加赡养人
    </div>
    <div v-show="relationType === '1'" @click="createItem" class="btn-create">
      添加扶养人
    </div>
    <van-overlay :show="showOverlay" @click="handleShowOverlay">
      <div class="overlay">
        <p class="pic">
          <img
            src="@/assets/imgs/family-account/integral-200.png"
            class="img-block"
          />
        </p>
        <p @click="handleShowOverlay" class="close">
          <svg-icon icon-class="overlay-close" class-name="custom-class" />
        </p>
      </div>
    </van-overlay>
    <van-dialog
      v-model="dialogState.show"
      :showCancelButton="true"
      :confirmButtonText="dialogState.confirmText"
      confirmButtonColor="#FF5500"
      :cancelButtonText="dialogState.cancelText"
      cancelButtonColor="#333333"
      class="container-dialog"
      @confirm="confirm"
      @cancel="cancel"
    >
      <p v-html="dialogState.htm" class="top"></p>
    </van-dialog>
    <!--  200积分弹框 -->
    <van-overlay :show="showIntegral" @click="showIntegral = false">
      <div class="wrapper">
        <img src="@/assets/imgs/common/integral-200.png" class="img-block" />
        <van-icon name="close" class="close" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { familyApi } from "@/api"
import { mobile, idCard } from "@/utils/desensitization"
import { Dialog, Overlay } from "@ylz/vant"
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [Overlay.name]: Overlay
  },
  data() {
    return {
      showIntegral:false,//200积分弹框
      relationType: "0",
      list: [],
      state: {},
      showOverlay: false,
      status: false, // 是否已添加过赡养抚养关系 false: 未添加 true：已添加
      dialogState: {
        show: false,
        confirmText: "立刻添加",
        cancelText: "放弃添加",
        htm: "您确定不添加赡养抚养关系吗？<span class='tips-color'>这将会影响您在本平台享有的权益和服务</span>"
      }
    }
  },
  created() {
    this.initTab();
    this.getList();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener("popstate", this.goBack, false)
    }
  },
  destroyed() {
    clearTimeout(this.tiemr)
    window.removeEventListener("popstate", this.goBack, false)
  },
  methods: {
    initTab(){
     this.relationType = this.$route.query.tabindex;
     this.showIntegral = this.$route.query.showIntegral;
    },
    async getList() {
      
      const { data } = await familyApi.findUserSupport({
        relationType: this.relationType
      })
      this.$nextTick(() => {
        this.list = data
      })
    },
    delItem(item) {
      Dialog.confirm({
        message: "确定要删除赡养关系？"
      })
        .then(async() => {
          this.$set(item, "dataStas", "1")
          const { data } = await familyApi.addUserSupport(item)
          if (data.isSupItgl === "0") {
            this.$toast("删除成功")
            this.getList()
          }
        })
    },
    getRelationType(type) {
      this.relationType = type
      this.getList()
    },
    createItem() {
      if (this.list.length == 20) {
        this.$toast("赡养或抚养已达到最大限制数")
        return false
      }
      let path = ""
      if (this.relationType === "0") {
        path = "creat-support"
      } else {
        path = "create-raise"
      }
      this.$router.push({ path: `${path}` })
    },
    handleShowOverlay() {
      this.showOverlay = false
    },
    updateItem(item) {
      let path = ""
      if (this.relationType === "0") {
        path = "update-support"
      } else {
        path = "update-raise"
      }
      this.$router.push({ path: `${path}/${decodeURIComponent(item.supportId)}` })
    },
    async bindAccount(item) {
      const { code } = await familyApi.addFamilyInfoByTel({
        regChnl: "h5",
        supList: [item]
      })
      sessionStorage.setItem("nameMap", item.supportName)
      if (code === 0) {
        //绑定成功
        this.$router.push({ path: "/family-account/bound-status", query: { status: "sendout" }})
      }
    },
    async goBack() {
      // 是否添加过赡养抚养关系
      const { data } = await familyApi.findUserIsAddSup({
        selectType: "0"
      })
      if (data) {
        this.status = true
        // 是否绑定过亲情账号
        const { data } = await familyApi.findUserIsAddSup({
          selectType: "1"
        })
        if (!data) {
          this.dialogState.confirmText = "立即绑定"
          this.dialogState.cancelText = "放弃绑定"
          this.dialogState.htm = "您还可以绑定您的【亲情账号】，再拿300积分！<span class='tips-color'>积分可以兑换各种惠老服务哦</span>"
          this.dialogState.show = true
        }
      } else {
        this.dialogState.show = true
      }
    },
    confirm() {
      if (this.status) {
        this.$router.push({ path: "../family-account" })
      }
    },
    cancel() {
      if (!this.status) {
        window.history.go(-1)
      }
      if (this.status) {
        this.$router.push({ path: "/" })
      }
    }
  },
  filters: {
    mobile,
    idCard
  }
}
</script>

<style lang="less" scoped>
.page-list {
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      width: 160px * @ratio;
      height: 44px * @ratio;
      line-height: 44px * @ratio;
      background: #ffffff;
      text-align: center;
      font-weight: 500;
      color: #333333;
      &.active {
        border-radius: 3px;
        border-bottom: #ff711a 5px * @ratio solid;
      }
    }
  }
  .list {
    height: 85vh;
    overflow: auto;
    .item {
      width: 325px * @ratio;
      padding: 11px * @ratio 9px * @ratio;
      background: #ffffff;
      box-shadow: 0px 2px * @ratio 8px * @ratio 0px rgba(0, 0, 0, 0.15);
      border-radius: 4px * @ratio;
      margin: 0 auto;
      margin-top: 12px * @ratio;
      position: relative;
      .name {
        font-size: 22px * @ratio;
        line-height: 30px * @ratio;
      }
      .phone {
        border-bottom: 1px * @ratio solid #eeeeee;
      }
      .label {
        font-size: 18px * @ratio;
        color: #999999;
      }
      .pic {
        width: 76px * @ratio;
        position: absolute;
        top: 0;
        right: 0;
      }
      .btn-cont {
        margin-top: 11px * @ratio;
        text-align: right;
        .btn-item {
          width: 60px * @ratio;
          height: 30px * @ratio;
          line-height: 30px * @ratio;
          display: inline-block;
          background: #ffffff;
          box-shadow: 0px 2px * @ratio 8px * @ratio 0px rgba(0, 0, 0, 0.15);
          border-radius: 15px * @ratio;
          border: 1px * @ratio solid #999999;
          text-align: center;
          margin-right: 12px * @ratio;
        }
        .bandAccount {
          display: inline-block;
          width: 110px * @ratio;
          height: 30px * @ratio;
          line-height: 30px * @ratio;
          background: #ffffff;
          box-shadow: 0px 2px * @ratio 8px * @ratio 0px rgba(0, 0, 0, 0.15);
          border-radius: 15px * @ratio;
          border: 1px * @ratio solid #ff5500;
          color: #ff5500;
          text-align: center;
        }
      }
    }
  }
  .overlay {
    .pic {
      margin-top: 152px * @ratio;
    }
    .close {
      text-align: center;
      .custom-class {
        font-size: 35px * @ratio;
      }
    }
  }
  .btn-create {
    width: 343px * @ratio;
    height: 54px * @ratio;
    background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
    border-radius: 27px * @ratio;
    font-weight: 500;
    color: #ffffff;
    font-size: 22px * @ratio;
    line-height: 54px * @ratio;
    text-align: center;
    position: fixed;
    left: 50%;
    bottom: 32px * @ratio;
    transform: translateX(-50%);
  }
  .no-data {
    margin-top: 58px * @ratio;
  }
  .no-data-text {
    margin-top: 12px * @ratio;
    text-align: center;
  }
  .tips {
    width: 100%;
    margin-top: 57px * @ratio;
    img {
      display: block;
      width: 100%;
    }
  }
}
.container-dialog {
  width: 310px * @ratio;
  line-height: 27px * @ratio;
  margin: 0 auto;
  .top {
    padding: 28px * @ratio 16px * @ratio 12px * @ratio;
    font-size: 20px * @ratio;
    color: #333333;
  }
  .bottom {
    padding: 0 16px * @ratio;
    padding-bottom: 12px * @ratio;
    color: #666666;
  }
  .tips-color {
    color: #ff5500;
  }
}
.close{
  transform: translate(180px * @ratio,20px * @ratio) ;
}
</style>