<template>
  <div class="edit">
    <div class="ys-goback" @click="gobackFun()"><span>编辑资料</span></div>
    <div class="saveinfo" @click="saveinfo()">保存</div>
    <div class="edit_head">
      <img src="../assets/img/nopeopleBG.png" class="headBG"/>
      <div class="editBox">
        <div class="myImge">
          <img :src="user_avatar"/>
          <div class="editImg">更换头像</div>
          <input type="file"  class="myEdit-addImgS" @change="tirggerFile($event)"/>
        </div>
      </div>
    </div>
    <div class="GOothers">
      <div class="tiaozhuan">昵称<input type="text" v-model="userName"></div>
      <div class="tiaozhuan xingbie" @click="editSex()">性别<input type="text" v-model="user_sex" readonly="readonly"><img src="../assets/img/moreIcon.png"></div>
    </div>
    <van-popup v-model="sexShow">
      <div class="model_sex">
        <div @click="sexSelect('1')">男</div>
        <div @click="sexSelect('2')">女</div>
      </div>
    </van-popup>
    <van-popup v-model="baocun">
      <div class="model_kefu model_nologin ">
        <span>注意</span>
        <p>编辑资料，确定保存</p>
        <div class="nologin_cancel" @click="baocun_cancel()">取消</div>
        <div class="nologin_sure" @click="baocun_sure()">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
import { IMService } from '../service/RiziServices.js'
import globalState from '@/lib/rizi/globalstate.js'
import { Popup, Toast } from 'vant'
export default {
  name: 'myinformationedit',
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      userName: '', // 用户名
      user_sex: '', // 用户的性别
      user_avatar: '', // 用户头像
      sexShow: false, // 隐藏性别选择
      baocun: false, // 退出页面提示编辑保存
      editChange:0 // 是否改变了资料
    }
  },
  mounted () {
    let userInfo = JSON.parse(localStorage.getItem('loginInfo'))
    this.userName = userInfo.user_name
    this.user_avatar = userInfo.user_avatar
    if (userInfo.user_sex == 1) {
      this.user_sex = '男'
    } else {
      this.user_sex = '女'
    }
    console.log(this.userName)
  },
  methods: {
    editSex () {
      this.sexShow = true
    },
    sexSelect (sex) {
      this.sexShow = false
      console.log(sex)
      if (sex == '1') {
        this.user_sex = '男'
      } else {
        this.user_sex = '女'
      }
      this.editChange = 1
    },
    // 保存修改的信息
    saveinfo () {
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.user_name = this.userName
      objStr.user_avatar = this.user_avatar
      if (this.user_sex == '男') {
        objStr.user_sex = '1'
      } else {
        objStr.user_sex = '2'
      }
      let that = this
      IMService.edituserdata(objStr)
        .then(function (res) {
          console.log(res)
          Toast('保存成功')
          localStorage.removeItem('loginInfo')
          localStorage.setItem('loginInfo', JSON.stringify(res.data.userinfo))
          that.$router.push({name: 'my'})
        })
    },
    // 修改头像
    tirggerFile (event) {
      let that = this
      let uidToken = JSON.parse(localStorage.getItem('uidAtoken'))
      let file = event.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      param.append('uid', uidToken.uid) // 添加form表单中其他数据
      param.append('token', uidToken.token) // 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = { headers: {'Content-Type': 'multipart/form-data'}}
      let path = globalState.serviceBaseUrl + '/index.php?s=App-User-uploadavatar'
      axios.post(path, param, config)
        .then(res => {
          console.log(res)
          that.user_avatar = res.data.data.url
          Toast('上传成功')
          that.editChange = 1
        })
    },
    // 模态框确认和取消
    baocun_sure () {
      this.baocun = false
      this.saveinfo()
    },
    baocun_cancel () {
      this.baocun = false
      this.$router.push({name: 'my'})
    },
    gobackFun () {
      let user_Name = JSON.parse(localStorage.getItem('loginInfo')).user_name
      if(this.userName == user_Name){
        if (this.editChange == 0) {
          this.$router.push({name: 'my'})
        } else {
          this.editChange = 1
          this.baocun = true
        }
      } else {
        this.baocun = true
      }
    }
  }
}
</script>

<style lang="less">
  .ys-goback{
    background: #161C2C;
  }
  .edit{
    width: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: none;
    .saveinfo{
      position: absolute;
      top: 0;
      right: 0;
      width: 120px;
      height: 80px;
      line-height: 85px;
      z-index: 99990;
    }
    .edit_head{
      position: relative;
      width: 100%;
      height: 320px;
      margin-top: 115px;
      box-shadow: 0px -100px 80px -10px rgba(13, 18, 37, 1) inset;
      .headBG{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
      }
      .editBox{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top,rgba(#0D1225, 1),rgba(#0D1225, 0));
        .myImge{
           position: absolute;
           bottom: 60px;
           left: 50%;
           transform: translateX(-50%);
           width: 135px;
           height: 135px;
           border-radius: 50%;
           border: 1px solid #000000;
           overflow: hidden;
           img{
             position: absolute;
             left: 50%;
             top: 50%;
             transform: translate(-50%,-50%);
             height: 100%;
             min-width: 100%;
             border-radius: 13px;
          }
          .editImg{
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 130px;
            height: 45px;
            background: rgba(0, 0, 0, 0.6);
            color: #D5D5D5;
            font-size: 17px;
            text-align: center;
          }
          .myEdit-addImgS{
            position: absolute;
            top: 0;
            left: 0;
            width: 135px;
            height: 135px;
            opacity: 0;
          }
        }
      }

    }
    .GOothers{
       background: #161C2C;
       position: absolute;
       top: 405px;
       width: 100%;
      .tiaozhuan{
        width: calc(100% - 30px);
        height: 107px;
        color: #C5C5C5;
        line-height: 107px;
        margin: 0 0 0 30px;
        text-align: left;
        border-bottom: 1px solid #3E3F4A;
        input{
          margin-left: 100px;
          height: 70px;
          background: #161C2C;
          border: none;

        }
        img{
          float: right;
          height: 35px;
          margin: 36px 35px auto auto;
        }
      }
      .xingbie{
        border-bottom: none;
      }
    }
    .van-overlay{z-index: 99998!important;}
    .van-popup{
      z-index: 99999!important;
      .model_sex{
        width: 520px;
        height: 200px;
        background: #1D202F;
        border-radius: 15px;
        div{
          height: 100px;
          line-height: 100px;
          color: #27FCB9;
        }
        div:hover{
          background: linear-gradient(84deg, #24d9c8, #50d06f);
          border-radius: 15px;
        }
      }
    }
  }
</style>
