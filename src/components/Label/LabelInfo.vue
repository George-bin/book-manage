<template>
  <div class="label-info-component">
    <el-form label-width="80px">
      <el-form-item label="标签名称">
        <el-input v-model="labelForm.name" placeholder="请输入标签名称!"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="useType === 'add' || !useType"
          @click="handleAddLabel"
          class="submit-btn"
          type="primary"
          :loading="loading">提交</el-button>
        <el-button
          v-else
          @click="handleUpdateLabel"
          class="submit-btn"
          type="primary"
          :loading="loading">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    useType: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      labelForm: {
        name: ''
      },
      loading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'AddLabel',
      'UpdateLabel',
      'GetLabelList',
      'GetLabelInfoById'
    ]),
    init () {
      if (this.useType === 'edit') {
        let { _id } = this.$route.params
        this.GetLabelInfoById(_id)
          .then(data => {
            let { errcode, message, label } = data
            if (errcode === 0) {
              this.labelForm = JSON.parse(JSON.stringify(label))
            } else {
              this.$message({
                type: 'warning',
                message
              })
              this.$router.back()
            }
          })
          .catch(err => {
            console.log('获取分类信息失败!', err)
            this.$router.back()
          })
      }
    },
    // 新增标签
    handleAddLabel () {
      this.loading = true
      this.AddLabel({
        name: this.labelForm.name
      })
        .then(data => {
          this.loading = false
          let { errcode, message } = data
          if (errcode === 0) {
            this.$message({
              type: 'success',
              message: '成功!'
            })
            this.handleInitLabelForm()
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
              message
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
    },
    // 更新分类
    handleUpdateLabel () {
      this.$confirm('确定更新吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.UpdateClassify(this.labelForm)
            .then(() => {
              this.$message({
                type: 'success',
                message: '成功!'
              })
              this.useType = 'edit'
              this.GetClassifyList()
            })
        })
        .catch(() => {
          console.log('取消提交')
        })
    },
    handleInitLabelForm () {
      this.labelForm = {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss">
.label-info-component {
}
</style>
