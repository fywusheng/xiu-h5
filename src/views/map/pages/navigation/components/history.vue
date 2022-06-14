<!--
 * @Description: 搜索历史记录
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-20 12:17:01
-->
<template>
  <div>
    <p @click="getCurPos">
      <van-cell title="我的位置" icon="location" class="myPos" />
    </p>
    <div class="container">
      <p class="tit">历史选点</p>
      <ul class="content">
        <li
          v-for="(item, index) in state.historyState"
          :key="index"
          class="item"
        >
          <p class="top" @click="handleHistoryItem(item)">
            <van-icon name="location-o" class="icon-history" />
            <span class="xz-ellipsis name">{{ item.name }}</span>
          </p>
          <p class="bottom">{{ item.addr }}</p>
        </li>
      </ul>
      <p @click="clear" class="clear">
        <van-icon :name="require('@/assets/svg/map/icon-delete.svg')" />
        清空历史选点
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    historyState: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    historyState: {
      handler(newVal) {
        this.state.historyState = newVal
      },
      immediate: true
    }
  },
  data() {
    return {
      state: {
        historyState: []
      }
    }
  },
  methods: {
    handleHistoryItem(val) {
      console.log("====历史记录中点击选择的值---",val)
      this.$emit("historyItem", {
        orgOfficeName: val.name,
        orgOfficeLon: val.orgOfficeLon,
        orgOfficeLat: val.orgOfficeLat,
        distance: val.distance
      })
    },
    getCurPos() {
      const curPos = this.$store.getters.curPos
      this.$emit("setCurPos", {
        orgOfficeLon: curPos.lng,
        orgOfficeLat: curPos.lat,
        orgOfficeName: "我的位置"
      })
    },
    // 清空历史记录
    clear() {
      this.state.historyState = []
      localStorage.removeItem("navhistory")
    }
  }
}
</script>

<style lang="less" scoped>
.myPos {
  border-radius: 8px * @ratio;
  margin-top: 8px * @ratio;
  margin-bottom: 8px * @ratio;
}
.container {
  height: 80vh;

  .tit {
    font-size: 18px * @ratio;
    background-color: #fff;
    line-height: 44px * @ratio;
    border: 1px solid #eeeeee;
    text-indent: 13px * @ratio;
  }
  .content {
    max-height: 90%;
    overflow: auto;
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
        .name {
          display: inline-block;
          width: 90%;
        }
      }
      .bottom {
        padding-left: 23px * @ratio;
        color: #999999;
      }
    }
  }
  .clear {
    font-size: 18px * @ratio;
    color: #999;
    line-height: 44px * @ratio;
    text-align: center;
    background-color: #fff;
    .van-icon {
      height: 44px * @ratio;
      line-height: 44px * @ratio;
      img {
        vertical-align: middle;
      }
    }
  }
}
</style>