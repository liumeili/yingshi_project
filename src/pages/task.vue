<template>
  <div class="task">
    <div class="task_title">任务
      <img src="../assets/img/task_renwu.png" @click="goHelpPage('sharelist')"/>
    </div>
    <div class="ALLscrollOne">
      <div class="buyvip_head">
        <img :src="userInfo.user_avatar" class="headBG" v-if="nologin"/>
        <img src="../assets/img/nopeopleBG.png" class="headBG" v-if="!nologin"/>
        <div class="buyvip_head_hei">
          <div class="touxiang">
            <div class="myImge" @click="editInfo()">
              <img :src="userInfo.user_avatar" v-if="nologin" class="myImge_pic"/>
              <img src="../assets/img/nopeople.png" v-if="!nologin"/>
            </div>
          </div>
          <div class="vipInfo">
            <span v-if="nologin">{{userInfo.user_name}}<br></span>
            <p v-if="!nologin" @click="gologinPage()">未登录</p>
            <span class="openqx" v-if="vipInfo.is_vip == 0" @click="goHelpPage('mybuyvip')">开通VIP享受无限次下载</span>
            <span class="openqx" v-if="vipInfo.is_vip == 1">已为你开启所有权限</span>
            <img src="../assets/img/my_novip.png" v-if="vipInfo.is_vip == 0" @click="goHelpPage('mybuyvip')"/>
            <img src="../assets/img/my_vip.png" v-if="vipInfo.is_vip == 1"/>
          </div>
          <img src="../assets/img/my_vip_bangzhu.png" class="bangzhu" @click="goHelpPage('help')"/>
          <div class="buyvip_title">共分享{{userInfo.user_total_share_num}}&nbsp;享有特权</div>
        </div>
      </div>
      <div class="timesBlock">
        <ul class="times">
          <li>
            <img src="../assets/img/my_vip_yanjing.png"/>
            <div>观看次数<p>{{shareList.watch_time_str}}</p></div>
          </li>
          <li>
            <img src="../assets/img/my_vip_xiazai.png"/>
            <div>下载次数<p>{{shareList.donwload_time_str}}</p></div>
          </li>
        </ul>
      </div>
      <div class="level">
        <van-progress :percentage="levelDetail.share_num =='0'?100:(userInfo.user_level_share_num/levelDetail.share_num)*100" stroke-width="4" v-if="userInfo.user_level_share_num"/>
        <p v-if="levelDetail.next_level_detail">等级{{levelDetail.level}}&nbsp;
          <span v-if="levelDetail.share_num != '0'">下一级&nbsp;等级{{levelDetail.next_level_detail.level}}</span>
          <span v-if="levelDetail.share_num == '0'">恭喜您已满级</span>
        </p>
        <span class="level_times" v-if="levelDetail.share_num != '0'">分享{{userInfo.user_level_share_num}}/{{levelDetail.share_num}}</span>
      </div>
      <div class="clearBoth"></div>
      <div class="ToPromote">
        <div class="index-titleLine"><span>推广链接</span></div>
        <img :src="shareList.share_code_base64"/>
        <div class="btn">
          <button>长按二维码保存</button>
          <button class="code" :data-clipboard-text="shareList.share_url"  @click="copyFun">复制链接</button>
        </div>
        <div class="shareInfo">
          <span>分享说明</span>
          <p v-html="pTXT">{{pTXT}}
          </p>
        </div>
      </div>
    </div>
    <van-popup v-model="downAPP">
      <div class="model_kefu model_nologin model_skipLogin">
        <p>是否下载APP</p>
        <div class="nologin_cancel" @click="future_cancel(1)">取消</div>
        <div class="nologin_sure" @click="future_cancel(2)">确定</div>
      </div>
    </van-popup>
    <Footer></Footer>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import { Toast, Button, Progress, Popup } from 'vant'
