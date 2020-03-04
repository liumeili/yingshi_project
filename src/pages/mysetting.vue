<template>
  <div class="setting">
    <div class="GOothers">
      <div class="setcont">APP版本号<div class="setNum">v1.0.60</div></div>
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
import { Popup } from 'vant'
export default {
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
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
