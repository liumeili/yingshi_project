<template>
  <div class="setting">
    <!-- <div class="GOothers">
      <div class="setcont">APP版本号<div class="setNum">v0.{{versionNum}}版本</div></div>
    </div> -->
    <div @click="loginOut()" class="loginOut OutBTN">{{nologin == false?"退出登录":"登录"}}</div>

    <van-popup v-model="skipLogin">
      <div class="model_kefu model_nologin model_skipLogin">
        <p>是否退出重新登录?</p>
        <div class="nologin_cancel" @click="nologin_cancel()">取消</div>
        <div class="nologin_sure" @click="gologinPage()">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import {IMService} from '@/service/RiziServices.js'
import { Popup } from 'vant'
export default {
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      nologin: false,
      skipLogin: false,
      // versionNum: '',
      versionList: {},
      appUrl: ''
    }
  },
  mounted () {
    if (localStorage.getItem('uidAtoken') != null) {
      this.nologin = false
    } else {
      this.nologin = true
    }
    this.getVersionFun()
  },
  methods: {
    loginOut () {
      if (this.nologin) {
        this.skipLogin = false
        localStorage.clear()
        this.$router.push({name: 'login'})
      } else {
        this.skipLogin = true
      }
    },
    nologin_cancel () {
      this.skipLogin = false
    },
    gologinPage () {
      this.skipLogin = false
      localStorage.clear()
      this.$router.push({name: 'login'})
    },
    //根据ios和android下载app
    // getVersionFun () {
    //   let that = this
    //   IMService.getConfig()
    //     .then(function (res) {
    //       console.log(res)
    //       that.versionList = res.data
    //       var u = navigator.userAgent
    //       var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    //       var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    //       if (isAndroid) {
    //       	that.versionNum = that.versionList.android_version
    //       }
    //       if (isIOS) {
    //       	that.versionNum = that.versionList.ios_version
    //       }
    //     })
    // }
  }
}
</script>

<style lang="less">
  .setting{
    width: 100%;
    padding-top: 85px;
    .GOothers{
       background: #161C2C;
       margin-top: 20px;
      .setcont{
        width: calc(100% - 30px);
        height: 107px;
        background: #161C2C;
        color: #C5C5C5;
        font-size: 36px;
        line-height: 107px;
        margin: 0 0 0 30px;
        text-align: left;
        border-bottom: 1px solid #3E3F4A;
        .setNum{
          float: right;
          line-height: 107px;
          margin-right: 35px;
        }
        .van-switch{
          float: right;
          width: 69px;
          height: 33px;
          margin: 34px 19px auto auto;
          .van-switch__node{
             width: 33px;
            height: 33px;
          }
        }
        .van-switch--on .van-switch__node {
            transform: translateX(35px);
        }
        img{
          float: right;
          width: 27px;
          height: 27px;
          margin: 40px 31px auto auto;
        }
      }
      .setcont:last-child{
        border-bottom: none;
      }
    }
    .OutBTN{
      position: fixed;
      bottom: 50px;
    }
  }
</style>
