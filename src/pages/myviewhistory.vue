<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <ul>
        <li v-for="(item, index) in HistoryList" :key='index' @click="toDetailsFun(item.vod_id)">
          <div class="tuijian-img">
            <img :src="item.vod_pic"/>
          </div>
          <div class="shipingName">{{item.vod_name}}</div>
          <div class="shipingTime">{{item.vod_urlname}}
            <p>主演：{{item.vod_actor}}</p>
            <span>播放时间：{{item.play_time}}</span>
          </div>
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
      HistoryList: [], // 历史记录
    }
  },
  mounted () {
    this.getHistoryListFun()
  },
  methods: {
    getHistoryListFun () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.page = 1
      objStr.limit = 10
      IMService.getplayhistory(objStr)
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
    ul{
      margin-top: 20px;
      li{
        height: 280px!important;
        .tuijian-img{
          float: left;
          width: 240px!important;
          height: 280px!important;
          img{
            width: auto!important;
            height: 100%!important;
          }
      }
      .shipingName{
        padding: 30px 15px 0px 15px!important;
      }
      .shipingTime{
        font-size: 28px!important;
        line-height: 55px!important;
        p{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

  }
</style>
