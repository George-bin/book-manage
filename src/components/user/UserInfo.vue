<template>
  <div class="user-info-component">
    <el-form label-width="80px" ref="form" :model="formData" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="formData.password" type="password" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="formData.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="formData.age" :min="16" :max="100" label="年龄"></el-input-number>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="identityCard">
        <el-input v-model.trim="formData.identityCard" placeholder="身份证"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="photo">
        <el-input v-model.trim="formData.photo" placeholder="头像"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-select v-model="formData.role" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.role"
            :label="item.label"
            :value="item.role">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <slot name="btnGroup"></slot>
        <el-button type="warning" size="small">重置表单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import roles from '@/router/role'
export default {
  name: '',
  props: {
    useType: {
      type: String,
      default: 'add'
    }
  },
  components: {},
  data () {
    return {
      formData: {
        username: '',
        password: '',
        name: '',
        age: 18,
        sex: '男',
        identityCard: '',
        photo: '',
        role: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入分类名称！', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
      },
      roleList: JSON.parse(JSON.stringify(roles))
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    console.log(this.$route.params)
    if (this.useType === 'edit') {
      this.handleGetUserById()
    }
  },
  methods: {
    ...mapActions([
      'GetUserById'
    ]),
    handleGetUserById () {
      let { id } = this.$route.params
      this.GetUserById(id)
        .then(res => {
          let { code, msg, data } = res
          if (code === null) {
            this.formData = JSON.parse(JSON.stringify(data))
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.error('获取用户信息失败：GetUserById', err)
          this.$message({
            type: 'error',
            message: '获取用户信息失败!'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.user-info-component {
  max-width: 550px;
}
</style>
