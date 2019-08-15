<template>
  <div class="home-main-component">
    <h1>管理界面</h1>
    <el-form>
      <el-form-item label="书籍名称">
        <el-input v-model="bookInfo.bookName" placeholder="请输入书籍名称!"></el-input>
      </el-form-item>
      <el-form-item label="书籍ID">
        <el-input v-model="bookInfo.bookId" placeholder="请输入书籍ID!"></el-input>
      </el-form-item>
      <el-form-item label="章节数">
        <el-input v-model="bookInfo.sectionCount" placeholder="请输入小说章节数!"></el-input>
      </el-form-item>
      <el-form-item label="书籍简介">
        <el-input v-model="bookInfo.bookIntro" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload
          v-if="!bookInfo.bookImage"
          class="upload-demo"
          action="http://localhost:3000/api/book/uploadfile/42"
          multiple
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-input v-else v-model="bookInfo.bookImage"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleRegisterBook">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      bookInfo: {
        bookName: '',
        bookId: '',
        bookImage: '',
        sectionCount: '',
        bookIntro: ''
      },
      fileList: []
    }
  },
  methods: {
    ...mapActions([
      'RegisterBook'
    ]),
    // 注册书籍
    handleRegisterBook () {
      console.log(this.bookInfo)
      this.RegisterBook(this.bookInfo)
    }
  }
}
</script>

<style lang="scss">
  .home-main-component {
    width: 400px;
    margin: 0 auto;
    h1 {
      font-size: 24px;
    }
  }
</style>
