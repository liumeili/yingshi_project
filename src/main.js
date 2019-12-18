// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.less'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.config.productionTip = false
window.Hls = require('hls.js');
Vue.use(require('vue-wechat-title'))


import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import videojs from 'video.js';
window.videojs = videojs;
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');
 
Vue.use(VideoPlayer);


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
