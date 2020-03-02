<template>
  <div class="test" style="padding-top:100px;">  
     <iframe frameborder="0"  src="http://47.106.136.89/index.php?s=App-play-play-id-152-sid-1-pid-1.html" allowfullscreen></iframe>
  
    
<video class="vjs-tech" width="100%" height="100%"
    controls="controls" autoplay="autoplay"
    x-webkit-airplay="true" x5-video-player-fullscreen="true"
    preload="auto" playsinline="true" webkit-playsinline
    x5-video-player-typ="h5">
    <source type="application/x-mpegURL" src="http://dlhls.cdn.zhanqi.tv/zqlive/22578_yKdJM.m3u8">
</video>
  </div>
</template>

<script>
import { Button } from 'vant';
import Footer from '../components/footer.vue'
export default {
  name: 'task',
  components:{
     [Button.name]: Button,
     Footer
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style lang='less' >
  
 
</style>
