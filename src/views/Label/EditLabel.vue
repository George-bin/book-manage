<template>
  <div class="edit-label-component">
    <m-header title="编辑标签" :back-btn="false"></m-header>
    <br>
    <label-info ref="labelInfo" use-type="edit">
      <template v-slot:btnGroup>
        <el-button
          type="primary"
          @click="handleUpdateLabel">
          更新
        </el-button>
      </template>
    </label-info>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {
    MHeader: () => import('@/components/common/CHeader'),
    LabelInfo: () => import('@/components/label/LabelInfo')
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapActions([
      'UpdateLabel'
    ]),
    // 更新标签
    handleUpdateLabel () {
      this.$refs['labelInfo'].$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = this.$refs['labelInfo'].formData
          this.UpdateLabel({...data})
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
              console.log('更新标签失败：', err)
              this.$message({
                type: 'error',
                message: '更新标签失败!'
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请完善表单信息！'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.edit-label-component {
}
</style>
