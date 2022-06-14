<!--
 * @Description: 
 * @Version: 0.1
 * @Autor: lzx
 * @Date: 2020-07-09 15:45:54
 * @LastEditors: lzx
 * @LastEditTime: 2020-07-28 16:41:11
--> 

# y-region-picker 多级地区选择组件

### 介绍

多级地区选择组件，适用于一次性返回数据/层层递进返回数据

### 引入

```js
import Vue from 'vue';
import { YRegionPicker } from '@ylz/vant';

Vue.use(YRegionPicker);
```

## 代码演示

### 数据是一次性返回

``` html
<template>
  <div>
    <van-field v-model="value" input-align="right" label="地区" placeholder="请选择" readonly is-link @click="show = true" />
    <y-region-picker :dataList="regionData" :show="show" @confirm="handleConfirm" @cancel="show =false"></y-region-picker>
  </div>
</template>
```

``` js
import regionData from "@/assets/data/test"
export default {
  name: "region-picker-demo",
  data() {
    return {
      value: "",
      regionData,
      show: false //弹窗显示
    }
  },
  methods: {
    /**
     * 地区组件点击确定(根据需求取数据)
     */
    handleConfirm(e) {
      let value = ""
      e.forEach((item, index) => {
        if (index > 0) {
          value = value + "-" + item.name
        } else {
          value = item.name
        }
      })
      this.value = value
      this.show = false

    }
  }
}
```

### 接口模式，数据是层层返回

``` html
<y-region-picker :show="areaPickerShow" @confirm="onAreaPicker" @cancel="areaPickerShow = false" value-key="text" :api="getTreeNodes" :dataList="dataList" parent-id="code" :use-api="true" />
```

```js

:use-api="true" 使用接口模式

其中接口返回的数据是这样的
{
  id: 3616
  code: "460000000000"
  text: "海南省"
  parentId: "0"
  isLeaf: false
  level: 1
}

因此 value-key="text"，我们根据code查找海南省的下一级，所以 parent-id="code" 

然后首先调用查找地区的接口，返回promise对象，resolve我们要展示的对象数据就行

methods: {
  getTreeNodes(id) {
    return new Promise((resolve, reject) => {
      getTreeNodes({
        parent: id
      }).then(res => {
        //要resolve 我们要的数组
        resolve(res.data.data)
      })
    })
  },
}
created() {
  //设置地区初始值
  this.getTreeNodes('0').then(res => {
    this.dataList = res
  })
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示 | _boolean_ | `false` |
| position | 弹窗弹出位置(bottom/center/top) | _string_ | `bottom` | 
| titleText | 标题 | _string_ | `选地区` |
| cancelText | 取消按钮文本 | _string_ | `取消` |
| confirmText | 确定按钮文本 | _string_ | - |
| dataList | 数组数据 | _array_ | - |
| height | 弹出框高度值 | _string_ | `400` |
| maskClose | 是否点击遮罩层关闭 | _boolean_ | `false` |
| themeColor | 主题色 | _string_ | `@main_color` |
| valueKey | 设置显示的字段名 | _string_ | `name` |
| valueList | 设置默认的子数组字段名, 只适用于useApi=false | _string_ | `list` |
| isInit | 点击 确定/取消 是否初始化数据 | _string_ | `false` |
| useApi | 是否使用接口模式 | _boolean_ | `false` |
| parentId | 查找下个接口数组的父id，仅在useApi=true有用 | _string_ | - |
| api | 传进来的函数，返回一个promise对象  仅在useApi=true有用 | _boolean_ | `false` |

### Event

| 事件名 | 说明                 | 回调参数                       |
| ------ | -------------------- | ------------------------------ |
| onSelectColunm | 点击选项时触发       | _item:object(当前选中的值)_ |
| onCancel  | 点击取消按钮时触发 | _null_ |
| onConfirm  | 点击确认按钮时触发 | _item:object(当前选中的值)_  |
