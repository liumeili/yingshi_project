<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <div class="index-titleLine">
        <span>播放量前十</span>
      </div>
      <ul>
        <li v-for="(item, index) in HistoryList" :key='index' @click="toDetailsFun(item.vod_id)">
          <div class="tuijian-img">
            <img :src="item.vod_pic"/>
          </div>
          <div class="shipingName">{{item.vod_name}}</div>
          <div class="shipingTime">
            <p>主演：{{item.vod_actor}}</p>
            <span>{{item.vod_content}}</span>
          </div>
          <img src="../assets/img/rankTip.png" class="rankTip" v-if="index<3">
          <span class="rankTip-number" v-if="index<3">{{index+1}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import { RadioGroup, Radio, Popup } from 'vant'
export default {
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup
  },
  data () {
    return {
      HistoryList: [] // 历史记录
    }
  },
  mounted () {
    this.getHistoryListFun()
  },
  methods: {
    getHistoryListFun () {
      let that = this
      IMService.getranklist({list_id: 0})
        .then(function (res) {
          console.log(res)
          that.HistoryList = res.data.list
        })
    },
    // 影视详情
    toDetailsFun (id) {
      this.$router.push({name: 'details', query: {vodId: id}})
    }
  }
}
</script>

<style lang="less">
  .contain{
    .index-titleLine{
      padding: 10px 25px;
    }
    ul{
      margin-top: 20px;
      li{
        height: 300px!important;
        .tuijian-img{
          float: left;
          width: 220px!important;
          height: 300px!important;
          img{
            width: 100%!important;
            height: 100%!important;
          }
      }
      .shipingName{
        width: 450px!important;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 15px 15px 0px 15px!important;
      }
      .shipingTime{
        width: 450px!important;
        font-size: 26px!important;
        line-height: 60px!important;
        p{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #FFFFFF;
          padding-bottom: 10px;
        }
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          line-height: 30px;
        }
      }
    }
  }

  }
</style>
