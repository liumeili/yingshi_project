<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <ul>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/my_bg.jpg"/>
          </div>
          <div class="shipingName">如懿传&nbsp;<span>第50集</span></div>
          <div class="shipingTime">点赞时间&nbsp;2019年12月4日</div>
          <img src="../assets/img/mydianzan_close.png" class="close"/>
        </li>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/my_bg.jpg"/>
          </div>
          <div class="shipingName">如懿传&nbsp;<span>第50集</span></div>
          <div class="shipingTime">点赞时间&nbsp;2019年12月4日</div>
          <img src="../assets/img/mydianzan_close.png" class="close"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
export default {
  name: 'mydianzan',
  data () {
    return {
      dianzanList: [], // 点赞数据
      uid: JSON.parse(localStorage.getItem('uidAtoken')).uid,
      token: JSON.parse(localStorage.getItem('uidAtoken')).token
    }
  },
  mounted () {
    this.GetdianzanList() // 列表接口
  },
  methods: {
    // 列表接口
    GetdianzanList () {
      console.log(this.uid)
      IMService.getlikevod({limit: 2, page: 1, uid: this.uid, token: this.token})
        .then(function (res) {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less">

</style>
