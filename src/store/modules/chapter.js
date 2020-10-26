import {
  getChapterContentByIdRequest
} from '@/api/chapter'
const chapter = {
  state: {},
  mutations: {},
  actions: {
    // 获取章节内容by id
    GetChapterContentById ({commit}, data) {
      return new Promise((resolve, reject) => {
        getChapterContentByIdRequest(data)
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

export default chapter
