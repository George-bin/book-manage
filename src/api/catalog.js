/*
 * @Author: your name
 * @Date: 2020-09-04 17:44:47
 * @LastEditTime: 2020-09-04 17:47:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \book-manage\src\api\catalog.js
 */
import request from '../utils/request'

export function getCatalogRequest (data) {
  return request({
    url: '/catalog/:bookId',
    method: 'get',
    params: data
  })
}
