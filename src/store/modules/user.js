import {
  addUserRequest,
  getUserListRequest,
  deleteUserRequest,
  updateUserRequest
} from '@/api/user'

const user = {
  state: {},
  mutations: {},
  actions: {
    // 获取用户列表
    GetUserList ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserListRequest()
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 新增用户
    AddUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addUserRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 更新用户信息
    UpdateUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateUserRequest(data)
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

export default user
