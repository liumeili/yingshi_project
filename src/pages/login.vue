<template>
  <div class="login">  
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
  .login{
    
    .login-logo{ 
        font-size: 36px;
        text-align:center;
        margin-top:50px;
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
             top:90px;
             font-size: 30px;
             display: block;
             border-left:3px solid #27FCB9;
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
