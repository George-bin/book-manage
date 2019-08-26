<template>
  <div class="classify-list-main-component">
    <el-button class="create-book-btn" type="text" size="small" @click="handleGoAdd">新建</el-button>
    <ul class="classify-list">
      <li
        v-for="classify in classifyList"
        :key="classify.classifyName"
        class="classify-list-item">
        <div class="classify-title-section">
          <h2 class="classify-title">{{classify.classifyName}}</h2>
        </div>
        <ul class="book-list">
          <li
            v-for="book in classify.bookList"
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
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
    this.GetBookList()
  },
  methods: {
    ...mapActions([
      'GetBookList',
      'DeleteBook'
    ]),
    // 新建
    handleGoAdd (item) {
      this.$router.push({name: 'BookInfo', params: { type: 'add' }})
    },
    // 前往编辑
    handleGoEdit (item) {
      this.$router.push({name: 'BookInfo', params: { bookinfo: item, type: 'edit' }})
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
            })
        })
        .catch(() => {
          console.log('取消删除小说')
        })
    }
  }
}
</script>

<style lang="scss">
  .classify-list-main-component {
    padding: 10px 40px;
    .create-book-btn {
      position: fixed;
      bottom: 40px;
      right: 40px;
      width: 40px;
      height: 40px;
      color: white;
      background: #4bb8c5;
    }
    .classify-list-item {
      .classify-title-section {
        .classify-title {
          height: 40px;
          line-height: 40px;
          font-size: 22px;
          font-weight: normal;
        }
      }
    }
    .book-list {
      .book-list-item {
        display: flex;
        .book-cover {
          width: 150px;
          height: 200px;
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
