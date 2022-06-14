<!--
 * @Description: 紧急联系人
 * @Version: 0.1
 * @Autor: yjm
 -->
<template>
  <div class="graduateRegister">
    <div class="title">
      <van-icon :name="require('@/assets/svg/home/icon-contact-person.svg')" />
      <span>紧急联系人</span>
    </div>
    <div v-for="item in formItemList" :key="item.id" class="">
      <component
        :is="formTemp"
        :id="item.id"
        :len="formItemList.length"
        :emergency-contact="item.emergencyContact"
        :emergency-phone="item.emergencyPhone"
        @name="getEmergencyContact"
        @phone="getEmergencyPhone"
        @delItme="delItme"
      ></component>
    </div>
    <p v-show="formItemList.length < 2" @click="creatItem" class="add-btn">+ 添加</p>
    <div class="notes-btn">
      <div class="button">
        <van-button plain round size="large" @click="onPre">上一步</van-button>
        <y-button round size="large" @click="onNext"> 下一步23 </y-button>
      </div>
    </div>
  </div>
</template>
<script>
import { checkMobile } from "@/utils/check"
import formItem from "./item"
export default {
  components: {
    formItem
  },
  data() {
    return {
      name: "",
      phone: "",
      form: {},
      formTemp: "formItem",
      formItemList: []
    }
  },
  computed: {
    needMaterial() {
      return this.$store.state["user-info"].needMaterial
    }
  },
  created() {
    this.creatItem()
  },
  methods: {
    getEmergencyContact(val) {
      const index = this.formItemList.findIndex(item => {
        return item.id === val.id
      })
      this.$set(this.formItemList[index], "emergencyContact", val.emergencyContact)
    },
    getEmergencyPhone(val) {
      const index = this.formItemList.findIndex(item => {
        return item.id === val.id
      })
      this.$set(this.formItemList[index], "emergencyPhone", val.emergencyPhone)
    },
    onCommit() {
      if (this.form.emergencyContact === this.$store.state["user"].user.psnName) {
        this.$toast("不能将自己添加为紧急联系人,请重新填写")
        return false
      }
      if (this.form.emergencyPhone === this.$store.state["user"].user.tel) {
        this.$toast("紧急联系电话不能为自己手机号码,请重新填写")
        return false
      }
      this.$refs.form.validate().then((err) => {
        if (!err) {
          this.$store.commit("SET_FORM", {
            ecCertExtendDTO: {
              ...this.$store.state["user-info"].form.ecCertExtendDTO,
              ...this.form
            }
          })
          this.$refs.commit.onCommit()
        }
      })
    },
    async creatItem() {
      let res = true
      if (this.formItemList.length >= 1) {
        res = await this.checkItem()
      }
      if (res) {
        this.formItemList.push({
          id: this.random(100, 1),
          emergencyContact: "",
          emergencyPhone: ""
        })
      }
    },
    delItme(id) {
      const index = this.formItemList.findIndex(item => {
        return item.id === id
      })
      this.formItemList.splice(index, 1)
    },
    random(min, max) {
      const num = Math.floor(Math.random() * (max - min) + min)
      return num
    },
        /**
     * 输入信息校验
     */
    checkInput() {
      return this.formItemList.every((item) => {
        if (!item.emergencyContact) {
          this.$toast("请输入联系人姓名");
          return false;
        }
        if (!item.emergencyPhone) {
          this.$toast("请输入联系电话");
          return false;
        }
        // if (!validatePhoneNumber(item.emergencyPhone)) {
        //   this.$toast("联系电话格式不正确");
        //   return false;
        // }
        return true;
      });
    },
    //校验
     checkConect(){
      const list = this.formItemList;
      const userinfor = this.$store.state["user"].user;
      let _array = [];
      let _phone = [];
      return list.some((item,index,array)=>{
         if(item.emergencyContact === userinfor.psnName || item.emergencyPhone === userinfor.tel){
          this.$toast("不能添加自己为紧急联系人");
           return true;
         }
         if(!_array.includes(item.emergencyContact)){
           _array.push(item.emergencyContact);
         }else{
          this.$toast("紧急联系人名字不能相同"); 
          return true;
         }
         if(!_phone.includes(item.emergencyPhone)){
           _phone.push(item.emergencyPhone);
         }else{
          this.$toast("紧急联系人手机号不能相同"); 
          return true;
         }
      })
    },
    //下一步按钮
    async onNext() {
      const ce = this.checkConect();
      const check = this.checkInput();
      if (!check && ce == false) return;
      if(check && !ce){
        this.$emit("getFormItem", this.formItemList)
        // uni.navigateTo({
        //     url: "/pages/certificate/fillout-step-3",
        //     success: (res) => {
        //       res.eventChannel.emit("didOpenPageFinish", this.params);
        //     },
        // });
      }


      // const res = await this.checkItem()
      // if (res) {
      //   //第三步处理
      //   this.$emit("getFormItem", this.formItemList)
      // }
    },
    checkItem() {
      return new Promise((resolve) => {
        let flag = true
        this.formItemList.forEach((item) => {
          for (const key in item) {
            if (item[key] === "" && key === "emergencyContact") {
              this.$toast("请填写姓名")
              flag = false
              break
            }
            if (!checkMobile(item[key]) && key === "emergencyPhone") {
              this.$toast("请输入正确手机号码")
              flag = false
              break
            }
          }
        })
        resolve(flag)
      })
    },
    onPre() {
      this.$emit("onPre")
    }
  }
}
</script>
<style lang="less" scoped>
.graduateRegister {
  height: 70vh;
  overflow: auto;
}
.title {
  margin: 30px * @ratio 0 15px * @ratio;
  font-size: 22px * @ratio;
  display: flex;
  align-items: center;

  padding: 0 @space_md_16;
  span {
    margin-left: 8px * @ratio;
  }
}
.form {
  padding: 0 8px * @ratio;
}
.notes-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: @space_md_16;
  .promise {
    font-size: 18px * @ratio;
    span {
      color: #0097fe;
    }
  }
  .button {
    margin-top: 16px * @ratio;
    display: flex;
    justify-content: space-between;
    button:first-child {
      margin-right: 15px * @ratio;
    }
  }
}
.add-btn {
  width: 100px * @ratio;
  height: 36px * @ratio;
  line-height: 36px * @ratio;
  border-radius: 20px * @ratio;
  border: 1px solid #ff5500;
  margin: 0 auto;
  color: #ff5500;
  text-align: center;
  margin-top: 16px * @ratio;
}
/deep/ .van-field__label {
  margin-right: 0;
  width: auto;
}
</style>
