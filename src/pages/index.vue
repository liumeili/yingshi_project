<template>
  <div class="index">
      <!-- 搜索 -->
      <div class="index-topSearch">
          <van-search placeholder="20万部高清大片" v-model="searchVue" @search="onSearch" @focus="focusInput()" v-on:input="change"/>
          <img src="../assets/img/time.png" class="topSearch-timepImg" v-if="headShow" @click="goHistoryPage('myviewhistory')">
          <span v-if="!headShow" @click="cancel()" class="cancel_search">取消</span>
      </div>
      <div class="searchPage" v-if="!headShow">
        <div class="history" v-if="historyShow">
          <span>搜索历史</span>
          <img src="../assets/img/search_delete.png" @click="clearLocal()"/>
          <ul class="historyUL">
            <li v-for="(item,index) in historyList" @click="searchItem(item)" :key="index">{{item}}</li>
            <div class="clearfix"></div>
          </ul>
        </div>
        <div class="contain index-tuijian">
          <ul>
            <li v-for="(item, index) in SSlist" :key='index' @click="toDetailsFun(item.vod_id)">
              <div class="tuijian-img">
                <img :src="item.vod_pic"/>
              </div>
              <div class="shipingName">{{item.vod_name}}</div>
              <div class="shipingTime">
                <p>主演：{{item.vod_actor}}{{item.vod_actor}}{{item.vod_actor}}{{item.vod_actor}}</p>
                <p>简介：{{item.vod_content}}</p>
              </div>
            </li>
          </ul>
          <div class="nodata" v-if="nodataShow">对不起<br>没有搜索到相关内容</div>
        </div>
      </div>
      <!-- 顶部导航 -->
      <div class="index-topNav">
        <ul :style="'width:'+topNavWidth+'rem'">
          <li :class="topNavIndex==0?'topNavHover':''" @click="topNaChoice(0,0)">推荐</li>
          <li v-for="(item,index) in mainList" :class="topNavIndex==index+1?'topNavHover':''" :key="index" @click="topNaChoice(index+1,item.list_id)">{{item.list_name}}</li>
        </ul>
      </div>

      <div class="content_BOX">
          <!-- 轮播 -->
          <van-swipe :autoplay="3000" class="index-swipe">
            <van-swipe-item v-for="(image, index) in bannerList" :key="index" @click="indexSwipFun(image.h5_url)">
              <div class="swipe_div">
                <img :src="image.img_url"  class="index-swipeImg"/>
              </div>
            </van-swipe-item>
          </van-swipe>

          <!-- 频道 -->
          <ul class="pd-ul" v-if="pingdaoId!=0">
             <li v-for="(item,index) in pingdaoList" :key="index" v-if="index<7" @click="movieSelect(index)">{{item.tag}}</li>
             <li style="color:#27FCB9;" @click="topingdaoFun()">全部</li>
          </ul>

          <!-- 推荐 -->
          <div class="index-titleLine" v-if="tuijianList.length>0">
            <span>最新推荐</span>
          </div>
          <div class="index-tuijian">
            <ul>
              <li v-for="(item,index) in tuijianList" :key="index" @click="toDetailsFun(item.vod_id)">
                  <div class="tuijian-img"><img :src="item.vod_pic" ></div>
                  <div class="index-tuijian-name">{{item.vod_name}}</div>
                  <div class="index-tuijian-dec">{{item.vod_content}}</div>
              </li>
              <div class="clearBoth"></div>
            </ul>
          </div>
          <div class="changeOne" @click="getlatestrecommendlistFun()" v-if="tuijianList.length>0"><img src="../assets/img/change.png"><span>换一批</span></div>

          <!-- 播放排行榜 -->
          <div class="index-titleLine" v-if="ranklist.length>0">
            <span>播放排行榜</span>
            <span @click="goHistoryPage('paihangList')">更多内容</span>
          </div>
          <div class="index-tuijian">
            <ul>
              <li v-for="(item,index) in ranklist" :key="index" v-if="index<3">
                  <div class="tuijian-img"><img :src="item.vod_pic" ></div>
                  <div class="index-tuijian-name">{{item.vod_name}}</div>
                  <div class="index-tuijian-dec">{{item.vod_content}}</div>
                  <img src="../assets/img/rankTip.png" class="rankTip">
                  <span class="rankTip-number">{{index+1}}</span>
              </li>
              <div class="clearBoth"></div>
            </ul>
          </div>

          <!-- 其他类 -->
          <div  v-for="(item,index) in otherList" :key="index" v-if="item.movie.length!=0">
            <div class="index-titleLine">
              <span>{{item.list_name}}</span>
              <span @click="topNaChoice(index+1, item.list_id)">更多内容</span>
            </div>
            <div class="index-tuijian">
              <ul>
                <li v-for="(items,indexs) in item.movie" :key="indexs" >
                    <div class="tuijian-img"><img :src="items.vod_pic" ></div>
                    <div class="index-tuijian-name">{{items.vod_name}}</div>
                    <div class="index-tuijian-dec">{{items.vod_content}}</div>
                </li>
                <div class="clearBoth"></div>
              </ul>
            </div>
            </div>
      </div>

      <!--底部导航  -->
      <Footer></Footer>
  </div>
