<template>
  <div class="my">
    <div class="my_head">
      <!-- <img :src="userInfoList.user_avatar" class="headBG" v-if="!nologin"/> -->
      <img src="../assets/img/nopeopleBG.png" class="headBG"/>
      <div class="head" >
        <div class="editMyinfo" @click="goMydianzan('myinformationedit')">
          修改信息<img src="../assets/img/my_eidt.png"/>
        </div>
        <div class="touxiang">
          <div class="myImge" @click="editInfo()">
            <img :src="userInfoList.user_avatar" v-if="!nologin" class="myImge_pic"/>
            <img src="../assets/img/nopeople.png" v-if="nologin"/>
          </div>
        </div>
        <div class="my_name">
          <span v-if="!nologin">{{userInfoList.user_name}}</span>
          <p v-if="nologin" @click="gologinPage()">未登录</p>
          <img src="../assets/img/my_man.png" v-if="userInfoList.user_sex == 1"/>
          <img src="../assets/img/my_woman.png" v-if="userInfoList.user_sex == 0||userInfoList.user_sex == 2"/>
          <img src="../assets/img/my_novip.png" v-if="isVIP.is_vip == 0"/>
          <img src="../assets/img/my_vip.png" v-if="isVIP.is_vip == 1"/>
        </div>
      </div>
    </div>
    <div class="openVIP" @click="goMydianzan('mybuyvip')"><span>开通VIP</span><br><span>首月优惠</span></div>
    <div class="openVIP" @click="goMydianzan('mybuyvip')"><span>会员享受</span><br><span>免费一万多部电影</span></div>
    <div class="my_dianzan" @click="goMydianzan('mydianzan')">
      <img src="../assets/img/my_dianzan.png"/>
      <div>我的点赞</div>
      <div class="dianzanNum">{{userInfoList.user_like_num?userInfoList.user_like_num:0}}</div>
    </div>
    <div class="my_dianzan" @click="goMydianzan('myshoucang')">
      <img src="../assets/img/my_shoucang.png"/>
      <div>我的收藏</div>
      <div class="dianzanNum">{{userInfoList.user_collection_num?userInfoList.user_collection_num:0}}</div>
    </div>
    <div class="my_dianzan" @click="goMydianzan('mycache')">
      <img src="../assets/img/my_xiazai.png" class="xiazaiImg"/>
      <div>我的缓存</div>
      <div class="dianzanNum">0</div>
    </div>
    <div class="index-titleLine">
      <span>观看历史</span>
      <span @click="goMydianzan('myviewhistory')">更多历史</span>
    </div>
    <div class="index-tuijian">
      <ul :style="{width:HistoryScrollWidth}">
        <li v-for="(item, index) in playHistoryList" :key='index' @click="toDetailsFun(item.vod_id)">
            <div class="tuijian-img firstImg"><img :src="item.vod_pic"></div>
            <div class="index-tuijian-name">{{item.vod_name}}</div>
            <div class="index-tuijian-dec">{{item.vod_content}}</div>
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
      <div class="tiaozhuan lianxi" @click="showPopup">联系客服<img src="../assets/img/my_next.png"/></div>
    </div>
    <van-popup v-model="show">
      <div class="model_kefu">
        <div class="title01">{{kefuList.kefu_title}}<br>QQ:{{kefuList.kefu_qq}}</div>
        <div class="title02">{{kefuList.kefu_detail}}</div>
      </div>
      <img :src="kefuList.kefu_portrait"/>
    </van-popup>
    <van-popup v-model="future">
      <div class="model_kefu model_nologin model_skipLogin">
        <p>敬请期待</p>
        <div class="nologin_cancel" @click="future_cancel()">取消</div>
        <div class="nologin_sure" @click="future_cancel()">确定</div>
      </div>
    </van-popup>
     <Footer></Footer>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import { Button, Popup, Toast } from 'vant'
