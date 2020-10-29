<template>
  <div class="add-book-component">
    <m-header title="新增小说" :back-btn="false"></m-header>
    <br>
    <book-info title="新增小说" ref="bookInfo" use-type="add">
      <template v-slot:btnGroup>
        <el-button
          :loading="loading"
          @click="handleClickAddBook"
          type="primary">提交</el-button>
      </template>
    </book-info>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {
    MHeader: () => import('@/components/common/CHeader'),
    BookInfo: () => import('@/components/book/BookInfo')
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapActions([
      'AddBook'
    ]),
    handleClickAddBook () {
      this.$refs['bookInfo'].$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = this.$refs['bookInfo'].formData
          this.AddBook(data)
            .then(res => {
              this.loading = false
              let { code, msg } = res
              if (code === null) {
                this.$message({
                  type: 'success',
                  message: '新增小说成功!'
                })
                this.$refs['bookInfo'].handleInitformData()
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              console.log('新增小说失败', err)
              this.$message({
                type: 'error',
                message: '新增小说失败!'
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.add-book-component {
}
</style>
