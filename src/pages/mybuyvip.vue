<template>
  <div class="buyvip">
    <div class="buyvip_head">
      <div class="buyvip_head_hei">
        <div class="touxiang">
          <div class="myImge"><img src="../assets/img/my_bg.jpg"/></div>
        </div>
        <div class="vipInfo"><span>用户：150****853</span><br><span>剩余VIP时长&nbsp;&nbsp;30天</span></div>
        <img src="../assets/img/my_vip_bangzhu.png" class="bangzhu"/>
        <div class="buyvip_title">会员购买</div>
      </div>
      <ul>
        <li v-for="(item,index) in moneyList" :key="index" @click="getItem(index)" :class="{'activeM':activeMoney==index}">
          <div>{{item.date}}</div>
          <div class="vip_money">￥<span>{{item.money}}</span></div>
        </li>
      </ul>
    </div>
    <van-radio-group v-model="radio">
      <div class="pay_way_list">
        <img src="../assets/img/my_vip_zhifubao.png"/>
        <div class="pay_way_name">支付宝</div>
        <van-radio name="1" checked-color="#07c160"></van-radio>
      </div>
      <div class="pay_way_list">
        <img src="../assets/img/my_vip_zhifubao.png"/>
        <div class="pay_way_name">微信</div>
        <van-radio name="2" checked-color="#07c160"></van-radio>
      </div>
      <div class="pay_way_list">
        <img src="../assets/img/my_vip_zhifubao.png"/>
        <div class="pay_way_name">银行卡</div>
        <van-radio name="3" checked-color="#07c160"></van-radio>
      </div>
    </van-radio-group>
    <div class="index-titleLine">
      <span>特权说明</span>
    </div>
    <ul class="tequan">
      <li>
        <img src="../assets/img/my_vip_yanjing.png"/>
        <div class="tequan_title">无限观看电影</div>
      </li>
      <li>
        <img src="../assets/img/my_vip_xiazai.png"/>
        <div class="tequan_title">无限下载电影</div>
      </li>
      <li>
        <img src="../assets/img/my_vip_birthday.png"/>
        <div class="tequan_title">会员生日</div>
      </li>
    </ul>
    <div class="loginOut">购买</div>
    <div class="closeALL" @click="showPopup">客服</div>
    <van-popup v-model="show">
      <div class="model_kefu">
        <div class="title01">客服服务热线<br>QQ:123456790</div>
        <div class="title02">联系客服小姐姐，在线解决问题</div>
      </div>
      <img src="../assets/img/my_bg.jpg"/>
    </van-popup>
  </div>
</template>

<script>
import { RadioGroup, Radio, Popup } from 'vant'
export default {
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup
  },
  data () {
    return {
      radio: '1',
      show: false,
      activeMoney: 0,
      moneyList: [
        {
          date: '7天',
          money: 3.9
        },
        {
          date: '一个月',
          money: 10
        },
        {
          date: '三个月',
          money: 30
        }
      ]

    }
  },
  methods: {
    getItem (index) {
      this.activeMoney = index
    },
    showPopup () {
      this.show = true
    }
  }
}
</script>

<style lang="less">
  .buyvip{
    width: 100%;
    padding-top: 85px;
    .buyvip_head{
      position: relative;
      width: 100%;
      height: 320px;
      background-image: url(../assets/img/my_bg.jpg);
      background-size: 100% 100%;
      box-shadow: 0px -60px 60px -10px rgba(13, 18, 37, 1) inset;
       text-align: left;
       font-size: 30px;
      .buyvip_head_hei{
        width: 100%;
        height: 320px;
        background: -webkit-linear-gradient(top, rgba(13, 18, 37, 0.1), rgba(13, 18, 37, 0.6));
        .touxiang{
          float: left;
          height: 158px;
          width: 148px;
          .myImge{
            top: 40px;
            left: 30px;
            width: 112px;
            height: 112px;
          }
        }
        .vipInfo{
          float: left;
          margin: 40px auto 0 18px;
          padding-top: 19px;
          line-height: 40px;
          span:last-child{
            font-size: 21px;
          }
        }
        .bangzhu{
          float: right;
          width: 42px;
          height: 42px;
          margin: 56px 30px auto auto;
        }
      }
      .buyvip_title{
        float: left;
        width: calc(100% - 30px);
        height: 40px;
        font-size: 30px;
        padding: 55px 0 0 30px;
      }
      ul{
        position: absolute;
        left: 0;
        bottom: -208px;
        margin-left: 55px;
        li{
          float: left;
          width: 189px;
          height: 183px;
          margin-right: 30px;
          background:rgba(22,28,44,1);
          border:2px solid rgba(100,167,146,0.5);
          border-radius:10px;
          text-align: center;
          padding-top: 70px;
          .vip_money{
            color: #27FCB9;
            font-size: 24px;
            margin-top: 5px;
            span{
              font-size: 60px;
            }
          }
        }
        .activeM{
          border:2px solid #27FCB9;
        }
      }
    }
    .van-radio-group{
      width: 100%;
      margin-top: 289px;
      .pay_way_list{
        float: left;
        width: 100%;
        height: 107px;
         background: #161C2C;
        img{
          float: left;
          width: 47px;
          height: 47px;
          margin: 30px 16px 30px 30px;
        }
        .pay_way_name{
          float: left;
          line-height: 110px;
          font-size: 36px;
          color: #C5C5C5;
        }
        .van-radio{
          float: right;
          width: 35px;
          height: 35px;
          margin: 40px 30px;
          .van-radio__icon{
            height: auto;
          }
        }
        .van-icon-success{
          width: 30px;
          height: 30px;
        }
        .van-icon{
          border: 1px solid #07c160;
        }
      }
      .pay_way_list:last-child{
        margin-bottom: 55px;
      }
    }
    .index-titleLine{
      background: #161C2C;
    }
    .tequan{
      width: 100%;
      height: 260px;
      background: #161C2C;
      li{
        float: left;
        width: calc(100%/3);
        height: 180px;
        background: #161C2C;
        padding-bottom: 80px;
        img{
          width: 104px;
          height: 104px;
          margin: 25px auto 10px auto;
        }
        .tequan_title{
          font-size: 24px;
        }
      }
    }
    .loginOut{
      margin-top: 0;
    }
    .closeALL{
      position: absolute;
      top: 0;
      right: 0;
      z-index: 99999;
      line-height: 85px;
      padding: 0 31px;
      color: #D5D5D5;
    }
    .van-popup{
      width: 520px;
      height: 386px;
      background: none;
      .model_kefu{
        width: 520px;
        height: 345px;
        margin-top: 41px;
        background: #1D202F;
        border-radius: 22px;
        padding-top: 130px;
        .title01{
          line-height: 60px;
        }
        .title02{
          font-size: 24px;
          color: #CFCFCF;
          padding-top: 40px;
        }
      }
      img{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 144px;
        height: 144px;
        border-radius: 50%;
      }
    }
  }

</style>
