<template>
  <div class="edit-classify-component">
    <m-header title="修改分类" :back-btn="true"></m-header>
    <br>
    <classify-info use-type="edit" ref="classifyInfo">
      <template v-slot:btn>
        <el-button :loading="loading" @click="handleUpdateClassify" type="primary">更新</el-button>
      </template>
    </classify-info>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {
    MHeader: () => import('@/components/common/CHeader'),
    ClassifyInfo: () => import('@/components/classify/ClassifyInfo')
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
  },
  methods: {
    ...mapActions([
      'UpdateClassify'
    ]),
    // 更新分类
    handleUpdateClassify () {
      this.$confirm('确定更新吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$refs['classifyInfo'].$refs['form'].validate((valid) => {
            if (valid) {
              let data = {...this.$refs['classifyInfo'].formData}
              this.loading = true
              this.UpdateClassify(data)
                .then(res => {
                  let { code, msg } = res
                  if (code === null) {
                    this.$message({
                      type: 'success',
                      message: '成功!'
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
                  console.error('更新分类失败：', err)
                  this.$message({
                    type: 'error',
                    message: '更新分类失败!'
                  })
                })
                .finally(() => {
                  this.loading = false
                })
            }
          })
        })
        .catch(() => {
          console.log('取消提交')
        })
    }
  }
}
</script>

<style lang="scss">
.edit-classify-component {
}
</style>
