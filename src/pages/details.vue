<template>
  <div class="details"> 
           <div class="ys-goback" @click="gobackFun()"><span>{{details.vod_name}}</span></div>
           <!-- 影片基本信息 -->
          <div class="detais-abstract">
             <div class="details-infoImg"><img :src="details.vod_pic"></div>
             <div class="details-rg">
                <div class="details-vodname">{{details.vod_name}}</div>
                <div class="details-vodyear">年代：{{details.vod_year}}</div>
                <div class="details-version">导演：{{details.vod_director}}</div>
                <div class="details-ji">更新至第4集/共37集</div>
                <div class="details-actor"><span>主演：{{details.vod_actor}}</span><!--<span>展开</span>--></div>
                <div class="details-play" @click="playFun()">立即播放</div>
             </div>
          </div>
          <!-- 简介 -->
          <div class="details-jjie">
            <div>{{details.vod_content}}</div>
            <span>展开</span>
          </div>

          <!-- 集数 -->
          <div class="details-num"> 
            <div class="details-num-title">                              
              <span>剧集</span>
              <span>来源：风行</span>
            </div>

            <div class="details-num6" v-if="allNum==false">
              <ul class="details-num-ul">
                <li class="details-numLiHover">1</li>
                <li @click="selectedNumCLick()">2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <div class="clearBoth"></div>
              </ul>
              <img src="../assets/img/moreyd.png" class="details-num-more" @click="allNum=true">
            </div>
            <!-- 全部集数 -->
            <div class="details-numAll" v-if="allNum==true">
              <div class="details-numAll-tab">
                <span style="color:#27FCB9;">1-30</span>
                <span>30-60</span>
                <span>61-90</span>
              </div>
              <ul class="details-num-ul">
                <li class="details-numLiHover">1</li>
                <li @click="selectedNumCLick()">2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <div class="clearBoth"></div>
              </ul>
            </div>

          </div>


         
          <!-- 热播 -->
          <div class="details-hots">
            <div class="index-titleLine">
              <span>热播</span>
            </div>
            <div class="index-tuijian" v-if="hotsList.length>0">
              <ul>
                <li v-for="(item,index) in hotsList" :key="index" @click="toDetailsFun(item.vod_id)">
                    <div class="tuijian-img"><img :src="item.vod_pic" ></div>
                    <div class="index-tuijian-name">{{item.vod_name}}</div>
                    <div class="index-tuijian-dec">{{item.vod_content}}</div>
                </li>
                <div class="clearBoth"></div>
              </ul>
            </div>
            <div class="pingdaoNodata" v-if="hotsList.length<1">
              <img src="../assets/img/nodata.png">
              <div>暂无数据</div>
            </div>
          </div>


          <!--弹框  -->
          <van-popup v-model="tipShow" round class="details-popup">
              <div class="details-popupDiv">
                  <div class="details-popupDiv2">
                     <img src="../assets/img/kuFace.png" class="details-popupkuFace">
                     <img src="../assets/img/close.png" class="details-popupClose" @click="tipShow=false">
                     <div class="details-popupText">可看次数不足，可选择一下获取方式</div>
                     <div class="details-popupBtn">
                       <span>分享</span>
                       <span>充值</span>
                     </div>
                  </div>
              </div>
          </van-popup>

  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import {Tab, Tabs,Popup} from 'vant';
export default {
  name: 'details',
  components:{
     [Tab.name]: Tab,
     [Tabs.name]: Tabs,
     [Popup.name]:Popup,
  },
  data () {
    return {
      vodId:'', // 影视id
      details:{},  //影视详情
      allNum:false,  //是否展示全部集数
      hotsList:[],  //热播
      tipShow:false,  //弹框展示
    }
  },
  created(){
    this.vodId=this.$route.query.vodId;
  },
  mounted(){
     this.getmoviedetailFun();
    
  },
  methods:{
    gobackFun(){
       this.$router.go(-1);
     },

    //  获取影视详情
    getmoviedetailFun(){
       let that=this;
       let objStr=JSON.parse(localStorage.getItem('uidAtoken'));
       objStr.vod_id=this.vodId;
       IMService.getmoviedetail(objStr)
         .then(function(res){
            console.log('获取影视详情');
            console.log(res);
            that.details=res.data;
            that.hotsList=res.data.other;
         })
    },

    // 展示全部集数
    selectedNumCLick(){
       this.allNum=false;
    },

    // 立即播放
    playFun(){
       this.tipShow=true;
    },
    
  }
}
</script>

