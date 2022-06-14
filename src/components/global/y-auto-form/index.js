/*
 * @Description: y-auto-form 自动表单
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: yjm
 */
import FormItem from "./y-form-item"
import merge from "lodash/merge"

export default {
  props: {
    value: Object,
    formItemList: {
      type: Array,
      required: true
    }
  },

  name: "y-auto-form",

  model: {
    event: "change",
    prop: "value"
  },

  components: { FormItem },

  data() {
    return {
      rawFormItemList: [],
      rawFormItem: {},
      generateMap: {
        title: this.genTitle,
        slot: this.genSlot
      }
    }
  },

  methods: {
    genFormItem(props) {
      const { on, prop, hidden, ...attrs } = props

      props = {
        attrs: {
          __data: this.form[prop], // form item 绑定值
          on,
          name: prop,
          ...attrs
        },
        on: {
          // 更新form item绑定值
          update: val => {
            this.form[prop] = val
            this.$emit("change", this.form)
          }
        }
      }
      return <FormItem {...props} v-show={!hidden}></FormItem>
    },
    parseFormItemList(formItemList) {
      const isArrayValue = ["uploader", "region", "area", "selectDict"]
      // 原始配置对象
      this.rawFormItemList = formItemList
        .map(item => {
          // 提取id
          if (item.item && item.item.prop) {
            item.prop = item.item.prop
          }

          return item
        })
        .filter(item => {
          if (!item.prop && item.type != "title" && item.type != "slot") {
            console.log(`缺少prop字段，掉该项配置将被过滤`, item)
            return false
          }
          return true
        })
      // 原始form item 的 v-model 绑定值对象

      this.rawFormItemList.map(item => {
        if (item.prop) {
          this.rawFormItem[item.prop] =
            isArrayValue.includes(item.type) ||
            item.checkboxGroup ||
            item.radioGroup
              ? []
              : null
        }
      })
    },
    genDefaultSlots() {
      return (
        this.$scopedSlots.default && this.$scopedSlots.default(this.$children)
      )
    },
    genSlot(props) {
      const { render } = props
      if (!render) {
        throw Error("缺少渲染函数 render 字段")
      }
      return render()
    },
    genTitle(props) {
      const titleProps = this.renderOptions({ config: props })
      return <y-title {...titleProps} v-show={!props.hidden}></y-title>
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
    }
  },
  watch: {
    formItemList: {
      immediate: true,
      deep: true,
      handler(val) {
        this.parseFormItemList(val)
      }
    }
  },
  mounted() {
    // 复制van-form的方法,合并到this
    const { submit, validate, resetValidation, scrollToField } = this.$refs.form

    Object.assign(this, { submit, validate, resetValidation, scrollToField })
  },
  computed: {
    form() {
      return Object.assign({}, this.rawFormItem, this.value)
    }
  },

  render(h) {
    const props = {
      attrs: this.$attrs,
      on: this.$listeners
    }

    return (
      <van-form ref="form" {...props}>
        {this.rawFormItemList.map(item => {
          const generate = this.generateMap[item.type] || this.genFormItem
          return generate(item)
        })}
        {this.genDefaultSlots()}
      </van-form>
    )
  }
}
