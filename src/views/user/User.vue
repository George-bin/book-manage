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
          label="创建时间">
          <template slot-scope="{row}">
            <span>{{row.createTime ? $moment(row.createTime).format('YYYY/MM/DD HH:mm') : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEditClassify(scope.row)" type="text" size="small">编辑</el-button>
            <el-button :disabled="scope.row.bookCount > 0" @click="handleDelClassify(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      'GetUserList'
    ]),
    init () {
      this.handleGetUserList()
    },
    toAddUser () {
      this.$router.push('/user/add')
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
