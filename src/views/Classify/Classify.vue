<template>
  <div class="classify-list-component">
    <m-header title="分类管理" :back-btn="false">
      <template v-slot:btnGroup>
        <el-button type="primary" size="mini" @click.native="handleClickGoAdd">新建</el-button>
      </template>
    </m-header>
    <br>
    <!-- 分类列表 -->
    <div class="classify-list-content">
      <el-table
        :data="classifyList"
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
          label="#"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          label="分类名称">
          <template slot-scope="{row}">
            <el-tag>{{row.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="bookCount"
          label="小说数量">
        </el-table-column>
        <el-table-column
          label="更新时间">
          <template slot-scope="{row}">
            <span>{{row.updateTime ? $moment(row.updateTime).format('YYYY/MM/DD HH:mm') : ''}}</span>
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
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    MHeader: () => import('@/components/common/CHeader')
  },
  data () {
    return {
      loading: null
    }
  },
  computed: {
    ...mapState({
      classifyList: state => state.classify.classifyList
    })
  },
  mounted () {
    this.GetClassifyList()
  },
  methods: {
    ...mapActions([
      'GetClassifyList',
      'DelClassifyById'
    ]),
    // 编辑分类
    handleEditClassify (classify) {
      // console.log('classify:', classify)
      this.$router.push(`/classify/edit/${classify.id}`)
    },
    /**
     * 删除分类
     * @param classify：分类信息
     */
    handleDelClassify (classify) {
      this.$confirm('确定删除该分类吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          // this.handleInitLoading()
          this.DelClassifyById(classify.id)
            .then(data => {
              let { code, msg } = data
              if (code === null) {
                this.$message({
                  type: 'success',
                  message: '删除分类成功!'
                })
                this.GetClassifyList()
                // this.loading.close()
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              console.error('删除分类失败', err)
              this.$message({
                type: 'error',
                message: '删除分类失败!'
              })
            })
        })
        .catch(() => {})
    },
    handleClickGoAdd () {
      this.$router.push('/classify/add')
    },
    handleInitLoading () {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  }
}
</script>

<style lang="scss">
.classify-list-component {
  position: relative;
  padding: 20px 40px;
  background: #fff;
  border-radius: 4px;
  .classify-list-title {
    height: 70px;
    line-height: 70px;
    font-size: 22px;
    text-align: center;
  }
}
</style>
