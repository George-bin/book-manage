<template>
  <div class="label-info-component">
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="80px">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入标签名称!"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="formData.remark" placeholder="备注!"></el-input>
      </el-form-item>
      <el-form-item>
        <slot name="btnGroup"></slot>
        <el-button type="warning" @click="handleInitForm">重置表单</el-button>
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
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入标签名！', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ]
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
        let { id } = this.$route.params
        this.GetLabelInfoById(id)
          .then(res => {
            let { code, msg, data } = res
            if (code === null) {
              this.formData = JSON.parse(JSON.stringify(data))
            } else {
              this.$message({
                type: 'warning',
                message: msg
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
    handleInitForm () {
      this.formData = {
        name: '',
        remark: ''
      }
    }
  }
}
</script>

<style lang="scss">
.label-info-component {
  max-width: 600px;
}
</style>
