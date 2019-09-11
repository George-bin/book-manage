import {
  loginRequest
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
    }
  }
}

export default login