</template>

<script>
import { IMService } from '../service/RiziServices.js'
import { Button, Search, Swipe, SwipeItem, Toast} from 'vant'
import Footer from '../components/footer.vue'

export default {
  name: 'index',
  components: {
    [Button.name]: Button,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Footer
  },
  data () {
    return {
      topNavIndex: 0, // 顶部导航选择
      searchVue: '', // 搜索关键字
      topNavData: [], // 顶部导航
      mainList: [], // 首页数据
      topNavWidth: 7.5, // 顶部导航的宽度
      bannerList: [], // banner
      tuijianList: [], // 最新推荐
      ranklist: [], // 排行榜
      pingdaoList: [], // 频道
      otherList: '', // 其他类目
      pingdaoId: 0,
      headShow: true,
      SSlist: [], // 搜索记录数据列表
      historyShow: false, // 默认不显示搜索历史记录的关键字
      localVideoList: JSON.parse(localStorage.getItem('VideoHistory')), // 存入本地的历史搜索关键词
      historyList: [], // 页面渲染历史记录
      nodataShow: false // 无数据显示
    }
  },
  mounted () {
    this.mainlistFun() // 首页列表页接口
    this.getbannerlistFun(0) // banner
    this.getlatestrecommendlistFun() // 最新推荐
    this.getranklistFun(0) // 获取排行榜
  },
  methods: {
    onSearch () {
      this.headShow = false
      if (this.historyList != null) {
        this.historyList.push(this.searchVue)
        this.historyList.forEach(e => {
          if (this.localVideoList.indexOf(e) == -1) {
            this.localVideoList.push(e)
            console.log(this.localVideoList)
            let sethistory = JSON.stringify(this.localVideoList)
            localStorage.setItem('VideoHistory', sethistory)
          }
        })
        this.getssList()
      } else {
        this.localVideoList = []
        this.localVideoList.push(this.searchVue)
        let sethistory = JSON.stringify(this.localVideoList)
        localStorage.setItem('VideoHistory', sethistory)
        this.getssList()
      }
      this.historyList = JSON.parse(localStorage.getItem('VideoHistory'))
      if (this.historyList != null) {
        this.historyList = this.historyList.reverse()
      }
    },
    getssList () {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.page = 1
      objStr.limit = 10
      objStr.content = this.searchVue
      IMService.searchresult(objStr)
        .then(function (res) {
          console.log(res)
          that.SSlist = res.data.list
          that.historyShow = false
          if (that.SSlist.length == 0) {
            that.nodataShow = true
          } else {
            that.nodataShow = false
          }
        })
    },
    // 时时监听input变化
    change () {
      console.log('input输入的值：', this.searchVue)
      this.historyList = JSON.parse(localStorage.getItem('VideoHistory'))
      if (this.searchVue == '') {
        this.historyShow = true
        this.SSlist = []
        if (this.historyList != null) {
          this.historyShow = true
          console.log(this.historyShow)
          this.historyList = this.historyList.reverse()
        } else {
          this.historyShow = false
        }
      } else {
        this.historyShow = false
      }
    },
    focusInput () {
      this.nodataShow = false
      this.historyList = JSON.parse(localStorage.getItem('VideoHistory'))
      console.log(this.historyList)
      console.log(this.SSlist)
      if (this.SSlist.length == 0) {
        this.historyShow = true
        if (this.historyList != null) {
          this.historyShow = true
          console.log(this.historyShow)
          this.historyList = this.historyList.reverse()
        } else {
          this.historyShow = false
        }
      } else {
        this.historyShow = false
      }
      this.headShow = false
      console.log(this.historyShow)
    },
    // 取消搜索显示首页
    cancel () {
      this.searchVue = ''
      this.headShow = true
      this.SSlist = []
    },
    // 删除历史记录按钮
    clearLocal () {
      this.historyList = []
      this.localList = []
      this.historyShow = false
      localStorage.removeItem('VideoHistory')
    },
    searchItem (item) {
      let that = this
      let objStr = JSON.parse(localStorage.getItem('uidAtoken'))
      objStr.page = 1
      objStr.limit = 10
      objStr.content = item
      IMService.searchresult(objStr)
        .then(function (res) {
          console.log(res)
          if (res.code == 0) {
            that.SSlist = res.data.list
            that.searchVue = item
            that.historyShow = false
            if (that.SSlist.length > 0) {
              that.nodataShow = false
            } else {
              that.nodataShow = true
            }
          } else {
            Toast(res.msg)
          }
        })
    },
    // 跳转到观看历史记录页面
    goHistoryPage (url) {
      this.$router.push({name: url})
    },
    // 首页列表页接口
    mainlistFun () {
      let that = this
      IMService.mainlist()
        .then(function (res) {
          console.log('首页列表页接口')
          console.log(res)
          that.mainList = res.data.list
          let list = res.data.list
          // 动态设置顶部导航的宽度
          if (that.mainList.length > 6) {
            that.topNavWidth = that.topNavWidth + 1.1 * (that.mainList.length - 6)
          }
          that.otherList = res.data.list
          let arr = []
          list.forEach(function (item, index) {
            let objS = {id: item.list_id, name: item.list_name}
            arr.push(objS)
          })
          localStorage.setItem('channel_list', JSON.stringify(arr))
        })
    },

    // 获取banner
    getbannerlistFun (id) {
      let that = this
      IMService.getbannerlist({list_id: id})
        .then(function (res) {
          console.log('获取banner')
          console.log(res)
          that.bannerList = res.data
        })
    },

    // 轮播点击跳转
    indexSwipFun (url) {
      window.location.href = url
    },

    // 最新推荐
    getlatestrecommendlistFun () {
      let that = this
      IMService.getlatestrecommendlist({list_id: that.pingdaoId})
        .then(function (res) {
          console.log('最新推荐')
          console.log(res.data)
          that.tuijianList = res.data.list
        })
    },

    // 获取排行榜
    getranklistFun (id) {
      let that = this
      IMService.getranklist({list_id: id})
        .then(function (res) {
          console.log('获取排行榜')
          console.log(res.data)
          that.ranklist = res.data.list
        })
    },

    // 频道列表接口
    getchannelmovielistFun (id) {
      if(id > 0){
        console.log(id)
        let that = this
        IMService.getchannelmovielist({list_id: id})
          .then(function (res) {
            console.log('频道列表接口')
            console.log(res)
            that.pingdaoList = res.data.list
            that.otherList = res.data.list.list
          })
      }
    },

    // 顶部导航选择
    topNaChoice (index, id) {
      if (index == 0) {
        this.mainlistFun()
      }
      this.topNavIndex = index
      this.pingdaoId = id
      this.getbannerlistFun(id)
      this.getlatestrecommendlistFun(id)
      this.getranklistFun(id)
      this.getchannelmovielistFun(id)
    },
    movieSelect (index) {
      this.$router.push({name: 'pingdaoList', query: {listId: this.pingdaoId, movieId: index}})
    },
    // 频道跳转 点击全部
    topingdaoFun () {
      this.$router.push({name: 'pingdaoList', query: {listId: this.pingdaoId}})
    },

    // 影视详情
    toDetailsFun (id) {
      this.$router.push({name: 'details', query: {vodId: id}})
    }

  }
}
</script>

