import Vue from 'vue'

import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login.vue'
import Index from '@/views/index.vue'

Vue.use(VueRouter)

// 创建路由实例
var router = new VueRouter(
  {// 配置路由
    routes: [
      // 路由重定向
      {
        name: 'default',
        path: '/',
        redirect: '/login'
        // 构建路由实例
      }, {
        name: 'login',
        path: '/login',
        component: Login
      },
      {
        name: 'index',
        path: '/index',
        component: Index
      }]
  })
// 向外暴露数据
export default router
