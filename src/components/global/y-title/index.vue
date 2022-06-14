<!--
 * @Description: 标题组件
 * @Version: 0.1
 * @Autor: wjn
 * @Date: 2020-07-01 17:41:13
 * @LastEditors: Please set LastEditors
--> 
<template>
  <div class="y-title" :style="style" :class="{'set-border-bottom': mainBorder,'set-title-radius':radius}">
    <div class="query-header" v-if="type === '1'" :style='contStyle'>
      <span class="header-title" :style="{'--fontContSize':this.$pxToViewport(fontContSize,ratio),'--Height':this.$pxToViewport(contentHeight,ratio)}">{{ content }}</span>
    </div>
    <div :class="border?'content':'border-none content'" :style="contStyle" v-else>{{ content }}
      <img class="title-icon" :style="iconStyle" :src="iconUrl" v-if="ifIcon">
      <div class="line-flag" :style="lineStyle" v-show="lineIf" v-else></div>
      <slot name="right-box">
        <span class="more" :style="moreTextStyle" v-show="moreText" v-if="moreType==1" @click="onMoreCilck">
          {{moreText}}
          <van-icon name="arrow" v-show="moreIcon" />
        </span>
        <span class="more-flag" v-else-if="moreType==2">
          <span class="red">*</span>为必填项
        </span>
      </slot>
    </div>
    <div class="des-title2" v-show="titleDesStyle" :style="titleDesStyle">{{titleDes}}</div>
  </div>
