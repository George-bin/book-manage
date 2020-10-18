<template>
  <header class="back-component">
    <div class="back-box">
      <h2>{{title}}</h2>
      <div class="btn-group">
        <slot name="btnGroup"></slot>
        <el-button v-if="backBtn" @click="handleClickGoBack" type="warning" size="small">返回</el-button>
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
    padding-bottom: 5px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 14px;
    color: #333;
    .back-btn {
      color: #4bb8c5;
      cursor: pointer;
    }
    h2 {
      padding-bottom: 5px;
      // font-weight: normal;
    }
  }
}
</style>
