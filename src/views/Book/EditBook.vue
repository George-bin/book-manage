<!--
 * @Author: your name
 * @Date: 2020-04-28 14:50:02
 * @LastEditTime: 2020-09-04 17:19:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \book-manage\src\views\Book\EditBook.vue
-->
<template>
  <div class="edit-book-component">
    <m-header title="编辑小说" :back-btn="true"></m-header>
    <br>
    <book-info use-type="edit"></book-info>
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
    return {
      bookInfo: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {}
  }
}
</script>

<style lang="scss">
.edit-book-component {
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
