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
    MHeader: () => import('@/components/common/CHeader'),
    LabelInfo: () => import('@/components/label/LabelInfo')
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
}
</style>
