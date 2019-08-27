import {
  registerBookRequest,
  getBookListRequest,
  updateBookRequest,
  registerClassifyRequest,
  updateClassifyRequest,
  deleteBookRequest,
  getClassifyListRequest,
  registerUserRequest,
  getUserListRequest
} from '../../api/home'

const home = {
  state: {
    // 当前小说分类id
    activeClassifyId: '',
    // 小说分类列表
    classifyList: [],
    // 用户列表
    userList: [],
    // 当前分类的小说列表
    bookList: []
  },
  mutations: {
    SET_ACTIVE_CLASSIFY_ID (state, data) {
      state.activeClassifyId = data
    },
    SET_CLASSIFY_LIST (state, data) {
      state.classifyList = data
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
    // 获取分类列表
    GetClassifyList ({ commit }) {
      return new Promise((resolve, reject) => {
        getClassifyListRequest()
          .then(response => {
            console.log('分类列表', response.data)
            commit('SET_CLASSIFY_LIST', response.data.classifyList)
            resolve(response.data)
          })
      })
    },
    // 新增分类
    RegisterClassify ({ commit }, data) {
      return new Promise((resolve, reject) => {
        registerClassifyRequest(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 更新分类
    UpdateClassify ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateClassifyRequest(data)
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
    }
  }
}

export default home
