<template>
  <div class="catalog-content-component">
    <c-header title="章节内容" :back-btn="true"></c-header>
    <br>
    <h3 class="chapter-title">{{chapter.name}}</h3>
    <div class="chapter-content" style="white-space: pre-wrap;" v-html="chapter.content"></div>
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
      chapter: {}
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
            this.chapter = JSON.parse(JSON.stringify(data))
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
  .chapter-title {
    font-size: 24px;
    font-weight: normal;
    text-align: center;
    color: $main_font_color;
  }
  .chapter-content {
    margin-top: 40px;
    color: $common_font_color;
  }
}
</style>
