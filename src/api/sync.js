import request from '../utils/request'

// 开始本地同步
export function syncLocalDataRequest (bookId) {
  return request({
    url: `/sync/local/${bookId}`
  })
}
