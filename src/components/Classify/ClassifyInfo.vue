<template>
  <div class="classify-info-component">
    <el-form label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="classifyForm.classifyName" placeholder="请输入分类名称!"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="useType === 'add' || !useType" @click="handleRegisterClassify" class="submit-btn" type="primary">提交</el-button>
        <el-button v-else @click="handleUpdateClassify" class="submit-btn" type="primary">更新</el-button>
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
      classifyForm: {
        classifyName: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'AddClassify',
      'UpdateClassify',
      'GetClassifyList',
      'GetClassifyInfoById'
    ]),
    init () {
      if (this.useType === 'edit') {
        let { _id } = this.$route.params
        this.GetClassifyInfoById(_id)
          .then(data => {
            let { errcode, message, classify } = data
            if (errcode === 0) {
              this.classifyForm = JSON.parse(JSON.stringify(classify))
              return
            }
            this.$message({
              type: 'warning',
              message
            })
            this.$router.back()
          })
          .catch(err => {
            console.log('获取分类信息失败!', err)
            this.$router.back()
          })
      }
    },
    // 新增分类
    handleRegisterClassify () {
      this.$confirm('确定提交吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.AddClassify({
            classifyName: this.classifyForm.classifyName
          })
            .then(data => {
              let { errcode, message } = data
              if (errcode === 0) {
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
                this.handleInitClassifyForm()
                this.GetClassifyList()
                this.$confirm('新增分类成功，是否继续添加分类?', '提示', {
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
              console.error('新增分类失败', err)
              this.$message({
                type: 'error',
                message: '新增分类失败!'
              })
            })
        })
        .catch(() => {
          console.log('取消提交')
        })
    },
    // 更新分类
    handleUpdateClassify () {
      this.$confirm('确定更新吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.UpdateClassify(this.classifyForm)
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
    handleInitClassifyForm () {
      this.classifyForm = {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss">
.classify-info-component {
}
</style>
