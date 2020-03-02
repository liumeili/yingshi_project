<template>
  <div class="hot">
    <div class="hot_title">热点</div>
    <div class="hot_list">
      <ul>
        <li v-for="(item, index) in hotList" :key="index" @click="goOtherPage(item.h5_url)">
          <img :src="item.img_url"/>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import { Button } from 'vant'
import Footer from '../components/footer.vue'
export default {
  name: 'hot',
  components: {
    [Button.name]: Button,
    Footer
  },
  data () {
    return {
      hotList: [] // 热点信息列表
    }
  },
  mounted () {
    this.getHotList()
  },
  methods: {
    getHotList () {
      let that = this
      IMService.hotpointlist()
        .then(function (res) {
          console.log(res)
          that.hotList = res.data.list
        })
    },
    goOtherPage (url) {
      window.location.href = url
    }
  }
}
</script>

<style lang='less' >
  .hot{
    .hot_title{
      position: fixed;
      top: 0;
      width: 100%;
      height: 88px;
      background: #161C2C;
      font-size: 40px;
      color: #D5D5D5;
      line-height: 88px;
    }
    .hot_list{
      position: fixed;
      top: 88px;
      width: 100%;
      height: calc(100% - 200px);
      overflow-y: auto;
      ul{
        li{
          position: relative;
          width: calc(100% - 60px);
          height: 287px;
          margin: 20px auto;
          overflow-y: hidden;
          border-radius: 10px;
          img{
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
          span{
            position: absolute;
            bottom: 20px;
            left: 20px;
            font-size: 0.35rem;
          }
        }
      }
    }
  }

</style>
