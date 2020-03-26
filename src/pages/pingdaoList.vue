<template>
  <div class="pingdaoList">
           <div class="ys-goback"><div class="backPage" @click="gobackFun()"></div><span>{{pingdaoName}}</span></div>
          <!--筛选  -->
          <div class="pd-sx topNavMargin">
            <div class="pd-sx-line">
              <!-- <span class="pd-sx-title">全部类型</span> -->
              <van-tabs class="pd-sx-tab" @click="tagTabFun" v-model="pingdaoId">
                <van-tab v-for="(item,index) in tag" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab" @click="areaTabFun">
                <van-tab v-for="(item,index) in area" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab" @click="yearTabFun">
                <van-tab v-for="(item,index) in year" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab" id="starWidth" @click="starTabFun">
                <van-tab v-for="(item,index) in star" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab" @click="newOnlineTabFun">
                <van-tab v-for="(item,index) in newOnline" :key="index" :title="item" :name="index+1"></van-tab>
              </van-tabs>
            </div>
          </div>

          <mescroll-vue ref="mescroll"  :down="downOption" :up="mescrollUp" @init="mescrollInit" :style="height" class="ys-bg">
            <div class="index-titleLine">
              <span>资源列表</span>
            </div>
            <div class="index-tuijian" v-if="List.length>0">
              <ul>
                <li v-for="(item,index) in List" :key="index" @click="toDetailsFun(item.vod_id)">
                    <div class="tuijian-img"><img :src="item.vod_pic" ></div>
                    <div class="index-tuijian-name">{{item.vod_name}}</div>
                    <div class="index-tuijian-dec">{{item.vod_content}}</div>
                </li>
                <div class="clearBoth"></div>
              </ul>
            </div>
            <div class="pingdaoNodata" v-else>
              <img src="../assets/img/nodata.png">
              <div>暂无数据</div>
            </div>
          </mescroll-vue>

  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import MescrollVue from 'mescroll.js/mescroll.vue'
import {Tab, Tabs} from 'vant'

