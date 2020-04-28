<template>
  <div class="screen-book-component">
    <div class="screen-class-list">
      <!-- 分类筛选 -->
      <div class="screen-class-item">
        <span class="label">分类</span>
        <ul
          class="value-list"
          :style="{
            'height': classifyUnfold ? 'auto' : '46px'
          }">
          <li
            v-for="item in classifyListComputed"
            :key="item._id"
            class="value-item">
            <span
              :style="{
                border: bookScreen.classifyId === item.id ? '1px solid #9e9e9e' : '',
                color: bookScreen.classifyId === item.id ? '#fff' : '#9e9e9e',
                background: bookScreen.classifyId === item.id ? '#9e9e9e' : 'none'
              }"
              @click="handleSelectScreenClassify(item)">
              {{item.name}}
            </span>
          </li>
        </ul>
        <div class="unfold-btn" @click="classifyUnfold = !classifyUnfold">
          <template v-if="!classifyUnfold">
            <span>更多</span>
            <i class="el-icon-caret-bottom"></i>
          </template>
          <template v-else>
            <span>收起</span>
            <i class="el-icon-caret-top"></i>
          </template>
        </div>
      </div>
      <!-- 标签筛选 -->
      <div class="screen-class-item">
        <span class="label">标签</span>
        <ul class="value-list">
          <li
            v-for="item in labelListComputed"
            :key="item._id"
            class="value-item">
            <span
              :style="{
                border: bookScreen.labelId === item.id ? '1px solid #9e9e9e' : '',
                color: bookScreen.labelId === item.id ? '#fff' : '#9e9e9e',
                background: bookScreen.labelId === item.id ? '#9e9e9e' : 'none'
              }"
              @click="handleSelectScreenLabel(item)">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// 分类 标签
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      // 展开控件
      classifyUnfold: false
    }
  },
  computed: {
    ...mapState({
      bookScreen: state => state.book.bookScreen,
      classifyList: state => state.classify.classifyList,
      labelList: state => state.label.labelList
    }),
    classifyListComputed () {
      let arr = JSON.parse(JSON.stringify(this.classifyList))
      arr.unshift({
        _id: 'all',
        id: 'all',
        name: '全部'
      })
      return arr
    },
    labelListComputed () {
      let arr = JSON.parse(JSON.stringify(this.labelList))
      arr.unshift({
        _id: 'all',
        id: 'all',
        name: '全部'
      })
      return arr
    }
  },
  watch: {
    bookScreen: function (val, oldval) {
      this.GetScreenBookList(val)
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'SET_BOOK_SCREEN'
    ]),
    ...mapActions([
      'GetLabelList',
      'GetClassifyList',
      'GetScreenBookList'
    ]),
    init () {
      this.GetLabelList()
      this.GetClassifyList()
      this.GetScreenBookList(this.bookScreen)
    },
    // 筛选条件：classify
    handleSelectScreenClassify (item) {
      let screen = JSON.parse(JSON.stringify(this.bookScreen))
      screen.classifyId = item.id
      this.SET_BOOK_SCREEN(screen)
    },
    // 筛选条件：label
    handleSelectScreenLabel (item) {
      let screen = JSON.parse(JSON.stringify(this.bookScreen))
      screen.labelId = item.id
      this.SET_BOOK_SCREEN(screen)
    }
  }
}
</script>

<style lang="scss">
.screen-book-component {
  font-size: 12px;
  color: #9e9e9e;
  .screen-class-list {
    .screen-class-item {
      display: flex;
      .label {
        display: inline-block;
        height: 46px;
        line-height: 46px;
        color: #ccc;
      }
      .value-list {
        flex: 1;
        margin-left: 20px;
        font-size: 0;
        overflow: hidden;
        .value-item {
          display: inline-block;
          padding: 12px 0;
          span {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            margin-right: 20px;
            font-size: 12px;
            padding: 0 10px;
            border: 1px solid #fff;
            border-radius: 20px;
            cursor: pointer;
            &:hover {
              border: 1px solid #dfdfdf;
            }
          }
        }
      }
      .unfold-btn {
        height: 46px;
        line-height: 46px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .screen-class-item + .screen-class-item {
      .value-list {
        border-top: 1px solid #f0f0f0;
      }
    }
  }
}
</style>
