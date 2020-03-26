<template>
  <div id="app">
     <div class="ys-goback" v-if="$route.meta.title!='首页'&&$route.meta.title!='热点'&&$route.meta.title!='任务'&&$route.meta.title!='我的'&&$route.meta.title!='频道列表'&&$route.meta.title!='详情'" >
       <div class="backPage" @click="gobackFun()"></div><span>{{$route.meta.title}}</span>
     </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault()
    }, false)
  },
  methods: {
    // 返回
    gobackFun () {
      this.$router.go(-1)
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
