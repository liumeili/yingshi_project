<template>
  <div class="login">
    <div class="bg01"></div>
    <div class="bg02"></div>
    <div class="login_contain">
      <div class="login-logo">
        <img src="../assets/img/loginLogo.png" class="login-logoImg">
        <div class="login-logoTitle">黑寡妇影视</div>
      </div>
      <!-- form -->
      <div class="login-form">
        <div class="login-form-input">
          <span class="login-form-span">手机号</span>
          <van-field v-model="formData.phone" type='tel' maxlength="11" placeholder="请输入手机号码" />
        </div>
        <div class="login-form-input">
          <span class="login-form-span">验证码</span>
          <van-field v-model="formData.code" placeholder="请输入验证码" />
        </div>
        <span class="login-form-code" @click="clickCodeFun()" v-if="showTime==false">获取验证码</span>
        <span class="login-form-code" v-if="showTime==true">{{times}} s</span>
        <!-- button -->
        <div class="login-form-btn" @click="phoneCodeLoginFun()">登录</div>
      </div>
    </div>
    <div class="Notice" v-if="noticeShow">
      <div class="Notice_word">
        <p>{{configInfo.system_informs}}</p>
      </div>
      <div class="Notice_button" @click="closeNotice()">我知道了</div>
    </div>
    <div class="NoticeShadow" v-if="noticeShow"></div>
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import {Toast, Button, Field } from 'vant'
import md5 from 'js-md5'
export default {
  name: 'login',
  components: {
    [Button.name]: Button,
    [Field.name]: Field
  },
  data () {
    return {
      formData: {
        phone: '',
        code: '',
        client_type: 2
      },
      times: 60,
      showTime: false,
      configInfo: {},
      noticeShow: false
    }
  },
  created () {
  },
  mounted () {
    let that = this
    IMService.getConfig()
      .then(function (res) {
        that.configInfo = res.data
        console.log(res)
        if (that.configInfo.system_informs_state == 1) {
          setTimeout(() => {
            that.noticeShow = true
          }, 1000)
        }
      })
  },
  methods: {
    // 点击获取验证码
    clickCodeFun () {
      let phone = this.formData.phone
      let regMobile = /^1[345789]\d{9}$/
      if (phone == '') {
        Toast('请输入的手机号码')
      } else if (!regMobile.test(phone)) {
        Toast('输入的手机号码格式不正确')
      } else {
        this.regSendCodeFun(phone)
      }
    },
    // 获取验证码
    regSendCodeFun (phone) {
      let that = this
      IMService.regSendCode({ phone: phone, sign: md5('mobile=' + phone + '&wuxhsgttaucchhww')})
        .then(function (res) {
          console.log(res)
          Toast(res.msg)
          if (res.code == 0) {
            that.showTime = true
            let timer = setInterval(function () {
              that.times -= 1
              if (that.times == 0) {
                that.showTime = false
                that.times = 60
                clearInterval(timer)
              }
            }, 1000)
          }
        })
    },

    // 登录
    phoneCodeLoginFun () {
      let that = this
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        alert('微信')
        this.formData.client_type = 4
      } else {
        var system = {
          win: false,
          mac: false,
          xll: false
        }
        // 检测平台
        var p = navigator.platform
        system.win = p.indexOf('Win') == 0
        system.mac = p.indexOf('Mac') == 0
        system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0)
        // 跳转语句，如果是手机访问就自动跳转到页面
        if (system.win || system.mac || system.xll) {
          this.formData.client_type = 1
        } else {
          var u = navigator.userAgent
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
          if (isAndroid) {
            this.formData.client_type = 1
          }
          if (isIOS) {
            this.formData.client_type = 3
          }
        }
      }
      let regMobile = /^1[345789]\d{9}$/
      if (this.formData.phone == '') {
        Toast('请输入的手机号码')
      } else if (!regMobile.test(this.formData.phone)) {
        Toast('输入的手机号码格式不正确')
      } else if (this.formData.code == '') {
        Toast('请输入验证码')
      } else {
        IMService.phoneCodeLogin(this.formData)
          .then(function (res) {
            if (res.code == 0) {
              let uidAtoken = {uid: res.data.user_id, token: res.data.user_token}
              localStorage.setItem('uidAtoken', JSON.stringify(uidAtoken))
              localStorage.setItem('loginInfo', JSON.stringify(res.data))
              localStorage.setItem('isLogin', 1)
              that.$router.push({name: 'index'})
              Toast(res.msg)
            } else {
              Toast(res.msg)
            }
          })
      }
    },
    // 关闭系统通知
    closeNotice () {
      this.noticeShow = false
    }
  }

}
</script>

