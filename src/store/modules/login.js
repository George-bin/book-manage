import {
  loginRequest,
  authRequest,
  logoutRequest
} from '../../api/login'

let login = {
  state: {},
  mutations: {},
  actions: {
    // 管理员登录
    Login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        loginRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 管理员注销
    Logout ({ commit }, data) {
      return new Promise((resolve, reject) => {
        logoutRequest(data)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 鉴权
    Auth () {
      return new Promise((resolve, reject) => {
        authRequest()
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

export default login
