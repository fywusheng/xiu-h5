<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-21 16:17:59
-->
<template>
  <div class="item" :class="check.includes(state.supportId) ? 'active' : ''">
    <div @click="toggleChecked(state.supportId)" class="icon-active">
      <span v-show="check.includes(state.supportId)">
        <img
          src="@/assets/imgs/family-account/activation.png"
          class="img-block"
        />
      </span>
      <span v-show="!check.includes(state.supportId)">
        <img
          src="@/assets/imgs/family-account/inactivated.png"
          class="img-block"
        />
      </span>
    </div>
    <div>
      <p class="name">{{ state.supportName }}</p>
      <p><span class="label">赡养关系：</span>{{ state.supRelName }}</p>
      <p><span class="label">身份证号：</span>{{ state.idCard | idCard }}</p>
      <p><span class="label">联系电话：</span>{{ state.phone | mobile }}</p>
    </div>
    <div class="pic">
      <img
        v-show="state.supType === '01'"
        src="@/assets/imgs/family-account/support.png"
        class="img-block"
      />
      <img
        v-show="state.supType === '02'"
        src="@/assets/imgs/family-account/support-me.png"
        class="img-block"
      />
      <img
        v-show="state.supType === '11'"
        src="@/assets/imgs/family-account/raised.png"
        class="img-block"
      />
      <img
        v-show="state.supType === '12'"
        src="@/assets/imgs/family-account/raise-me.png"
        class="img-block"
      />
    </div>
  </div>
</template>

<script>
import { mobile, idCard } from "@/utils/desensitization"
export default {
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    checkedList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      state: {},
      check: []
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(newValue) {
        this.state = newValue
      }
    },
    checkedList: {
      immediate: true,
      handler(newValue) {
        this.check = newValue
      }
    }
  },
  methods: {
    toggleChecked(supportId) {
      const flag = !this.check.includes(supportId)
      this.$emit("toggleChecked", {
        supportId,
        flag
      })
    }
  },
  filters: {
    mobile,
    idCard
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 325px * @ratio;
  padding: 11px * @ratio 9px * @ratio;
  background: #ffffff;
  border-radius: 4px * @ratio;
  margin: 0 auto;
  margin-top: 12px * @ratio;
  border: 1px * @ratio solid #eeeeee;
  position: relative;
  .icon-active {
    width: 26px * @ratio;
    margin-right: 6px * @ratio;
  }
  .name {
    font-size: 22px * @ratio;
    line-height: 30px * @ratio;
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
  &.active {
    border: 1px * @ratio solid #ff5500;
  }
}
</style>