import Footer from '../components/footer.vue'
export default {
  name: 'my',
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    Footer
  },
  data () {
    return {
      userInfoList: {}, // 用户信息
      isVIP: {}, // 判断是否是vip
      playHistoryList: [], // 观看历史列表
      HistoryScrollWidth: '', // 历史记录长度
      show: false, // 隐藏显示客服信息
      nologin: false,
      future: false,// 敬请期待显示框
      kefuList: {} // 客服信息
    }
  },
  mounted () {
    if (localStorage.getItem('uidAtoken') != null) {
      this.getMyPageFun()
      this.nologin = false
    } else {
      this.nologin = true
    }
  },
  methods: {
    // 频道跳转
    goMydianzan (url) {
      if (url == 'mybuyhistory' || url == 'mycache') {
        this.future = true
      } else if (url == 'mysetting') {
        this.$router.push({name: url})
      } else {
        if (localStorage.getItem('uidAtoken') != null) {
          this.$router.push({name: url})
        } else {
          Toast('请重新登录！')
          localStorage.clear()
          this.$router.push({name: 'login'})
        }
      }
    },
    // 获取用户信息getplayhistory
    getMyPageFun () {
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      this.getUserInfoFun(objStr)
      this.getUserHistoryFun(objStr)
    },
    // 获取用户信息
    getUserInfoFun (objStr) {
      let that = this
      IMService.getuserinfo(objStr)
        .then(function (res) {
          console.log(res)
          if (res.code == -1) {
            Toast(res.msg)
            that.nologin = true
          }else{
            that.nologin = false
            that.userInfoList = res.data.userinfo
            that.isVIP = that.userInfoList.vip_info
          }
        })
    },
    // 获取观看历史记录
    getUserHistoryFun (objStr) {
      let that = this
      objStr.page = 1
      objStr.limit = 10
      IMService.getplayhistory(objStr)
        .then(function (res) {
          console.log(res)
          if (res.code == -1) {
            Toast(res.msg)
          } else {
            that.playHistoryList = res.data.list
            that.HistoryScrollWidth = ((that.playHistoryList.length) * 2.37 + 0.1) + 'rem'
          }
        })
    },
    // 影视详情
    toDetailsFun (id) {
      this.$router.push({name: 'details', query: {vodId: id}})
    },
    // 客服
    showPopup () {
      this.show = true
      let that = this
      IMService.getConfig()
        .then(function (res) {
          console.log(res)
          that.kefuList = res.data
        })
    },
    gologinPage () {
      localStorage.clear()
      this.$router.push({name: 'login'})
    },
    // 关闭敬请期待框
    future_cancel () {
      this.future = false
    },
    editInfo () {
      if (this.nologin) {
        localStorage.clear()
        this.$router.push({name: 'login'})
      } else {
        this.$router.push({name: 'myinformationedit'})
      }
    }
  }
}

</script>

<style lang='less' >
  .my{
    width: 100%;
    .my_head{
      position: relative;
      width: 100%;
      height: 320px;
      overflow: hidden;
      .headBG{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
      }
      .head{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 360px;
        background: linear-gradient(to top,rgba(#0D1225, 1),rgba(#0D1225, 0));
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
        .my_name{
          width: 100%;
          text-align: left;
          padding: 16px 44px;
          img{
            width: 32px;
            height: 30px;
          }
          p{padding-left: 50px;}
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
        font-size: 24px;
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
      width: 100%;
      background: #161C2C;
      overflow-x: auto;
      ul{
        padding: 15px 15px 5px 10px;
        li{
          height: 380px;
          margin-left: 25px;
          width: 2.12rem;
        }
        li:first-child{
          margin-right: 0.1rem;
        }
        .tuijian-img,.tuijian-img img{
          height: 280px;
          width: 100%;
        }
        li:nth-child(1) .firstImg{
          transform: scale(1.1);
        }
        .index-tuijian-name{
          margin-top: 15px;
        }
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
