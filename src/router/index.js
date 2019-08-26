import Vue from 'vue'
import Router from 'vue-router'
import BookInfo from '@/views/Home/BookInfo'
import BookList from '@/views/Home/BookList'
import ClassifyInfo from '@/views/Home/ClassifyInfo'

// 解决 {_name:""NavigationDuplicated"... start
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 解决 {_name:""NavigationDuplicated"... end

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/bookinfo',
      name: 'BookInfo',
      component: BookInfo
    },
    {
      path: '/classifyInfo',
      name: 'ClassifyInfo',
      component: ClassifyInfo
    }
  ]
})
