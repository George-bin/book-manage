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
    /**
     * 获取分类列表
     * @param commit
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetClassifyList ({ commit }) {
      return new Promise((resolve, reject) => {
        getClassifyListRequest()
          .then(response => {
            console.log('分类列表', response.data)
            let { code, data } = response.data
            if (code === null) {
              data = JSON.parse(JSON.stringify(data))
              commit('SET_CLASSIFY_LIST', data)
            }
            resolve(response.data)
          })
      })
    },
    /**
     * 新增分类
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     * @constructor
     */
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
    /**
     * 更新分类
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     * @constructor
     */
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
    /**
     * 根据id获取分类信息
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     * @constructor
     */
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
    /**
     * 根据id删除分类
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     * @constructor
     */
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
