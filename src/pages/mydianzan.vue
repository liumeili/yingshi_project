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
      uid: JSON.parse(localStorage.getItem('publicInfo')).uid,
      token: JSON.parse(localStorage.getItem('publicInfo')).token
    }
  },
  mounted () {
    this.GetdianzanList() // 列表接口
  },
  methods: {
    // 列表接口
    GetdianzanList () {
      console.log(this.uid)//10108  6fb9254d1cf73f6f32e47325d002f3ae
      IMService.getlikevod({uid: this.uid, token: this.token})
        .then(function (res) {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less">

</style>