<style lang='less' >
  .ys-goback{
    background: none;
  }
 .bg01{
    position: absolute;
    top: -3rem;
    left: -1rem;
    width: 150%;
    height: 150%;
    background-image: url(../assets/img/login_bg01.png);
    background-size: 160% 160%;
    background-position: center;
    animation:bgDonghua 15s linear infinite;
    z-index: 10;
 }
 @keyframes bgDonghua {
    0% {
         top: -3rem;
        left: -1rem;
    }
    10% {
      top: -2rem;
      left: -1rem;
    }
    20% {
      top: -1rem;
      left: -1rem;
    }
    30% {
      top: -2rem;
      left: -1.5rem;
    }
    40% {
      top: -3rem;
      left: -2rem;
    }
    50% {
      top: -3rem;
      left: -1.5rem;
    }
    60% {
        top: -3rem;
      left: -1rem;
    }
    70% {
        top: -3.7rem;
      left: -0.5rem;
    }
    80% {
        top: -4.2rem;
      left: 0rem;
    }
    90% {
        top: -3.5rem;
      left: -0.5rem;
    }
    100% {
        top: -3rem;
      left: -1rem;
    }
 }
 .bg02{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login_bg02.png);
    background-size: cover;
    z-index: 100;
 }
 .login_contain{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
 }

  .login{
    position: relative;
    width: 100%;
    height: 1600px;
    overflow: hidden;
    .ys-goback{
      background: none!important;
    }
    .login-logo{
        font-size: 36px;
        text-align:center;
        margin-top:100px;
       .login-logoImg{
         width: 184px;
         height: 184px;
         border-radius: 50%;
       }
       .login-logoTitle{
         margin-top:10px;
       }
    }
    .van-cell{
      width: 530px;
      padding: 18px 40px;
      background-color: #4C4E63;
      color: #fff;
      border-radius: 70px;
      font-size: 32px;
      margin:20px auto;
    }
    .van-field__control{
      color: #fff;
    }
     /* 输入信息 */
    .login-form{
      position: relative;
      margin-top:60px;
       .login-form-input{
         margin-bottom:40px;
          .login-form-span{
            display: block;
            width: 510px;
            padding:0 40px;
            color: #9B9B9B;
            font-size: 36px;
            margin:0 auto;
            text-align: left;
          }
       }
       .login-form-code{
           position: absolute;
           right: 125px;
           bottom:180px;
           font-size: 28px;
           display: block;
           border-left:2px solid #27FCB9;
           padding: 8px 20px;
           color: #27FCB9;
           width: 155px;
        }
      /* 登录 */
       .login-form-btn{
         width: 530px;
         padding: 25px 0;
         background: linear-gradient(to right,#24D9C8,#50D06F);
         border-radius: 60px;
         margin:70px auto 0 auto;
       }

    }
  }
  .Notice{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
    height: 665px;
    z-index: 99999;
    background-image: url(../assets/img/noticeBG.png);
    background-position: center;
    background-size: 100% 100%;
    .Notice_word{
      width: 450px;
      height: 248px;
      margin: auto;
      margin-top: 280px;
      text-align: left;
      line-height: 42px;
      font-size: 28px;
      color: #8C8E9A;
      overflow-y: auto;
    }
    .Notice_button{
      width: 320px;
      padding: 20px 0;
      background: linear-gradient(to right,#24D9C8,#50D06F);
      border-radius: 60px;
      margin:25px auto 0 auto;
    }
  }
  .NoticeShadow{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99998;
    background: rgba(0,0,0,0.6);
  }
</style>
