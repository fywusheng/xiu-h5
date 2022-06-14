/*
 * @Description: y-form-item 表单子项
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: Please set LastEditors
 */
import isFunction from "lodash/isFunction"
import isObject from "lodash/isObject"
import merge from "lodash/merge"
import flattenDeep from "lodash/flattenDeep"
import { dayFormat } from "@/utils/dayjs"
import ImageCode from "./image-code.vue"
import SmsCode from "./sms-code.vue"
import YArea from "./y-area.vue"

import "./index.less"

import {
  Rate,
  Slider,
  YUploader,
  Stepper,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Calendar,
  YSelect,
  DatetimePicker
} from "@ylz/vant"

export default {
  name: "y-form-item",
  data() {
    return {
      generator: "",
      showPopup: false,
      cacheData: "",
      fieldText: ""
    }
  },
  components: {
    Rate,
    Slider,
    YUploader,
    Stepper,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Calendar,
    YSelect,
    ImageCode,
    SmsCode,
    YArea
  },

  methods: {
    genNormalInput(field, props) {
      const fieldProps = merge(props, field)
      return <van-field v-model={this.data} {...fieldProps}></van-field>
    },
    genSwitch(field, props) {
      return (
        <van-field {...field}>
          <template slot="input">
            <van-switch v-model={this.data} {...props} />
          </template>
        </van-field>
      )
    },
    genCascader(field, props) {
      const fieldProps = this.renderOptions({
        config: field,
        defaultAttrs: {
          isLink: true,
          readonly: true,
          inputAlign: "right",
          placeholder: "请选择"
        },
        defaultEvent: {
          click: () => {
            this.showPopup = true
          }
        }
      })
    
      const cascaderProps = this.renderOptions({
        config: props,
        defaultEvent: {
          finish: (data) => {
            this.data = data.value
            this.fieldText = data.selectedOptions[data.selectedOptions.length - 1].text 
            this.showPopup = false
            this.$emit("finish", data)
          },
          close: () => {
            this.showPopup = false
          }
        },
        defaultAttrs: {}
      })
      return (
        <div class="van-cell form-item">
          <van-field v-model={this.fieldText} {...fieldProps} />
          <van-popup v-model={this.showPopup} position='bottom'>
            <van-cascader v-model={this.data} {...cascaderProps} />
          </van-popup>
        </div>

      )
    },
    genStepper(field, props) {
      return (
        <van-field {...field}>
          <template slot="input">
            <Stepper v-model={this.data} {...props} />
          </template>
        </van-field>
      )
    },
    // 内置checkbox图标
    checkboxIcon(icon, size) {
      return state => {
        return icon == "tick" ? (
          <img
            style={{ height: size, width: size }}
            src={
              state.checked
                ? require("./icon/checkbox-selected1.svg")
                : require("./icon/checkbox-unselecte1.svg")
            }
          />
        ) : (
          <img
            style={{ height: size, width: size }}
            src={
              state.checked
                ? require("./icon/checkbox-selected2.svg")
                : require("./icon/checkbox-unselecte2.svg")
            }
          />
        )
      }
    },
    // 内置checkbox禁用状态图标
    checkboxDisabledIcon(icon, size) {
      return state => {
        return icon == "tick" ? (
          <img
            style={{ height: size, width: size }}
            src={
              state.checked
                ? require("./icon/checkbox-selected1-disabled.svg")
                : require("./icon/checkbox-unselecte1-disabled.svg")
            }
          />
        ) : (
          <img
            style={{ height: size, width: size }}
            src={
              state.checked
                ? require("./icon/checkbox-selected2-disabled.svg")
                : require("./icon/checkbox-unselecte2-disabled.svg")
            }
          />
        )
      }
    },
    genCheckbox(field, props) {
      props.attrs.disabled = field.attrs.disabled || props.attrs.disabled // 合并disabled
      const { checkboxs, ...checkboxGroupProps } =
        props.attrs.checkboxGroup || {}
      checkboxGroupProps.disabled =
        checkboxGroupProps.disabled || props.attrs.disabled // 合并disabled
      const icon =
        field.attrs.icon || props.attrs.icon || checkboxGroupProps.icon // 图标
      const iconSize =
        field.attrs.iconSize ||
        props.attrs.iconSize ||
        checkboxGroupProps.iconSize ||
        "1em" // 图标

      if (!props.scopedSlots.icon) {
        // 配置默认图标
        props.scopedSlots.icon = props.attrs.disabled
          ? this.checkboxDisabledIcon(icon, iconSize)
          : this.checkboxIcon(icon, iconSize)
      }

      return (
        <van-field {...field}>
          <template slot="input">
            {props.attrs.checkboxGroup ? (
              <van-checkbox-group
                v-model={this.data}
                {...this.renderOptions({
                  config: checkboxGroupProps,
                  defaultAttrs: { direction: "horizontal" }
                })}
              >
                {checkboxs.map(prop => {
                  const { text, ...otherProp } = prop
                  const checkboxProps = this.renderOptions({
                    config: otherProp,
                    defaultScopedSlots: {
                      icon:
                        checkboxGroupProps.disabled || otherProp.disabled
                          ? this.checkboxDisabledIcon(icon, iconSize)
                          : props.scopedSlots.icon
                    }
                  })
                  return (
                    <van-checkbox {...checkboxProps}>
                      {!checkboxProps.scopedSlots.default && text}
                    </van-checkbox>
                  )
                })}
              </van-checkbox-group>
            ) : (
              <van-checkbox v-model={this.data} {...props}>
                {!props.scopedSlots.default && props.attrs.text}
              </van-checkbox>
            )}
          </template>
        </van-field>
      )
    },
    genRadio(field, props) {
      props.attrs.disabled = field.attrs.disabled || props.attrs.disabled // 合并disabled

      const { radios, ...radioGroupProps } = props.attrs.radioGroup || {}
      radioGroupProps.disabled =
        radioGroupProps.disabled || props.attrs.disabled // 合并disabled
      const icon = field.attrs.icon || props.attrs.icon || radioGroupProps.icon // 图标
      const iconSize =
        field.attrs.iconSize ||
        props.attrs.iconSize ||
        radioGroupProps.iconSize ||
        "1em" // 图标

      if (!props.scopedSlots.icon) {
        // 配置默认图标
        props.scopedSlots.icon = props.attrs.disabled
          ? this.checkboxDisabledIcon(icon, iconSize)
          : this.checkboxIcon(icon, iconSize)
      }

      return (
        <van-field {...field}>
          <template slot="input">
            {props.attrs.radioGroup ? (
              <van-radio-group
                v-model={this.data}
                {...this.renderOptions({
                  config: radioGroupProps,
                  defaultAttrs: { direction: "horizontal" }
                })}
              >
                {radios.map(prop => {
                  const { text, ...otherProp } = prop
                  const radiosProps = this.renderOptions({
                    config: otherProp,
                    defaultScopedSlots: {
                      icon:
                        radioGroupProps.disabled || otherProp.disabled
                          ? this.checkboxDisabledIcon(icon, iconSize)
                          : props.scopedSlots.icon
                    }
                  })
                  return (
                    <van-radio {...radiosProps}>
                      {!radiosProps.scopedSlots.default && text}
                    </van-radio>
                  )
                })}
              </van-radio-group>
            ) : (
              <van-radio v-model={this.data} {...props}>
                {!props.scopedSlots.default && props.attrs.text}
              </van-radio>
            )}
          </template>
        </van-field>
      )
    },
    genRate(field, props) {
      return (
        <van-field {...field}>
          <template slot="input">
            <Rate v-model={this.data} {...props} />
          </template>
        </van-field>
      )
    },
    genUploader(field, props) {
      return (
        <van-field {...field}>
          <template slot="input">
            <YUploader v-model={this.data} {...props} />
          </template>
        </van-field>
      )
    },
    genSlider(field, props) {
      return (
        <van-field {...field}>
          <template slot="input">
            <Slider v-model={this.data} {...props} />
          </template>
        </van-field>
      )
    },
    genCalendar(field, props) {
      const calendarType = props.attrs.calendarType || "single"
      if (props.attrs.disabled) {
        field.attrs.disabled = props.attrs.disabled
      }
      const fieldProps = this.renderOptions({
        config: field,
        defaultAttrs: {
          isLink: true,
          readonly: true,
          inputAlign: "right",
          placeholder: "点击选择时间",
          format: "date"
        },
        defaultEvent: {
          click: () => {
            if (!field.attrs.disabled && !props.attrs.disabled) {
              this.showPopup = true
            }
          }
        }
      })

      const calendarProps = this.renderOptions({
        config: props,
        defaultEvent: {
          confirm: data => {
            this.data = format(data, this)
            this.showPopup = false
          }
        },
        defaultAttrs: {
          delimiter: null
        }
      })

      calendarProps.attrs.type = calendarType

      function format(data, _this) {
        const format = fieldProps.attrs.format
        const delimiter = calendarProps.attrs.delimiter
        if (calendarType == "multiple" || calendarType == "range") {
          data = data.map(item => dayFormat(item, format))
          _this.$emit("confrm", data)
          return delimiter
            ? data.join(delimiter)
            : calendarType == "multiple"
              ? data.join(",")
              : data.join("~")
        } else {
          data = dayFormat(data, format)
          _this.$emit("confrm", data)
          return data
        }
      }

      return (
        <div class="van-cell form-item">
          <van-field v-model={this.data} {...fieldProps} />
          <Calendar v-model={this.showPopup} {...calendarProps} />
        </div>
      )
    },
    genRegion(field, props) {
      const fieldProps = this.renderOptions({
        config: field,
        defaultAttrs: {
          isLink: true,
          readonly: true,
          inputAlign: "right",
          placeholder: "请选择"
        },
        defaultEvent: {
          click: () => {
            this.showPopup = true
          }
        }
      })

      const regionProps = this.renderOptions({
        config: props,
        defaultEvent: {
          onConfirm: data => {
            this.data = data.map(item => item.code).filter(Boolean)
            this.showPopup = false
            this.$emit("confirm", data)
          },
          onCancel: () => {
            this.showPopup = false
          }
        },
        defaultAttrs: {
          isInit: true
        }
      })

      return (
        <div class="van-cell form-item">
          <van-field v-model={this.regionText} {...fieldProps} />
          <y-region-picker show={this.showPopup} {...regionProps} />
        </div>
      )
    },
    genArea(field, props) {
      const fieldProps = this.renderOptions({
        config: field,
        defaultAttrs: {
          isLink: true,
          readonly: true,
          inputAlign: "right",
          placeholder: "请选择"
        },
        defaultEvent: {
          click: () => {
            this.showPopup = true
          }
        }
      })

      const areaProps = this.renderOptions({
        config: props,
        defaultEvent: {
          onConfirm: data => {
            this.data = data.map(item => item.code).filter(Boolean)
            this.showPopup = false
            this.$emit("confirm", data)
          },
          onCancel: () => {
            this.showPopup = false
          }
        },
        defaultAttrs: {}
      })

      return (
        <div class="van-cell form-item">
          <van-field v-model={this.areaText} {...fieldProps} />
          <y-area show={this.showPopup} {...areaProps} />
        </div>
      )
    },
    genDatetime(field, props) {
      // 时间格式化
      const dateType = {
        datetime: "YYYY-MM-DD HH:mm:ss",
        date: "YYYY-MM-DD",
        "year-month": "YYYY-MM",
        "month-day": "MM-DD",
        datehour: "YYYY-MM-DD HH"
      }

      const type = props.attrs.dateType || "time"

      const fieldProps = this.renderOptions({
        config: field,
        defaultAttrs: {
          isLink: true,
          readonly: true,
          inputAlign: "right",
          placeholder: "点击选择时间"
        },
        defaultEvent: {
          click: () => {
            this.showPopup = true
          }
        }
      })

      const datetimeProps = this.renderOptions({
        config: props,
        defaultEvent: {
          confirm: data => {
            this.data = dateType[type] ? dayFormat(data, dateType[type]) : data
            this.showPopup = false
          },
          cancel: () => {
            this.showPopup = false
          }
        }
      })

      datetimeProps.attrs.type = type

      const popupProps = this.renderOptions({
        config: datetimeProps.attrs.popup,
        defaultAttrs: {
          position: "bottom"
        }
      })

      return (
        <div class="van-cell form-item">
          <van-field v-model={this.data} {...fieldProps} />
          <van-popup v-model={this.showPopup} {...popupProps}>
            <DatetimePicker {...datetimeProps} />
          </van-popup>
        </div>
      )
    },
    genSelect(field, props) {
      let fieldProps = merge(props, field)
      fieldProps = this.renderOptions({
        config: fieldProps,
        defaultAttrs: {
          isLink: true
        }
      })
      return (
        <YSelect
          class="van-cell form-item"
          v-model={this.data}
          {...fieldProps}
        />
      )
    },
    genSelectDict(field, props) {
      let fieldProps = merge(props, field)
      fieldProps = this.renderOptions({
        config: fieldProps,
        defaultAttrs: {
          isLink: true
        }
      })
      return (
        <div class="van-cell form-item">
          <y-select-dict
            style={{ width: "100%" }}
            v-model={this.data}
            {...fieldProps}
          />
        </div>
      )
    },
    genImageCode(field, props) {
      return (
        <div class="van-cell form-item">
          <van-field v-model={this.data} {...field}>
            <template slot="button">
              <ImageCode {...props}></ImageCode>
            </template>
          </van-field>
        </div>
      )
    },
    genSmsCode(field, props) {
      return (
        <div class="van-cell form-item">
          <van-field v-model={this.data} {...field}>
            <template slot="button">
              <SmsCode {...props}></SmsCode>
            </template>
          </van-field>
        </div>
      )
    },
    genSlots(scopedSlots, props) {
      return isFunction(scopedSlots)
        ? scopedSlots()
        : isObject(scopedSlots)
          ? Object.keys(scopedSlots).map(item => {
            return (
              <template slot={item}>
                {isFunction(scopedSlots[item]) && scopedSlots[item](props)}
              </template>
            )
          })
          : undefined
    },
    /**
     * 配置默认值
     * @param {Object} config VNode配置对象
     * @param {Object} defaultEvent 默认事件
     * @param {Object} defaultAttrs 默认属性
     * @param {Object} defaultScopedSlots 默认插槽
     */
    renderOptions({
      config = {},
      defaultEvent,
      defaultAttrs,
      defaultScopedSlots
    }) {
      const {
        scopedSlots,
        on,
        attrs,
        style,
        props,
        domProps,
        directives,
        nativeOn,
        slot,
        key,
        ref,
        refInFor,
        ...other
      } = config

      // 关键词class字段替换
      const className = other.class
      delete other.class

      return {
        scopedSlots: merge(defaultScopedSlots, scopedSlots),
        on: merge(defaultEvent, on),
        attrs: merge(defaultAttrs, other, attrs),
        class: className,
        style,
        props,
        domProps,
        directives,
        nativeOn,
        slot,
        key,
        ref,
        refInFor
      }
    },
    setCascaderText() {
      if (this.fieldText){
        return this.fieldText
      } 
      let text
      const _this = this
      const { options } = this.$attrs
      const format = this.$attrs.format ? this.$attrs.format :{
        text: "text",
        value: "value",
        children: "children"
      }
        
      !(function fn(data){
        data.some(item => {
          if (item[format.value] == _this.data){
            text = item[format.text]
            return true
          }
          if (item[format.children] && item[format.children].length){
            fn(item[format.children])
          }
        })
      })(options)
      this.fieldText = text     
    }
  },
  created() {
    const type = {
      input: this.genNormalInput, // 普通输入框
      switch: this.genSwitch, // 开关
      stepper: this.genStepper, // 进步器
      rate: this.genRate, // 评分
      slider: this.genSlider, // 滑块
      uploader: this.genUploader, // 图片上传
      calendar: this.genCalendar, // 日历
      select: this.genSelect, // 选择框
      selectDict: this.genSelectDict, // 码表编译选择框
      checkbox: this.genCheckbox, // 多选框
      radio: this.genRadio, // 单选框
      datetime: this.genDatetime, // 时间选择框
      area: this.genArea, // 三级地区选择框
      region: this.genRegion, // 城市选择框
      imageCode: this.genImageCode, // 图形验证码
      smsCode: this.genSmsCode, // 短信验证码
      cascader: this.genCascader // 级联选择
    }

    // 获取生成模板函数，创建后不在变更
    this.generator = type[this.$attrs.type] || this.genNormalInput

    if (this.$attrs.type == "cascader") {
      this.setCascaderText()
    }
    
  },

  computed: {
    data: {
      set(val) {
        this.$emit("update", val)
      },
      get() {
        return this.$attrs.__data
      }
    },
    
    regionText() {
      if (this.$attrs.type == "region") {
        let area = this.$attrs.dataList

        return this.data
          .map(item => {
            let res = []
            area.some(i => {
              if (i.code == item) {
                res = i
                return true
              }
            })
            area = res.list
            return res.name
          })
          .filter(Boolean)
          .join("/")
      } else {
        return ""
      }
    },

    areaText() {
      if (this.$attrs.type == "area") {
        const clist = flattenDeep(this.$attrs.clist)
        const plist = flattenDeep(this.$attrs.plist)
        const alist = flattenDeep(this.$attrs.alist)

        const area = [plist, clist, alist]

        return this.data
          .map((code, index) => {
            let res = {}
            area[index].some(i => {
              if (i.value == code) {
                res = i
                return true
              }
            })
            return res.label
          })
          .filter(Boolean)
          .join("/")
      } else {
        return ""
      }
    }
  },

  render(h) {
    // eslint-disable-next-line no-unused-vars
    const { type, item, __data, ...props } = this.$attrs

    if (type == "region") {
      // 配置默认地区数据
      this.$attrs.dataList =
        this.$attrs.dataList || require("./data/regionData")
    }
    if (type == "area") {
      // 配置默认地区数据
      this.$attrs.plist = this.$attrs.plist || require("./data/province")
      this.$attrs.clist = this.$attrs.clist || require("./data/city")
      this.$attrs.alist = this.$attrs.alist || require("./data/area")
    }
    return this.generator(
      this.renderOptions({ config: item }),
      this.renderOptions({ config: props, defaultAttrs: { clearable: true } })
    )
  }
}
