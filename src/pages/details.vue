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
            <div class="details_txt" id="details_txt">{{details.vod_content}}</div>
            <span @click="openCont()" id="zhankai">展开</span>
          </div>

          <!-- 集数 -->
          <div class="details-num">
            <div class="details-num-title">
              <span>剧集</span>
              <div @click="xianluOpen()">来源：<span>{{xianluName}}</span></div>
              <div class="xianlu" v-if="xianluStaus">
                <div v-for="(item,key,index) in xianluList" :key="index" @click="xianluSelect(item.player_name_zh,index,key)">{{item.player_name_zh}}</div>
              </div>
            </div>
            <div class="details-num6" v-if="allNum==false">
              <ul class="details-num-ul">
                <li v-for="(item, index) in jilist" :key="index" @click="selectedNumCLick(index)" :class="{'details-numLiHover':jishuOne==index}" v-if="index<6">
                  {{item.title[0]=="第"?item.title.substring(1,item.title.length-1):item.title}}
                </li>
                <div class="clearBoth"></div>
              </ul>
              <img src="../assets/img/moreyd.png" class="details-num-more" @click="allNum=true" v-if="allmore">
            </div>
            <!-- 全部集数 -->
            <div class="details-numAll" v-if="allNum==true">
              <div class="details-numAll-tab">
                <div class="details-numAll-tabs" v-for="(item, index) in jiTabList" :key="index" :class="{'numAllActive':jishuStaus == index}"
                   @click="jishuTab(index)">{{index * 30 + 1}}-{{index * 30 + jiTabList[index].length}}</div>
                <div class="guanbijishu" @click="closeJishu()"><img src="../assets/img/my_vip_guanbi.png"/></div>
              </div>
              <div class="clearBoth"></div>
              <ul class="details-num-ul" v-for="(item, index) in jiTabList" v-if="jishuStaus == index">
                <li v-for="(list, ind) in item" @click="selectedNumCLick(index * 30 + ind)" :class="{'details-numLiHover':jishuOne==(index * 30 + ind)}">
                  {{list.title.substring(1,list.title.length-1)}}
                </li>
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
                       <span>充值</span>6
                     </div>
                  </div>
              </div>
          </van-popup>

  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import {Tab, Tabs, Popup} from 'vant'
export default {
  name: 'details',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup
  },
  data () {
    return {
      vodId: '', // 影视id
      details: {}, // 影视详情
      allNum: false, // 是否展示全部集数
      hotsList: [], // 热播
      tipShow: false, // 弹框展示
      xianluStaus: false, // 线路默认隐藏
      xianluList: {}, // 线路列表
      xianluName: '', // 线路名称
      xlList: [],
      allmore: false, // 是否显示更多集数
      jilist: [], // 更多集数列表
      jishuStaus: 1, // 集数范围选中状态
      jishuOne: 0, // 单个集数的状态
      video_sid: 1, // 播放线路的id号
      video_pid: 1, // 播放集数id号
      jiTabList: [] // 全部集数列表分段显示
    }
  },
  created () {
    this.vodId = this.$route.query.vodId
  },
  mounted () {
    this.getmoviedetailFun()
  },
  methods: {
    gobackFun () {
      this.$router.go(-1)
    },

    //  获取影视详情
    getmoviedetailFun () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.vod_id = this.vodId
      IMService.getmoviedetail(objStr)
        .then(function (res) {
          console.log('获取影视详情')
          console.log(res)
          that.details = res.data
          that.hotsList = res.data.other
          that.xianluList = res.data.vod_play_list
          console.log(that.xianluList)
          for (let i in that.xianluList) {
            that.xlList.push(that.xianluList[i])
          }
          that.xianluName = that.xlList[0].player_name_zh
          that.jilist = that.xlList[0].son
          if (that.jilist.length > 6) {
            that.allmore = true
          }
          for (var i = 0, len = that.jilist.length; i < len; i += 30) {
            that.jiTabList.push(that.jilist.slice(i, i + 30))
          }
          console.log(that.jiTabList)
          that.jishuTab(0)
        })
    },
    // 展示全部集数
    selectedNumCLick (index) {
      this.jishuOne = index
      this.video_pid = index + 1
      console.log(this.video_pid, this.video_sid)
      this.playFun()
    },
    // 立即播放
    playFun () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.vod_id = this.vodId
      IMService.getuserinfo(objStr)
        .then(function (res) {
          console.log(res.data.userinfo.level_detail)
          if (res.data.userinfo.level_detail.left_play_time == 0) {
            that.tipShow = true
          } else {
            that.$router.push({name: 'videoplay', query: {vodId: that.vodId, pid: that.video_pid, sid: that.video_sid}})
          }
        })
    },

    // 展开详情
    openCont () {
      var details = document.getElementById('details_txt')
      var zhankai = document.getElementById('zhankai')
      if (zhankai.innerHTML == '展开') {
        details.classList.remove('details_txt')
        details.classList.add('details_txt_all')
        zhankai.innerHTML = '收起'
      } else {
        details.classList.remove('details_txt_all')
        details.classList.add('details_txt')
        zhankai.innerHTML = '展开'
      }
    },
    // 热播影视
    toDetailsFun (id) {
      this.details = {}
      this.vodId = id
      this.getmoviedetailFun()
    },
    // 显示来源线路
    xianluOpen () {
      if (this.xianluStaus === false) {
        this.xianluStaus = true
      } else {
        this.xianluStaus = false
      }
    },
    xianluSelect (name, index, key) {
      this.xianluName = name
      this.video_sid = this.xianluList[key].player_sid
      this.jilist = []
      this.jilist = this.xlList[index].son
      console.log(this.jilist)
      this.jiTabList = []
      for (var i = 0, len = this.jilist.length; i < len; i += 30) {
        this.jiTabList.push(this.jilist.slice(i, i + 30))
      }
      this.xianluStaus = false
      this.jishuTab(0)
    },
    // 集数范围选择
    jishuTab (a) {
      this.jishuStaus = a
    },
    // 关闭集数
    closeJishu () {
      this.allNum = false
    }
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
      padding: 0 25px 10px 25px;
      position: relative;
      .details_txt{
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 24px;
        color: #9D9D9D;
      }
      .details_txt_all{
        text-align: left;
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
        bottom:-20px;
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
           .xianlu{
             position: absolute;
             right: 30px;
             top: 65px;
             width: 143px;
             height: 110px;
             padding-top: 50px;
             background-image: url(../assets/img/xianlu_bg.png);
             background-size: 100% 100%;
             z-index: 9999;
             color: #C5C5C5;
             font-size: 24px;
             line-height: 50px;
           }
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
             .details-numAll-tabs{
               float: left;
               width: 150px;
               padding: 16px 0;
               margin-bottom: 5px;
               text-align: center;
               background: #0D1225;
               display: block;
               border-radius: 50px;
               margin-left: 20px;
               color: #9D9D9D;
             }
             .numAllActive{
               color:#27FCB9;
             }
             .guanbijishu{
               position: absolute;
               right: 20px;
               width: 60px;
               height: 50px;
               img{
                 width: 30px;
                 height: 30px;
                 margin-top: 10px;
                 opacity: 0.8;
               }
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
