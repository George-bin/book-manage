/*
 * @Author: your name
 * @Date: 2020-09-04 17:41:23
 * @LastEditTime: 2020-09-04 17:46:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \book-manage\src\store\modules\catalog.js
 */
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
          .then((res) => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default catalog
