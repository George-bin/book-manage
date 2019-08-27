<template>
  <div class="left-aside-nav-component">
    <el-menu
      router
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      background-color="#f7f7f7"
      text-color="#333333"
      active-text-color="#4bb8c5">
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-s-management"></i>
          <span>小说管理</span>
        </template>
        <el-menu-item index="/bookinfo">
          <i class="el-icon-document-add"></i>
          <span slot="title">新建/编辑小说</span>
        </el-menu-item>
        <el-menu-item index="/classifyInfo">
          <i class="el-icon-folder-add"></i>
          <span slot="title">新建/编辑分类</span>
        </el-menu-item>
        <el-menu-item index="/bookList">
          <i class="el-icon-tickets"></i>
          <span slot="title">小说列表</span>
        </el-menu-item>
        <el-menu-item index="/classifyList">
          <i class="el-icon-folder"></i>
          <span slot="title">分类列表</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/user">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user/info">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">新增/编辑用户</span>
        </el-menu-item>
        <el-menu-item index="/user/list">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    console.log(this.$route)
  },
  methods: {
    handleOpen () {},
    handleClose () {}
  }
}
</script>

<style lang="scss">
  .left-aside-nav-component {
    width: 200px;
    height: calc(100vh - 70px);
    .el-menu {
      height: 100%;
    }
  }
</style>
