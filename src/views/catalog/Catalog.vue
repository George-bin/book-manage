<template>
  <div class="catalog-component">
    <c-header title="小说目录" :back-btn="true"></c-header>
    <br>
    <h3>正文</h3>
    <span>共计：{{catalog.length}}章</span>
    <ul class="catalog-list">
      <li
        v-for="item in catalog"
        :key="item.id"
        class="catalog-list-item">
        <span>
          <router-link :to="'/catalog/content/'+item.mid">{{item.name}}</router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: '',
  prop: {},
  components: {
    CHeader: () => import('@/components/common/CHeader')
  },
  data () {
    return {
      bid: null,
      catalog: []
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
    this.init()
  },
  beforeDestroy () {},
  destroyed () {},
  methods: {
    ...mapActions([
      'GetCatalog'
    ]),
    init () {
      this.bid = this.$route.params.b_id
      this.handleGetCatalogByPage()
    },
    handleGetCatalogByPage () {
      this.GetCatalog(this.bid)
        .then(res => {
          let { code, msg, data } = res
          if (code === null) {
            this.catalog = JSON.parse(JSON.stringify(data))
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.error('获取目录失败:', err)
          this.$message({
            type: 'error',
            message: '获取目录失败！'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.catalog-component {
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
  .catalog-list {
    .catalog-list-item {
      display: inline-block;
      width: 25%;
      height: 36px;
      line-height: 36px;
      overflow: hidden;
      a {
        font-size: 12px;
      }
      a:link {
        color: $color;
      }
      a:hover {
        color: orange;
      }
      a:visited, a {
        color: gray;
      }
    }
  }
}
</style>
