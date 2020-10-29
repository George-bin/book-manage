<template>
  <div class="edit-book-component">
    <m-header title="编辑小说" :back-btn="true"></m-header>
    <br/>
    <book-info use-type="edit" ref="bookInfo">
      <template v-slot:btnGroup>
        <el-button
          :loading="loading"
          @click="handleClickUpdateBook"
          type="primary">
          更新
        </el-button>
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
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'UpdateBook'
    ]),
    init () {},
    // 更新小说
    handleClickUpdateBook () {
      // console.log(this.$refs['bookInfo'].formData)
      this.$refs['bookInfo'].$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = this.$refs['bookInfo'].formData
          this.UpdateBook(data)
            .then(res => {
              let { code, msg } = res
              if (code === null) {
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                })
                this.$router.back()
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              console.error('小说信息更新失败', err)
              this.$message({
                type: 'error',
                message: '更新失败!'
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请完善必要信息！'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.edit-book-component {
}
</style>
