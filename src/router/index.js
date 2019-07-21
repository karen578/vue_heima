import Vue from 'vue'

import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/users.vue'

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
        name: 'home',
        path: '/home',
        component: Home,
        // 重定向是一个对象，不是数组
        redirect: { name: 'welcome' },
        children: [
          {
            name: 'welcome',
            path: 'welcome',
            component: Welcome
          },
          {
            name: 'users',
            path: 'users',
            component: Users
          }

        ]
      }]
  })
// 向外暴露数据
export default router
