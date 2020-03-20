<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <ul>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/nopeople.png"/>
          </div>
          <div class="shipingName">如懿传&nbsp;<span>第50集</span></div>
          <div class="shipingTime">正在缓存</div>
          <div class="progress">
            <van-progress :percentage="50"  pivot-text=" " color="#27FCB9"/>
          </div>
          <div class="percentage">50%</div>
        </li>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/nopeople.png"/>
          </div>
          <div class="shipingName">如懿传&nbsp;<span>第50集</span></div>
          <div class="shipingTime">已暂停</div>
          <div class="progress">
            <van-progress :percentage="50" inactive pivot-text=" " color="#27FCB9"/>
          </div>
          <div class="percentage">50%</div>
        </li>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/nopeople.png"/>
          </div>
          <div class="shipingName">如懿传&nbsp;<span>第50集</span></div>
          <div class="shipingTime finished">缓存完成</div>
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
    padding: 5px 15px!important;
  }
  .finished{
    color: #27FCB9!important;
  }
  .progress{
    float: left;
    width: calc(100% - 410px);
    padding: 15px 15px;
    .van-progress__pivot{
      width: 10px!important;
      min-width: 10px!important;
      height: 10px;
      box-shadow: #27FCB9 0px 0px 10px;
    }
  }
  .percentage{
    float: left;
    font-size: 18px;
    line-height: 35px;
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
