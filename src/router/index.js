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
    },{
      path: '/pingdaoList',
      name: 'pingdaoList',
      component:() => import('../pages/pingdaoList.vue'),
      meta:{
        title:'频道列表'
      }
    },{
      path: '/mydianzan',
      name: 'mydianzan',
      component:() => import('../pages/mydianzan.vue'),
      meta:{
        title:'我的点赞'
      }
    },{
      path: '/myshoucang',
      name: 'myshoucang',
      component:() => import('../pages/myshoucang.vue'),
      meta:{
        title:'我的收藏'
      }
    },{
      path: '/mycache',
      name: 'mycache',
      component:() => import('../pages/mycache.vue'),
      meta:{
        title:'我的缓存'
      }
    },{
      path: '/details',
      name: 'details',
      component:() => import('../pages/details.vue'),
      meta:{
        title:''
      }
    },{
      path: '/mysetting',
      name: 'mysetting',
      component:() => import('../pages/mysetting.vue'),
      meta:{
        title:'设置'
      }
    },{
      path: '/mybuyhistory',
      name: 'mybuyhistory',
      component:() => import('../pages/mybuyhistory.vue'),
      meta:{
        title:'购买记录'
      }
    },{
      path: '/myviewhistory',
      name: 'myviewhistory',
      component:() => import('../pages/myviewhistory.vue'),
      meta:{
        title:'观看历史'
      }
    },{
      path: '/myinformationedit',
      name: 'myinformationedit',
      component:() => import('../pages/myinformationedit.vue'),
      meta:{
        title:'编辑资料'
      }
    },{
      path: '/mybuyvip',
      name: 'mybuyvip',
      component:() => import('../pages/mybuyvip.vue'),
      meta:{
        title:'会员购买'
      }
    },{
      path: '/videoplay',
      name: 'videoplay',
      component:() => import('../pages/videoplay.vue'),
      meta:{
        title:''
      }
    },{
      path: '/help',
      name: 'help',
      component:() => import('../pages/help.vue'),
      meta:{
        title:'帮助'
      }
    },{
      path: '/paihangList',
      name: 'paihangList',
      component:() => import('../pages/paihangList.vue'),
      meta:{
        title:'排行榜'
      }
    },{
      path: '/sharelist',
      name: 'sharelist',
      component:() => import('../pages/sharelist.vue'),
      meta:{
        title:'分享记录'
      }
    },{
      path: '/test',
      name: 'test',
      component:() => import('../pages/test.vue'),
      meta:{
        title:''
      }
    }
  ]
})
