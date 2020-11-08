import request from '@/utils/request'

// 获取分类列表
export function getLabelListRequest () {
  return request({
    url: '/label'
  })
}

// 根据id获取标签的详细信息
export function getLabelInfoByIdRequest (id) {
  return request({
    url: `/label/${id}`
  })
}

// 新建标签
export function addLabelRequest (data) {
  return request({
    url: '/label',
    method: 'post',
    data
  })
}

// 更新标签
export function updateLabelRequest (data) {
  return request({
    url: '/label',
    method: 'put',
    data
  })
}

// 删除标签
export function delLabelByIdRequest (id) {
  return request({
    url: `/label/${id}`,
    method: 'delete'
  })
}
