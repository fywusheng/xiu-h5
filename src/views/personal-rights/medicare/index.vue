<!--
 * @Description: 医保
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-24 14:12:55
-->
<template>
  <div class="page-medicare">
    <van-dropdown-menu>
      <van-dropdown-item v-model="query.place" :options="optiosState.place" />
      <van-dropdown-item v-model="query.type" :options="optiosState.type" />
      <van-dropdown-item v-model="query.year" :options="optiosState.year" />
    </van-dropdown-menu>
    <div class="container">
      <div class="content">
        <van-cell title="年度汇总" value="共计消费4笔" />
        <p class="item">
          <span class="label">年度费用总额</span>
          <span class="value">104800 元</span>
        </p>
        <p class="item">
          <span class="label">医保支付总额</span>
          <span class="value">2300 元</span>
        </p>
        <p class="item">
          <span class="label">自付金额</span>
          <span class="value">102500 元</span>
        </p>
        <div class="circle-content">
          <dl class="circle-item">
            <dt>
              <van-circle
                v-model="rateState.outpatient"
                :rate="rateState.outpatient"
                :speed="100"
                :text="outpatient"
                stroke-width="100"
                color="#17E58F"
                layer-color="#E6E6E6"
              />
            </dt>
            <dd>门诊</dd>
          </dl>
          <dl class="circle-item">
            <dt>
              <van-circle
                v-model="rateState.pharmacy"
                :rate="rateState.pharmacy"
                :speed="100"
                :text="pharmacy"
                stroke-width="100"
                color="#17D4E5"
                layer-color="#E6E6E6"
              />
            </dt>
            <dd>药店</dd>
          </dl>
          <dl class="circle-item">
            <dt>
              <van-circle
                v-model="rateState.hospital"
                :rate="rateState.hospital"
                :speed="100"
                :text="hospital"
                stroke-width="100"
                color="#176DE5"
                layer-color="#E6E6E6"
              />
            </dt>
            <dd>住院</dd>
          </dl>
        </div>
      </div>
      <div class="content" name="outpatient">
        <medicare-item
          v-for="(item, index) in state.outpatient"
          :key="index"
          :state="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { rightsApi } from "@/api"
import { DropdownMenu, DropdownItem, Circle } from "@ylz/vant"
import medicareItem from "./medicare-item"
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Circle.name]: Circle,
    medicareItem
  },
  data() {
    return {
      query: {
        place: "北京市",
        year: "2021",
        type: ""
      },
      optiosState: {
        place: [
          { text: "北京", value: "北京市" }
        ],
        type: [
          { text: "门诊", value: "门诊" },
          { text: "药店", value: "药店" },
          { text: "住院", value: "住院" },
          { text: "就诊类型", value: "" }
        ],
        year: [
          { text: "2021", value: "2021" }
        ]
      },
      state: {},
      rateState: {
        outpatient: 0,
        pharmacy: 0,
        hospital: 0
      }
    }
  },
  computed: {
    outpatient() {
      return `${this.rateState.outpatient.toFixed(0)}%`
    },
    pharmacy() {
      return `${this.rateState.pharmacy.toFixed(0)}%`
    },
    hospital() {
      return `${this.rateState.hospital.toFixed(0)}%`
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await rightsApi.getIndividualRights()
      this.state = data.healInsuConsRecord
      this.rateState.outpatient = 4300 / 104800 * 100
      this.rateState.pharmacy = 500 / 104800 * 100
      this.rateState.hospital = 100000 / 104800 * 100
      this.state.outpatient = this.state[this.query.year][this.query.place]["门诊"].detail
      console.log("state", this.state[this.query.year][this.query.place])
    }
  }
}
</script>

<style lang="less" scoped>
.page-medicare {
  .container {
    background: #f5f5f5;
    padding: 16px * @ratio;
    .content {
      margin-bottom: 12px * @ratio;
      background: #ffffff;
      padding: 0 16px * @ratio 16px * @ratio;
      border-radius: 8px * @ratio;
      .item {
        margin-top: 12px * @ratio;
      }
      .label {
        font-size: 18px * @ratio;
        font-weight: 400;
        color: #333333;
      }
      .value {
        font-size: 18px * @ratio;
        font-weight: 400;
        color: #ff5000;
        float: right;
      }
      .circle-content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-top: 24px * @ratio;
        border-top: 1px * @ratio solid #e5e5e5;
        margin-top: 16px * @ratio;
        .circle-item {
          text-align: center;
        }
      }
    }
  }
}
</style>