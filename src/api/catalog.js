import request from '../utils/request'

export function getCatalogRequest (bid) {
  return request({
    url: `/catalog/${bid}`,
    method: 'get'
  })
}

export function getChapterContentRequest (zid) {
  return request({
    url: `/chapter/${zid}`,
    method: 'get'
  })
}
