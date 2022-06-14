<!--
 * @Description: 
 * @Version: 0.1
 * @Autor: lzx
 * @Date: 2020-07-02 17:31:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 10:13:45
--> 
# y-title 标题组件

### 介绍

适用于各种业务场景下的标题组件,可设置主标题、左边竖条、右边更多、主标题下描述、主标题图标、更多图标、标题下划线等功能

### 引入

```js
import Vue from 'vue';
import { YTitle } from '@ylz/vant';

Vue.use(YTitle);
```

## 代码演示

```html
<template>
  <div class="container">
    <y-title content="基础标题" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title content="这里是标题" />

    <y-title content="带更多" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title content="这里是标题" moreText="更多" :moreIcon="true" />
    <y-title content="这里是标题2" moreText="更多" :moreIcon="true" :colorMore="thirdTextColor" />

    <y-title content="带更多不加Icon" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title content="这里是标题" moreText="更多" />

    <y-title content="带描述的标题" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title content="这里是标题" fontContSize="20" titleDes="这里是标题描述信息" fontSizeDes="14" :colorDes="fourTextColor" mBottom="16" />

    <y-title content="带必填表单标题" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title content="这里是标题" :moreType="2" mBottom="16" />

    <y-title content="不带竖线标题" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title content="这里是标题" :lineIf="false" pleft="0" />

    <y-title content="不带竖线标题+更多组合" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title content="这里是标题" :lineIf="false" pleft="0" moreText="更多" :moreIcon="true" />
    <y-title content="这里是标题" :lineIf="false" pleft="0" moreText="更多" />

    <y-title content="带下划线+高度设置" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title :border="true" :contentHeight="80" content="这里是标题" moreText="更多" />

    <y-title content="带下划线样式满屏" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title :mainBorder="true" content="这里是标题" :borderColor="fourTextColor" moreText="更多" />

    <y-title content="是否带标题图标" :lineIf="false" pleft="0" :colorCont="thirdTextColor" mBottom="0" />
    <y-title :mainBorder="true" :ifIcon="true" content="这里是标题" pleft="34" :borderColor="fourTextColor" moreText="更多" />

  </div>
</template>
```

```js
import { third_text_color, four_text_color } from "@/styles/theme-params.less"
export default {
  name: "title-demo",
  data () {
    return {
      thirdTextColor: third_text_color,
      fourTextColor: four_text_color
    }
  },
  created () {
  }
}
```

## API
### Props

| 参数        | 说明         | 类型     | 默认值   |
| ----------- | ------------ | -------- | -------- |
| type   | 标题模式(当为"1"时蓝色块在下) | _string_ | `"0"`    |
| mainBorder | 是否显示占据整个宽度的底边框 | _boolean_ | `false` |
| titleDes   | 标题描述 | _string_ | -    |
| moreType | 默认不展示,默认1为链接,2为文字 | _number_ | `1` |
| moreIcon   | 是否展示右侧图标 | _boolean_ | `false`    |
| border   | 是否展示文字内容下划线 | _boolean_ | `false`    |
| borderColor | 文字内容下划线颜色| _string_ | `transparent` |
| fontContSize   | 标题文字大小 | _string_ | `16`    |
| colorCont | 标题内容颜色 | _string_ | `@main_text_color` |
| content   | 标题文本 | _string_ | `标题2`    |
| pleft | 标题左边距 | _string_ | `8` |
| fontWeight   | 标题文本粗细 | _string_ | `normal`    |
| mBottom | 标题底部边距 | _string_ | `10` |
| lineIf   | 是否显示左边竖线 | _boolean_ | `true`    |
| lineWidth | 左边竖线宽度 | _string_ | `3` |
| lineHeight   | 左边竖线高度 | _string_ | `14`    |
| lineLeft | 左边竖线左边距 | _string_ | `-8` |
| lineTop   | 左边竖线距离顶部高度 | _string_ | `8`    |
| backgroundColor | 左边竖线背景色 | _string_ | `gradient_blue_color_2` |
| moreText | 右边更多文本 | _string_ | - |
| fontSizeMore | 右边更多文字大小 | _string_ | `14` |
| colorMore   | 右边更多文字颜色 | _string_ | `@main_color`    |
| ifIcon | 是否显示标题图标 | _boolean_ | `false` |
| iconUrl   | 标题图标url | _string_ | `require("@/components/global/y-title/imgs/title/icon@3x.png")`    |
| iconWidth | 图标宽度 | _string_ | `28` |
| iconHeight   | 图标高度 | _string_ | `28`    |
| iconLeft | 图标左边距 | _string_ | `-32` |
| iconTop   | 图标顶部边距 | _string_ | `7`    |
| contentHeight | 内容高度 | _string_ | `40` |
| radius   | 标题顶部圆角 | _boolean_ | `false`|

### Event

| 事件名 | 说明                 | 回调参数                       |
| ------ | -------------------- | ------------------------------ |
| onMoreCilck | 点击更多时触发       | - |


