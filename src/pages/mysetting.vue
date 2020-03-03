<template>
  <div class="setting">
    <!-- <div class="GOothers">
      <div class="setcont">清除应用缓存<div class="setNum">300.86MB</div></div>
      <div class="setcont">允许非WIFI下载
        <div class="setNum" v-if="wifi_checked==true">开启</div>
        <div class="setNum" v-if="wifi_checked==false">关闭</div>
        <van-switch :value="wifi_checked" @input="wifi_onInput" active-color="#27FCB9" inactive-color="#AEAEAE"/>
      </div>
    </div>
    <div class="GOothers">
      <div class="setcont">提示完成音
        <div class="setNum" v-if="voice_checked==true">开启</div>
        <div class="setNum" v-if="voice_checked==false">关闭</div>
        <van-switch :value="voice_checked" @input="voice_onInput" active-color="#27FCB9" inactive-color="#AEAEAE"/>
      </div>
      <div class="setcont">消息通知
        <div class="setNum" v-if="news_checked==true">开启</div>
        <div class="setNum" v-if="news_checked==false">关闭</div>
        <van-switch :value="news_checked" @input="news_onInput" active-color="#27FCB9" inactive-color="#AEAEAE"/>
      </div>
    </div> -->
    <div class="GOothers">
      <div class="setcont">APP版本号<div class="setNum">v1.0.60</div></div>
      <div class="setcont">法律文件<img src="../assets/img/my_next.png"/></div>
      <div class="setcont">关于我们<img src="../assets/img/my_next.png"/></div>
    </div>
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
import { Switch, Popup } from 'vant'
export default {
  components: {
    [Switch.name]: Switch,
    [Popup.name]: Popup
  },
  data () {
    return {
      wifi_checked: true,
      voice_checked: true,
      news_checked: true,
      nologin: false,
      skipLogin: false
    }
  },
  mounted () {
    if (localStorage.getItem('uidAtoken') != null) {
      this.nologin = false
    } else {
      this.nologin = true
    }
  },
  methods: {
    wifi_onInput (checked) {
      this.wifi_checked = checked
    },
    voice_onInput (checked) {
      this.voice_checked = checked
    },
    news_onInput (checked) {
      this.news_checked = checked
    },
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
    }
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
