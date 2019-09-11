<template>
  <div class="login-main-component">
    <div class="login-section">
      <h1 class="login-section-title">管理员登录</h1>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入管理员账户!" v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入管理员密码!" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click.native="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'Login'
    ]),
    // 用户登录
    handleLogin () {
      this.Login(this.loginForm)
        .then(data => {
          console.log('登录状态:', data)
          if (data.errcode === 0) {
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
            this.$router.push('/')
          } else {
            this.$message({
              type: 'error',
              message: '登录失败!'
            })
          }
        })
        .catch(err => {
          console.log('用户登录失败:', err)
        })
    }
  }
}
</script>

<style lang="scss">
  .login-main-component {
    height: 100vh;
    background: #0b282b;
    .login-section {
      position: fixed;
      top: 50%;
      left: 50%;
      padding: 20px 10px 10px;
      transform: translateX(-50%) translateY(-70%);
      background: white;
      border-radius: 10px;
      .login-section-title {
        font-size: 22px;
        font-weight: normal;
        text-align: center;
        letter-spacing: 4px;
      }
      .el-form {
        margin-top: 20px;
        text-align: center;
        .el-form-item__content {
          line-height: 30px;
        }
        .el-input__inner {
          width: 240px;
        }
        .login-btn {
          width: 140px;
          height: 34px;
          padding: 0;
          border-radius: 20px;
        }
      }
    }
  }
</style>
