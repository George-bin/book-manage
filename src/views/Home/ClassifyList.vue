<template>
  <div class="classify-list-main-component">
    <h2 class="classify-list-title">分类列表</h2>
    <div class="classify-list-content">
      <el-table
        :data="classifyList"
        border
        width="100%">
        <el-table-column
          prop="classifyId"
          label="分类id"
          width="150">
        </el-table-column>
        <el-table-column
          prop="classifyName"
          label="分类名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="classifyBookCount"
          label="小说数量"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEditClassify(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      classifyList: state => state.home.classifyList
    })
  },
  mounted () {
    this.GetClassifyList()
  },
  methods: {
    ...mapActions([
      'GetClassifyList'
    ]),
    // 编辑分类
    handleEditClassify (classify) {
      console.log('classify:', classify)
      this.$router.push({name: 'ClassifyInfo', params: {classifyInfo: classify, type: 'edit'}})
    }
  }
}
</script>

<style lang="scss">
  .classify-list-main-component {
    width: 600px;
    margin: 0 auto;
    .classify-list-title {
      height: 70px;
      line-height: 70px;
      font-size: 22px;
      text-align: center;
    }
  }
</style>
