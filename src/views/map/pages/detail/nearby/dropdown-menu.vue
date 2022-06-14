<!--
 * @Description: 下拉菜单
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-08 16:14:46
-->
<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="附近" ref="item">
        <van-tree-select
          :items="options.distance"
          :active-id.sync="state.distance.activeId"
          :main-active-index.sync="state.distance.activeIndex"
          @click-item="getDistance"
        />
      </van-dropdown-item>
      <van-dropdown-item title="全部分类" ref="item">
        <div class="container-classification">
          <span
            v-for="item in options.classification"
            :key="item.id"
            :class="item.id === state.classId ? 'active' : ''"
            @click="getClassId(item)"
            class="classification-item"
          >
            {{ item.text }}
          </span>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="优惠/服务" ref="item">
        <div class="service">
          <p class="tit">优惠</p>
          <p class="content">
            <span
              v-for="item in options.discount"
              :key="item.id"
              @click="getDiscount"
              class="item"
              >{{ item.text }}</span
            >
          </p>
        </div>
        <div class="service">
          <p class="tit">服务</p>
          <p class="content">
            <span
              v-for="item in options.service"
              :key="item.id"
              @click="getService"
              class="item"
              >{{ item.text }}</span
            >
          </p>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, TreeSelect } from "@ylz/vant"
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [TreeSelect.name]: TreeSelect
  },
  data() {
    return {
      state: {
        distance: {
          activeIndex: 0,
          activeId: "500"
        },
        classId: "null"
      },
      options: {
        distance: [
          {
            text: "距离", id: "1", children: [
              { text: "不限", id: "null" },
              { text: "步行10分钟", id: 500 },
              { text: "1000米", id: 1000 },
              { text: "2000米", id: 2000 },
              { text: "3000米", id: 3000 }
            ]
          }
        ],
        classification: [
          { text: "全部分类", id:"null" },
          { text: "助餐点", id:0 },
          { text: "日间照料", id:1 },
          { text: "商超", id: 2 },
          { text: "美食", id: 3 },
          { text: "景点", id: 4 },
          { text: "医院", id: 5 },
          { text: "药店", id: 6 },
          { text: "住宿", id: 7 },
          { text: "家政服务", id: 8},
          { text: "养老院", id: 9 }
        ],
        discount: [
          { text: "优惠券", id: "0" },
          { text: "促销", id: "1" },
          { text: "团购", id: "2" }
        ],
        service: [
          { text: "预定", id: "0" },
          { text: "排队", id: "1" },
          { text: "外卖", id: "2" }
        ]
      }
    }
  },
  methods: {
    getDistance(data) {
      this.$emit("filterDistance", data.id)
    },
    getClassId(data) {
      this.state.classId = data.id
      this.$emit("filterClass", data.id)
    },
    getDiscount() {
      this.$toast("功能建设中")
    },
    getService() {
      this.$toast("功能建设中")
    }
  }
}
</script>

<style lang="less" scoped>
.container-classification {
  padding: 24px * @ratio 12px * @ratio;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
  .classification-item {
    display: inline-block;
    width: 88px * @ratio;
    height: 33px * @ratio;
    line-height: 33px * @ratio;
    background: #f2f2f2;
    border-radius: 4px * @ratio;
    color: #333333;
    text-align: center;
    margin-top: 18px * @ratio;
    &.active {
      background: rgba(255, 85, 0, 0.1);
      color: #ff5500;
    }
  }
}
.service {
  padding: 12px * @ratio;
  .tit {
    font-size: 20px * @ratio;
    font-weight: 500;
    color: #333333;
    line-height: 28px * @ratio;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      display: inline-block;
      width: 88px * @ratio;
      height: 33px * @ratio;
      line-height: 33px * @ratio;
      background: #f2f2f2;
      border-radius: 4px * @ratio;
      color: #333333;
      text-align: center;
      margin-top: 18px * @ratio;
      &.active {
        background: rgba(255, 85, 0, 0.1);
        color: #ff5500;
      }
    }
  }
}
</style>