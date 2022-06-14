/*
 * @Description: button
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: yjm
 */
export default {
  name: "y-button",
  render(h) {
    const props = {
      attrs: {
        color: "linear-gradient(to right, #FF8800, #FF5000)",
        ...this.$attrs
      },
      on: {
        ...this.$listeners
      }
    }
  
    return <van-button {...props}>{this.$scopedSlots.default && this.$scopedSlots.default() }</van-button>
  }
}