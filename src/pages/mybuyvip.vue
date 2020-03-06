<template>
  <div class="buyvip">
    <div class="buyvip_head">
      <img :src="userInfoList.user_avatar" class="headBG"/>
      <div class="buyvip_head_hei">
        <div class="touxiang">
          <div class="myImge"><img :src="userInfoList.user_avatar" class="myImge_pic"/></div>
        </div>
        <div class="vipInfo">
          <span>{{userInfoList.user_name}}</span><br>
          <span class="otherTime" v-if="isVIP.is_vip == 0">您还不是VIP</span>
          <span class="otherTime" v-if="isVIP.is_vip == 1">剩余VIP时长</span>
          <img src="../assets/img/my_novip.png" v-if="isVIP.is_vip == 0"/>
          <img src="../assets/img/my_vip.png" v-if="isVIP.is_vip == 1"/>
          <span class="otherTime" v-if="isVIP.is_vip == 1">&nbsp;&nbsp;{{isVIP.vip_endtime_str}}</span>
        </div>
        <img src="../assets/img/my_vip_bangzhu.png" class="bangzhu" @click="showPopup"/>
        <div class="buyvip_title">会员购买</div>
      </div>

    </div>
    <ul class="vipTime">
      <li v-for="(item,index) in vipList" :key="index" @click="getItem(index)" :class="{'activeM':activeMoney==index}">
        <div>{{item.vip_detail}}</div>
        <div class="vip_money">￥<span>{{item.vip_price}}</span></div>
      </li>
      <div class="clearBoth"></div>
    </ul>
    <van-radio-group v-model="radio">
      <div class="pay_way_list">
        <img src="../assets/img/my_vip_zhifubao.png"/>
        <div class="pay_way_name">支付宝</div>
        <van-radio name="1" checked-color="#07c160"></van-radio>
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
    <div class="loginOut" @click="BuyVip()">购买</div>
    <div class="closeALL" @click="showPopup">客服</div>
    <van-popup v-model="show">
      <div class="model_kefu">
        <div class="title01">{{kefuList.kefu_title}}<br>QQ:{{kefuList.kefu_qq}}</div>
        <div class="title02">{{kefuList.kefu_detail}}</div>
      </div>
      <img :src="kefuList.kefu_portrait"/>
    </van-popup>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
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
      vipList: [],
      userInfoList: {}, // 用户信息
      isVIP: {}, // 判断是否是vip
      kefuList: {} // 客服信息
    }
  },
  mounted () {
    this.getVIPlistFun()
    this.getUserInfoFun()
  },
  methods: {
    getItem (index) {
      this.activeMoney = index
      this.vipID = this.vipList[index].id
    },
    showPopup () {
      this.show = true
      let that = this
      IMService.getConfig()
        .then(function (res) {
          console.log(res)
          that.kefuList = res.data
        })
    },
    // 获取观看历史记录
    getVIPlistFun () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      IMService.vipinit(objStr)
        .then(function (res) {
          console.log(res)
          that.vipList = res.data.vip_buy_list
          that.getItem(0)
        })
      IMService.getuserinfo(objStr)
        .then(function (res) {
          console.log(res)
          that.userInfoList = res.data.userinfo
          that.isVIP = that.userInfoList.vip_info
        })
    },
    getUserInfoFun () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      IMService.getuserinfo(objStr)
        .then(function (res) {
          console.log(res)
          that.userInfoList = res.data.userinfo
          that.isVIP = that.userInfoList.vip_info
        })
    },
    BuyVip () {

    }
  }
}
</script>

<style lang="less">
  .ys-goback{
    background: #161C2C;
  }
  .buyvip{
    width: 100%;
    padding-top: 85px;
    .buyvip_head{
      position: relative;
      width: 100%;
      height: 320px;
      text-align: left;
      font-size: 30px;
      overflow: hidden;
      .headBG{
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
       width: 100%;
      }
      .buyvip_head_hei{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 360px;
        background: linear-gradient(to top,rgba(#0D1225, 1),rgba(#0D1225, 0));
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
          .otherTime{
            font-size: 21px;
          }
          img{
            width: 33px;
            vertical-align: middle;
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

    }
    .vipTime{
      margin-left: 55px;
      li{
        float: left;
        width: 189px;
        height: 183px;
        margin: 0 30px 20px 0;
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
    .van-radio-group{
      width: 100%;
      margin-top: 15px;
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
            font-size: 30px!important;
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
  }

</style>
