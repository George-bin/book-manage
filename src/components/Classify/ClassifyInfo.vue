<template>
  <div class="classify-info-component">
    <el-form label-width="80px" ref="form" :model="formData" :rules="rules">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入分类名称!"></el-input>
      </el-form-item>
      <el-form-item label="小说数量" prop="bookCount">
        <el-input-number v-model="formData.bookCount" :min="0" :max="100" label="小说数量"></el-input-number>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input v-model.trim="formData.remark" placeholder="备注信息!"></el-input>
      </el-form-item>
      <el-form-item>
        <slot name="btn"></slot>
<!--        <el-button v-if="useType === 'add' || !useType" @click="handleRegisterClassify" class="submit-btn" type="primary">提交</el-button>-->
<!--        <el-button v-else @click="handleUpdateClassify" class="submit-btn" type="primary">更新</el-button>-->
        <el-button>重置表单</el-button>
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
      formData: {
        name: '',
        bookCount: 0,
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称！', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
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
          .then(res => {
            let { code, msg, data } = res
            if (code === null) {
              this.formData = JSON.parse(JSON.stringify(data))
              return
            }
            this.$message({
              type: 'warning',
              message: msg
            })
            this.$router.back()
          })
          .catch(err => {
            console.log('获取分类信息失败!', err)
            this.$router.back()
          })
      }
    }
  }
}
</script>

<style lang="scss">
.classify-info-component {
  max-width: 550px;
}
</style>
