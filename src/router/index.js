import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home'
import BookInfo from '@/views/Home/BookInfo'
import BookList from '@/views/Home/BookList'
import ClassifyInfo from '@/views/Home/ClassifyInfo'
import ClassifyList from '@/views/Home/ClassifyList'
import UserInfo from '@/views/Home/UserInfo'
import UserList from '@/views/Home/UserList'

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
      component: Home,
      children: [
        {
          path: 'bookList',
          name: 'BookList',
          component: BookList
        },
        {
          path: 'bookinfo',
          name: 'BookInfo',
          component: BookInfo
        },
        {
          path: 'classifyInfo',
          name: 'ClassifyInfo',
          component: ClassifyInfo
        },
        {
          path: 'classifyList',
          name: 'ClassifyList',
          component: ClassifyList
        }
      ]
    },
    {
      path: '/user',
      component: Home,
      children: [
        {
          path: 'info',
          name: 'UserInfo',
          component: UserInfo
        }, {
          path: 'list',
          name: 'UserList',
          component: UserList
        }
      ]
    }
  ]
})
