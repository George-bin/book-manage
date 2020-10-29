import request from '../utils/request'

// 获取用户列表
export function getUserListRequest () {
  return request({
    url: '/user'
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
    url: `/deleteUser/${_id}`,
    method: 'delete'
  })
}

// 更新用户
export function updateUserRequest (data) {
  return request({
    url: `/updateUserInfo/${data._id}`,
    method: 'put',
    data: data
  })
}
