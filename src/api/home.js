import request from '../utils/request'

// 注册书籍
export function registerBookRequest (data) {
  return request({
    url: 'registerBook',
    method: 'post',
    data: data
  })
}
