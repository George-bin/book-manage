import {
  syncLocalDataRequest
} from '../../api/sync'

const sync = {
  state: {},
  actions: {
    // 本地数据同步
    SyncLocalData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        syncLocalDataRequest(data)
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

export default sync
