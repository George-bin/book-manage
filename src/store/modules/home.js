import {
  registerBookRequest
} from '../../api/home'

const home = {
  state: {},
  mutations: {},
  actions: {
    // 注册书籍
    RegisterBook (data) {
      return new Promise((resolve, reject) => {
        registerBookRequest(data)
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
