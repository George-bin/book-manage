<template>
  <div class="book-list-main-component">
    <!-- 筛选组件 -->
    <screen-book :bookScreen="screen" @syncScreen="onSyncScreen"></screen-book>
    <br>

    <!--当前分类小说列表-->
    <ul class="book-list-section">
      <li
        v-for="book in bookList"
        :key="book.bid"
        class="book-list-item">
        <div class="book-list-item__box">
          <div class="book-cover">
            <img v-if="book.cover" :src="book.cover" alt="" />
            <img v-else src="../../../static/img/normal-cover.jpeg" class="" alt="封面" />
          </div>
          <div class="book-info">
            <h3 class="book-name">
              <span class="name" @click="handleGoShowCatalog(book)">{{book.name}}</span>
              <span class="author">/{{book.author}}（{{book.bid}}）</span>
            </h3>
            <div class="book-btn-group">
              <el-button @click="handleGoEdit(book)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDeleteBook(book)" type="text" size="small" style="color: #E6A23C">删除</el-button>
            </div>
            <p class="book-intro">{{book.des}}</p>
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
    ScreenBook: () => import('@/components/book/ScreenBook')
  },
  data () {
    return {
      screen: {
        c_id: 'all'
        // labelId: 'all'
      },
      bookList: []
    }
  },
  computed: {
    ...mapState({
      classifyList: state => state.classify.classifyList,
      activeClassifyId: state => state.book.activeClassifyId
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([
      'DeleteBookById',
      'GetClassifyList',
      'GetBookListByScreen'
    ]),
    init () {
      this.handleGetBookListByScreen()
    },
    // 筛选条件同步
    onSyncScreen (data) {
      this.screen = data
      this.handleGetBookListByScreen()
    },
    // 根据筛选条件获取小说列表
    handleGetBookListByScreen () {
      let param = JSON.parse(JSON.stringify(this.screen))
      if (param.c_id === 'all') delete param.c_id
      this.GetBookListByScreen(param)
        .then(res => {
          let { code, msg, data } = res
          if (code === null) {
            this.bookList = JSON.parse(JSON.stringify(data))
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.error('获取小说列表失败：', err)
          this.$message({
            type: 'error',
            message: '获取小说列表失败！'
          })
        })
    },
    // 前往编辑
    handleGoEdit (item) {
      this.$router.push(`/book/edit/${item.bid}`)
      sessionStorage.setItem('book_id', item._id)
    },
    // 删除书籍
    handleDeleteBook (book) {
      this.$confirm('确定删除小说吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.DeleteBookById(book.bid)
            .then(data => {
              this.$message({
                type: 'success',
                message: '删除小说成功!'
              })
              this.handleGetBookListByScreen()
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
    // 目录
    handleGoShowCatalog (item) {
      this.$router.push(`/catalog/${item.bid}`)
    }
  }
}
</script>

<style lang="scss">
.book-list-main-component {
  .book-list-section {
    // margin-top: 20px;
    border-radius: 4px;
    .book-list-item {
      width: calc((100% - 10px) / 2);
      display: inline-block;
      .book-list-item__box {
        display: flex;
        padding: 10px;
        background: #f9f9f9;
        .book-cover {
          width: 100px;
          height: 140px;
          border: 5px solid #fff;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .book-info {
          flex: 1;
          margin-left: 10px;
          .book-name {
            margin-top: 5px;
            .name {
              font-size: 16px;
              color: $color;
              &:hover {
                border-bottom: 1px solid orangered;
                color: orangered;
                cursor: pointer;
              }
            }
            .author {
              font-size: 12px;
              font-weight: normal;
              color: $common_font_color;
            }
          }
          .book-btn-group {
            span {
              font-size: 12px;
            }
          }
          .book-intro {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            font-size: 13px;
            // text-indent: 2em;
            line-height: 1.8;
            color: $common_font_color;
          }
        }
      }
    }
    .book-list-item{
      margin-top: 10px;
      border-bottom: 2px solid #dfdfdf;
    }
    .book-list-item:nth-child(2n) {
      margin-left: 10px;
    }
  }
}
</style>
