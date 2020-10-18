import request from '../utils/request'

// 鉴权
export function authRequest () {
  return request({
    url: '/auth'
  })
}

// 用户登录
export function loginRequest (data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 用户注销
export function logoutRequest (data) {
  return request({
    url: '/manage/logout'
  })
}
