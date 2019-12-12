<template>
  <div id="app">
     <div class="ys-goback" v-if="$route.meta.title!='首页'&&$route.meta.title!='热点'&&$route.meta.title!='任务'&&$route.meta.title!='我的'&&$route.meta.title!='频道列表'" @click="gobackFun()"><span>{{$route.meta.title}}</span></div>
    <router-view/>
  </div>
</template>

<script>
import {IMService} from '@/service/RiziServices.js'
export default {
  name: 'App',
  mounted(){
     this.getConfigFun();
  },
  methods:{
    // 返回
     gobackFun(){
       alert();
       this.$router.go(-1);
     },

    //  获取公共配置
    getConfigFun(){
        IMService.getConfig()
          .then(function(res){
             console.log('获取公共配置');
             console.log(res);
          })
    }
  }
}
</script>

<style  lang="less">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #0D1225;
  color: #fff;
  font-size: 30px;
}


</style>
