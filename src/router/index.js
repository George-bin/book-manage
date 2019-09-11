import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home'
import BookInfo from '@/views/Home/BookInfo'
import BookList from '@/views/Home/BookList'
import ClassifyInfo from '@/views/Home/ClassifyInfo'
import ClassifyList from '@/views/Home/ClassifyList'
import UserInfo from '@/views/Home/UserInfo'
import UserList from '@/views/Home/UserList'
import Login from '@/views/Login/Login'
import { getCookie } from '../utils/cookies'

// 解决 {_name:""NavigationDuplicated"... start
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 解决 {_name:""NavigationDuplicated"... end

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'bookList',
          name: 'BookList',
          component: BookList,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'bookinfo',
          name: 'BookInfo',
          component: BookInfo,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'classifyInfo',
          name: 'ClassifyInfo',
          component: ClassifyInfo,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'classifyList',
          name: 'ClassifyList',
          component: ClassifyList,
          meta: {
            requireAuth: true
          }
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
          component: UserInfo,
          meta: {
            requireAuth: true
          }
        }, {
          path: 'list',
          name: 'UserList',
          component: UserList,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})

// 路由劫持 => 用户登录效验
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断本地是否存在cookie
    if (getCookie('usr')) {
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