export default {
  name: 'pingdaoList',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    MescrollVue // 注册mescroll组件
  },
  data () {
    return {
      pingdaoName: '', // 频道名称
      pingdaoList: [], // 频道
      List: [], // 其他类目
      pingdaoId: 0,
      tag: ['全部类型'], // 全部类型
      area: ['全部地区'], // 全部地区
      language: ['全部语言'], // 语言
      year: ['全部年代'], // 全部年代
      star: ['全部明星'], // 所有明星
      state: ['播放类型'], //
      version: ['所有版本'], //
      newOnline: ['最新上线', '最多播放', '评分最高'], // 最新上线
      shaixuanObj: {
        page: 1,
        limit: 9,
        list_id: '',
        list_type: '全部',
        list_star: '全部',
        list_area: '全部',
        list_year: '全部',
        list_order: '1'
      }, // 频道筛选需要传的参数

      // ------------------分页--------------------------
      mescroll: null, // mescroll实例对象
      downOption: {
        use: false, // 是否启用下拉刷新; 默认true
        auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
      },
      mescrollUp: { // 上拉加载的配置.
        use: true,
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        page: {
          num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 9 // 每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- 没有更多的相关数据 --</p>',
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        offset: 400,
        up: {
          isBounce: false // 此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        }
      },
      height: {height: ''}
    }
  },
  created () {
    let listId = this.$route.query.listId
    let that = this
    this.shaixuanObj.list_id = this.$route.query.listId
    let pingdaoList = JSON.parse(localStorage.getItem('channel_list'))
    pingdaoList.forEach(function (item) {
      if (item.id == listId) {
        that.pingdaoName = item.name
      }
    })
  },
  mounted () {
    this.getchannelnavisortFun(this.shaixuanObj.list_id)
    //  this.getchannelsortlistFun();
    let heightVal = document.documentElement.clientHeight - 10
    this.height.height = heightVal + 'px'
  },
  methods: {
    gobackFun () {
      this.$router.go(-1)
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调
    upCallback (page, mescroll) {
      this.shaixuanObj.page = page.num
      this.getchannelsortlistFun(mescroll)
    },
    // 频道列表接口
    getchannelnavisortFun (id) {
      let that = this
      IMService.getchannelnavisort({list_id: id})
        .then(function (res) {
          console.log('频道分类接口')
          console.log(res)
          let qitaArr = ['其他']
          that.pingdaoList = res.data.list
          that.tag = that.tag.concat(res.data.list_extend.type, qitaArr)
          that.area = that.area.concat(res.data.list_extend.area, qitaArr)
          that.language = that.language.concat(res.data.list_extend.language.split(','), qitaArr)
          that.year = that.year.concat(res.data.list_extend.year, qitaArr)
          var starWidth = document.getElementById('starWidth')
          if (res.data.list_extend.star.length == 0) {
            that.star = that.star
            starWidth.style.width = '1.55rem'
          } else {
            that.star = that.star.concat(res.data.list_extend.star, qitaArr)
          }
          let list = [' ', ' ', ' ']
          that.state = that.state.concat(res.data.list_extend.state.split(','), qitaArr, list)
          that.version = that.version.concat(res.data.list_extend.version.split(','), qitaArr)
          that.List = []
          setTimeout(() => {
            if (that.$route.query.movieId >= 0) {
              that.shaixuanObj.page = 1
              that.tagTabFun(that.$route.query.movieId + 1, that.tag[that.$route.query.movieId + 1])
              that.pingdaoId = that.$route.query.movieId + 1
            }
          }, 100)
        })
    },

    // 频道 筛选
    getchannelsortlistFun (mescroll) {
      let that = this
      let objVal = this.shaixuanObj
      console.log(objVal)
      IMService.getchannelsortlist(objVal)
        .then(function (res) {
          console.log('频道筛选')
          console.log(res)
          that.List = that.List.concat(res.data.list)
          console.log(that.List)
          that.$nextTick(() => {
            mescroll.endSuccess(res.data.list.length)
          })
        })
      this.pingdaoId = this.$route.query.movieId + 1
      console.log(this.pingdaoId)
    },

    // 类型
    tagTabFun (name, title) {
      console.log(name, title)
      if (title == '全部类型') {
        this.shaixuanObj.list_type = '全部'
      } else {
        this.shaixuanObj.list_type = title
      }
      this.mescrollUp.page.num = 1
      this.shaixuanObj.page = 1
      this.List = []
      this.getchannelsortlistFun()
    },
    // 地区
    areaTabFun (name, title) {
      if (title == '全部地区') {
        this.shaixuanObj.list_area = '全部'
      } else {
        this.shaixuanObj.list_area = title
      }
      this.mescrollUp.page.num = 1
      this.shaixuanObj.page = 1
      this.List = []
      this.getchannelsortlistFun()
    },

    // 年份
    yearTabFun (name, title) {
      if (title == '全部年代') {
        this.shaixuanObj.list_year = '全部'
      } else {
        this.shaixuanObj.list_year = title
      }
      this.mescrollUp.page.num = 1
      this.shaixuanObj.page = 1
      this.List = []
      this.getchannelsortlistFun()
    },

    // 明星
    starTabFun (name, title) {
      if (title == '全部明星') {
        this.shaixuanObj.list_star = '全部'
      } else {
        this.shaixuanObj.list_star = title
      }
      this.mescrollUp.page.num = 1
      this.shaixuanObj.page = 1
      this.List = []
      this.getchannelsortlistFun()
    },

    // 最新上线
    newOnlineTabFun (name, title) {
      this.shaixuanObj.list_order = name
      this.mescrollUp.page.num = 1
      this.shaixuanObj.page = 1
      this.List = []
      this.getchannelsortlistFun()
    },

    // 影视详情
    toDetailsFun (id) {
      this.$router.push({name: 'details', query: {vodId: id}})
    }
  }
}
</script>

<style lang='less'>
  .pingdaoList{
    .ys-goback{
      background: #161C2C!important;
    }
    .van-tabs__nav{
      background: #0D1225;

    }
    .van-tab{
       color: #fff!important;
       font-size: 28px;
       height: 58px;
       line-height: 58px;
       flex-basis: auto!important;
       padding: 0 20px;
    }
   .van-tabs__wrap{
      height: 58px!important;
    }
    [class*=van-hairline]::after{
      border:none!important;
    }
    .van-tabs__line{
       height: 0px;

    }
    .van-tab--active{
      color: #27FCB9!important;
      background: #161C2C;
      border-radius: 50px;
    }
    .pd-sx{
      padding: 15px 20px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      background: #0D1225;
      .pd-sx-line{
         .pd-sx-tab{
           width: 700px;
           margin-top:10px;
         }
         .pd-sx-tab:last-child{
           width: 4.6rem;
         }
      }
    }

    .index-titleLine{
      margin-top:430px;
    }

    /* 无数据 */
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

</style>
