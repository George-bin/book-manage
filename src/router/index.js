import Vue from 'vue'
import Router from 'vue-router'

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
      component: () => import('@/views/login/Login')
    },
    {
      path: '/',
      redirect: '/book/manage'
    },
    {
      path: '/book',
      component: () => import('@/views/home/Home'),
      redirect: '/book/manage',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'manage',
          name: 'Book',
          component: () => import('@/views/book/Book'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'AddBook',
          component: () => import('@/views/book/AddBook'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'edit/:id',
          name: 'EditBook',
          component: () => import('@/views/book/EditBook'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/catalog',
      component: () => import('@/views/home/Home'),
      redirect: '/catalog/:b_id',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: ':b_id',
          name: 'Catalog',
          component: () => import('@/views/catalog/Catalog'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'content/:id',
          name: 'CatalogContent',
          component: () => import('@/views/catalog/CatalogContent'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/classify',
      component: () => import('@/views/home/Home'),
      redirect: '/classify/manage',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'manage',
          name: 'ClassifyManage',
          component: () => import('@/views/classify/Classify'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'AddClassify',
          component: () => import('@/views/classify/AddClassify'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'edit/:_id',
          name: 'EditClassify',
          component: () => import('@/views/classify/EditClassify'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/label',
      component: () => import('@/views/home/Home'),
      redirect: '/classify/manage',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'manage',
          name: 'LabelManage',
          component: () => import('@/views/label/Label'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'AddLabel',
          component: () => import('@/views/label/AddLabel'),
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
      component: () => import('@/views/home/Home'),
      children: [
        {
          path: 'info',
          name: 'UserInfo',
          component: () => import('@/views/book/UserInfo'),
          meta: {
            requireAuth: true
          }
        }, {
          path: 'list',
          name: 'UserList',
          component: () => import('@/views/book/UserList'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/sync',
      component: () => import('@/views/home/Home'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'local',
          name: 'local',
          component: () => import('@/views/sync/SyncLocal'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'origin',
          name: 'origin',
          component: () => import('@/views/sync/SyncOrigin'),
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
