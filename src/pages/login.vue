<template>
  <div class="login">
    <div class="bg01"></div>
    <div class="bg02"></div>
    <div class="login_contain">
      <div class="login-logo">
        <img src="../assets/img/test.png" class="login-logoImg">
        <div class="login-logoTitle">视频直播</div>
      </div>

      <!-- form -->
      <div class="login-form">
        <div class="login-form-input">
          <span class="login-form-span">手机号</span>
          <van-field v-model="formData.phone" placeholder="请输入手机号码" />
        </div>
        <div class="login-form-input">
          <span class="login-form-span">验证码</span>
          <van-field v-model="formData.code" placeholder="请输入验证码" />
          <span class="login-form-code">{{codeText}}</span>
        </div>
        <!-- button -->
        <div class="login-form-btn">登录</div>
      </div>
    </div>

  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import { Button,Field } from 'vant';
export default {
  name: 'login',
  components:{
     [Button.name]: Button,
     [Field.name]: Field,
  },
  data () {
    return {
      formData:{
        phone:'',
        code:'',
      },
      codeText:'获取验证码'
    }
  },
  created(){},
  mounted(){
    IMService.testapp()
      .then(function(res){
          console.log(res);
      })
  },
   methods:{

   }

}
</script>

<style lang='less' >
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
 	position: absolute;
 	top: 0;
 	width: 100%;
 	height: 100%;
  z-index: 99999;
 }
	.ys-goback{
		background: none!important;
	}
  .login{
    position: relative;
    width: 100%;
    height: 1600px;
    overflow: hidden;
    .login-logo{
        font-size: 36px;
        text-align:center;
        margin-top:100px;
       .login-logoImg{
         width: 184px;
         height: 184px;
       }
       .login-logoTitle{
         margin-top:10px;
       }
    }
    .van-cell{
      width: 530px;
      padding: 18px 40px;
      background: #4C4E63;
      color: #fff;
      border-radius: 70px;
      font-size: 32px;
      margin:20px auto;
    }
    // 输入信息
    .login-form{
      margin-top:60px;
       .login-form-input{
         margin-bottom:40px;
         position: relative;
          .login-form-span{
            display: block;
            width: 510px;
            padding:0 40px;
            color: #9B9B9B;
            font-size: 36px;
            margin:0 auto;
            text-align: left;
          }
          .login-form-code{
             position: absolute;
             right: 125px;
             bottom:8px;
             font-size: 30px;
             display: block;
             border-left:2px solid #27FCB9;
             padding: 8px 20px;
             color: #27FCB9;
             width: 150px;
          }
       }
      //  登录
       .login-form-btn{
         width: 530px;
         padding: 25px 0;
         background: linear-gradient(to right,#24D9C8,#50D06F);
         border-radius: 60px;
         margin:70px auto 0 auto;
       }

    }
  }

</style>
