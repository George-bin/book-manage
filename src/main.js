// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/theme/index.css'
import './assets/css/var.scss'

import '../static/css/iconfont/iconfont.css'

// 初始化css
import './assets/css/init.css'

// 引入moment
import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn')

Vue.prototype.$color = '#107DCF'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
