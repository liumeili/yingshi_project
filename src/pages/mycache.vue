<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <div class="shoucang_title">电视剧</div>
      <ul>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/my_bg.jpg"/>
          </div>
          <div class="shipingName">如懿传&nbsp;<span>第50集</span></div>
          <div class="shipingTime">正在缓存</div>
          <div class="progress">
            <van-progress :percentage="50"  pivot-text=" "/>
          </div>
          <div class="percentage">50%</div>
        </li>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/my_bg.jpg"/>
          </div>
          <div class="shipingName">如懿传&nbsp;<span>第50集</span></div>
          <div class="shipingTime">正在缓存</div>
        </li>
      </ul>
    </div>
    <div class="closeALL">清空</div>
  </div>
</template>

<script>
import { Progress } from 'vant'
export default {
  components: {
    [Progress.name]: Progress

  }
}
</script>

<style lang="less">
  .shipingTime{
    padding: 0 15px!important;
  }
  .progress{
    float: left;
    width: calc(100% - 410px);
    padding: 15px 15px;
  }
  .percentage{
    font-size: 18px;
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
