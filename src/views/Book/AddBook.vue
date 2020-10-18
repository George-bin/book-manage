<template>
  <div class="add-book-component">
    <m-header title="新增小说" :back-btn="false"></m-header>
    <br>
    <book-info title="新增小说" use-type="add">
    </book-info>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {
    MHeader: () => import('@/components/common/CHeader'),
    BookInfo: () => import('@/components/book/BookInfo')
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
.add-book-component {
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
