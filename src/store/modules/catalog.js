import {
  getCatalogRequest
} from '@/api/catalog'

const catalog = {
  state: {},
  mutations: {},
  actions: {
    // 获取分类列表
    GetCatalog ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getCatalogRequest(data)
          .then((response) => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default catalog
