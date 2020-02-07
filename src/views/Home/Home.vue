<template>
  <div class="home-main-component">
    <!--头部-->
    <main-header></main-header>
    <div class="main-container">
      <!--左侧导航-->
      <left-nav></left-nav>
      <div class="content-section">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    MainHeader: () => import('@/components/Book/MainHeader'),
    LeftNav: () => import('@/components/Book/LeftNav')
    // LeftNav: () => import('@/components/LeftNav')
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss">
  body, html {
    background: #f0f0f0;
  }
  .home-main-component {
    .main-container {
      .content-section {
        // height: calc(100vh - 50px);
        // overflow: auto;
        /*滚动条整体样式*/
        &::-webkit-scrollbar {
          width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        /*滚动条里面小方块*/
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          /*background: #535353;*/
          background: #BABABA;
        }
        /*滚动条里面轨道*/
        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          border-radius: 10px;
          background: #DFDFDF;
        }
      }
    }
  }
</style>
