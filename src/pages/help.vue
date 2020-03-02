<template>
  <div class="help">
    <div class="about_rule">
      <span>关于规则</span>
      <p v-html="helpIntroduce">{{helpIntroduce}}</p>
    </div>
    <div class="help_title">关于规则</div>
    <div class="about_rule about_rule_level" v-for="(item, index) in levelIntroduce" :key="index">
      <span class="levelTitle">等级{{item.level}}</span>
      <p class="levelCont">升下一级：{{item.share_num}}次分享<br>拥有权限：{{item.could_watch_time < 0?"无限":item.could_watch_time}}次免费观影次数 {{item.could_download_time < 0?"无限":item.could_download_time}}次免费观影次数</p>
      <div v-if="item.is_reach == 1">达成</div>
    </div>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
export default {
  name: 'help',
  data () {
    return {
      helpIntroduce: '', // 关于规则
      levelIntroduce: [] // 规则介绍详情
    }
  },
  mounted () {
    this.helpListFun() // 列表接口
  },
  methods: {
    // 列表接口
    helpListFun () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      IMService.getsharerule(objStr)
        .then(function (res) {
          console.log(res)
          that.helpIntroduce = res.data.share_introduce.replace(/\s/g, '<br/>')
          that.levelIntroduce = res.data.level_detail
        })
    }

  }
}
</script>

<style lang="less">
  .ys-goback{
    background: #161C2C;
  }
  .help{
    padding-top: 88px;
    .about_rule{
      width: calc(100% - 100px);
      margin: auto;
      background: #161C2C;
      border-radius: 10px;
      text-align: left;
      padding: 30px 20px;
      span{
        font-size: 34px;
      }
      p{
        padding: 10px 0;
        color: #929292;
      }
      .levelTitle{
        font-size: 30px;
      }
      .levelCont{
        padding-top: 30px;
      }
    }
    .about_rule_level{
      position: relative;
      margin-bottom: 20px;
      div{
        position: absolute;
        top: 0;
        right: 0;
        height: 95px;
        width: 95px;
        background-image: url(../assets/img/help_level.png);
        background-size: 100%;
        background-repeat: no-repeat;
        text-align: right;
        line-height: 55px;
        color: #000000;
        font-size: 28px;
      }
    }
    .help_title{
      text-align: left;
      padding: 20px 50px;
      font-size: 34px;
    }
  }
</style>
