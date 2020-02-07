<template>
  <aside class="left-nav-component">
    <nav class="nav-list">
      <div
        v-for="item in navList"
        :key="item.path"
        class="nav-item"
        :style="{
          'color': $route.path === item.path ? '#fff' : '#333',
          'background': $route.path === item.path ? '#4bb8c5' : ''
        }"
        @click="handleClickSwitchRoute(item.path)">
        <div class="nav-item-box">
          <p><i :class="item.icon"></i></p>
          <p class="label">{{item.label}}</p>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'LeftNav',
  props: {
  },
  components: {},
  data () {
    return {
      navList: [
        {
          path: '/book/add',
          icon: 'el-icon-document-add',
          label: '新建小说'
        },
        {
          path: '/book/manage',
          icon: 'el-icon-s-management',
          label: '小说管理'
        },
        {
          path: '/classify/manage',
          icon: 'el-icon-s-management',
          label: '分类管理'
        },
        {
          path: '/label/manage',
          icon: 'el-icon-s-management',
          label: '标签管理'
        },
        {
          path: '/user',
          icon: 'el-icon-user-solid',
          label: '用户管理'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    console.log(this.$route.path)
  },
  methods: {
    // 切换路由
    handleClickSwitchRoute (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
.left-nav-component {
  position: fixed;
  top: 80px;
  left: 0;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  box-shadow: 0 0 10px #dfdfdf;
  z-index: 10;
  .nav-list {
    .nav-item {
      display: flex;
      // flex-direction: column;
      flex-direction: row;
      align-items: center;
      width: 70px;
      height: 70px;
      background: #fff;
      cursor: pointer;
      &:hover {
        background: #f7f7f7;
      }
      .nav-item-box {
        flex: 1;
        text-align: center;
        i {
          font-size: 24px;
        }
        .label {
          font-size: 10px;
        }
      }
    }
    // .nav-item + .nav-item {
    //   border-top: 1px solid #eaeaea;
    // }
  }
}
</style>
