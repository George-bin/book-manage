import {
  registerBookRequest,
  getBookListRequest,
  updateBookRequest,
  registerClassifyRequest,
  updateClassifyRequest,
  deleteBookRequest,
  getClassifyListRequest
} from '../../api/home'

const home = {
  state: {
    // 小说分类列表
    classifyList: []
  },
  mutations: {
    SET_CLASSIFY_LIST (state, data) {
      state.classifyList = data
    }
  },
  actions: {
    // 获取小说列表
    GetBookList ({ commit }) {
      return new Promise((resolve, reject) => {
        getBookListRequest()
          .then(response => {
            commit('SET_CLASSIFY_LIST', response.data.classifyList)
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
          .then()
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
    }
  }
}

export default home
