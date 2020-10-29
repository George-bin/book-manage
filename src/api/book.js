import request from '../utils/request'

// 根据分类id获取小说列表
export function getBookListRequest (classifyId) {
  return request({
    url: `/list/${classifyId}`
  })
}

// 新增小说
export function addBookRequest (data) {
  return request({
    url: '/add',
    method: 'post',
    data: data
  })
}

// 更新书籍
export function updateBookRequest (data) {
  return request({
    url: '/update',
    method: 'put',
    data: data
  })
}

// 删除书籍
export function deleteBookByIdRequest (id) {
  return request({
    url: `/delete/${id}`,
    method: 'delete'
  })
}

// 根据id获取书籍信息
export function getBookInfoByIdRequest (id) {
  return request({
    url: `/select/${id}`
  })
}

// 条件筛选（分页处理）
export function getBookListByScreenRequest (data) {
  return request({
    url: '/screen',
    method: 'get',
    params: data
  })
}
