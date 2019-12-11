import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        title:'首页'
      }
    },{
      path: '/login',
      name: 'login',
      component:() => import('../pages/login.vue'),
      meta:{
        title:'登录'
      }
    },{
      path: '/hot',
      name: 'hot',
      component:() => import('../pages/hot.vue'),
      meta:{
        title:'热点'
      }
    },{
      path: '/task',
      name: 'task',
      component:() => import('../pages/task.vue'),
      meta:{
        title:'热点'
      }
    },{
      path: '/my',
      name: 'my',
      component:() => import('../pages/my.vue'),
      meta:{
        title:'我的'
      }
    },,{
      path: '/pingdaoList',
      name: 'pingdaoList',
      component:() => import('../pages/pingdaoList.vue'),
      meta:{
        title:'频道列表'
      }
    }
  ]
})