<style lang='less'>
  .index{
    /* 公用部分 */
    .div_ellipsis{
        overflow:hidden;
        white-space: nowrap;
        text-overflow:ellipsis;

    }

    /* 搜索 */
    .index-topSearch{
      display: flex;
      align-items: center;
      position: fixed;
      width: 100%;
      height: 60px;
      top:0;
      left: 0;
      z-index:9999;
      padding: 20px;
      background: #0D1225;
      .van-field__left-icon .van-icon{
        line-height: normal;
      }
      img{
        margin-left: 15px;
      }
      .topSearch-timepImg{
        width: 44px;
        height: 44px;
      }
      .cancel_search{
        padding-left: 16px;
      }
    }
    .searchPage{
      position: fixed;
      top: 1rem;
      width: 100%;
      height: calc(100% - 2.08rem);
      background: #0D1225;
      z-index: 99999;
      .history{
        position: fixed;
        top: 110px;
        width: calc(100% - 25px);
        margin-left: 25px;
        text-align: left;
        span{
          font-size: 32px;
        }
        img{
          position: absolute;
          right: 30px;
          top: 10px;
          width: 35px;
          height: 35px;
        }
        .historyUL{
          width: 100%;
          max-height: 142px;
          overflow: hidden;
          li{
            float: left;
            width: calc((100% - 90px)/3);
            height: 56px;
            margin: 15px 25px 0 0;
            background: #2C2D39;
            text-align: center;
            line-height: 56px;
            border-radius: 8px;
            font-size: 26px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding-left:5px;
          }
        }
      }
      .contain{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        ul{
          text-align: left;
          margin-top: 20px;
          li{
            width: 100%!important;
            height: 340px!important;
            .tuijian-img{
              float: left;
              width: 225px!important;
              height: 310px!important;
              margin-right: 20px;
              img{
                width: 110%!important;
                height: 110%!important;
              }
          }
          .shipingName{
            font-size: 34px;
            padding: 15px 15px 0px 0px!important;
            width: calc(100% - 300px);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .shipingTime{
            font-size: 23px!important;
            padding-top: 25px;
            p:first-child{
              width: calc(100% - 300px);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            p:last-child{
              width: calc(100% - 300px);
              word-break: break-all;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
              overflow: hidden;
              padding-top: 20px;
              color: #AAAAAA;
            }
          }
        }
      }
      .nodata{
        width: 100%;
        padding-top: 200px;
        text-align: center;
        font-size: 27px;
        line-height: 50px;
      }
      }
    }
    /* 顶部导航 */
    .index-topNav::-webkit-scrollbar {
        display: none;
    }
    .index-topNav{
      padding: 5px 0;
      width: 750px;
      overflow-x: auto;
      position: fixed;
      top:100px;
      left: 0;
      z-index:9999;
      background: #0D1225;
      ul{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        li{
          padding: 8px 0;
          margin-left: 40px;
        }
        .topNavHover{
          color:  #27FCB9;
          border-bottom: 3px solid #27FCB9;
        }
      }
    }

    /* 轮播 */
    .index-swipe{
      height: 314px;
      margin-top:15px;
      .swipe_div{
        position: relative;
        width: calc(100% - 50px);
        height: 314px;
        margin-left: 25px;
        border-radius: 15px;
        overflow: hidden;
      }
       .index-swipeImg{
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         width: 100%;
         border-radius: 15px;
       }
    }

    /* 频道 */
    .pd-ul{
      height: 180px;
      li{
        float: left;
        width:161px;
        padding: 15px 0;
        text-align: center;
        background:#1D202F;
        color: #fff;
        margin-left: 20px;
        margin-top:15px;
        border-radius: 10px;
      }
    }

  }

</style>
