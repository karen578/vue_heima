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

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
