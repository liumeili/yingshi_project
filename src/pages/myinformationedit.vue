<template>
  <div class="edit">
    <div class="edit_head">
      <div class="myImge">
        <img src="../assets/img/my_bg.jpg"/>
        <div class="editImg">更换头像</div>
      </div>
    </div>
    <div class="GOothers">
      <div class="tiaozhuan">昵称</div>
      <div class="tiaozhuan xingbie">性别</div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less">
  .edit{
    width: 100%;
    .edit_head{
      position: relative;
      width: 100%;
      height: 320px;
      margin-top: 85px;
      background-image: url(../assets/img/my_bg.jpg);
      background-size: 100% 100%;
      box-shadow: 0px -100px 80px -10px rgba(13, 18, 37, 1) inset;
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
      }
    }
    .GOothers{
       background: #161C2C;
      .tiaozhuan{
        width: calc(100% - 30px);
        height: 107px;
        color: #C5C5C5;
        line-height: 107px;
        margin: 0 0 0 30px;
        text-align: left;
        border-bottom: 1px solid #3E3F4A;
      }
      .xingbie{
        border-bottom: none;
      }
    }
  }
</style>
