<template>
  <div class="add-classify-component">
    <m-header title="新增分类" :back-btn="true"></m-header>
    <br>
    <classify-info use-type="add"></classify-info>
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
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
.add-classify-component {
  width: 920px;
  margin: 10px auto;
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
