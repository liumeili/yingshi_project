<template>
  <div class="sharelist">
      <ul>
        <li>
          <div>序号</div>
          <div>加入用户</div>
          <div>加入时间</div>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in shareList" :key='index'>
          <div>{{index+1}}</div>
          <div>{{item.user_name}}</div>
          <div>{{item.add_time}}</div>
        </li>
      </ul>
      <div class="pingdaoNodata" v-if="shareList.length == 0">
        <img src="../assets/img/nodata.png">
        <div>暂无更多数据显示</div>
      </div>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
export default {
  name: 'sharelist',
  data () {
    return {
      shareList: [] // 点赞数据
    }
  },
  mounted () {
    this.GetshareList() // 列表接口
  },
  methods: {
    // 列表接口
    GetshareList () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.limit = 10
      objStr.page = 1
      IMService.getsharelog(objStr)
        .then(function (res) {
          console.log(res)
          that.shareList = res.data.list
        })
    }
  }
}
</script>

<style lang="less">
  .ys-goback{
    background: #161C2C;
  }
  .sharelist{
    padding-top: 95px;
    ul{
      li{
        width: 100%;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #4c4c4c;
        div{
          float: left;
          width: 36%;
        }
        div:first-child{
          width: 28%;
        }
      }
    }
  }
</style>
