<template>
  <div class="home-main-component">
    <!--头部-->
    <header class="main-header">
      <h1 class="main-title">个人小说管理平台</h1>
    </header>
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
    LeftNav: require('@/components/LeftNav').default
  }
}
</script>

<style lang="scss">
  .home-main-component {
    .main-header {
      height: 70px;
      background: #4bb8c5;
      .main-title {
        /*max-width: 1200px;*/
        line-height: 70px;
        padding: 0 20px;
        margin: 0 auto;
        font-size: 22px;
        font-weight: normal;
        letter-spacing: 4px;
        color: white;
      }
    }
    .main-container {
      display: flex;
      .content-section {
        flex: 1;
        height: calc(100vh - 70px);
        overflow: auto;
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
