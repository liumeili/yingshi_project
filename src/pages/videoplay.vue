<template>
  <div class="videoplay">
    <div class="ys-goback"><div class="backPage" @click="gobackFun()"></div></div>
    <div class="videoplaying" id="dplayer">
     <iframe id="show-iframe" allowfullscreen="true" webkitallowfullscreen="true"
     mozallowfullscreen="true" frameborder="0" scrolling="no" :src="videoUrl.play_url"></iframe>
     <div class="play-swipe" v-if="closeSwipe">
       <van-swipe :autoplay="3000" class="index-swipe ">
         <van-swipe-item v-for="(image, index) in playBannerList" :key="index" @click="indexSwipFun(image.url)">
           <div class="swipe_div">
             <img :src="image.img_url" class="index-swipeImg"/>
           </div>
         </van-swipe-item>
       </van-swipe>
       <img src="../assets/img/my_vip_guanbi.png" class="close-swipe" @click="closeSwipeFun()"/>
     </div>
    </div>
    <div class="ALLscroll">
      <!-- 轮播 -->
      <van-swipe :autoplay="3000" class="index-swipe">
        <van-swipe-item v-for="(image, index) in DetailBannerList" :key="index" @click="indexSwipFun(image.url)">
          <div class="swipe_div">
            <img :src="image.img_url" class="index-swipeImg"/>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="jieshao">
        <div class="video-titleLine" @click="openCont()">
          <span>{{details.vod_name}}</span>
          <img src="~@/assets/img/moreIcon.png" v-if="opendetail == false"/>
          <span id="jianjie" v-if="opendetail == false">简介</span>
          <img src="~@/assets/img/moreCloseIcon.png" class="shouqiImg" v-if="opendetail == true"/>
          <span id="shouqi" v-if="opendetail == true">收起</span>
        </div>
        <div class="jieshao_xinxi">
          评分<span>{{details.vod_gold}}</span>&nbsp;&nbsp;年份<span>{{details.vod_year}}</span>&nbsp;&nbsp;
          分类<span>{{details.vod_type}}</span>&nbsp;&nbsp;<span>{{details.vod_up}}</span>次播放
        </div>
        <!-- 简介 -->
        <div class="details-jjie">
          <div class="details_txt_all details_actor" v-if="detailShow" @click="openCont()">主演信息:{{details.vod_actor}}</div>
          <div :class="detailShow == false?'details_txt':'details_txt_all'" @click="openCont()">{{details.vod_content}}</div>
        </div>
        <div class="xiazaiVideo"  v-if="opendetail == false">
          <span @click="shoucang()">&nbsp;{{collectioncount}}</span>
          <img src="../assets/img/my_shoucangNo.png" @click="shoucang()" v-if="!shoucangStatus"/>
          <img src="../assets/img/my_shoucang.png" @click="shoucang()" v-if="shoucangStatus"/>
          <span @click="dianzan()">&nbsp;{{likecount}}&nbsp;&nbsp;</span>
          <img src="../assets/img/my_dianzan_unlike.png" @click="dianzan()" v-if="!likeStatus"/>
          <img src="../assets/img/my_dianzan.png" @click="dianzan()" v-if="likeStatus"/>
          <span @click="downloadVideo()">&nbsp;下载影片&nbsp;&nbsp;</span>
          <img src="../assets/img/my_xiazaiNo.png" @click="downloadVideo()"/>
        </div>
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
            <li v-for="(item, index) in jilist" @click="selectedNumCLick(index)" :key="index" :class="{'details-numLiHover':jishuOne==index}" v-if="index<6">
              <!-- {{item.title[0]=="第"?item.title.substring(1,item.title.length-1):item.title}} -->
              <span :class="item.title.length>4?'numFontsize':''">{{item.title[0]=="第"?item.title.substring(1,item.title.length-1):item.title}}</span>
            </li>
            <div class="clearBoth"></div>
          </ul>
          <div class="details-num-more">
            <img src="../assets/img/moreyd.png" @click="allNum=true" v-if="allmore">
          </div>
        </div>
        <!-- 全部集数 -->
        <div class="details-numAll" v-if="allNum==true">
          <div class="details-numAll-tab">
            <div class="details-numAll-tabs" v-for="(item, index) in jiTabList" :key="index" :class="{'numAllActive':jishuStaus == index}"
               @click="jishuTab(index)">{{index * 30 + 1}}-{{index * 30 + jiTabList[index].length}}</div>
            <div class="guanbijishu" @click="closeJishu()"><img src="../assets/img/my_vip_guanbi.png"/></div>
          </div>
          <div class="clearBoth"></div>
          <ul class="details-num-ul" v-for="(item, index) in jiTabList" :key="index" v-if="jishuStaus == index">
            <li v-for="(list, ind) in item" :key="ind" @click="selectedNumCLick(index * 30 + ind)" :class="{'details-numLiHover':jishuOne==(index * 30 + ind)}">
               <span :class="list.title.length>4?'numFontsize':''">{{list.title[0]=="第"?list.title.substring(1,list.title.length-1):list.title}}</span>
            </li>
            <div class="clearBoth"></div>
          </ul>
        </div>
      </div>
      <!-- 热播 -->
      <div class="details-hots">
        <div class="index-titleLine">
          <span>正在热播</span>
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
    </div>
    <van-popup v-model="future">
      <div class="model_kefu model_nologin model_skipLogin">
        <p v-if="downAPP">敬请期待</p>
        <p v-if="!downAPP" class="noplay">该视频为加密私品<br>请下载APP播放</p>
        <div class="nologin_cancel" @click="future_cancel(1)">取消</div>
        <div class="nologin_sure" @click="future_cancel(2)">确定</div>
      </div>
    </van-popup>
    <!--弹框  -->
    <van-popup v-model="tipShow" class="details-popup">
        <div class="details-popupDiv">
            <div class="details-popupDiv2">
               <img src="../assets/img/kuFace.png" class="details-popupkuFace">
               <img src="../assets/img/close.png" class="details-popupClose" @click="tipShow=false">
               <div class="details-popupText">可看次数不足，可选择一下获取方式</div>
               <div class="details-popupBtn">
                 <span @click="goNextPage('task')">分享</span>
                 <span @click="goNextPage('mybuyvip')">充值</span>
               </div>
            </div>
        </div>
    </van-popup>
    <!-- gif下载 -->
    <img :src="configInfo.gif_img" class="videoPlay_gifImg" v-if="configInfo.gif_isopen=='1'" @click="gifImgFun">
  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import HelloWorld from '../components/HelloWorld.vue'
