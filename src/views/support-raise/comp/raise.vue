<!--
 * @Description: 抚养组件
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-20 16:15:58
-->
<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field v-model="state.supportName" label="姓名" placeholder="请输入姓名" :disabled="state.supportId !== ''" :rules="[{ validator: checkCN }]" />
      <van-field v-model="state.idCard" label="身份证号" placeholder="请输入身份证号" :disabled="state.supportId !== ''" :rules="[{ validator: validateIdCard }]" />
      <van-field clearable v-model="state.phone" label="联系电话" placeholder="请输入联系电话" :rules="[{ validator: checkMobile }]" />
      <van-field name="radio" label="选择关系">
        <template #input>
          <div class="relation-cont">
            <p @click="getSupType('12')" :class="state.supType === '12' ? 'active' : ''" class="item">
              扶养我的
            </p>
            <p @click="getSupType('11')" :class="state.supType === '11' ? 'active' : ''" class="item">
              我扶养的
            </p>
          </div>
        </template>
      </van-field>
      <van-field name="radio">
        <template #input>
          <div class="supType-cont">
            <p v-for="item in options.relations" :key="item.relationId" :name="item.relationId" @click="getRelationId(item)" :class="state.relationId === item.relationId ? 'active' : ''" class="item">
              {{ item.relationName }}
            </p>
          </div>
        </template>
      </van-field>

      <van-button class="btn-submit" round block btn-submit native-type="submit">确定444</van-button>
    </van-form>
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
import { RadioGroup, Radio, Toast, Overlay } from "@ylz/vant"
import { checkCN, validateIdCard, checkMobile } from "@/utils/check"
export default {
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Overlay.name]: Overlay
  },
  props: {
    supportId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showIntegral: false,
      state: {
        supportId: "",
        supportName: "",
        idCard: "",
        phone: "",
        relationId: "",
        supType: "12"
      },
      options: {
        relations: []
      }
    }
  },
  watch: {
    supportId: {
      immediate: true,
      handler(newValue) {
        if (newValue !== "") {
          this.state.supportId = newValue
          this.getDetail()
        }
      }
    }
  },
  created() {
    this.getSupType(this.state.supType)
  },
  methods: {
    async getDetail() {
      const { data } = await familyApi.findUserSupportById({
        supportId: this.state.supportId
      })
      this.state = data
    },
    async getSupType(name) {
      // 01-我赡养的 02-赡养我的 11-我抚养的 12-抚养我的
      this.state.supType = name
      const { data } = await familyApi.relationListByParam({
        relationType: name
      })
      this.options.relations = data
    },
    getRelationId(item) {
      this.state.supRelName = item.relationName
      this.state.relationId = item.relationId
    },
    async onSubmit() {
      if (this.state.supportId === "") {
        this.$delete(this.state, "supportId")
      }
      if (this.state.relationId === "") {
        this.$toast("请选择与持卡人关系")
        return false
      }
      try {
        const { data } = await familyApi.addUserSupport(this.state)
        if (data.isSupItgl === "0") {
          this.$toast("添加抚养关系成功")
          this.$router.push({ path: `/support-raise`, query: { tabindex: 1 } })
        } else if (data.isSupItgl === "1") {
          //本次可以领取积分的情况
          this.$router.push({ path: `/support-raise`, query: { tabindex: 1 } })
          // this.showIntegral = true;
          // this.timer = setTimeout(() => {
          // this.showIntegral = false
          // this.$router.push({ path: `/support-raise` ,query:{tabindex:1}})
          // }, 2000)
        }
      } catch (erro) {
        console.log("异常----", erro)
      }
    },
    checkCN,
    validateIdCard,
    checkMobile
  }
}
</script>

<style lang="less" scoped>
.btn-submit {
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
.close {
  transform: translate(180px * @ratio, 20px * @ratio);
}
.relation-cont {
  width: 193px * @ratio;
  height: 36px * @ratio;
  padding: 0 2px * @ratio;
  background: #f2f2f2;
  border-radius: 18px * @ratio;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    width: 95px * @ratio;
    height: 32px * @ratio;
    line-height: 32px * @ratio;
    font-size: 18px * @ratio;
    font-weight: 400;
    color: #666666;
    text-align: center;
    &.active {
      color: #ff5500;
      background: #ffffff;
      border-radius: 18px * @ratio;
    }
  }
}
.supType-cont {
  .item {
    width: 141px * @ratio;
    height: 36px * @ratio;
    line-height: 36px * @ratio;
    text-align: center;
    background: #ffffff;
    border-radius: 18px * @ratio;
    border: 1px * @ratio solid #dcdee0;
    display: inline-block;
    margin-top: 16px * @ratio;
    margin-left: 12px * @ratio;
    margin-right: 12px * @ratio;
    &.active {
      color: #ff5500;
      border: 1px * @ratio solid #ff5500;
    }
  }
}
.gradient-btn {
  width: 343px * @ratio;
  height: 54px * @ratio;
  position: fixed;
  left: 50%;
  bottom: 32px * @ratio;
  transform: translateX(-50%);
}
.btn-submit {
  background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
  border-radius: 27px * @ratio;
  font-weight: 500;
  color: #ffffff;
  font-size: 22px * @ratio;
  line-height: 54px * @ratio;
  text-align: center;
}
</style>