<style lang='less'>
  .details{
    //影片基本信息
    .detais-abstract{
        display: flex;
        padding: 20px;
        margin-top:90px;
       .details-infoImg{
          position: relative;
          width: 270px;
          height: 366px;
          border-radius: 13px;
          overflow: hidden;
          img{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            height: 100%;
            border-radius: 13px;
          }
       }
       .details-rg{
         width:410px;
         text-align: left;
         margin-left: 20px;
         font-size: 28px;
         .details-vodname{
           font-size: 34px;
         }
         .details-vodyear,.details-version,.details-ji{
           margin-top:10px;
         }
         .details-actor{
           margin-top:10px;
         }
         .details-play{
            background: #1D202F;
            font-size: 26px;
            color: #27FCB9;
            border-radius: 15px;
            padding:17px 0;
            width:180px;
            text-align: center;
            margin-top:20px;
         }
       }
      
    }

    // 简介
    .details-jjie{
      padding: 0 25px;
      position: relative;
      div{
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 24px;
        color: #9D9D9D;
      }
      span{
        position: absolute;
        background: #0D1225;
        display: block;
        width: 120px;
        padding-left: 8px;
        text-align: left;
        color: #27FCB9;
        bottom:-2px;
        right: 20px;
        font-size: 26px;
      }
    }

    // 集数
    .details-num{
        background: #161C2C;
        margin-top:25px;
        position: relative;
        .details-num-title{
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 25px;
           border-bottom: 1px solid #252633;
        }
        .details-num-ul{
          padding-bottom: 20px;
          li{ 
            float: left;
            width: 82.7px;
            padding:20px 0;
            background: #0D1225;
            margin-left: 25px;
            margin-top:20px;
          }
          .details-numLiHover{
            background: none;
            color:#27FCB9;
            margin-left: 10px;
          }
          
        }
        .details-num-more{
          width: 32px;
          height: 32px;
          position: absolute;
          bottom: 40px;
          right: 45px;
        }
        .details-numAll{
           .details-numAll-tab{
             padding-top: 20px;
             display: flex;
             span{
               width: 150px;
               padding: 18px 0;
               text-align: center;
               background: #0D1225;
               display: block;
               border-radius: 50px;
               margin-left: 20px;
               color: #9D9D9D;
             }
           } 
        }
    }
      
    // 无数据
    .pingdaoNodata{
      margin-top:30px;
      img{
        width: 278px;
        height: 313px;
      }
      div{
        text-align: center;
        color: #27FCB9;
        font-size: 34px;
        margin-top:10px;
      }
    }

    // 弹框
    .details-popup{
      background: none!important;
      .details-popupDiv{
          background: none!important;
          padding: 100px 50px 0 50px; 
         .details-popupDiv2{
            width:450px;
            height: 300px;
            position: relative;
            background: #1D202F;
            border-radius: 15px;
            .details-popupkuFace{
              width: 157px;
              height: 157px;
              position: absolute;
              top:-80px;
              left: 170px;
            }
            .details-popupClose{
               width: 37px;
               height:37px;
               position: absolute;
               right: -13px;
               top: -15px;
            }
            .details-popupText{
              padding:100px 40px 40px 40px;
            }
            .details-popupBtn{
              display: flex;
              align-items: center;
               span{
                 width: 50%;
                 display: block;
                 padding: 20px 0;
               }
               span:nth-child(1){
                 background: #090F1D;
                 border-bottom-left-radius: 15px;
               }
               span:nth-child(2){
                 background:linear-gradient(to right,#24D9C8,#50D06F);
                 border-bottom-right-radius: 15px;
               }
            }
         }
      }
      
    }

    

  }
 
</style>