import { Popup, Swipe, SwipeItem, Toast } from 'vant'
export default {

  components: {
    HelloWorld,
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      configInfo: {}, // 公共配置信息
      details: {}, // 影视详情
      opendetail: false, // 是否打开简介
      detailShow: false, // 是否显示全部详情
      hotsList: [], // 热播
      allNum: false, // 是否展示全部集数
      videoUrl: {},
      xianluStaus: false, // 线路默认隐藏
      xianluList: {}, // 线路列表
      xianluName: '', // 线路名称
      xlList: [],
      allmore: false, // 是否显示更多集数
      jilist: [], // 更多集数列表
      jishuStaus: 1, // 集数范围选中状态
      jishuOne: 0, // 单个集数的状态
      // video_sid: 1, // 播放线路的id号
      // video_pid: 1, // 播放集数id号
      jiTabList: [], // 全部集数列表分段显示
      likeStatus: false, // 喜欢状态
      shoucangStatus: false, // 收藏状态
      collectioncount: '', // 收藏的数量
      likecount: '', // 点赞的数量
      future: false, // 敬请期待显示框
      tipShow: false, // 弹框展示
      videoDetail: [], // 视频信息
      DetailBannerList: {}, // 播放页面的轮播图
      playBannerList: {}, // 播放里的轮播图
      closeSwipe: false, // 显示隐藏播放中的轮播图
      downAPP: false,
      downloadUrl:''
    }
  },
  created () {
    this.vodId = this.$route.query.vodId
    this.video_sid = this.$route.query.sid
    this.video_pid = this.$route.query.pid
  },
  mounted () {
    this.getmoviedetailFun()
    this.getplayurl()
    this.getConfigFun()
    this.getPlayDetailBanner()
    let that = this
    IMService.getConfig()
      .then(function (res) {
        console.log(res)
        var u = navigator.userAgent
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        if (isAndroid) {
        	that.downloadUrl = res.data.android_download_url
        }
        if (isIOS) {
        	that.downloadUrl = res.data.ios_download_url
        }
      })
  },
  methods: {
    // 公共配置信息
    getConfigFun () {
      let that = this
      IMService.getConfig()
        .then(function (res) {
          that.configInfo = res.data
        })
    },
    gobackFun () {
      this.$router.go(-1)
    },
    // gif跳转
    gifImgFun () {
      window.location.href = this.configInfo.gif_url
    },
    // 展开详情
    openCont () {
      if (this.opendetail === false) {
        this.opendetail = true
        this.detailShow = true
      } else {
        this.detailShow = false
        this.opendetail = false
      }
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
          that.collectioncount = res.data.vod_collectioncount
          that.likecount = res.data.vod_likecount
          that.jilist = []
          that.jiTabList = []
          that.xlList = []
          console.log(that.xianluList)
          if (res.data.vod_islike == 1) {
            that.likeStatus = true
          } else {
            that.likeStatus = false
          }
          if (res.data.vod_iscollect == 1) {
            that.shoucangStatus = true
          } else {
            that.shoucangStatus = false
          }
          for (let i in that.xianluList) {
            that.xlList.push(that.xianluList[i])
          }
          that.xianluName = that.xlList[that.video_sid - 1].player_name_zh
          that.jilist = that.xlList[0].son
          console.log(that.jilist)
          if (that.jilist.length > 6) {
            that.allmore = true
          }
          for (var i = 0, len = that.jilist.length; i < len; i += 30) {
            that.jiTabList.push(that.jilist.slice(i, i + 30))
          }
          console.log(that.jiTabList)
          that.jishuTab(0)
          if (that.video_pid > 6) {
            that.allNum = true
          }
          that.selectedNumCLick(that.video_pid - 1)
        })
    },
    // 获取播放url
    getplayurl () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.vod_id = this.vodId
      objStr.sid = this.video_sid
      objStr.pid = this.video_pid
      console.log(objStr)
      IMService.getplayurl(objStr)
        .then(function (res) {
          console.log('获取播放url')
          console.log(res)
          console.log(that.videoUrl)
          if(res.data.vod_upload_type == 0){
            that.videoUrl = res.data
            if(res.data.could_play ==0){
              that.tipShow = true
            }
          }else if(res.data.vod_upload_type == 1){
            that.downAPP = false
            that.future = true
          }else{
            Toast("未能识别的播放器类型")
          }

        })
    },
    // 展示全部集数
    selectedNumCLick (index) {
      this.jishuOne = index
      this.video_pid = index + 1

      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      IMService.getplayhistory(objStr)
        .then(function (res) {
          console.log(res)
          if (res.data.list.length == 0) {
            that.getplayurl()
          } else {
            var result = res.data.list.some(e => {
              if (that.details.vod_id == e.vod_id && that.video_pid == e.pid) {
                return true
              }
            })
            if (!result) {
              objStr.vod_id = that.vodId
              IMService.getuserinfo(objStr)
                .then(function (res) {
                  console.log(res)
                  if (res.data.userinfo.level_detail.left_play_time == 0) {
                    that.tipShow = true
                    console.log('播放不了')
                    that.videoUrl = {}
                  } else {
                    that.getplayurl()
                  }
                })
            } else {
              console.log('可以播放')
              that.getplayurl()
              that.tipShow = false
            }
          }
        })
    },
    toDetailsFun (id) {
      // this.details = {}
      // this.vodId = id
      // this.getmoviedetailFun()
      // this.jishuTab(0)
      // this.selectedNumCLick(0)
      this.$router.push({name: 'details', query: {vodId: id}})
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
      this.jishuTab(0)
      this.selectedNumCLick(0)
      this.xianluName = name
      this.video_sid = this.xianluList[key].player_sid
      // this.getplayurl()
      this.xianluStaus = false
    },
    // 集数范围选择
    jishuTab (a) {
      this.jishuStaus = a
    },
    // 关闭集数
    closeJishu () {
      this.allNum = false
    },
    // 喜欢和取消喜欢
    dianzan () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.vod_id = this.vodId
      console.log(objStr)
      if (!that.likeStatus) {
        IMService.likevod(objStr)
          .then(function (res) {
            that.likeStatus = true
            that.likecount++
          })
      } else {
        IMService.unlikevod(objStr)
          .then(function (res) {
            that.likeStatus = false
            that.likecount--
          })
      }
    },
    // 收藏和取消收藏
    shoucang () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.vod_id = this.vodId
      console.log(objStr)
      if (!that.shoucangStatus) {
        IMService.collectvod(objStr)
          .then(function (res) {
            console.log(res)
            that.shoucangStatus = true
            that.collectioncount++
          })
      } else {
        IMService.uncollectvod(objStr)
          .then(function (res) {
            console.log(res)
            that.shoucangStatus = false
            that.collectioncount--
          })
      }
    },
    downloadVideo () {
      this.future = true
    },
    // 关闭敬请期待框
    future_cancel (i) {
      if (i == 2&&!this.downAPP) {
        window.location.href = this.downloadUrl
      }
      this.future = false
    },
    getPlayDetailBanner () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      IMService.getPlayDetailBanner(objStr)
        .then(function (res) {
          console.log(res)
          that.DetailBannerList = res.data.list
        })
      IMService.getPlayBanner(objStr)
        .then(function (res) {
          console.log(res)
          that.playBannerList = res.data.list
          if(that.playBannerList.length == 0){
            that.closeSwipe = false
          }else{
            that.closeSwipe = true
          }
        })
    },
    // 轮播点击跳转
    indexSwipFun (url) {
      window.location.href = url
    },
    closeSwipeFun(){
      this.closeSwipe = false
    }
  }
}
</script>