</template>
<script>
import { ratio, main_color, third_text_color, main_text_color, gradient_blue_color_2 } from "@/styles/theme/theme-params.less"
export default {
  name: "y-title",
  props: {
    //标题模式
    type: {
      type: String,
      default: "0"
    },
    //占据整个宽度的底边框
    mainBorder: {
      type: Boolean,
      default: false
    },
    titleDes: {
      //标题描述信息
      type: String,
      default: ""
    },
    moreType: {
      type: Number, //默认不展示,默认1为链接,2为文字
      default: 1
    },
    //是否展示右侧图标
    moreIcon: {
      type: Boolean,
      default: false
    },
    //下划线
    border: {
      type: Boolean,
      default: false
    },
    //下划线
    borderColor: {
      type: String,
      default: "transparent"
    },
    // 标题内容样式
    fontContSize: {
      //标题字大小
      type: String,
      default: "16"
    },
    colorCont: {
      //标题内容颜色
      type: String,
      default: main_text_color
    },
    content: {
      //标题内容
      type: String,
      required: true,
      default: "标题2"
    },
    pleft: {
      //左边间距
      type: String,
      default: "8"
    },
    fontWeight: {
      //是否可以加粗
      type: String,
      default: "normal"
    },
    mBottom: {
      //标题底部间距
      type: String,
      default: "10"
    },
    lineIf: {
      //左侧是否展示竖线
      type: Boolean,
      default: true
    },
    // 左侧竖线样式
    lineWidth: {
      //线宽度
      type: String,
      default: "3"
    },
    lineHeight: {
      //线高度
      type: String,
      default: "14"
    },
    lineLeft: {
      //线左边距
      type: String,
      default: "-8"
    },
    lineTop: {
      //线头部边距
      type: String,
      default: "8"
    },
    //更多
    moreText: {
      type: String,
      default: ""
    },
    //设置更多的链接
    morePathUrl: {
      type: String,
      default: "/"
    },
    //标题右侧文字大小
    fontSizeMore: {
      type: String,
      default: "14"
    },
    //标题右侧文字颜色
    colorMore: {
      type: String,
      default: main_color
    },
    //标题描述字体大小
    fontSizeDes: {
      type: String,
      default: "14"
    },
    //标题描述字体颜色
    colorDes: {
      type: String,
      default: third_text_color
    },
    //线条背景色
    backgroundColor: {
      type: String,
      default: gradient_blue_color_2
    },
    ifIcon: {//是否展示标题图标
      type: Boolean,
      default: false
    },
    //图标的url 如：footer-icon-fault.png 标题的图标要放titleIcon底下
    iconUrl: {
      type: String,
      default: require("@/components/global/y-title/imgs/title/icon@3x.png")
    },
    //图标宽度
    iconWidth: {
      type: String,
      default: "28"
    },
    //图标高度
    iconHeight: {
      type: String,
      default: "28"
    },
    //图标左边距
    iconLeft: {
      type: String,
      default: "-32"
    },
    //图标头部边距
    iconTop: {
      type: String,
      default: "7"
    },
    //内容高度
    contentHeight: {
      type: String,
      default: "40"
    },
    //圆角
    radius: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMoreCilck() {
      this.$emit("onMoreCilck")
    }
  },
  computed: {
    /**
     * @description: 标题整体布局样式设置
     * @param {type} 
     * @return: 
     * @author: Chenyt
     */
    style() {
      return {
        marginBottom: this.$pxToViewport(this.mBottom, ratio),
        paddingLeft: this.$pxToViewport(this.pleft, ratio),
        borderBottom: this.$pxToViewport("0.5", ratio) + "solid " + this.borderColor
      }
    },
    /**
     * @description: 左侧蓝色竖线样式设置
     * @param {type} 
     * @return: 
     * @author: Chenyt
     */
    lineStyle() {
      return {
        width: this.$pxToViewport(this.lineWidth, ratio),
        height: this.$pxToViewport(this.lineHeight, ratio),
        left: this.$pxToViewport(this.lineLeft, ratio),
        top: this.$pxToViewport(this.contentHeight / 2, ratio),
        marginTop: this.$pxToViewport("-" + this.lineHeight / 2, ratio),
        background: this.backgroundColor
      }
    },
    /**
     * @description: 标题内容文案样式
     * @param {type} 
     * @return: 
     * @author: Chenyt
     */
    contStyle() {
      return {
        fontSize: this.$pxToViewport(this.fontContSize, ratio),
        color: this.colorCont,
        fontWeight: this.fontWeight,
        height: this.$pxToViewport(this.contentHeight, ratio),
        lineHeight: this.$pxToViewport(this.contentHeight, ratio)
      }
    },
    /**
     * @description: 左侧图标样式设置
     * @param {type} 
     * @return: 
     * @author: Chenyt
     */
    iconStyle() {
      //前置图标
      return {
        width: this.$pxToViewport(this.iconWidth, ratio),
        height: this.$pxToViewport(this.iconHeight, ratio),
        left: this.$pxToViewport(this.iconLeft, ratio),
        top: this.$pxToViewport(this.iconTop, ratio)
      }
    },
    /**
     * @description: 标题底部线样式设置
     * @param {type} 
     * @return: 
     * @author: Chenyt
     */
    bottomLineStyle() {
      return {
        background: this.backgroundColor
      }
    },
    /**
     * @description: 右侧文字样式定义
     * @param {type} 
     * @return: 
     * @author: Chenyt
     */
    moreTextStyle() {
      return {
        fontSize: this.$pxToViewport(this.fontSizeMore, ratio),
        color: this.colorMore
      }
    },
    titleDesStyle() {
      return {
        fontSize: this.$pxToViewport(this.fontSizeDes, ratio),
        color: this.colorDes
      }
    }
  }
}
</script>
<style  lang="less" scoped>
.y-title {
  background-color: @white_bg_color;
  position: relative;
  .border-none {
    border: 0 !important;
  }
  .content {
    text-align: left;
    height: 30px * @ratio;
    line-height: 30px * @ratio;
    border-bottom: 0.5px * @ratio solid @border_color;
    position: relative;
    .title-icon {
      position: absolute;
    }
    .line-flag {
      position: absolute;
      background: linear-gradient(
        0deg,
        @gradient_blue_color_1 0%,
        @gradient_blue_color_2 100%
      );
    }
  }
  .query-header {
    .header-title {
      display: inline-block;
      line-height: 20px * @ratio;
      position: relative;
      &::after {
        content: "";
        width: 30px * @ratio;
        height: 4px * @ratio;
        background-color: @main_color;
        position: relative;
        left: 50%;
        margin-left: -15px * @ratio;
        top: calc((var(--Height) - var(--fontContSize)) / 2 - 4px * @ratio);
        display: block;
      }
    }
  }
  .more {
    display: flex;
    align-items: center;
  }
  .more,
  .more-flag {
    position: relative;
    float: right;
    font-size: 6px * @ratio;
    right: 15px * @ratio;
    color: @four_text_color;
  }
  .more-flag {
    color: @third_text_color;
    font-size: 7px * @ratio;
  }
  .red {
    color: @danger_color;
  }
}
.set-border-bottom {
  border-bottom: 0.5px * @ratio solid @border_color;
}
.des-title2 {
  font-size: 7px * @ratio;
  color: @third_text_color;
  text-align: left;
}
.set-title-radius {
  border-top-right-radius: 8px * @ratio;
  border-top-left-radius: 8px * @ratio;
}
</style>