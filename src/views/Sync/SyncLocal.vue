<template>
  <div class="sync-local-component">
    <!--搜索/切换分类-->
    <div class="">
      <el-select v-model="classifyId" placeholder="请选择" @change="handleChangeClassify">
        <el-option
          v-for="item in classifyList"
          :key="item._id"
          :label="item.classifyName"
          :value="item.classifyId">
        </el-option>
      </el-select>
    </div>

    <!-- 书籍列表 -->
    <div class="book-list-section">
      <div
        v-for="item in bookList"
        :key="item._id"
        class="book-list-item">
        <img :src="item.bookCover" :alt="item.bookName" />
        <div class="book-base-info">
          <p><strong>书籍:</strong>{{item.bookName}}</p>
          <p><strong>作者:</strong>{{item.author}}</p>
          <p><el-button size="small" type="primary" @click.native="handleSyncLocalData(item.bookId)">开始同步</el-button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      // 当前分类id
      classifyId: ''
    }
  },
  computed: {
    ...mapState({
      classifyList: state => state.home.classifyList,
      bookList: state => state.home.bookList,
      activeClassifyId: state => state.home.activeClassifyId
    })
  },
  watch: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'SET_ACTIVE_CLASSIFY_ID'
    ]),
    ...mapActions([
      'GetBookList',
      'GetClassifyList',
      'SyncLocalData'
    ]),
    init () {
      if (!this.activeClassifyId) {
        this.GetClassifyList()
          .then(data => {
            if (this.classifyList.length) {
              this.GetBookList(this.classifyList[0].classifyId)
              this.classifyId = this.classifyList[0].classifyId
              this.SET_ACTIVE_CLASSIFY_ID(this.classifyList[0].classifyId)
            }
          })
      } else {
        this.classifyId = this.activeClassifyId
        this.GetBookList(this.classifyId)
      }
    },
    handleChangeClassify (classifyId) {
      this.SET_ACTIVE_CLASSIFY_ID(classifyId)
      this.GetBookList(classifyId)
    },
    // 同步本地数据
    handleSyncLocalData (bookId) {
      this.SyncLocalData(bookId)
    }
  }
}
</script>

<style lang="scss">
.sync-local-component {
  padding: 20px;
  .book-list-section {
    margin-top: 20px;
    .book-list-item {
      display: flex;
      img {
        width: 140px;
        height: 200px;
        vertical-align: bottom;
      }
      .book-base-info {
        padding-top: 10px;
        margin-left: 10px;
        p + p {
          margin-top: 10px;
        }
      }
    }
    .book-list-item + .book-list-item {
      margin-top: 20px;
    }
  }
}
</style>