<style lang="less">
  .ys-goback{
    background: none!important;
  }
  .videoplay{
    width: 100%;
    .videoplaying{
      position: relative;
      width: 100%;
      height: 407px;
      iframe{
        width: 100%;
        height: 407px;
      }
      .play-swipe{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        transform: translate(-50%,-50%);
        .close-swipe{
          position: absolute;
          top: 25px;
          right: 15px;
          width: 35px;
        }
      }
    }
    .ALLscroll{
      position: fixed;
      top: 407px;
      width: 100%;
      height: calc(100% - 407px);
      overflow-y: auto;
    }
    /* 轮播 */
    .index-swipe{
      height: 180px;
      margin-top: 10px;
      .swipe_div{
        position: relative;
        width: 100%;
        height: 180px;
        border-radius: 15px;
        overflow: hidden;
      }
       .index-swipeImg{
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         width: 100%;
         height: 100%;
         border-radius: 15px;
       }
    }
    .play-swipe{
      .index-swipe{
        height: 210px;
        .swipe_div{
          height: 210px;
        }
      }
    }
    .video-titleLine{
      text-align: left;
      padding: 10px 29px;
      img{
        float: right;
        width: 28px;
        height: 28px;
        margin-top: 4px;
      }
      #jianjie,#shouqi{
        float: right;
        font-size: 24px;
        color: #9D9D9D;
      }
      .shouqiImg{
        width: 28px;
        height: 15px;
        margin-left: 10px;
        margin-top: 10px;
      }
    }
    .jieshao_xinxi{
      font-size: 24px;
      text-align: left;
      padding: 0 29px;
      span{
        color: #9D9D9D;
      }
    }
    .details-jjie .details_txt {
      padding: 10px 29px 0 29px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 0.24rem;
      color: #9D9D9D;
    }
    .details-jjie .details_txt_all {
      padding: 10px 29px 0 29px;
      text-align: left;
      overflow: hidden;
      font-size: 0.24rem;
      color: #9D9D9D;
    }
    .details_actor{
      color: #FFFFFF!important;
    }
    .xiazaiVideo{
      width: calc(100% - 35px);
      height: 50px;
      text-align: right;
      color: #9D9D9D;
      font-size: 18px;
      margin-right: 35px;
      img{
        float: right;
        width: 30px;
        height:30px;
        margin-top: 10px;
      }
      span{
        float: right;
        line-height: 50px;
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
            white-space: normal;
            word-break: break-all;
            overflow: hidden;
            .numFontsize{
              font-size: 16px;
            }
          }
          .details-numLiHover{
            background: none;
            color:#27FCB9;
          }

        }
        .details-num-more{
          width: 80px;
          height: 80px;
          position: absolute;
          bottom: 20px;
          right: 20px;
          img{
            width: 32px;
            height: 32px;
            margin-top: 28px;
          }
        }
        .details-numAll{
           .details-numAll-tab{
             padding-top: 20px;
             .details-numAll-tabs{
               float: left;
               width: 150px;
               padding: 16px 0;
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
  }
  /* 弹框 */
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
          }
          .details-popupClose{
             width: 37px;
             height:37px;
             position: absolute;
             left: 440px!important;
             top: -15px;
          }
          .details-popupText{
            width: calc(100% - 100px);
            height: 120px;
            padding: 100px 50px 0 50px;
          }
          .details-popupBtn{
            display: flex;
            align-items: center;
            height: 80px;
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
  .van-overlay{
    z-index: 999999!important;
  }
  .van-popup{
    z-index: 999999!important;
  }
  .videoPlay_gifImg{
    position: fixed;
    width: 120px;
    height: 120px;
    right: 10px;
    bottom: 100px;
    border-radius: 10px;
  }
</style>
