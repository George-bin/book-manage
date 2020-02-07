import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home'
import AddBook from '@/views/Book/AddBook'
import EditBook from '@/views/Book/EditBook'
import AddClassify from '@/views/Classify/AddClassify'
import EditClassify from '@/views/Classify/EditClassify'
import UserInfo from '@/views/Book/UserInfo'
import UserList from '@/views/Book/UserList'
import Login from '@/views/Login/Login'
import SyncLocal from '@/views/Sync/SyncLocal'
import SyncOrigin from '@/views/Sync/SyncOrigin'
// 标签管理
import LabelManage from '@/views/Label/Label'
// import { getCookie } from '../utils/cookies'

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
      redirect: '/book/manage'
    },
    {
      path: '/book',
      component: Home,
      redirect: '/book/manage',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'manage',
          name: 'Book',
          component: () => import('@/views/Book/Book'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'AddBook',
          component: AddBook,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'edit',
          name: 'EditBook',
          component: EditBook,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/classify',
      component: Home,
      redirect: '/classify/manage',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'manage',
          name: 'ClassifyManage',
          component: () => import('@/views/Classify/Classify'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'AddClassify',
          component: AddClassify,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'edit/:_id',
          name: 'EditClassify',
          component: EditClassify,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/label',
      component: Home,
      redirect: '/classify/manage',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'manage',
          name: 'LabelManage',
          component: LabelManage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'AddLabel',
          component: () => import('@/views/Label/AddLabel'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'edit/:_id',
          name: 'EditLabel',
          component: () => import('@/views/Label/EditLabel'),
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
    },
    {
      path: '/sync',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'local',
          name: 'local',
          component: SyncLocal,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'origin',
          name: 'origin',
          component: SyncOrigin,
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
  document.body.scrollTop = document.documentElement.scrollTop = 0
  let auth = sessionStorage.getItem('auth')
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断本地是否存在cookie
    if (auth === 'true') {
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    if (to.path === '/login') {
      if (auth === 'true') {
        next({
          path: '/book'
        })
      } else {
        // 未登录,跳转到登陆页面
        next()
      }
    } else {
      next()
    }
  }
})

export default router
