import request from '../utils/request'

// 用户登录
export function loginRequest (data) {
  return request({
    url: '/manage/login',
    method: 'post',
    data: data
  })
}
