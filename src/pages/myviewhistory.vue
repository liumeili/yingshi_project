<template>
  <div class="myDianzan index-tuijian">
    <div class="contain">
      <ul>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/my_bg.jpg"/>
          </div>
          <div class="shipingName">如懿传</div>
          <div class="shipingTime">第50集<br>主演：霍建华，周迅</div>
        </li>
        <li>
          <div class="tuijian-img">
            <img src="../assets/img/my_bg.jpg"/>
          </div>
          <div class="shipingName">天赋异禀</div>
          <div class="shipingTime">第6集<br>主演：霍建华，周迅</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
        padding: 49px 15px 0px 15px!important;
      }
      .shipingTime{
        font-size: 30px!important;
        line-height: 55px!important;
      }
    }
  }

  }
</style>
