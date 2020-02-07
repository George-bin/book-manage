import request from '../utils/request'

// 获取分类列表
export function getClassifyListRequest () {
  return request({
    url: '/classify'
  })
}

// 新增分类
export function addClassifyRequest (data) {
  return request({
    url: '/classify',
    method: 'post',
    data: data
  })
}

// 更新分类
export function updateClassifyRequest (data) {
  return request({
    url: `/classify`,
    method: 'put',
    data: data
  })
}

// 根据id获取分类信息
export function getClassifyInfoByIdRequest (id) {
  return request({
    url: `/classify/${id}`
  })
}

// 根据id删除分类
export function delClassifyByIdRequest (id) {
  return request({
    url: `/classify/${id}`,
    method: 'delete'
  })
}
