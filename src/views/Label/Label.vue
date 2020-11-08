<template>
  <div class="label-component">
    <m-header title="标签管理" :back-btn="false">
      <template v-slot:btnGroup>
        <el-button type="text" size="mini" @click.native="toAddLabel">新建</el-button>
      </template>
    </m-header>
    <br>
    <!-- 分类列表 -->
    <div class="label-list-content">
      <el-table
        :data="labelList"
        :header-cell-style="{
          'text-align': 'center',
          'background': '#f7f7f7'
        }"
        :cell-style="{
          'text-align': 'center'
        }"
        :loading="loading"
        border
        width="100%">
        <el-table-column
          label="#"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="分类id">
        </el-table-column>
        <el-table-column
          label="分类名称">
          <template slot-scope="{row}">
            <el-tag>{{row.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间">
          <template slot-scope="{row}">
            <span>{{$moment(row.updateTime).format('YYYY/MM/DD HH:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="toEditLabel(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelLabel(scope.row)" type="text" size="small" style="color: orangered">删除</el-button>
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
      loading: false
    }
  },
  computed: {
    ...mapState({
      labelList: state => state.label.labelList
    })
  },
  mounted () {
    this.handleGetLabelList()
  },
  methods: {
    ...mapActions([
      'GetLabelList',
      'DelLabelById'
    ]),
    // 编辑标签
    toEditLabel (label) {
      this.$router.push(`/label/edit/${label.id}`)
    },
    toAddLabel () {
      this.$router.push('/label/add')
    },
    // 获取标签列表
    handleGetLabelList () {
      this.loading = true
      this.GetLabelList()
        .then(res => {
          let { code, msg } = res
          if (code === null) {
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.error('获取标签列表失败：', err)
          this.$message({
            type: 'error',
            message: '获取标签列表失败!'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 删除标签
    handleDelLabel (label) {
      this.$confirm('确定删除该标签吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.DelLabelById(label.id)
            .then(res => {
              let { code, msg } = res
              if (code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除标签成功!'
                })
                this.GetLabelList()
              } else {
                this.$message({
                  type: 'warning',
                  message: msg
                })
              }
            })
            .catch(err => {
              console.error('删除标签失败', err)
              this.$message({
                type: 'error',
                message: '删除标签失败!'
              })
            })
            .finally(() => {
              this.loading = false
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.label-component {
  .label-list-title {
    height: 70px;
    line-height: 70px;
    font-size: 22px;
    text-align: center;
  }
}
</style>
