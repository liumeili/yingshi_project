<template>
    <div class="hello">
      <d-player ref="player" @play="play" :lang="lang" :video="video"></d-player>
    </div>
</template>

<script>
import VueDPlayer from './VueDPlayerHls'
// import logoImg from '@/assets/logo.png';
export default {
  name: 'HelloWorld',
  data () {
    return {
      video: {
        quality: [{
          name: '240P',
          url: 'https://youku.com-ok-56.com/20191128/20563_85762c5b/index.m3u8'
        }, {
          name: '360P',
          url: 'https://youku.com-ok-56.com/20191128/20563_85762c5b/index.m3u8'
        }, {
          name: '720P',
          url: 'https://youku.com-ok-56.com/20191128/20563_85762c5b/index.m3u8'
        }],
        pic: 'http://img.kuyun88.com/pic/uploadimg/2019-10/2019101210564531407.jpg',
        defaultQuality: 1,
        // thumbnails: logoImg,
        type: 'hls'
      },
      lang: 'zh-cn',
      // logo: logoImg,
      autoplay: false,
      player: null
    }
  },
  components: {
    'd-player': VueDPlayer
  },
  methods: {
    play () {
    // console.log('开始播放...')
    }
  },
  mounted () {
  // this.player = this.$refs.player.dp;
  // console.log(this.player);
  // var hls = new Hls();
  // hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
  // hls.attachMedia(this.player);
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
    width: 750px;
    margin: 0 auto 50px;
    .dplayer{
      height: 407px;
    }
}
@media only screen and (max-width: 640px){
  .hello{
      width: 100%;
  }
}
</style>
