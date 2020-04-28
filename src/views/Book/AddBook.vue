<template>
  <div class="add-book-component">
    <m-header title="新增小说" :back-btn="false"></m-header>
    <br>
    <book-info title="新增小说" use-type="add"></book-info>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {
    MHeader: () => import('@/components/Public/MHeader'),
    BookInfo: () => import('@/components/Book/BookInfo')
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
  width: 920px;
  margin: 10px auto;
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
