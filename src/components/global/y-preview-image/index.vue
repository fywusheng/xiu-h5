<template>
  <van-popup v-model="show">
      <div class="previews" @click="show = false">
        <div class="previews-box">
          <div>{{ datetime | dayFormat("datetime") }}</div>
          <div class="previews-img">
            <img :src="url" alt="previewImage" />
          </div>
        </div>
      </div>
    </van-popup>
</template>
<script>
export default {
  name: "y-preview-image",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      required: true
    },
    datetime: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    show: {
      set(val){
        this.$emit("input", val)
      },
      get(){
        return this.value
      }
    }
  }
}
</script>
<style lang="less" scoped>
.previews {
  font-size: 18px * @ratio;
  font-weight: bold;
  color: #ffffff;
  line-height: 27px * @ratio;
  height: 528px * @ratio;
  position: relative;
}
.previews-box {
  text-align: center;
  transform: rotate(90deg) translate(160px, 0px);
}
.previews-img {
  border: 4px * @ratio dashed #f30303;
  height: 338px * @ratio;
  width: 528px * @ratio;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>