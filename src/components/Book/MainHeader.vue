<template>
  <header class="main-header-component">
    <div class="main-header-box">
      <div class="left">
        <img class="logo" src="../../../static/img/logo.png" alt="logo" />
        <h1 class="main-title">狒狒阅读</h1>
      </div>
      <span class="adctive-time">{{activeTime}}</span>
      <el-button type="text" @click.native="handleClickLogout">退出</el-button>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      timer: null,
      activeTime: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    console.log(this.$moment(new Date()).weekday())
    this.init()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    ...mapActions([
      'Logout'
    ]),
    init () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let date = new Date()
        let time = this.$moment(date).format('HH:mm')
        let weekdayList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        let weekday = this.$moment(date).weekday()
        this.activeTime = `${time} ${weekdayList[weekday]}`
      }, 1000)
    },
    // 注销登录
    handleClickLogout () {
      this.$confirm('确定注销吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.Logout()
            .then(data => {
              let { errcode, message } = data
              if (errcode === 0) {
                this.$message({
                  type: 'success',
                  message: '注销成功!'
                })
                sessionStorage.removeItem('auth')
                this.$router.push('/login')
              } else {
                this.$message({
                  type: 'warning',
                  message: message
                })
              }
            })
            .catch(err => {
              console.log('注销失败', err)
              this.$message({
                type: 'error',
                message: '注销失败!'
              })
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.main-header-component {
  color: #333;
  // background: #4bb8c5;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  // box-shadow: 0 5px 5px #dfdfdf;
  .main-header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    height: 68px;
    margin: 0 auto;
    .left {
      display: flex;
      align-items: center;
      height: 50px;
      .logo {
        width: 30px;
        height: 30px;
      }
      .main-title {
        margin-left: 5px;
        font-size: 20px;
        font-weight: normal;
        color: #333;
      }
    }
    .el-button {
      width: 120px;
      text-align: right;
      color: #333;
    }
  }
}
</style>
