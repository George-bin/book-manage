import {
  addClassifyRequest,
  updateClassifyRequest,
  getClassifyListRequest,
  getClassifyInfoByIdRequest,
  delClassifyByIdRequest
} from '@/api/classify.js'

const classify = {
  state: {
    // 小说分类列表
    classifyList: []
  },
  mutations: {
    SET_CLASSIFY_LIST (state, data) {
      state.classifyList = JSON.parse(JSON.stringify(data))
    }
  },
  actions: {
    // 获取分类列表
    GetClassifyList ({ commit }) {
      return new Promise((resolve, reject) => {
        getClassifyListRequest()
          .then(response => {
            console.log('分类列表', response.data)
            let { errcode, classifyList } = response.data
            if (errcode === 0) {
              classifyList = JSON.parse(JSON.stringify(classifyList))
              commit('SET_CLASSIFY_LIST', classifyList)
            }
            resolve(response.data)
          })
      })
    },
    // 新增分类
    AddClassify ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addClassifyRequest(data)
          .then(response => {
            resolve(response.data)
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
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 根据id获取分类信息
    GetClassifyInfoById ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getClassifyInfoByIdRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 根据id删除分类
    DelClassifyById ({ commit }, data) {
      return new Promise((resolve, reject) => {
        delClassifyByIdRequest(data)
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

export default classify
