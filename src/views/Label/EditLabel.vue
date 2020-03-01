<template>
  <div class="edit-label-component">
    <m-header title="新增标签" :back-btn="true"></m-header>
    <br>
    <label-info use-type="edit"></label-info>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {
    MHeader: () => import('@/components/Public/MHeader'),
    LabelInfo: () => import('@/components/Label/LabelInfo')
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
.edit-label-component {
  width: 920px;
  margin: 10px auto;
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
