<template>
  <div class="add-label-component">
    <m-header title="新增标签" :back-btn="true"></m-header>
    <br>
    <label-info ref="labelInfo" use-type="add">
      <template v-slot:btnGroup>
        <el-button
          @click="handleAddLabel"
          class="submit-btn"
          type="primary"
          :loading="loading">提交</el-button>
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
      'AddLabel'
    ]),
    // 新增标签
    handleAddLabel () {
      this.$refs['labelInfo'].$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = this.$refs['labelInfo'].formData
          this.AddLabel({...data})
            .then(res => {
              let { code, msg } = res
              if (code === null) {
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
                this.$refs['labelInfo'].handleInitForm()
                // this.GetLabelList()
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              console.log('新建标签失败：', err)
              this.$message({
                type: 'error',
                message: '新建标签失败!'
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
.add-label-component {
}
</style>
