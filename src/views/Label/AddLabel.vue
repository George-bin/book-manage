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
    // 新增标签
    handleAddLabel () {
      this.loading = true
      this.AddLabel({
        name: this.labelForm.name
      })
        .then(res => {
          this.loading = false
          let { code, msg } = res
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '成功!'
            })
            this.$refs['labelInfo'].handleInitLabelForm()
            this.GetLabelList()
            this.$confirm('新增标签成功，是否继续添加标签?', '提示', {
              type: 'success',
              cancelButtonText: '不添加',
              confirmButtonText: '添加'
            })
              .then(() => {})
              .catch(() => {
                this.$router.back()
              })
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.log('新建标签失败', err)
          this.$message({
            type: 'error',
            message: '新建标签失败!'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.add-label-component {
  margin: 10px auto;
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
}
</style>
