<!--
 * @Description: 有手机绑定
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-21 15:14:21
-->
<template>
  <div class="page-hasphone">
    <div class="header">
      <div class="pic">
        <img src="@/assets/imgs/family-account/header.png" class="img-block" />
      </div>
      <p>添加亲情账号</p>
    </div>
    <div class="container">
      <p class="tit">请选择您要绑定的亲友</p>
      <div v-show="state.isAdded" class="content">
        <p class="tit">赡养人</p>
        <div class="list">
          <div v-for="(item, index) in state.supList" :key="index">
            <list-item
              :item="item"
              :checked-list="state.checked"
              @toggleChecked="toggleChecked"
            />
          </div>
          <div v-if="state.supList.length === 0" class="nodata">
            <p @click="toRaise" class="btn">+添加赡养人</p>
          </div>
        </div>
        <p class="tit">扶养人</p>
        <div class="list">
          <div v-for="(item, index) in state.rearList" :key="index">
            <list-item
              :item="item"
              :checked-list="state.checked"
              @toggleChecked="toggleChecked"
            />
          </div>
          <div v-if="state.rearList.length === 0" class="nodata">
            <p @click="toRaise" class="btn">+添加扶养人</p>
          </div>
        </div>
      </div>
      <div v-if="!state.isAdded" class="firstTime">
        您还没有添加赡养扶养关系，添加后才可绑定亲友
        <p @click="toRaise" class="btn">+添加赡养扶养关系</p>
      </div>
    </div>
    <div @click="bindAccount" class="btn-create">绑定</div>
  </div>
</template>

<script>
import listItem from "./comp/list-item"
import { familyApi } from "@/api"

export default {
  components: {
    listItem
  },
  data() {
    return {
      state: {
        rearList: [],
        supList: [],
        checked: [],
        isAdded: null,
        bindStatus: "" // 是否已发送绑定
      }
    }
  },
  created() {
    this.checkIsFirstTime()
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await familyApi.findFamilyUser()
      this.state.supList = data.supList
      this.state.rearList = data.rearList
    },
    //切换选中状态
    toggleChecked(obj) {
      if (obj.flag) {
        this.state.checked.push(obj.supportId)
      } else {
        const index = this.state.checked.indexOf(obj.supportId)
        this.state.checked.splice(index, 1)
      }
    },
    toRaise() {
      this.$router.push({ path: `../support-raise` })
    },
    async checkIsFirstTime() {
      const { data } = await familyApi.findUserIsAddSup({
        selectType: 0
      })
      this.state.isAdded = data
    },
    // 通过有手机添加亲情关系
    async bindAccount() {
      if (this.state.checked.length === 0) {
        this.$toast("请选择绑定亲友")
        return false
      }
      const supList = []
      const nameMap = []
      const list = [...this.state.supList, ...this.state.rearList]
      list.forEach(item => {
        if (this.state.checked.includes(item.supportId)) {
          supList.push(item)
          nameMap.push(item.supportName)
        }
      })
      sessionStorage.setItem("nameMap", nameMap.join(";"))
      const { code } = await familyApi.addFamilyInfoByTel({
        regChnl: "h5",
        supList
      })
      if (code === 0) {
        this.$router.push({ path: "bound-status", query: { status: "sendout" }})
      }
    }
  }

}
</script>

<style lang="less" scoped>
.page-hasphone {
  .header {
    position: relative;
    font-size: 24px * @ratio;
    color: #ffffff;
    line-height: 18px * @ratio;
    .pic {
      width: 100%;
    }
    p {
      position: absolute;
      left: 32px * @ratio;
      top: 22px * @ratio;
    }
  }
  .container {
    width: 343px * @ratio;
    background: #ffffff;
    box-shadow: 0px 6px * @ratio 12px * @ratio 0px rgba(221, 143, 56, 0.1);
    border-radius: 12px * @ratio;
    margin: 0 auto;
    position: relative;
    top: -174px * @ratio;
    padding: 25px * @ratio 11px * @ratio 15px * @ratio 11px * @ratio;
    .tit {
      font-size: 20px * @ratio;
      font-weight: 400;
      color: #303133;
      margin-bottom: 16px * @ratio;
    }
    .content .list {
      margin-bottom: 16px * @ratio;
    }
    .nodata {
      height: 62px * @ratio;
      background: #f9f9f9;
      border-radius: 4px * @ratio;
      padding-top: 20px * @ratio;
      .btn {
        width: 119px * @ratio;
        height: 29px * @ratio;
        border-radius: 15px * @ratio;
        margin: 0 auto;
        text-align: center;
        color: #ff5500;
        border: 1px * @ratio solid #ff5500;
      }
    }
  }
  .firstTime {
    padding: 41px * @ratio 40px * @ratio 40px * @ratio 40px * @ratio;
    background: #f9f9f9;
    border-radius: 4px * @ratio;
    text-align: center;
    .btn {
      width: 179px * @ratio;
      height: 29px * @ratio;
      line-height: 29px * @ratio;
      border-radius: 15px * @ratio;
      margin: 0 auto;
      text-align: center;
      color: #ff5500;
      border: 1px * @ratio solid #ff5500;
      margin-top: 17px * @ratio;
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
}
</style>
