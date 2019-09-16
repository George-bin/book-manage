<template>
  <div class="user-list-main-component">
    <h2 class="user-info-title">用户列表</h2>
    <div class="user-info-content">
      <ul>
        <li v-for="user in userList" :key="user._id">
          <p>{{user.name}}</p>
          <el-button type="text" size="small" @click="handleDeleteUser(user)">删除</el-button>
          <el-button type="text" size="small" @click="handleStartEditUser(user)">编辑</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      userList: state => state.home.userList
    })
  },
  mounted () {
    this.GetUserList()
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'DeleteUser'
    ]),
    // 删除用户
    handleDeleteUser (user) {
      this.$confirm('确定删除用户吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.DeleteUser(user._id)
            .then(data => {
              this.$message({
                type: 'success',
                message: '删除用户成功!'
              })
              this.GetUserList()
            })
        })
        .catch(() => {
          console.log('取消删除用户!')
        })
    },
    // 开始编辑用户信息
    handleStartEditUser (user) {
      this.$router.push({name: 'UserInfo', params: { userInfo: user, useType: 'edit' }})
    }
  }
}
</script>

<style lang="scss">
  .user-list-main-component {}
</style>
