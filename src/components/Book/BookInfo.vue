<template>
  <div class="book-info-main-component">
    <el-form>
      <el-form-item label="书籍名称">
        <el-input v-model="bookInfo.bookName" placeholder="请输入书籍名称!"></el-input>
      </el-form-item>
      <el-form-item label="书籍作者">
        <el-input v-model="bookInfo.author" placeholder="请输入书籍作者!"></el-input>
      </el-form-item>
      <el-form-item label="书籍ID">
        <el-input v-model="bookInfo.bookId" placeholder="请输入书籍ID!"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="bookInfo.classify" placeholder="请选择" @change="handleChangeClassify">
          <el-option
            v-for="item in classifyList"
            :key="item._id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="章节数">
        <el-input v-model="bookInfo.sectionCount" placeholder="请输入小说章节数!"></el-input>
      </el-form-item>
      <el-form-item label="人气指数">
        <el-input v-model="bookInfo.popularityIndex" placeholder="请输入小说人气指数!"></el-input>
      </el-form-item>
      <el-form-item label="评分">
        <el-input v-model="bookInfo.grade" placeholder="请输入小说人气指数!"></el-input>
      </el-form-item>
      <el-form-item label="点赞">
        <el-input v-model="bookInfo.like" placeholder="请输入小说点赞数!"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="bookInfo.label">
          <el-checkbox
            v-for="item in labelList"
            :key="item._id"
            :label="item.id">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="书籍简介">
        <el-input type="textarea" v-model="bookInfo.bookIntro" placeholder="请输入小说简介!"></el-input>
      </el-form-item>
      <el-form-item label="上传封面">
        <div v-if="bookInfo.bookCover" class="cover-address-config">
          <el-input v-model="bookInfo.bookCover" disabled></el-input>
          <el-upload
            class="upload-demo"
            :action="`${config.env.BASE_API}/api/book/upload/img`"
            multiple
            :with-credentials="true"
            :data="{ oldFilePath: bookInfo.bookCover }"
            :on-success="onUploadFileSuccess"
            :show-file-list="false"
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary" class="restart-upload-btn" @click="handleRestartUpload">重新上传</el-button>
          </el-upload>
        </div>
        <el-upload
          v-else
          class="upload-demo"
          :action="`${config.env.BASE_API}/api/book/upload/img`"
          multiple
          :on-success="onUploadFileSuccess"
          :show-file-list="false"
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary" class="upload-btn">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-left: 80px">
        <el-button
          v-if="useType === 'add' || !useType"
          :loading="loading"
          @click="handleRegisterBook"
          class="submit-btn"
          type="primary">提交</el-button>
        <el-button v-else :loading="loading" @click="handleUpdateBook" class="submit-btn" type="primary">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '../../config'
export default {
  props: {
    title: {
      type: String,
      default: '书籍信息'
    },
    useType: {
      type: String,
      default: 'add'
    },
    bookId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      bookInfo: {
        bookName: '',
        author: '',
        bookId: '',
        bookCover: '',
        sectionCount: '',
        bookIntro: '',
        // 人气指数
        popularityIndex: 0,
        // 评分
        grade: 0,
        // 点赞
        like: 0,
        // 标签
        label: [],
        // 分类
        classify: ''
      },
      fileList: [],
      config: config,
      loading: false
    }
  },
  computed: {
    ...mapState({
      classifyList: state => state.classify.classifyList,
      labelList: state => state.label.labelList
    })
  },
  watch: {
    'bookInfo.label': function (val, oldval) {
      console.log('label', val)
    }
  },
  created () {
    // console.log(this.$route)
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'RegisterBook',
      'UpdateBook',
      'GetClassifyList',
      'GetBookInfoById',
      'GetLabelList'
    ]),
    init () {
      // 编辑小说
      if (this.useType === 'edit') {
        let bookId = sessionStorage.getItem('book_id')
        this.GetBookInfoById(bookId)
          .then(data => {
            let { errcode, message, bookInfo } = data
            if (errcode === 0) {
              this.bookInfo = JSON.parse(JSON.stringify(bookInfo))
            } else {
              this.$message({
                type: 'warning',
                message
              })
              this.$router.back()
            }
          })
          .catch(err => {
            console.log('获取书籍信息失败!', err)
            this.$router.back()
          })
      }
      this.GetClassifyList()
      this.GetLabelList()
    },
    // 新增小说
    handleRegisterBook () {
      console.log(this.bookInfo)
      this.loading = true
      this.RegisterBook(this.bookInfo)
        .then(data => {
          this.loading = false
          let { errcode, message } = data
          if (errcode === 0) {
            this.$message({
              type: 'success',
              message: '新增小说成功!'
            })
            this.handleInitBookInfo()
          } else {
            this.$message({
              type: 'warning',
              message: message
            })
          }
        })
        .catch(err => {
          this.loading = false
          console.log('新增小说失败', err)
          this.$message({
            type: 'error',
            message: '新增小说失败!'
          })
        })
    },
    // 更新小说
    handleUpdateBook () {
      // console.log('bookInfo', this.bookInfo)
      this.loading = true
      this.UpdateBook(this.bookInfo)
        .then(data => {
          this.loading = false
          let { errcode, message } = data
          if (errcode === 0) {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
            this.$router.back()
          } else {
            this.$message({
              type: 'warning',
              message
            })
          }
        })
        .catch(err => {
          console.error('小说信息更新失败', err)
          this.loading = false
          this.$message({
            type: 'error',
            message: '更新失败!'
          })
        })
    },
    // 上传图片成功
    onUploadFileSuccess (response, file, fileList) {
      console.log('response', response)
      this.$message({
        type: 'success',
        message: '图片上传成功!'
      })
      this.bookInfo.bookCover = response.filePath
    },
    // 重新上传图片
    handleRestartUpload () {
      this.fileList = []
    },
    // 选择分类
    handleChangeClassify () {},
    handleInitBookInfo () {
      this.bookInfo = {
        bookName: '',
        author: '',
        bookId: '',
        bookCover: '',
        sectionCount: '',
        bookIntro: '',
        // 人气指数
        popularityIndex: 0,
        // 评分
        grade: 0,
        // 点赞
        like: 0,
        // 标签
        label: [],
        // 分类
        classify: ''
      }
    }
  }
}
</script>

<style lang="scss">
  .book-info-main-component {
    .book-info-title {
      height: 70px;
      line-height: 70px;
      font-size: 22px;
      text-align: center;
    }
    .el-form {
      .el-form-item {
        display: flex;
        .el-form-item__label {
          width: 80px;
        }
        .el-form-item__content {
          flex: 1;
          .cover-address-config {
            display: flex;
            .restart-upload-btn {
              margin-left: 10px;
            }
          }
          .submit-btn {
            width: 140px;
          }
        }
      }
    }
  }
</style>
