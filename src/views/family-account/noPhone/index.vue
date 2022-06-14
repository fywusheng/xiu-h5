<!--
 * @Description: 无手机绑定
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-21 15:19:49
-->
<template>
  <div class="page-nophone">
    <div class="header">
      <div class="pic">
        <img src="@/assets/imgs/family-account/header.png" class="img-block" />
      </div>
      <p>添加亲情账号</p>
    </div>
    <div class="container">
      <p class="tit">确认亲友身份信息</p>
      <van-form ref="form">
        <van-field
          v-model="state.toName"
          label="姓名"
          placeholder="请输入亲友姓名"
          :rules="[{ required: true, message: '' }]"
        />
        <van-field
          v-model="state.idCard"
          label="身份证号"
          placeholder="请输入亲友身份证号"
          :rules="[{ required: true, message: '' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="state.relationName"
          label="选择关系"
          placeholder="请选择亲友关系"
          :rules="[{ required: true, message: '' }]"
          @click="showPicker = true"
        />
      </van-form>
      <div @click="next" class="btn">下一步</div>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="options.columns"
        value-key="relationName"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { familyApi } from "@/api"
import { jumpFaceRecognition } from "@/utils"
export default {
  data() {
    return {
      showPicker: false,
      state: {
        faceImg: "",
        fromUactId: "", // 建立方账户Id
        fromName: "", // 建立方姓名
        toName: "", // 接受方姓名
        idCard: "", // 身份证号码
        regChnl: "H5", // 渠道
        relationName: "", // 关系类型名称
        relationId: "", // 关系类型ID
        relationCertWay: "00", // 认证方式
        supType: ""
      },
      options: {
        columns: []
      }
    }
  },
  created() {
    this.getAllRelation()
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue.query && newValue.query.ismatch) {
          this.state.faceImg = newValue.query.img
          this.submit()
        }
      }
    }
  },
  methods: {
    async next() {
      const { psnName, uactId } = await this.$store.dispatch("getUserInfo")
      this.state.fromName = psnName
      this.state.fromUactId = uactId
      this.$refs.form.validate().then(err => {
        if (!err) {
          sessionStorage.setItem("noPhoneBound", JSON.stringify(this.state))
          jumpFaceRecognition({
            userName: this.state.toName,
            idCard: this.state.idCard,
            url: "family-account/nophone-add"
          })
        }
      })
    },
    async submit() {
      const res = JSON.parse(sessionStorage.getItem("noPhoneBound"))
      res.faceImg = this.state.faceImg
      this.state = res
      const { code, data } = await familyApi.addIdCardFamily(res)
      if (code === 0) {
        // sessionStorage.setItem("otherUserInfo", JSON.stringify(this.state))
        this.$router.push({
          path: "bound-success-card",
          query: { isItgl: data.isItgl, isReceive: data.isReceive }
        })
      }
    },
    onConfirm(item) {
      this.state.relationName = item.relationName
      this.state.relationId = item.relationId
      this.state.supType = item.supType
      this.showPicker = false
    },
    async getAllRelation() {
      const { data } = await familyApi.relationListByParam({
        relationType: ""
      })
      this.options.columns = data
    }
  }
}
</script>

<style lang="less" scoped>
.page-nophone {
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
    padding: 25px * @ratio 16px * @ratio;
    margin: 0 auto;
    margin-top: -175px * @ratio;
    position: relative;
    .tit {
      font-size: 20px * @ratio;
      font-weight: 400;
      color: #303133;
      line-height: 16px * @ratio;
      margin-bottom: 31px * @ratio;
    }
    .btn {
      width: 311px * @ratio;
      height: 54px * @ratio;
      background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
      border-radius: 27px * @ratio;
      font-weight: 500;
      color: #ffffff;
      font-size: 22px * @ratio;
      line-height: 54px * @ratio;
      text-align: center;
      margin-top: 25px * @ratio;
    }
  }
}
</style>