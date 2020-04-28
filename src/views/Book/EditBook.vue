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
  max-width: 920px;
  margin: 10px auto;
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
