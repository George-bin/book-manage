<template>
  <div class="add-classify-component">
    <c-header title="新增分类" :back-btn="true"></c-header>
    <br>
    <classify-info use-type="add" ref="classifyInfo">
      <template v-slot:btn>
        <el-button :loading="loading" @click="handleRegisterClassify" type="primary">提交</el-button>
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
    CHeader: () => import('@/components/common/CHeader'),
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
  mounted () {},
  methods: {
    ...mapActions([
      'AddClassify'
    ]),
    /**
     * 新增分类
     */
    handleRegisterClassify () {
      this.$refs['classifyInfo'].$refs['form'].validate((valid) => {
        if (valid) {
          let formdata = {...this.$refs['classifyInfo'].formData}
          this.loading = true
          this.AddClassify({
            ...formdata
          })
            .then(data => {
              let { code, msg } = data
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
              console.error('新增分类失败', err)
              this.$message({
                type: 'error',
                message: '新增分类失败!'
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请核对信息后重新提交！'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.add-classify-component {
  margin: 10px auto;
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
