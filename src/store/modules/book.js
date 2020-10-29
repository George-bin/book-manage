import {
  addBookRequest,
  getBookListRequest,
  updateBookRequest,
  deleteBookByIdRequest,
  getBookInfoByIdRequest,
  getBookListByScreenRequest
} from '../../api/book'

const home = {
  state: {
    // 用户列表
    userList: []
  },
  mutations: {
    SET_USER_LIST (state, data) {
      state.userList = data
    }
  },
  actions: {
    // 获取小说列表
    GetBookList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getBookListRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 根据id获取小说信息
    GetBookInfoById ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getBookInfoByIdRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 新增书籍
    AddBook ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addBookRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 更新书籍信息
    UpdateBook ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateBookRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 删除小说
    DeleteBookById ({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteBookByIdRequest(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 条件筛选（分页处理）
    GetBookListByScreen ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getBookListByScreenRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default home
