<!--
 * @Description: 三级地区选择组件
 * @Version: 0.1
 * @Autor: lzx
 * @Date: 2020-05-09 09:27:41
 * @LastEditors: yjm
 * @LastEditTime: 2020-12-03 15:00:05
 -->
<template>
  <div class="page-container">
    <van-popup
      v-model="isShow"
      position="bottom"
      :close-on-click-overlay="maskClose"
    >
      <div class="mul-container" :style="{ height: _height }">
        <div class="mul-header">
          <span class="cancel" @click="cancel">{{ cancelText }}</span>
          <span class="title">{{ title }}</span>
          <span
            class="confirm"
            :style="{ color: proSelected ? themeColor : '' }"
            @click="confirm"
            >{{ confirmText }}</span
          >
        </div>
        <div class="select">
          <!-- 第一列 -->
          <div class="select-1">
            <span
              class="text"
              :style="{
                borderBottomColor: proSelected ? '' : themeColor,
                color: proSelected ? '' : themeColor
              }"
              >{{ province }}</span
            >
            <div class="scroll-view">
              <div
                v-for="item in provinceList"
                :key="item.value"
                class="item"
                @click="select(item, 'province')"
              >
                <span :class="proSelected ? 'set-gray' : ''">{{
                  item.label
                }}</span>
              </div>
            </div>
          </div>
          <!-- 第二列 -->
          <div class="select-1" v-if="proSelected">
            <span
              class="text"
              :style="{
                borderBottomColor: citySelected ? '' : themeColor,
                color: citySelected ? '' : themeColor
              }"
              >{{ city }}</span
            >
            <div class="scroll-view">
              <div
                v-for="item in cityList"
                :key="item.value"
                class="item"
                @click="select(item, 'city')"
              >
                <span :class="citySelected ? 'set-gray' : ''">{{
                  item.label
                }}</span>
              </div>
            </div>
          </div>
          <!-- 第三列 -->
          <div class="select-1" v-if="proSelected && citySelected">
            <span
              class="text"
              :style="{
                borderBottomColor: areaSelected ? '' : themeColor,
                color: areaSelected ? '' : themeColor
              }"
              >{{ area }}</span
            >
            <div class="scroll-view">
              <div
                v-for="item in areaList"
                :key="item.value"
                class="item"
                @click="select(item, 'area')"
              >
                <span :class="areaSelected ? 'set-gray' : ''">{{
                  item.label
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { main_color, ratio } from "@/styles/theme/theme-params.less"
export default {
  name: "y-area",
  props: {
    //是否显示
    show: {
      default: false
    },
    //组件弹出位置
    position: {
      default: "bottom"
    },
    //中间的标题
    title: {
      type: String,
      default: ""
    },
    //取消按钮的值
    cancelText: {
      type: String,
      default: "取消"
    },
    //完成按钮的值
    confirmText: {
      type: String,
      default: "完成"
    },
    //1、2、3列的默认文本内容
    tip1: {
      type: String,
      default: "请选择（必选）"
    },
    tip2: {
      type: String,
      default: "请选择（非必选）"
    },
    tip3: {
      type: String,
      default: "请选择（非必选）"
    },
    //三列数据数组
    plist: {
      type: Array
    },
    clist: {
      type: Array
    },
    alist: {
      type: Array
    },
    //内容高度
    height: {
      default: 350
    },
    //是否点击遮罩层关闭
    maskClose: {
      type: Boolean,
      default: false
    },
    //主题色
    themeColor: {
      type: String,
      default: main_color
    }
  },
  data() {
    return {
      cityList: [],
      areaList: [],
      proSelected: false, //是否选择省/市/区
      citySelected: false,
      areaSelected: false,
      province: this.tip1, //选择后顶部文本
      city: this.tip2,
      area: this.tip3,
      provinceCode: "", //code值
      cityCode: "",
      areaCode: "",
      ratio: ratio
    }
  },
  methods: {
    /**
     * @description: 选择省市区
     * @param {item} 选择的项
     * @param {type} 类型
     * @return:
     * @author: lzx
     */
    select(item, type) {
      switch (type) {
      case "province":
        this.proSelected = true
        this.province = item.label
        this.provinceCode = item.value
        this.city = this.tip2
        this.cityCode = ""
        this.area = this.tip3
        this.areaCode = ""
        this.citySelected = false
        this.areaSelected = false
        this.cityList = []
        this.clist.forEach(list => {
          if (list[0].value.indexOf(item.value) === 0) {
            list.forEach(list => {
              this.cityList.push(list)
            })
            return
          }
        })
        this.$emit("onColumnChange", 0, item)
        break
      case "city":
        this.citySelected = true
        this.city = item.label
        this.cityCode = item.value
        this.area = this.tip3
        this.areaCode = ""
        this.areaSelected = false
        this.areaList = []
        this.alist.forEach(list => {
          list.forEach(list => {
            if (list[0].value.indexOf(item.value) === 0) {
              list.forEach(list => {
                this.areaList.push(list)
              })
              return
            }
          })
        })
        this.$emit("onColumnChange", 1, item)
        break
      case "area":
        this.areaSelected = true
        this.area = item.label
        this.areaCode = item.value
        this.$emit("onColumnChange", 2, item)
        break
      }
    },
    /**
     * @description: 点击取消按钮
     * @param {type}
     * @return:
     * @author: lzx
     */
    cancel() {
      this.isShow = false
      this.initData()
      this.$emit("onCancel")
    },
    /**
     * @description: 点击完成按钮
     * @param {type}
     * @return:
     * @author: lzx
     */
    confirm() {
      if (this.proSelected) {
        this.isShow = false
        var params = [
          {
            province: this.province,
            code: this.provinceCode
          },
          {
            city: this.city,
            code: this.cityCode
          },
          {
            area: this.area,
            code: this.areaCode
          }
        ]
        //没有选择的项不加进选择的数组
        params = params.filter(item => {
          if (item.code) {
            return item
          }
        })
        this.initData()
      } else {
        this.$toast("请选择必选项")
      }
      this.$emit("onConfirm", params)
    },
    /**
     * @description: 初始化数据
     * @param {type}
     * @return:
     * @author: lzx
     */
    initData() {
      this.proSelected = false
      this.citySelected = false
      this.areaSelected = false
      this.province = this.tip1
      this.city = this.tip2
      this.area = this.tip3
    }
  },
  computed: {
    provinceList() {
      //省数组
      return this.plist
    },
    isShow: {
      set() {},
      get() {
        return this.show
      }
    },
    _height() {
      return this.$pxToViewport(this.height, ratio)
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  .mul-container {
    //height: 350px * @ratio;
    width: 100%;
    background: @main_bg_color;
    overflow-y: hidden;
    .mul-header {
      display: flex;
      justify-content: space-between;
      padding: 13px * @ratio 15px * @ratio;
      font-size: 16px * @ratio;
      .title {
        font-size: 17px * @ratio;
      }
      .confirm {
        color: @main_text_color;
      }
    }
    .select {
      display: flex;
      height: 100%;
      padding: 0px 16px * @ratio 20px * @ratio;
      .select-1 {
        width: 33vw;
        font-size: 14px * @ratio;
        line-height: 20px * @ratio;
        display: flex;
        flex-direction: column;
        .text {
          width: 112px * @ratio;
          padding: 3px * @ratio 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-bottom: 3px * @ratio solid transparent;
        }
      }
      .scroll-view {
        display: flex;
        flex-direction: column;
        height: 80%;
        overflow-y: scroll;
        .item {
          margin-top: 16px * @ratio;
        }
      }
    }
  }
  .item:last-child {
    padding-bottom: 10px * @ratio;
  }
  .blue-border {
    border-bottom-color: @main_color !important;
    color: @main_color;
  }
  .set-gray {
    color: @third_text_color !important;
  }
  .set-black {
    color: @main_text_color;
  }
}
//隐藏滚动条
// /deep/ ::-webkit-scrollbar {
//   width: 0 !important;
//   height: 0 !important;
//   color: transparent !important;
//   display: none !important;
// }
</style>
