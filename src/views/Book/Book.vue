<template>
  <div class="book-list-main-component">
    <!--搜索/切换分类-->
    <!-- <div class="">
      <el-select
        v-model="classifyId"
        size="small"
        placeholder="请选择分类"
        @change="handleChangeClassify">
        <el-option
          v-for="item in classifyList"
          :key="item._id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div> -->

    <!-- 筛选组件 -->
    <screen-book></screen-book>

    <!--当前分类小说列表-->
    <ul class="book-list-section">
      <li
        v-for="book in bookList"
        :key="book._id"
        class="book-list-item">
        <img :src="book.bookCover" class="book-cover" alt="封面" />
        <div class="book-info">
          <h3 class="book-name">{{book.bookName}}</h3>
          <p class="book-author">作者: {{book.author}}</p>
          <p class="book-intro">简介: {{book.bookIntro}}</p>
          <div class="book-btn-group">
            <el-button @click="handleGoEdit(book)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDeleteBook(book)" type="text" size="small">删除</el-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  components: {
    ScreenBook: () => import('@/components/Book/ScreenBook')
  },
  data () {
    return {
      // 当前分类id
      classifyId: ''
    }
  },
  computed: {
    ...mapState({
      classifyList: state => state.classify.classifyList,
      bookList: state => state.book.bookList,
      activeClassifyId: state => state.book.activeClassifyId
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'SET_ACTIVE_CLASSIFY_ID'
    ]),
    ...mapActions([
      'GetBookList',
      'DeleteBook',
      'GetClassifyList'
    ]),
    init () {
      if (!this.activeClassifyId) {
        this.GetClassifyList()
          .then(data => {
            if (this.classifyList.length) {
              this.GetBookList(this.classifyList[0].id)
              this.classifyId = this.classifyList[0].id
              this.SET_ACTIVE_CLASSIFY_ID(this.classifyList[0].id)
            }
          })
      } else {
        this.classifyId = this.activeClassifyId
        this.GetBookList(this.classifyId)
      }
    },
    // 前往编辑
    handleGoEdit (item) {
      this.$router.push('/book/edit')
      sessionStorage.setItem('book_id', item._id)
    },
    // 删除书籍
    handleDeleteBook (book) {
      this.$confirm('确定删除小说吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.DeleteBook(book.bookId)
            .then(data => {
              this.$message({
                type: 'success',
                message: '删除小说成功!'
              })
              this.GetClassifyList()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除小说失败!'
              })
              console.log('删除小说失败', err)
            })
        })
        .catch(() => {
          console.log('取消删除小说')
        })
    },
    handleChangeClassify (classifyId) {
      this.SET_ACTIVE_CLASSIFY_ID(classifyId)
      this.GetBookList(classifyId)
    }
  }
}
</script>

<style lang="scss">
  .book-list-main-component {
    width: 920px;
    padding: 20px 40px;
    margin: 10px auto;
    background: #fff;
    .book-list-section {
      margin-top: 20px;
      border-radius: 4px;
      .book-list-item {
        display: flex;
        .book-cover {
          width: 110px;
          height: 150px;
        }
        .book-info {
          flex: 1;
          margin-left: 20px;
          .book-name {
            margin-top: 5px;
            font-size: 18px;
          }
          .book-author, .book-intro, .book-btn-group {
            margin-top: 10px;
          }
          .book-intro {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
      .book-list-item +  .book-list-item {
        margin-top: 20px;
      }
    }
  }
</style>
