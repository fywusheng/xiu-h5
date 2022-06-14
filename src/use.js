
/*
 * @Description: 全局常用的组件
 * @Version: 0.1
 * @Autor: Chenyt
 */

import Vue from "vue"
import {
  Loading,
  Toast,
  Button,
  Icon,
  Popup,
  Empty,
  NavBar,
  Grid, GridItem,
  Search,
  Badge,
  List,
  Dialog,
  Cascader,
  Cell, CellGroup,
  ActionSheet,
  Form,
  Field,
  YSelect,
  YPicker,
  Picker,
  Uploader, YUploader,
  Checkbox
} from "@ylz/vant"

import YLoadingPlus from "@/components/y-loading-plus/index"

Vue.use(YLoadingPlus)

// 常用移动端组件
Vue.use(Empty)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Loading)
Vue.use(NavBar)
Vue.use(Loading)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Badge)
Vue.use(List)
Vue.use(Cascader)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(ActionSheet)
Vue.use(Form)
Vue.use(Field)
Vue.use(YSelect)
Vue.use(YPicker)
Vue.use(Picker)
Vue.use(Uploader)
Vue.use(YUploader)
Vue.use(Checkbox)
Vue.prototype.$Toast = Toast
Vue.prototype.$dialog = Dialog
