<template>
  <div class="edit-classify-component">
    <m-header title="修改分类" :back-btn="true"></m-header>
    <br>
    <classify-info use-type="edit" :id="classifyId"></classify-info>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {
    MHeader: () => import('@/components/Public/MHeader'),
    ClassifyInfo: () => import('@/components/Classify/ClassifyInfo')
  },
  data () {
    return {
      classifyId: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // console.log(this.$route)
      let { _id } = this.$route.params
      this.classifyId = _id
    }
  }
}
</script>

<style lang="scss">
.edit-classify-component {
  width: 660px;
  margin: 10px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
</style>
