import {
  getLabelListRequest,
  getLabelInfoByIdRequest,
  addLabelRequest,
  updateLabelRequest,
  DelLabelRequest
} from '@/api/label.js'

const label = {
  state: {
    labelList: []
  },
  mutations: {
    SET_LABEL_LIST (state, data) {
      state.labelList = JSON.parse(JSON.stringify(data))
    }
  },
  actions: {
    // 获取标签列表
    GetLabelList ({ commit }) {
      return new Promise((resolve, reject) => {
        getLabelListRequest()
          .then(response => {
            let { errcode, labelList } = response.data
            if (errcode === 0) {
              labelList = JSON.parse(JSON.stringify(labelList))
              commit('SET_LABEL_LIST', labelList)
            }
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 根据id获取标签的详细信息
    GetLabelInfoById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        getLabelInfoByIdRequest(id)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 新增标签
    AddLabel ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addLabelRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 更新标签
    UpdateLabel ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateLabelRequest()
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 更新标签
    DelLabel ({ commit }, id) {
      return new Promise((resolve, reject) => {
        DelLabelRequest(id)
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

export default label
