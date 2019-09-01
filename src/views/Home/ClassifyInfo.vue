<template>
  <div class="classify-info-main-component">
    <h2 class="main-title">分类信息</h2>
    <el-form>
      <el-form-item label="分类名称">
        <el-input v-model="classifyForm.classifyName" placeholder="请输入分类名称!"></el-input>
      </el-form-item>
      <el-form-item label="书籍数量">
        <el-input v-model="classifyForm.classifyBookCount" placeholder="请输入书籍数量!" disabled></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button v-if="useType === 'add' || !useType" @click="handleRegisterClassify" class="submit-btn" type="primary">提交</el-button>
        <el-button v-else @click="handleUpdateClassify" class="submit-btn" type="primary">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      classifyForm: {
        classifyId: '',
        classifyName: '',
        classifyBookCount: 0
      },
      useType: 'add'
    }
  },
  created () {
    let { classifyInfo, type } = this.$route.params
    if (classifyInfo) {
      this.useType = type
      this.classifyForm = { ...classifyInfo }
    }
  },
  methods: {
    ...mapActions([
      'RegisterClassify',
      'UpdateClassify',
      'GetClassifyList'
    ]),
    // 新增分类
    handleRegisterClassify () {
      this.$confirm('确定提交吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.RegisterClassify({
            classifyId: Date.now().toString(),
            classifyName: this.classifyForm.classifyName
          })
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
    }
  }
}
</script>

<style lang="scss">
  .classify-info-main-component {
    width: 400px;
    margin: 0 auto;
    .main-title {
      height: 70px;
      line-height: 70px;
      font-size: 22px;
      text-align: center;
    }
    .el-form {
      .el-form-item {
        display: flex;
        .el-form-item__label {
          width: 80px;
        }
        .el-form-item__content {
          flex: 1;
        }
      }
    }
  }
</style>
