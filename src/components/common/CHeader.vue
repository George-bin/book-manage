<template>
  <header class="back-component">
    <div class="back-box">
      <h2>
        <span>{{title}}</span>
      </h2>
      <div class="btn-group">
        <slot name="btnGroup"></slot>
        <el-button
          v-if="backBtn"
          @click="handleClickGoBack"
          type="text"
          size="mini"
          style="color: #E6A23C">返回</el-button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: ''
    },
    backBtn: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleClickGoBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.back-component {
  .back-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 3px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 14px;
    color: #333;
    h2 {
      height: 36px;
      line-height: 36px;
      span {
        display: inline-block;
        height: 100%;
        padding: 0 10px;
        border-bottom: 4px solid #dfdfdf;
      }
    }
  }
}
</style>
