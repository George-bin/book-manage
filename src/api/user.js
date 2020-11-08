import request from '../utils/request'

// 获取用户列表
export function getUserListRequest () {
  return request({
    url: '/user'
  })
}

// 获取用户 by id
export function getUserByIdRequest (id) {
  return request({
    url: `/user/${id}`
  })
}

// 新增用户
export function addUserRequest (data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUserRequest (_id) {
  return request({
    url: `/user/${_id}`,
    method: 'delete'
  })
}

// 更新用户
export function updateUserRequest (data) {
  return request({
    url: `/user`,
    method: 'put',
    data
  })
}
