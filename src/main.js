import Vue from 'vue'
import App from './App.vue'
// 引用模板
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引用路由
import router from '@/router/index.js'
// 引用公共样式
import '@/styles/index.less'
Vue.use(ElementUI)

// 设置导航守卫,router.beforeEach((to,from,next)=>{})是前置导航，看vue——router文档
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 获取本地存储的token值，之前在登录成功后存储过token值，locationStorage.getIltem（"键"）
  var token = localStorage.getItem('itcast_massages_token')
  // 如果有token值或者是在登录页面的话就进行下一步
  if (token || to.path === '/login') {
    next()
  } else {
    // 没有token值就需要重定向到登录页面
    next({ name: 'login' })
  }
})

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
