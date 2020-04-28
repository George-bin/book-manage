<template>
  <div class="user-info-main-component">
    <h2 class="user-info-title">用户信息</h2>
    <div class="user-info-content">
      <el-form>
        <el-form-item>
          <el-form-item label="Account">
            <el-input v-model="userInfoForm.account" placeholder="请输入Account!"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="userInfoForm.password" placeholder="请输入Password!"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="userInfoForm.name" placeholder="请输入用户名称!"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="userInfoForm.username" placeholder="请输入用户昵称!" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户权限">
            <!-- <el-input v-model="userInfoForm.jurisdiction" placeholder="请选择用户权限!"></el-input> -->
            <el-select v-model="userInfoForm.jurisdiction" placeholder="请选择用户权限!">
              <el-option label="管理员" value="manage"></el-option>
              <el-option label="普通用户" value="user"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="用户书架">-->
            <!--<el-input v-model="userInfoForm.bookIdList" placeholder="书架!" disabled></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="用户头像">
            <el-input v-model="userInfoForm.avatarUrl" placeholder="请输入用户昵称!" disabled></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button v-if="useType === 'add' || !useType" @click="handleRegisterUserInfo" class="submit-btn" type="primary">提交</el-button>
            <el-button v-else @click="handleUpdateUserInfo" class="submit-btn" type="primary">更新</el-button>
          </el-form-item>
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
      // 用户信息
      userInfoForm: {
        account: '',
        password: '',
        username: '',
        name: '',
        jurisdiction: '',
        bookIdList: [],
        avatarUrl: '',
        openid: ''
      },
      useType: 'add'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'RegisterUser',
      'UpdateUserInfo'
    ]),
    init () {
      let { userInfo, useType } = this.$route.params
      // 新建/编辑
      if (userInfo) {
        this.useType = useType
        this.userInfoForm = JSON.parse(JSON.stringify(userInfo))
      }
    },
    // 新增用户
    handleRegisterUserInfo () {
      this.$confirm('确定新增用户吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.RegisterUser(this.userInfoForm)
            .then(data => {
              this.$message({
                type: 'success',
                message: '新增用户成功!'
              })
            })
        })
        .catch(() => {
          console.log('取消注册用户')
        })
    },
    // 更新用户信息
    handleUpdateUserInfo () {
      this.UpdateUserInfo(this.userInfoForm)
        .then(data => {
          if (data.errcode === 0) {
            this.$message({
              type: 'success',
              message: '更新用户信息成功!'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '更新用户信息失败!'
          })
        })
    }
  }
}
</script>

<style lang="scss">
  .user-info-main-component {
    width: 400px;
    margin: 0 auto;
    .user-info-title {
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
      .el-form-item + .el-form-item {
        margin-top: 10px;
      }
    }
  }
</style>
