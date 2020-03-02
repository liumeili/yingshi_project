<template>
  <div class="task">
    <div class="task_title">任务
      <img src="../assets/img/task_renwu.png"/>
    </div>
    <div class="buyvip_head">
      <img :src="userInfo.user_avatar" class="headBG"/>
      <div class="buyvip_head_hei">
        <div class="touxiang">
          <div class="myImge"><img :src="userInfo.user_avatar"/></div>
        </div>
        <div class="vipInfo">
          <span>用户：{{userInfo.user_name}}</span><br>
          <span class="openqx" v-if="vipInfo.is_vip == 0" @click="goMydianzan('mybuyvip')">开通VIP享受无限次下载</span>
          <span class="openqx" v-if="vipInfo.is_vip == 1">已为你开启所有权限</span>
          <img src="../assets/img/my_novip.png" v-if="vipInfo.is_vip == 0" @click="goMydianzan('mybuyvip')"/>
          <img src="../assets/img/my_vip.png" v-if="vipInfo.is_vip == 1"/>
        </div>
        <img src="../assets/img/my_vip_bangzhu.png" class="bangzhu" @click="goHelpPage('help')"/>
        <div class="buyvip_title">共分享{{userInfo.user_level_share_num}}&nbsp;享有特权</div>
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
      <van-progress :percentage="(userInfo.user_level_share_num/levelDetail.share_num)*100" stroke-width="4" v-if="userInfo.user_level_share_num"/>
      <span v-if="levelDetail.next_level_detail">等级{{levelDetail.level}}&nbsp;下一级&nbsp;等级{{levelDetail.next_level_detail.level}}</span>
      <span class="level_times">分享{{userInfo.user_level_share_num}}/{{levelDetail.share_num}}</span>
    </div>
    <div class="ToPromote">
      <div class="index-titleLine"><span>推广链接</span></div>
      <img :src="shareList.share_code_base64"/>
      <div class="btn">
        <button @click="savePicture()">保存相册</button>
        <button class="code" :data-clipboard-text="shareList.share_url"  @click="copyFun">复制链接</button>
      </div>
      <div class="shareInfo">
        <span>分享说明</span>
        <p v-html="pTXT">{{pTXT}}
        </p>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import { Toast, Button, Progress } from 'vant'
import Footer from '../components/footer.vue'
import Clipboard from 'clipboard'
export default {
  name: 'task',
  components: {
    [Button.name]: Button,
    [Progress.name]: Progress,
    Footer
  },
  data () {
    return {
      shareList: {}, // 页面信息
      userInfo: {}, // 用户信息
      vipInfo: {}, // 用户VIP信息
      levelDetail: {}, // 用户等级信息
      pTXT: ''
    }
  },
  mounted () {
    this.getshareInfo()
  },
  methods: {
    // 跳转至帮助页面
    goHelpPage (url) {
      this.$router.push({name: url})
    },
    getshareInfo () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      IMService.getsharedetail(objStr)
        .then(function (res) {
          console.log(res)
          that.shareList = res.data.info
          that.userInfo = that.shareList.user_info
          that.vipInfo = that.shareList.vip_info
          that.levelDetail = that.shareList.level_detail
          that.pTXT = that.shareList.share_introduce.replace(/\s/g, '<br/>')
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
    // 频道跳转
    goMydianzan (url) {
      this.$router.push({name: url})
    },
    savePicture () {
      let picurl = this.shareList.share_code_base64
      let picname = '_downloads/erwei.png'
      var dtask = plus.downloader.createDownload(picurl, {}, function (d, status) {
        // 下载完成
        if (status == 200) {
          plus.gallery.save(picname, function () {
            mui.toast('已保存到手机相册')
          }, function () {
            mui.toast('保存失败，请重试！')
          })
        } else {
          alert('Download:' + status)
        }
      })
      dtask.start() // 开始下载
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
      margin-top: 88px;
      background-image: url(../assets/img/my_bg.jpg);
      background-size: 100% 100%;
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
            padding: 15px;
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
      .level_times{
        float: right;
      }
    }
    .ToPromote{
      width: 100%;
      margin-bottom: 120px;
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
          color: #000000;
          font-size: 34px;
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
