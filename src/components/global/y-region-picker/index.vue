<!--
 * @Description: 地区选择组件
 * @Version: 0.1
 * @Autor: lzx
 * @Date: 2020-05-12 09:27:41
 * @LastEditors: lzx
 * @LastEditTime: 2020-08-17 11:14:27
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
            :style="{ color: themeColor }"
            @click="confirm"
            >{{ confirmText }}</span
          >
        </div>
        <div class="select">
          <van-icon
            name="arrow-left"
            class="arrow-left"
            @click="handleLeft"
            v-show="scrollLeft"
          />
          <div class="scroll-view-x" ref="scrollx" @scroll="handleScroll">
            <span
              class="select-btn"
              :style="{ color: item[valueKey] === '请选择' ? themeColor : '' }"
              @click="getBack(index)"
              v-for="(item, index) in selectList"
              :key="item[valueKey]"
              >{{ item[valueKey] }}</span
            >
            <span ref="gap"></span>
          </div>
          <van-icon
            name="arrow"
            class="arrow-right"
            @click="handleRight"
            v-show="hiddenRight"
          />
        </div>
        <div class="scroll-view" ref="scrolly">
          <div
            class="item"
            v-for="(item, index) in data_"
            :key="index"
            @click="select(item, data_)"
          >
            <span
              class="item-city"
              :style="{
                color:
                  selectList[currentLevel][valueKey] === item[valueKey]
                    ? themeColor
                    : ''
              }"
              >{{ item[valueKey] }}</span
            >
            <van-icon
              class="item-icon"
              name="success"
              :color="themeColor"
              v-if="selectList[currentLevel][valueKey] === item[valueKey]"
              size="20"
              ref="select"
            />
          </div>
          <!-- loading层 -->
          <div class="loading" v-if="loading">
            <van-loading />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { main_color, ratio } from "@/styles/theme/theme-params.less"
