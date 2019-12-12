<template>
  <div class="my">
    <div class="my_head">
      <div class="editMyinfo">修改信息
        <img src="../assets/img/my_eidt.png"/>
      </div>
      <div class="touxiang"><img src="../assets/img/my_bg.jpg"/></div>
      <div class="my_name">
        <span>开了花的耐克</span>
        <img src="../assets/img/my_woman.png" />
        <img src="../assets/img/my_novip.png"/>
      </div>
    </div>
    <div class="openVIP"><span>开通VIP</span><br><span>9.9元/月</span></div>
    <div class="openVIP"><span>会员享受</span><br><span>免费1万多项电影</span></div>
    <div class="my_dianzan" @click="goMydianzan('mydianzan')">
      <img src="../assets/img/my_dianzan.png"/>
      <div>我的点赞</div>
      <div class="dianzanNum">10</div>
    </div>
    <div class="my_dianzan" @click="goMydianzan('myshoucang')">
      <img src="../assets/img/my_shoucang.png"/>
      <div>我的收藏</div>
      <div class="dianzanNum">5</div>
    </div>
    <div class="my_dianzan" @click="goMydianzan('mycache')">
      <img src="../assets/img/my_xiazai.png" class="xiazaiImg"/>
      <div>我的缓存</div>
      <div class="dianzanNum">3</div>
    </div>
    <div class="index-titleLine">
      <span>观看历史</span>
      <span>更多历史</span>
    </div>
    <div class="index-tuijian">
      <ul>
        <li>
            <div class="tuijian-img firstImg"><img src="../assets/img/my_bg.jpg"></div>
            <div class="index-tuijian-name">上古情歌</div>
            <div class="index-tuijian-dec">高能伦理高能伦理高能伦理</div>
        </li>
        <li>
            <div class="tuijian-img"><img src="../assets/img/my_bg.jpg"></div>
            <div class="index-tuijian-name">上古情歌上古情歌上古情歌</div>
            <div class="index-tuijian-dec">高能伦理高能伦理高能伦理</div>
        </li>
        <li>
            <div class="tuijian-img"><img src="../assets/img/my_bg.jpg"></div>
            <div class="index-tuijian-name">上古情歌</div>
            <div class="index-tuijian-dec">高能伦理高能伦理高能伦理</div>
        </li>
        <div class="clearBoth"></div>
      </ul>
    </div>
    <div class="index-titleLine others">
      <span>其他</span>
    </div>
    <div class="GOothers">
      <div class="tiaozhuan" @click="goMydianzan('mysetting')">设置<img src="../assets/img/my_next.png"/></div>
      <div class="tiaozhuan" @click="goMydianzan('mybuyhistory')">购买记录<img src="../assets/img/my_next.png"/></div>
      <div class="tiaozhuan lianxi">联系客服<img src="../assets/img/my_next.png"/></div>
    </div>
     <Footer></Footer>
  </div>
</template>

<script>
import { Button } from 'vant'
import Footer from '../components/footer.vue'
export default {
  name: 'my',
  components: {
    [Button.name]: Button,
    Footer
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    // 频道跳转
    goMydianzan (url) {
      this.$router.push({name: url})
    }
  }
}

</script>

<style lang='less' >
  .my{
    width: 100%;
    .my_head{
      width: 100%;
      height: 320px;
      background-image: url(../assets/img/my_bg.jpg);
      background-size: 100% 100%;
      box-shadow: 0px -60px 40px -10px rgba(13, 18, 37, 1) inset;
      .editMyinfo{
        float: right;
        margin-top: 30px;
        margin-right: 46px;
        font-size: 24px;
        img{
          width: 27px;
          height: 25px;
        }
      }
      .touxiang{
        width: 100%;
        height: 237px;
        img{
          float: left;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 3px solid #FFFFFF;
          margin: 77px auto auto 53px;
        }
      }
      .my_name{
        width: 100%;
        text-align: left;
        padding: 16px 44px;
        img{
          width: 32px;
          height: 30px;
        }
      }
    }
    .openVIP{
      float: left;
      width: calc((100% - 99px)/2);
      height: 95px;
      margin-left: 30px;
      margin-right: 9px;
      padding: 10px 0;
      background: rgba(22, 28, 44, 1);
      border-radius: 10px;
      span{
        line-height: 48px;
      }
      span:last-child{
        font-size: 0.24px;
        color: #9D9D9D;
      }
    }
    .my_dianzan{
      width: calc(100% / 3);
      height: 188px;
      float: left;
      img{
        width: 51px;
        height: 45px;
        margin-top: 34px;
      }
      .xiazaiImg{
        width: 39px!important;
      }
      .dianzanNum{
        color: #9D9D9D;
      }
    }
    .index-titleLine{
      background: #161C2C;
    }
    .others{
      background: none;
    }
    .index-tuijian{
      background: #161C2C;
      li{
        height: 310px;
        margin-left: 25px;
      }
      li:nth-child(1){
        margin: 0 20px 0 35px;
      }
      .tuijian-img,.tuijian-img img{
        height: 210px;
      }
      .firstImg{
        transform: scale(1.1);
      }
      .index-tuijian-name{
        margin-top: 15px;
      }
    }
    .GOothers{
       background: #161C2C;
      .tiaozhuan{
        width: calc(100% - 30px);
        height: 107px;
        background: #161C2C;
        color: #C5C5C5;
        line-height: 107px;
        margin: 0 0 0 30px;
        text-align: left;
        border-bottom: 1px solid #3E3F4A;
        img{
          float: right;
          width: 27px;
          height: 27px;
          margin: 40px 31px auto auto;
        }
      }
      .lianxi{
        margin-bottom: 150px;
        border-bottom: none;
      }
    }

  }

</style>
