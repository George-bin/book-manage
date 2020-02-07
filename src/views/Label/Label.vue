<template>
  <div class="label-component">
    <m-header title="标签管理" :back-btn="false"></m-header>
    <br>
    <!-- 新建分类 -->
    <div class="add-label-btn">
      <el-button type="text" size="mini" icon="el-icon-plus" @click.native="handleClickGoAdd">新建</el-button>
    </div>
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
            <el-button @click="handleEditLabel(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelLabel(scope.row)" type="text" size="small">删除</el-button>
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
    MHeader: () => import('@/components/Public/MHeader')
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
    this.GetLabelList()
  },
  methods: {
    ...mapActions([
      'GetLabelList',
      'DelLabel'
    ]),
    // 编辑标签
    handleEditLabel (label) {
      // console.log('label:', label)
      this.$router.push(`/label/edit/${label._id}`)
    },
    // 删除标签
    handleDelLabel (label) {
      this.$confirm('确定删除该标签吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.DelLabel(label._id)
            .then(data => {
              this.loading = false
              let { errcode, message } = data
              if (errcode === 0) {
                this.$message({
                  type: 'success',
                  message: '删除标签成功!'
                })
                this.GetLabelList()
              } else {
                this.$message({
                  type: 'warning',
                  message
                })
              }
            })
            .catch(err => {
              console.error('删除标签失败', err)
              this.loading = false
              this.$message({
                type: 'error',
                message: '删除标签失败!'
              })
            })
        })
        .catch(() => {})
    },
    handleClickGoAdd () {
      this.$router.push('/label/add')
    }
  }
}
</script>

<style lang="scss">
.label-component {
  position: relative;
  width: 960px;
  margin: 10px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  .add-label-btn {
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .label-list-title {
    height: 70px;
    line-height: 70px;
    font-size: 22px;
    text-align: center;
  }
}
</style>
