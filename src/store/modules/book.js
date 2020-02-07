import {
  registerBookRequest,
  getBookListRequest,
  updateBookRequest,
  deleteBookRequest,
  registerUserRequest,
  getUserListRequest,
  deleteUserRequest,
  updateUserInfoRequest,
  getBookInfoByIdRequest
} from '../../api/book'

const home = {
  state: {
    // 当前小说分类id
    activeClassifyId: '',
    // 用户列表
    userList: [],
    // 当前分类的小说列表
    bookList: [],
    // 书籍筛选
    bookScreen: {
      classifyId: 'all',
      labelId: 'all'
    }
  },
  mutations: {
    SET_ACTIVE_CLASSIFY_ID (state, data) {
      state.activeClassifyId = data
    },
    SET_USER_LIST (state, data) {
      state.userList = data
    },
    SET_BOOK_LIST (state, data) {
      state.bookList = data
    }
  },
  actions: {
    // 获取小说列表
    GetBookList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getBookListRequest(data)
          .then(response => {
            commit('SET_BOOK_LIST', response.data.bookList)
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
    RegisterBook ({ commit }, data) {
      return new Promise((resolve, reject) => {
        registerBookRequest(data)
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
    DeleteBook ({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteBookRequest(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 获取用户列表
    GetUserList ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserListRequest()
          .then(response => {
            // console.log('用户列表', response)
            commit('SET_USER_LIST', response.data.userList)
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 新增用户
    RegisterUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        registerUserRequest(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 更新用户信息
    UpdateUserInfo ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateUserInfoRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 删除用户
    DeleteUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteUserRequest(data)
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
