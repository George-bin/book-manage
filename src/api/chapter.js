import request from '../utils/request'
export function getChapterContentByIdRequest (id) {
  return request({
    url: `/chapter/${id}`
  })
}