import Footer from '../components/footer.vue'
import Clipboard from 'clipboard'
export default {
  name: 'task',
  components: {
    [Button.name]: Button,
    [Progress.name]: Progress,
    [Popup.name]: Popup,
    Footer
  },
  data () {
    return {
      shareList: {}, // 页面信息
      userInfo: {}, // 用户信息
      vipInfo: {}, // 用户VIP信息
      levelDetail: {}, // 用户等级信息
      pTXT: '',
      nologin: false,
      nopeople: '../assets/img/nopeople.png',
      downloadUrl:'',
      downAPP:false
    }
  },
  mounted () {
    if (localStorage.getItem('uidAtoken') != null) {
      this.getshareInfo()
      this.nologin = true
    } else {
      Toast('请重新登录!')
      this.nologin = false
    }
  },
  methods: {
    // 跳转至帮助页面
    goHelpPage (url) {
      if(url == 'mybuyvip'){
        this.downAPP = true
        let that = this
        IMService.getConfig()
          .then(function (res) {
            var u = navigator.userAgent
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            if (isAndroid) {
            	that.downloadUrl = res.data.android_download_url
            }
            if (isIOS) {
            	that.downloadUrl = res.data.ios_download_url
            }
          })
      }else{
        if (localStorage.getItem('uidAtoken') != null) {
          if (this.nologin) {
            this.$router.push({name: url})
          } else {
            Toast('请重新登录!')
          }
        } else {
          Toast('请重新登录!')
        }
      }
    },
    getshareInfo () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      IMService.getsharedetail(objStr)
        .then(function (res) {
          console.log(res)
          if (res.code == -1) {
            Toast(res.msg)
            that.nologin = false
          } else {
            that.nologin = true
            that.shareList = res.data.info
            that.userInfo = that.shareList.user_info
            that.vipInfo = that.shareList.vip_info
            that.levelDetail = that.shareList.level_detail
            that.pTXT = that.shareList.share_introduce.replace(/\s/g, '<br/>')
          }
        })
    },
    // 复制链接
    copyFun () {
      var clipboard = new Clipboard('.code')
      clipboard.on('success', e => {
        console.log('复制成功', e.text)
        Toast('复制成功,快去邀请好友吧！')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        Toast('手机权限不支持复制功能')
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    gologinPage () {
      localStorage.clear()
      this.$router.push({name: 'login'})
    },
    editInfo () {
      if (!this.nologin) {
        localStorage.clear()
        this.$router.push({name: 'login'})
      }
    },
    // 关闭下载app提示框
    future_cancel (i) {
      if (i == 2) {
        window.location.href = this.downloadUrl
      }
      this.downAPP = false
    }
  }
}
</script>

<style lang='less'>
  .task{
    .task_title{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 88px;
      background: #161C2C;
      font-size: 40px;
      color: #D5D5D5;
      line-height: 88px;
      z-index: 10;
      img{
        position: absolute;
        right: 30px;
        top: 19px;
        width: 46px;
        height: 50px;
        opacity: 0.8;
      }
    }
    .buyvip_head{
      position: relative;
      width: 100%;
      height: 320px;
      box-shadow: 0px -60px 60px -10px rgba(13, 18, 37, 1) inset;
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
        height: 100%;
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
          p{
            padding-top: 20px;
          }
          .openqx{
            float: left;
            font-size: 21px;
          }
          img{
            float: left;
            width: 33px;
            height: 30px;
            margin: 5px 9px;
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
    .timesBlock{
      position: relative;
      width: 100%;
      height: 190px;
      .times{
        position: absolute;
        width: 571px;
        left: 0;
        top: -50px;
        margin-left: 55px;
        text-align: left;
        border-radius:10px;
        background:rgba(22,28,44,1);
        padding: 50px 30px;
        li{
          float: left;
          width: calc(100%/2);
          height: 104px;
          img{
            float: left;
            width: 104px;
            height: 104px;
            padding-left: 20px;
          }
          div{
            float: left;
            width: calc(100% - 140px);
            padding: 15px 0 15px 15px;
            font-size: 26px;
          }
        }
      }
    }
    .level{
      width: 631px;
      margin: 0 auto 0 auto;
      text-align: left;
      font-size: 24px;
      line-height: 60px;
      .van-progress{
        width: 100%;
        .van-progress__portion{background: #27FCB9;}
        .van-progress__pivot{display: none;}
      }
      p{
        float: left;
      }
      .level_times{
        float: right;
      }
    }
    .ToPromote{
      width: 100%;
      margin-bottom: 10px;
      background: #161C2C;
      img{
        width: 340px;
        height: 340px;
        margin: auto;
      }
      .btn{
        padding-top: 20px;
        button{
          border: none;
          width: 250px;
          height: 80px;
          background:linear-gradient(84deg,rgba(36,217,200,1),rgba(80,208,111,1));
          border-radius:50px;
          color: #fff;
          font-size: 30px;
        }
        button:last-child{
          margin-left: 50px;
        }
      }
      .shareInfo{
        padding: 50px 30px 25px 30px;
        text-align: left;
        font-size: 24px;
      }
    }
  }
</style>