export default {
  name: "y-region-picker",
  props: {
    //是否显示
    show: {
      default: false
    },
    //取消按钮的值
    cancelText: {
      type: String,
      default: "取消"
    },
    //完成按钮的值
    confirmText: {
      type: String,
      default: "确定"
    },
    //标题
    titleText: {
      type: String,
      default: "选地区"
    },
    //弹出框高度值
    height: {
      default: "400"
    },
    //数据数组
    dataList: {
      type: Array
    },
    //主题色
    themeColor: {
      type: String,
      default: main_color
    },
    //是否点击遮罩层关闭
    maskClose: {
      type: Boolean,
      default: false
    },
    //显示的字段名
    valueKey: {
      type: String,
      default: "name"
    },
    //子数组字段名，仅在useApi=true有用
    valueList: {
      type: String,
      default: "list"
    },
    //是否初始化数据
    isInit: {
      type: Boolean,
      default: false
    },
    //查找下个接口数组的父id，仅在useApi=true有用
    parentId: {
      type: String
    },
    //传进来的接口，是一个promise对象  仅在useApi=true有用
    api: {},
    //是否使用接口模式
    useApi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectList: [{ [this.valueKey]: "请选择" }], //已选择的数组
      data_: this.dataList,
      title: this.titleText,
      beforeItem: [], //存放上级数据的数组
      currentLevel: 0, //当前显示的地区层级
      scrollLeft: 0, //滚动条位置
      hiddenRight: false, //是否显示右边箭头
      loading: false, //是否显示loading
      ratio: ratio
    }
  },
  methods: {
    /**
     * @description: 点击下方选择地区
     * @param {item} 当前点击的项
     * @param {beforeItem} 当前展示的整个数组，即将保存为上一层数组
     * @return:
     * @author: lzx
     */
    select(item, beforeItem) {
      this.$set(this.selectList, this.currentLevel, item)
      this.title = item[this.valueKey]
      if (this.useApi) {
        this.loading = true
        this.api(item[this.parentId]).then(res => {
          if (res) {
            if (res.length) {
              this.$set(this.beforeItem, this.currentLevel, beforeItem)
              this.currentLevel++
              this.$set(this.selectList, this.currentLevel, {
                [this.valueKey]: "请选择"
              })
              this.data_ = res
              //下一步时滚动条置顶
              this.$refs.scrolly.scrollTop = 0
            } else {
              //this.$Toast("没有下一级了")
              //处理点击上方地区，再选择没有子数组的地区依旧存在‘请选择’文字的问题
              if (this.selectList.length > this.currentLevel + 1) {
                this.selectList.splice(this.selectList.length - 1)
              }
            }
          }
        })
        this.loading = false
      } else {
        //有子数组
        if (item[this.valueList]) {
          if (item[this.valueList].length) {
            this.$set(this.beforeItem, this.currentLevel, beforeItem)
            this.currentLevel++
            this.$set(this.selectList, this.currentLevel, {
              [this.valueKey]: "请选择"
            })
            this.data_ = item[this.valueList]
            //下一步时滚动条置顶
            this.$refs.scrolly.scrollTop = 0
          } else {
            //处理点击上方地区，再选择没有子数组的地区依旧存在‘请选择’文字的问题
            if (this.selectList.length > this.currentLevel + 1) {
              this.selectList.splice(this.selectList.length - 1)
            }
          }
        }
      }

      //动画效果
      this.$nextTick(() => {
        this.$refs.gap.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest"
        })
      })
      this.$emit("onSelectColunm", item)
    },
    /**
     * @description: 点击取消按钮
     * @param {type}
     * @return:
     * @author: lzx
     */
    cancel() {
      this.$emit("onCancel")
      if (this.isInit) {
        this.initData()
      }
    },
    /**
     * @description: 点击完成按钮
     * @param {type}
     * @return:
     * @author: lzx
     */
    confirm() {
      const params = this.selectList.filter(item => {
        return item[this.valueKey] !== "请选择"
      })
      this.$emit("onConfirm", params)
      if (this.isInit) {
        this.initData()
      }
    },
    /**
     * @description: 点击上方地区选择
     * @param {index} 当前点击的层级
     * @return:
     * @author: lzx
     */
    getBack(index) {
      //处理当scrollLeft=0 点击第一项 箭头还在的bug
      if (this.scrollLeft === 0) {
        this.hiddenRight = false
      }
      if (this.currentLevel > index) {
        this.selectList.splice(index + 1)
        this.$set(this.selectList, index + 1, { [this.valueKey]: "请选择" })
        this.currentLevel = index
        this.data_ = this.beforeItem[index]
      }
      //当返回之前的选择后，点击上方的请选择，使其进入下一级
      if (index - this.currentLevel === 1) {
        const currentItem = this.beforeItem[this.currentLevel].find(item => {
          //获取当前已选择的项
          return item[this.valueKey] === this.title
        })
        this.select(currentItem, this.beforeItem[this.currentLevel])
      }
      //返回动画
      this.$nextTick(() => {
        if (this.$refs.select) {
          this.$refs.select.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          })
        }
      })
      this.title = this.selectList[index][this.valueKey] //设置标题
    },
    /**
     * @description: 点击往左
     * @param {type}
     * @return:
     * @author: lzx
     */
    handleLeft() {
      this.$refs.scrollx.scrollLeft -= 40
    },
    /**
     * @description: 点击往右
     * @param {type}
     * @return:
     * @author: lzx
     */
    handleRight() {
      this.$refs.scrollx.scrollLeft += 40
    },
    /**
     * @description: 监听滚动
     * @param {type} 当前对象
     * @return:
     * @author: lzx
     */
    handleScroll(e) {
      const scroll = e.target
      this.hiddenRight =
        scroll.scrollWidth - scroll.scrollLeft - scroll.clientWidth > 0
          ? true
          : false
      this.scrollLeft = scroll.scrollLeft
    },
    /**
     * @description: 初始化数据
     * @param {type}
     * @return:
     * @author: lzx
     */
    initData() {
      this.selectList = [{ [this.valueKey]: "请选择" }]
      this.data_ = this.dataList
      this.beforeItem = []
      this.currentLevel = 0
      this.title = this.titleText
    }
  },
  computed: {
    //是否显示popup
    isShow: {
      set() {},
      get() {
        return this.show
      }
    },
    _height() {
      return this.$pxToViewport(this.height, ratio)
    }
  },
  watch: {
    //防止数据为接口获取时首次dataList为空
    dataList() {
      this.data_ = this.dataList
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.page-container {
  .mul-container {
    width: 100%;
    background: @white_bg_color;
    overflow: hidden;
    .mul-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 17px * @ratio 16px * @ratio 12px * @ratio 16px * @ratio;
      font-size: 16px * @ratio;
      line-height: 1;
      .cancel,
      .confirm {
        padding: 4px * @ratio 0;
      }
      .title {
        font-weight: 500;
        color: @main_text_color;
        line-height: 22px * @ratio;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        padding: 0px 10px * @ratio;
        text-align: center;
      }
    }
    .select {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0px 25px * @ratio 0px 35px * @ratio;
      border-top: 0.5px * @ratio solid rgba(@border_color, 0.5);
      border-bottom: 0.5px * @ratio solid rgba(@border_color, 0.5);
      line-height: 40px * @ratio;
      box-sizing: border-box;
      .select-btn {
        display: inline-block;
        line-height: 40px * @ratio;
        font-size: 14px * @ratio;
      }
      .arrow-left {
        position: absolute;
        left: 10px * @ratio;
      }
      .arrow-right {
        position: absolute;
        right: 10px * @ratio;
      }
      .scroll-view-x {
        overflow-x: scroll;
        white-space: nowrap;
        span {
          &:not(:first-child) {
            margin-left: 25px * @ratio;
          }
        }
      }
    }
    .scroll-view {
      display: flex;
      flex-direction: column;
      height: 70%;
      overflow-y: scroll;
      padding-left: 35px * @ratio;
      margin-top: 14px * @ratio;
      .item {
        padding-bottom: 30px * @ratio;
        display: flex;
        align-items: center;
        &:first-child {
          margin-top: 10px * @ratio;
        }
        .item-city {
          display: inline-block;
          margin-right: auto;
          font-size: 14px * @ratio;
        }
        .item-icon {
          float: right;
          margin-right: 13px * @ratio;
        }
      }
      .loading {
        position: absolute;
        height: 70%;
        width: 100%;
        margin-left: -18px * @ratio;
        background: @main_bg_color;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .item:last-child {
    padding-bottom: 10px * @ratio;
  }
  .set-gray {
    color: @second_text_color !important;
  }
  .set-black {
    color: @main_text_color;
  }
}
// 隐藏滚动条
/deep/ ::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  color: transparent !important;
  display: none !important;
}
/deep/ .van-popup {
  border-top-left-radius: 10px * @ratio;
  border-top-right-radius: 10px * @ratio;
}
</style>
