<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <div class="ALLscrollTwo">
        <div class="shoucang_title" v-if="shoucangList.length>0">电视剧</div>
        <ul>
          <li v-for="(item,index) in shoucangList" :key='index'>
            <div class="tuijian-img"  @click="toDetailsFun(item.vod_id)">
              <img :src="item.vod_pic"/>
            </div>
            <div class="shipingName" @click="toDetailsFun(item.vod_id)">{{item.vod_name}}</div>
            <div class="shipingTime" @click="toDetailsFun(item.vod_id)">收藏时间<br>{{item.add_time}}</div>
            <img src="../assets/img/mydianzan_close.png" class="close" @click="noShoucang(index, item.vod_id)"/>
          </li>
        </ul>
        <div class="pingdaoNodata" v-if="shoucangList.length == 0">
          <img src="../assets/img/nodata.png">
          <div>暂无更多数据显示</div>
        </div>
      </div>
    </div>
    <!-- <div class="closeALL" @click="closeALL()">清空</div> -->
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
export default {
  name: 'mydianzan',
  data () {
    return {
      shoucangList: [] // 点赞数据
    }
  },
  mounted () {
    this.GetshoucangList() // 列表接口
  },
  methods: {
    // 列表接口
    GetshoucangList () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.limit = 10
      objStr.page = 1
      IMService.getcollectvod(objStr)
        .then(function (res) {
          console.log(res)
          that.shoucangList = res.data.list
          console.log(that.shoucangList)
        })
    },
    // 取消收藏
    noShoucang (index, id) {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.vod_id = id
      IMService.uncollectvod(objStr)
        .then(function (res) {
          console.log(res)
          that.GetshoucangList()
        })
    },
    // 影视详情
    toDetailsFun (id) {
      this.$router.push({name: 'details', query: {vodId: id}})
    },
    closeALL () {

    }
  }
}
</script>

<style lang="less">
  .ys-goback{
    background: #161C2C;
  }
  .closeALL{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99999;
    line-height: 85px;
    padding: 0 31px;
  }
</style>
