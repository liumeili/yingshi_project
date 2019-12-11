<template>
  <div class="pingdaoList"> 
           <div class="ys-goback"><span>电影</span></div>
          <!--筛选  -->
          <div class="pd-sx topNavMargin">
            <div class="pd-sx-line">
              <!-- <span class="pd-sx-title">全部类型</span> -->
              <van-tabs class="pd-sx-tab">
                <van-tab v-for="(item,index) in tag" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab">
                <van-tab v-for="(item,index) in area" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab">
                <van-tab v-for="(item,index) in year" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab">
                <van-tab v-for="(item,index) in star" :key="index" :title="item"></van-tab>
              </van-tabs>
              <van-tabs class="pd-sx-tab">
                <van-tab v-for="(item,index) in newOnline" :key="index" :title="item"></van-tab>
              </van-tabs>
            </div>
          </div>

          <!-- 推荐 -->
          <!-- <div class="index-titleLine" v-if="tuijianList.length>0">
            <span>资源列表</span>
          </div>
          <div class="index-tuijian">
            <ul>
              <li v-for="(item,index) in tuijianList" :key="index">
                  <div class="tuijian-img"><img :src="item.vod_pic" ></div>
                  <div class="index-tuijian-name">{{item.vod_name}}</div>
                  <div class="index-tuijian-dec">{{item.vod_content}}</div>
              </li>
              <div class="clearBoth"></div>
            </ul>
          </div>
          <div class="changeOne" @click="getlatestrecommendlistFun()" v-if="tuijianList.length>0"><img src="../assets/img/change.png"><span>换一批</span></div> -->


  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import {Tab, Tabs} from 'vant';



export default {
  name: 'pingdaoList',
  components:{
     [Tab.name]: Tab,
     [Tabs.name]: Tabs,
  },
  data () {
    return {
      pingdaoList:[],  //频道
      otherList:'',  //其他类目
      pingdaoId:0,
      tag:['全部类型'],  //全部类型
      area:['全部地区'], //全部地区
      language:['全部语言'],  //语言
      year:['全部年代'],  //全部年代
      star:['全部明星'],  //所有明星
      state:['播放类型'],  //
      version:['所有版本'],  //
      newOnline:['最新上线','最多播放','评分最高','',''],  //最新上线
    }
  },
  mounted(){
     this.getchannelnavisortFun(1);
    
  },
  methods:{

    // 频道列表接口
    getchannelnavisortFun(id){
       let that=this;
       IMService.getchannelnavisort({list_id:id})
         .then(function(res){
            console.log('频道分类接口');
            console.log(res);
            let qitaArr=['其他'];
            that.pingdaoList=res.data.list;
            that.tag=that.tag.concat(res.data.list_extend.tag,qitaArr);
            that.area=that.area.concat(res.data.list_extend.area,qitaArr);
            that.language=that.language.concat(res.data.list_extend.language.split(','),qitaArr);
            that.year=that.year.concat(res.data.list_extend.year,qitaArr);
            that.star=that.star.concat(res.data.list_extend.star,qitaArr);
            let list=[' ',' ',' '];
            that.state=that.state.concat(res.data.list_extend.state.split(','),qitaArr,list);
            that.version=that.version.concat(res.data.list_extend.version.split(','),qitaArr);
         })
    },

    
    

    
  }
}
</script>

<style lang='less'>
  .pingdaoList{
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
      // 筛选
      .pd-sx{
        padding: 15px 20px;
        .pd-sx-line{ 
           .pd-sx-tab{
             width: 700px;
             margin-top:10px;
           }
        } 
      } 

  }
 
</style>
