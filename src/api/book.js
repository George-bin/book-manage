import request from '../utils/request'

// 根据id获取书籍信息
export function getBookInfoByIdRequest (id) {
  return request({
    url: `/info/${id}`
  })
}

// 根据分类id获取小说列表
export function getBookListRequest (classifyId) {
  return request({
    url: `/list/${classifyId}`
  })
}

// 注册书籍
export function registerBookRequest (data) {
  return request({
    url: '/registerBook',
    method: 'post',
    data: data
  })
}

// 更新书籍
export function updateBookRequest (data) {
  return request({
    url: '/',
    method: 'put',
    data: data
  })
}

// 删除书籍
export function deleteBookRequest (bookId) {
  return request({
    url: `/delete/${bookId}`,
    method: 'delete'
  })
}

// 条件筛选（分页处理）
export function getScreenBookListRequest (data) {
  return request({
    url: '/screen',
    method: 'get',
    params: data
  })
}

// 获取用户列表
export function getUserListRequest () {
  return request({
    url: '/getUserList'
  })
}

// 新增用户
export function registerUserRequest (data) {
  return request({
    url: '/registerUser',
    method: 'post',
    data: data
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
export function updateUserInfoRequest (data) {
  return request({
    url: `/updateUserInfo/${data._id}`,
    method: 'put',
    data: data
  })
}