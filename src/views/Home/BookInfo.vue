<template>
  <div class="book-info-main-component">
    <h2 class="book-info-title">书籍信息</h2>
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
            :label="item.classifyName"
            :value="item.classifyId">
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
          <el-checkbox label="黑道"></el-checkbox>
          <el-checkbox label="都市"></el-checkbox>
          <el-checkbox label="玄幻"></el-checkbox>
          <el-checkbox label="修真"></el-checkbox>
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
            :action="`${config.env.BASE_API}/api/book/uploadfile/bookCover`"
            multiple
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
          :action="`${config.env.BASE_API}/api/book/uploadfile/bookCover`"
          multiple
          :on-success="onUploadFileSuccess"
          :show-file-list="false"
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary" class="upload-btn">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button v-if="useType === 'add' || !useType" @click="handleRegisterBook" class="submit-btn" type="primary">提交</el-button>
        <el-button v-else @click="handleUpdateBook" class="submit-btn" type="primary">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '../../config'
export default {
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
      useType: 'add'
    }
  },
  computed: {
    ...mapState({
      bookList: state => state.home.bookList,
      classifyList: state => state.home.classifyList
    })
  },
  watch: {
    'bookInfo.label': function (val, oldval) {
      console.log(val)
    },
    'bookInfo.classify': function (val, oldval) {
      console.log(val)
    }
  },
  created () {
    console.log(this.$route)
  },
  mounted () {
    // console.log('this.$route.params.bookinfo', this.$route.params.bookinfo)

    this.init()
  },
  methods: {
    ...mapActions([
      'RegisterBook',
      'UpdateBook',
      'GetClassifyList'
    ]),
    init () {
      let { bookinfo, type } = this.$route.params
      this.useType = type
      // 新建/编辑
      if (bookinfo) {
        this.bookInfo = JSON.parse(JSON.stringify(bookinfo))
        this.bookInfo.label = JSON.parse(this.bookInfo.label)
      }

      this.GetClassifyList()
    },
    // 新增小说
    handleRegisterBook () {
      console.log(this.bookInfo)
      this.RegisterBook(this.bookInfo)
        .then(data => {})
    },
    // 更新
    handleUpdateBook () {
      this.UpdateBook(this.bookInfo)
        .then(data => {
          this.$message({
            type: 'success',
            message: '更新成功!'
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
    handleChangeClassify () {}
  }
}
</script>

<style lang="scss">
  .book-info-main-component {
    width: 400px;
    margin: 0 auto;
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
