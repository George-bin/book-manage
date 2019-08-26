import request from '../utils/request'

// 获取小说列表
export function getBookListRequest () {
  return request({
    url: '/list',
    method: 'get'
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
    url: '/updateBookInfo',
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

// 获取分类列表
export function getClassifyListRequest () {
  return request({
    url: '/classifyList'
  })
}

// 新增分类
export function registerClassifyRequest (data) {
  return request({
    url: '/registerClassify',
    method: 'post',
    data: data
  })
}

// 更新分类
export function updateClassifyRequest (data) {
  return request({
    url: '/updateClassify',
    method: 'post',
    data: data
  })
}
