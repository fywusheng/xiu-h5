<!--
 * @Description: 首页
 * @Version: 0.1
 * @Autor: Chenyt
-->
<template>
  <div class="home-page">
    <header>
      <div class="topbar">
        <div @click="show = true">
          <span>{{ fieldValue }}</span>
          <van-icon class="arrow-down" :name="require('@/assets/svg/home/icon-arrow-down.svg')" />
        </div>
        <router-link to="/user-center" class="people">
          <van-icon :name="require('@/assets/svg/home/icon-people.svg')" />
          <span>{{ user.psnName | desensitization("name") }}</span>
          <van-icon name="play" />
        </router-link>
      </div>
      <div class="entry">
        <div @click="onEntryClick(item)" v-for="(item, index) in entryList" :key="index">
          <img :src="item.icon" :alt="item.title" />
          <div>{{ item.title }}</div>
        </div>
      </div>
    </header>
    <van-cell title="便捷服务" class="title more" :border="false" is-link value="更多" @click="onClick('more', true)" />
    <div class="group">
      <div class="cell" v-for="(item, index) in list" :key="index" @click="onClick(item.to, item.disable)">
        <div>
          <img :src="item.icon" alt="icon" />
          <span>{{ item.title }}</span>
        </div>
        <van-icon class="arrow" name="arrow" />
      </div>
    </div>

    <van-popup v-model="show" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="city" @close="show = false" @finish="onFinish" />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      cascaderValue: "",
      fieldValue: "北京",
      showSelectEntry: false,
      list: [
        {
          title: "惠老地图",
          to: "/map",
          icon: require("@/assets/svg/home/icon-map.svg"),
          disable: false
        },
        {
          title: "优待说明",
          to: "/",
          icon: require("@/assets/svg/home/icon-privilege-description.svg"),
          disable: true
        },
        {
          title: "政策服务",
          to: "/",
          icon: require("@/assets/svg/home/icon-government-service.svg"),
          disable: true
        },
        {
          title: "社会服务",
          to: "/",
          icon: require("@/assets/svg/home/icon-social-service.svg"),
          disable: true
        }
      ],
      // 申领策略
      claimStrategy: {
        0: () => {
          this.$router.push({ path: "/claim" })
          // this.$toast("登录已过期，请重新登录")
        },
        1: (to) => {
          this.$router.push({ path: to })
        },
        2: () => {
          return this.$dialog.alert({
            message: "申领资格审核中"
          })
        },
        3: (to) => {
          if (to === "/id-photo") {
            this.$router.push({ path: "/claim" })
          } else {
            this.$toast("请先申领电子证")
            setTimeout(() => {
              this.$router.push({ path: "/claim" })
            }, 2000)
          }
        }
      }
    }
  },

  computed: {
    user() {
      return this.$store.state["user-info"].user
    },
    city() {
      return this.$store.state.city.homeCity
    },
    entryList() {
      return [
        {
          title: "电子证",
          icon: require("@/assets/svg/home/icon-certificate.svg"),
          to: "/id-photo",
          status: this.$store.state["user-info"].status // 0 未申领 |  1 已申领 |  2  已申请审核中 | 3 不能申领
        },
        {
          title: "扫一扫",
          icon: require("@/assets/svg/home/icon-scan-code.svg"),
          to: "/qr-code-scan",
          status: this.$store.state["user-info"].status // 0 未申领 |  1 已申领 |  2  已申请审核中 | 3 不能申领
        },
        {
          title: "二维码",
          icon: require("@/assets/svg/home/icon-qr-code.svg"),
          to: "/qr-code",
          status: this.$store.state["user-info"].status // 0 未申领 |  1 已申领 |  2  已申请审核中 | 3 不能申领
        }
      ]
    }
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).pop()
    },
    onScan() {
      return this.$dialog.alert({
        message: "功能开发中..."
      })
    },
    onEntryClick({ to, status }) {
      this.claimStrategy[status](to)
    },
    onClick(to, disable) {
      if (disable) {
        return this.$dialog.alert({
          message: "功能开发中..."
        })
      }
      this.$router.push({ path: to })
    }
  }
}
</script>
<style lang='less' scoped>
.home-page {
  background-color: @main_bg_color;
  padding-bottom: @space_md_16;
  min-height: 100%;
  .title {
    background-color: transparent;
    position: relative;
    padding: @space_md_16;
    font-weight: bold;
    &::before {
      content: "";
      width: 5px * @ratio;
      height: 20px * @ratio;
      background: #ff5000;
      border-radius: 3px * @ratio;
      position: absolute;
      top: 50%;
      left: @space_md_16;
      transform: translateY(-50%);
    }
    /deep/ .van-cell__title {
      margin-left: 13px * @ratio;
      font-size: 22px * @ratio;
    }
    /deep/ .van-cell__value {
      font-size: 18px * @ratio;
      font-weight: normal;
    }
    /deep/ .van-cell__value,
    .van-icon {
      color: @main_color;
    }
    /deep/ .van-icon-arrow {
      font-size: 15px * @ratio;
    }
  }
}
header {
}
.entry {
  display: flex;
  text-align: center;
  background: url("~@/assets/svg/home/background.svg") no-repeat;
  background-size: 100% 100%;
  padding: 30px * @ratio 0;
  margin: 0 @space_md_16;
  justify-content: space-evenly;
  color: #fff;
  font-size: 22px * @ratio;
  line-height: 1;
  img {
    width: 40px * @ratio;
    height: 40px * @ratio;
    margin-bottom: 14px * @ratio;
  }
}
.topbar {
  display: flex;
  justify-content: space-between;
  font-size: @font_size_md;
  align-items: center;
  margin-bottom: @space_md_16;
  padding: 20px * @ratio @space_md_16 20px * @ratio;
  background: #fff;

  div {
    align-items: center;
    display: flex;
  }
  .arrow-down {
    font-size: 8px * @ratio;
    margin-left: 5px * @ratio;
  }
  .people {
    display: flex;
    align-items: center;
    font-size: @font_size_md;
    /deep/ .van-icon:first-child {
      font-size: 36px * @ratio;
      margin-right: 5px * @ratio;
    }
    /deep/ .van-icon:last-child {
      font-size: 8px * @ratio;
    }
    img {
      border-radius: 50%;
      box-shadow: 0px 2px 2px 2px #eeeeee;
    }
  }
}

.group {
  margin: 0 @space_md_16;
  .arrow {
    color: @third_text_color;
  }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px * @ratio @space_md_16;
    background-color: #fff;
    margin-bottom: @space_md_16;
    border-radius: @border_radius_lg;
    font-size: 22px * @ratio;
    div:first-child {
      flex: 1;
      display: flex;
      align-items: center;
      img {
        margin-right: @space_md_16;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.select-entry-methods {
  padding: @space_md_16;
  text-align: center;
  width: 310px * @ratio;
  h2 {
    font-size: 22px * @ratio;
    margin-bottom: 40px * @ratio;
  }
  /deep/ .van-button {
    margin-bottom: 30px * @ratio;
    color: @main_color;
    border-color: @main_color;
  }
  /deep/ .van-button__icon + .van-button__text {
    margin-left: 10px * @ratio;
  }
}
.custom-class{
  color: #ff5000 !important;
  width: 2em!important;
  height: 2em!important;
}
</style>

