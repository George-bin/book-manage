<template>
  <div class="login-main-component">
    <div class="login-section">
      <div class="login-box">
        <header>
          <div class="logo">
            <img src="../../../static/img/logo.png" alt="logo" />
          </div>
          <h1>狒狒阅读管理平台</h1>
        </header>
        <div class="login-form">
          <div class="login-form-item input__inner">
            <input v-model="loginForm.username" placeholder="Username" type="text" />
          </div>
          <div class="login-form-item input__inner">
            <input v-model="loginForm.password" placeholder="Password" type="password" autocomplete="off" />
          </div>
          <div class="login-form-item remember-checkbox">
            <input v-model="rememberMe" id="rememberMe" type="checkbox" />
            <label for="rememberMe">Remember me</label>
          </div>
          <div class="login-form-item">
            <el-button type="primary" :loading="loading" class="login-btn" @click.native="handleLogin">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import md5 from 'md5'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      rememberMe: false
    }
  },
  watch: {},
  mounted () {
    this.initRememberMe()
    // this.init()
  },
  methods: {
    ...mapActions([
      'Login',
      'Auth'
    ]),
    init () {
      // 鉴权
      this.Auth()
        .then(data => {
          if (data.errcode === 0) {
            sessionStorage.setItem('auth', 'true')
            this.$router.push('/')
          } else {
            console.log('鉴权失败')
          }
        })
        .catch(err => {
          console.log('鉴权失败', err)
        })
    },
    // 记住密码
    initRememberMe () {
      let rememberMe = localStorage.getItem('remember_me')
      if (rememberMe && rememberMe === 'true') {
        this.rememberMe = true
        let usernameInfo = localStorage.getItem('username_info')
        if (usernameInfo) {
          this.loginForm = JSON.parse(usernameInfo)
        } else {
          localStorage.setItem('remember_me', 'false')
        }
      } else {
        this.rememberMe = false
        localStorage.setItem('remember_me', 'false')
      }
    },
    // 用户登录
    handleLogin () {
      this.loading = true
      this.Login({
        username: this.loginForm.username,
        password: this.loginForm.password
        // password: md5(this.loginForm.password)
      })
        .then(data => {
          console.log('登录状态:', data)
          if (data.code === null) {
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
            sessionStorage.setItem('auth', 'true')
            // 记住密码 start
            if (this.rememberMe) {
              localStorage.setItem('account_info', JSON.stringify(this.loginForm))
              localStorage.setItem('remember_me', 'true')
            } else {
              localStorage.setItem('remember_me', 'false')
            }
            // 记住密码 end
            this.$router.push('/book')
          } else {
            this.$message({
              type: 'error',
              message: '登录失败!'
            })
          }
        })
        .catch(err => {
          console.log('用户登录失败:', err)
          this.$message({
            type: 'error',
            message: '登录失败!'
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
  .login-main-component {
    height: 100vh;
    background: url('../../../static/img/login-bg.jpeg') no-repeat;
    background-size: 100% 100%;
    .login-section {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-70%);
      .login-box {
        margin-top: 15px;
        padding: 10px 20px 20px;
        // background: rgba(255, 255, 255, 0.3);
        background: rgba(0,0,0,0.3);
        border-radius: 4px;
        header {
          text-align: center;
          .logo {
            display: inline-block;
            padding: 5px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            img {
              width: 50px;
              height: 50px;
              vertical-align: middle;
            }
          }
          h1 {
            margin-top: 5px;
            font-size: 18px;
            font-weight: normal;
            // letter-spacing: 4px;
            color: white;
          }
        }
        .login-form {
          margin-top: 20px;
          .login-form-item {
            .login-btn {
              width: 100%;
              height: 38px;
              padding: 0;
              // border-radius: 20px;
            }
          }
          .login-form-item + .login-form-item {
            margin-top: 10px;
          }
          .input__inner {
            // border: 1px solid #a7a7a7;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.2);
            input {
              width: 220px;
              height: 38px;
              padding: 0 10px;
              border: none;
              color: #fff;
              background: none;
              outline: none;
              &::placeholder {
                font-size: 14px;
                color: #dfdfdf;
              }
            }
            input:-webkit-autofill{
              -webkit-box-shadow: 0 0 0 1000px rgb(255,255,255) inset;
              -webkit-text-fill-color: #333333;//设置字体颜色
            }
          }
          .remember-checkbox {
            display: flex;
            align-items: center;
            label {
              font-size: 14px;
              color: #f7f7f7;
              cursor: pointer;
              margin-left: 5px;
            }
            input {
              margin-top: -3px;
            }
          }
        }
      }
    }
  }
</style>
