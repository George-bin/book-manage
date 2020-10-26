<template>
  <div class="catalog-content-component">
    <c-header title="章节内容" :back-btn="true"></c-header>
    <br>
    <div style="white-space: pre-wrap;" v-html="content"></div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
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
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetChapterContentById'
    ]),
    init () {
      let { id } = this.$route.params
      this.GetChapterContentById(id)
        .then(res => {
          let { code, msg, data } = res
          if (code === null) {
            this.content = data.content ? data.content : ''
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.error('获取章节内容失败：', err)
          this.$message({
            type: 'error',
            message: '获取章节内容失败！'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.catalog-content-component {
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
