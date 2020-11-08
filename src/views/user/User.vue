<template>
  <div class="user-manage-component">
    <c-header title="用户管理">
      <template v-slot:btnGroup>
        <el-button type="text" size="mini" @click="toAddUser">新建</el-button>
      </template>
    </c-header>
    <!-- 用户列表 -->
    <div class="user-list-section">
      <el-table
        :data="userList"
        :header-cell-style="{
          'text-align': 'center',
          'background': '#f7f7f7'
        }"
        :cell-style="{
          'text-align': 'center'
        }"
        border
        width="100%">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="用户权限">
          <template slot-scope="{row}">
            <el-tag type="success">
              <span>{{handleMatchUserRole(row.role)}}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="{row}">
            <el-button @click="toEditUser(row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelUserById(row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import roles from '@/router/role'
export default {
  name: '',
  props: {},
  components: {
    CHeader: () => import('@/components/common/CHeader')
  },
  data () {
    return {
      userList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'DeleteUserById'
    ]),
    init () {
      this.handleGetUserList()
    },
    toAddUser () {
      this.$router.push('/user/add')
    },
    toEditUser (user) {
      this.$router.push(`/user/edit/${user.id}`)
    },
    handleMatchUserRole (role) {
      let index = roles.findIndex(item => item.role === role)
      if (index > -1) {
        return roles[index].label
      }
      return ''
    },
    handleGetUserList () {
      this.loading = true
      this.GetUserList()
        .then(res => {
          let { code, msg, data } = res
          if (code === null) {
            this.userList = JSON.parse(JSON.stringify(data))
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.error('获取用户列表失败:', err)
          this.$message({
            type: 'error',
            message: '获取用户列表失败!'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleDelUserById (user) {
      this.$confirm('确定删除该用户吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.DeleteUserById(user.id)
            .then(res => {
              let { code, msg } = res
              if (code === null) {
                this.$message({
                  type: 'success',
                  message: '删除用户成功！'
                })
                this.handleGetUserList()
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              console.error('删除用户失败：', err)
              this.$message({
                type: 'error',
                message: '删除用户失败！'
              })
            })
        })
    }
  }
}
</script>

<style lang="scss">
.user-manage-component {
  .user-list-section {
    margin-top: 20px;
  }
}
</style>
