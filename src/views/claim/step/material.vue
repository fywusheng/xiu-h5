<!--
 * @Description: 证明材料
 * @Version: 0.1
 * @Autor: yjm
 -->
<template>
  <div class="graduateRegister">
    <div class="title">
      <van-icon :name="require('@/assets/svg/home/icon-claim.svg')" />
      <span>上传证明材料</span>
    </div>

    <div class="form" v-for="(item, index) in list" :key="index">
      <uplodaer v-model="item.data" ref="uploader" @remove="onRemove(index)" />
    </div>

    <div class="add">
      <van-button plain round icon="plus" native-type="button" @click="onAdd">
        添加更多证明材料
      </van-button>
    </div>
    <div class="notes-btn">
      <div class="button">
        <van-button plain round size="large" @click="onSetp(1)">上一步</van-button>
        <y-button round size="large" @click="onSetp(2)"> 提交申领 </y-button>
      </div>
    </div>
    <!-- 提交
    <commit ref="commit" @commit="onCommit" /> -->
  </div>
</template>
<script>
import uplodaer from "./uploader"
// import commit from "./commit"
import { commonApi } from "@/api"
export default {
  components: {
    uplodaer,
    
  },

  data() {
    return {
      list: [{ data: {} }]
    }
  },

  methods: {
    onSetp(type){
      this.$emit("onSetp",type)
    },
    onRemove(index) {
      this.list.splice(index, 1)
    },
    onAdd() {
      this.list.push({ data: {} })
    },
    async upload() {
      const params = this.list.map(({ data }) => {
        if (!data.attachFilePath) {
          return false
        }
        return {
          base64String: data.attachFilePath[0].content.split(",")[1],
          fileExt: data.attachFilePath[0].type.split("/")[1],
          attachFileName: data.attachFileName
        }
      }).filter(Boolean)

      const newParams = []

      await Promise.all(params.map(
        async({ base64String, fileExt, attachFileName }) => {
          const res = await commonApi.batchUpload({ base64Strings: [base64String], fileExt })
          if (res.code == 0) {
            newParams.push({
              attachFileName,
              attachFilePath: res.data.absoluteUrl
            })
          }
        }
      ))
      return newParams
    },
    //提交
    async onCommit() {
      const uploaders = this.$refs["uploader"]
      if (Array.isArray(uploaders) && uploaders.length) {
        const validates = this.$refs["uploader"].map((item) => item.validate())
        Promise.all([...validates]).then(async(res) => {
          const params = await this.upload()
          this.$store.commit("SET_FORM", { ecCertAttachDTOS: params })
          this.$refs.commit.onCommit()
        })
      }
    },
    onPre() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.graduateRegister {
  padding-bottom: 136px * @ratio;
}
.title {
  margin-top: 30px * @ratio;
  font-size: 22px * @ratio;
  display: flex;
  align-items: center;
  padding: 0 @space_md_16;
  span {
    margin-left: 8px * @ratio;
  }
}
.notes-btn {
  position: fixed;
  width: 100%;
  padding: @space_md_16;
  bottom: 0;
  background-color: #fff;
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
.add {
  text-align: center;
  padding: @space_md_16 0 46px * @ratio;
}
</style>
