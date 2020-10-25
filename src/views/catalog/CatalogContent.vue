<template>
  <div class="catalog-content-component">
    <c-header title="章节内容" :back-btn="true"></c-header>
    <br>
    <div v-html=""></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {
    CHeader: () => import('@/components/common/CHeader')
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
.catalog-content-component {
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
