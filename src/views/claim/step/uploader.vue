<!--
 * @Description: 材料上传
 * @Version: 0.1
 * @Autor: yjm
-->
<template>
  <y-auto-form
    v-model="_value"
    :formItemList="formItemList"
    input-align="right"
    class="form"
    ref="form"
  >
    <div class="delete" @click="onDelete">删除</div>
  </y-auto-form>
</template>
<script>
import { ImagePreview } from "@ylz/vant"
export default {
  computed: {
    _value: {
      set(val) {
        this.$emit("input", val)
      },
      get() {
        return this.value
      }
    },
    formItemList(){
      return [
        {
          type: "selectDict",
          prop: "attachFileName",
          filterabled: false,
          dictType: "attachFileName",
          labelWidth: "135px",
          item: {
            placeholder: "请选择材料类型",
            rules: [{ required: this._value.attachFilePath, message: "" }]
          },
          scopedSlots: {
            label: () => (
              <div class="tip">
                证明材料类型
              <van-icon
                onClick={this.onTip}
                name={require("@/assets/svg/home/icon-tip.svg")}
              />
              </div>
            )
          }
        },
        {
          type: "slot",
          render: () => {
            return (
              <div class="uploader">
                <div class="title">
                  <h3>图片上传</h3>
                  <span
                    onClick={() => {
                      ImagePreview({
                        images: [require("@/assets/svg/home/example.png")],
                        closeable: true
                      })
                    }}
                  >
                    查看示例
                  </span>
                </div>

                <div class="file">
                  <van-field
                    input-align="center"
                    error-message-align="center"
                    prop="file"
                    rules={[{ required: this._value.attachFileName, message: "请上传图片" }]}
                  >
                    <template slot="input">
                      <y-uploader
                        v-model={this._value.attachFilePath}
                        max-count="1"
                      >
                        <van-button class="custom-upload" >
                          <img src={require("src/assets/svg/home/icon-upload.svg")} />
                          <div>点击上传图片</div>
                        </van-button>
                      </y-uploader>
                    </template>
                  </van-field>
                </div>
              </div>
            )
          }
        }
      ]
    }
  },
  props: {
    value: Object
  },
  data() {
    return {
      
    }
  },
  methods: {
    onDelete(){
      this.$emit("remove")
    },
    onTip(e) {
      e.stopPropagation()
      this.$dialog.alert({
        title: "温馨提示",
        confirmButtonText: "我知道了",
        message:
          "请您根据实际情况上传证明材料，一些证件可能享有不同福利哦！若没有符合的证明材料，可以直接点击提交申请。"
      })
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form
          .validate()
          .then((err) => {
            if (!err) {
              resolve(this._value)
            } else {
              reject(err)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.uploader {
  font-size: 20px * @ratio;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    span {
      color: #0097FE;
      font-size: 18px * @ratio;;
    }
  }

  h3 {
    padding: 16px * @ratio 0;
    font-size: 20px * @ratio;
    font-weight: 400;
  }
  .file {
    border: 1px dashed #cecece;
    border-radius: @border_radius_lg;
    padding: 16px * @ratio 0;
    text-align: center;
    /deep/ .van-field__error-message {
      text-align: center;
    }
  }
  
}
.custom-upload {
  img{
    width: 46px * @ratio;
    height: 46px * @ratio;
  }
  text-align: center;
  font-size: 16px * @ratio;
  border: none;
  height: auto;
}
.form {
  padding: @space_md_16 @space_md_16 0;

  border-bottom: 8px * @ratio solid #f5f5f5;
  /deep/ .van-cell {
    padding: 0;
    padding-bottom: 8px * @ratio;
  }
  /deep/ .van-cell::after {
    left: 0;
    right: 0;
  }
  /deep/ .van-field__control ,/deep/ .van-cell__right-icon{
    font-size: 18px * @ratio;
  }
}
.tip {
  display: flex;
  align-items: center;
  /deep/ .van-icon {
    font-size: 18px * @ratio;
    margin-left: 5px * @ratio;
  }
}
.delete {
  margin-top: @space_md_16;
  color: #eb3030;
  text-align: center;
  font-size: 20px * @ratio;
  height: 40px * @ratio;
  line-height: 40px * @ratio;
  border-top: 1px solid #ebedf0;
  cursor: pointer;
}
</style>