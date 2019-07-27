import Vue from 'vue'

import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/users.vue'
import Rights from '@/views/right/rights.vue'
import Roles from '@/views/right/roles.vue'
import Goods from '@/views/goods/goods.vue'
import Add from '@/views/goods/add.vue'
import List from '@/views/goods/list.vue'

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
          },
          {
            name: 'rights',
            path: 'rights',
            component: Rights
          },
          {
            name: 'roles',
            path: 'roles',
            component: Roles
          },
          {
            name: 'goods',
            path: 'goods',
            component: Goods,
            redirect: { name: 'list' },
            children: [
              {
                name: 'add',
                path: 'add',
                component: Add
              }, {
                name: 'list',
                path: 'list',
                component: List
              }
            ]
          }
        ]
      }]
  })
// 向外暴露数据
export default router
