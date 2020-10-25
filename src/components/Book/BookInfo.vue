<template>
  <div class="book-info-main-component">
    <el-form :rules="rules" :model="formData" ref="form">
      <el-form-item label="书籍名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入书籍名称!"></el-input>
      </el-form-item>
      <el-form-item label="书籍作者" prop="author">
        <el-input v-model="formData.author" placeholder="请输入书籍作者!"></el-input>
      </el-form-item>
      <el-form-item label="分类" required>
        <el-select v-model="formData.cid" placeholder="请选择" @change="handleChangeClassify">
          <el-option
            v-for="item in classifyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="章节数">
        <el-input v-model="formData.chapterCount" placeholder="请输入小说章节数!"></el-input>
      </el-form-item>
      <el-form-item label="热度">
        <el-input v-model="formData.hot" placeholder="请输入小说人气指数!"></el-input>
      </el-form-item>
      <el-form-item label="评分">
        <el-input v-model="formData.score" placeholder="请输入小说人气指数!"></el-input>
      </el-form-item>
      <el-form-item label="书籍简介" prop="des">
        <el-input type="textarea" v-model="formData.des" placeholder="请输入小说简介!"></el-input>
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload
          class="upload-img"
          :action="`${config.env.BASE_API}/api/book/upload`"
          multiple
          :with-credentials="false"
          :data="{ oldFilePath: formData.cover }"
          :on-success="onUploadSuccess"
          :show-file-list="false"
          :limit="1"
          :file-list="fileList">
          <img v-if="formData.cover" :src="formData.cover" />
          <el-button v-else size="small" type="primary" @click="handleRestartUpload">上传图片</el-button>
        </el-upload>
        <el-input v-if="formData.cover" v-model="formData.cover" disabled></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 80px">
        <slot name="btnGroup"></slot>
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
      formData: {
        bid: '',
        name: '',
        author: '',
        cover: '',
        des: '',
        chapterCount: 0,
        // 热度
        hot: 0,
        // 评分
        score: 0,
        // 标签
        label: '',
        // 分类
        cid: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入小说名称！', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者名称！', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
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
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'RegisterBook',
      'GetClassifyList',
      'GetBookInfoById',
      'GetLabelList'
    ]),
    init () {
      // 编辑小说
      if (this.useType === 'edit') {
        // let bookId = sessionStorage.getItem('book_id')
        let {id} = this.$route.params
        this.GetBookInfoById(id)
          .then(res => {
            let { code, msg, data } = res
            if (code === null) {
              this.formData = JSON.parse(JSON.stringify(data))
            } else {
              this.$message({
                type: 'warning',
                message: msg
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
      // this.GetLabelList()
    },
    // 上传图片成功
    onUploadSuccess (response, file, fileList) {
      console.log('response', response)
      this.$message({
        type: 'success',
        message: '图片上传成功!'
      })
      this.formData.cover = response.data
    },
    // 重新上传图片
    handleRestartUpload () {
      this.fileList = []
    },
    // 选择分类
    handleChangeClassify () {},
    handleInitformData () {
      this.formData = {
        bid: '',
        name: '',
        author: '',
        cover: '',
        des: '',
        // 热度
        hot: 0,
        // 评分
        score: 0,
        // 标签
        label: '',
        // 分类
        cid: ''
      }
    }
  }
}
</script>

<style lang="scss">
  .book-info-main-component {
    max-width: 600px;
    margin-top: 20px;
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
          .upload-img {
            img {
              width: 120px;
              height: 150px;
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
