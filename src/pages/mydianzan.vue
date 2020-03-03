<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <ul>
        <li v-for="(item,index) in dianzanList" :key='index'>
          <div class="tuijian-img" @click="toDetailsFun(item.vod_id)">
            <img :src="item.vod_pic"/>
          </div>
          <div class="shipingName" @click="toDetailsFun(item.vod_id)">{{item.vod_name}}</div>
          <div class="shipingTime" @click="toDetailsFun(item.vod_id)">点赞时间<br>{{item.add_time}}</div>
          <img src="../assets/img/mydianzan_close.png" class="close" @click="noDianzan(index, item.vod_id)"/>
        </li>
      </ul>
      <div class="pingdaoNodata" v-if="dianzanList.length == 0">
        <img src="../assets/img/nodata.png">
        <div>暂无更多数据显示</div>
      </div>
    </div>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
export default {
  name: 'mydianzan',
  data () {
    return {
      dianzanList: [] // 点赞数据
    }
  },
  mounted () {
    this.GetdianzanList() // 列表接口
  },
  methods: {
    // 列表接口
    GetdianzanList () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.limit = 10
      objStr.page = 1
      IMService.getlikevod(objStr)
        .then(function (res) {
          console.log(res)
          that.dianzanList = res.data.list
          console.log(that.dianzanList)
        })
    },
    // 取消点赞喜欢
    noDianzan (index, id) {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.vod_id = id
      IMService.unlikevod(objStr)
        .then(function (res) {
          console.log(res)
          // that.dianzanList = []
          that.GetdianzanList()
        })
    }

  }
}
</script>

<style lang="less">
  .ys-goback{
    background: #161C2C;
  }
</style>
