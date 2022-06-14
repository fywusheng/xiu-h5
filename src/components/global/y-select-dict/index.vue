<!--
 * @Description: y-select-dict
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: Please set LastEditors
 * @Date: 2020-09-29 17:24:35
 * @LastEditTime: 2021-03-28 17:56:22
-->
<template>
  <y-select
    v-model="select"
    v-bind="$attrs"
    v-on="$listeners"
    :columns="columns"
    :format="format"
    :scopedSlots="$scopedSlots"
  >
    <van-search
      class="select-search"
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      v-if="filterabled"
    />
  </y-select>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex"
import isEmpty from "lodash/isEmpty"
export default {
  props: {
    // 字典类型
    dictType: [String, Object],
    value: {
      type: [String, Array, Number]
    },
    filterabled: {
      type: Boolean,
      default: true
    },
    // 格式化数据
    formatter: Function,
    // 数据字典请求api函数
    getCodeApi: Function
  },
  model: {
    prop: "value",
    event: "change"
  },
  name: "y-select-dict",
  data() {
    return {
      searchValue: "",
      list: [],
      type: ""
    }
  },
  watch: {
    searchValue: {
      immediate: true,
      handler(val) {
        if (val) {
          this.filterData(val)
        } else {
          this.list = []
        }
      }
    },
    dictionaryCodeList(val) {
      // 插入请选择数据
      if (val[this.type] && val[this.type][0][this.format.name] !== "请选择") {
        val[this.type].unshift({
          [this.format.name]: "请选择",
          [this.format.value]: ""
        })
      }
    }
  },
  computed: {
    ...mapGetters(["dictionaryCodeList"]),
    ...mapState("dictionary", ["format"]),

    columns() {
      return isEmpty(this.list)
        ? this.dictionaryCodeList[this.type] || []
        : this.list
    },
    select: {
      get() {
        return this.value
      },
      set() {
        this.$emit("change", this.select)
      }
    }
  },
  methods: {
    ...mapActions("dictionary", ["getCodeList"]),
    // 过滤字典数据，回显使用
    filterData(val) {
      const dictionaryCodeList = this.dictionaryCodeList

      if (this.type && !isEmpty(dictionaryCodeList)) {
        const dictData = dictionaryCodeList[this.type]

        this.list = dictData.filter(item => {
          if (item[this.format.name].includes(val)) {
            return true
          }
        })
        this.list.length == 0 && this.$toast("无匹配数据")
      }
    }
    // 服务器搜索
    // handleSearch(query) {
    //   console.log(query)
    //   if (query !== "") {
    //     this.list = []
    //     this.loading = true
    //     // 搜索
    //     getCodeListApi({ types: this.type, keyword: query })
    //       .then(res => {
    //         if (res.code == 0 && !isEmpty(res.data)) {
    //           const data = res.data[this.type]
    //           this.list = data
    //         }
    //         this.loading = false
    //       })
    //       .catch(err => {
    //         this.loading = false
    //       })
    //   }
    // }
  },
  created() {
    let ohterParams = {}
    if (typeof this.dictType == "object") {
      const { type, ...other } = this.dictType
      ohterParams = other
      this.type = type
    } else {
      this.type = this.dictType
    }
    this.type &&
      this.getCodeList({
        payload: { types: this.type, ...ohterParams },
        formatter: this.formatter,
        getCodeApi: this.getCodeApi
      })
  }
}
</script>
<style lang="less" scoped>
.y-van-search {
  /deep/ .van-field__control--right {
    text-align: left;
  }
}
.select-search {
  padding-top: 24px;
}
</style>
