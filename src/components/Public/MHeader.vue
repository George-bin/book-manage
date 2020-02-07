<template>
  <header class="back-component">
    <div class="back-box">
      <span v-if="backBtn" class="back-btn" @click="handleClickGoBack">
        <i class="el-icon-back"></i>
        返回
      </span>
      <h2 :style="{
        'margin-left': backBtn ? '10px' : '0'
      }">{{title}}</h2>
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
