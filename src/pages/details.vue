<template>
  <div class="details"> 
           <div class="ys-goback" @click="gobackFun()"><span>详情</span></div>
           <!-- 电视简介 -->
          <div class="detais-abstract">
             <div><img src=""></div>
             <div>
                <span>电视名称</span>
                <span>年代：2019</span>
                <span>导演：和客户可</span>
                <span>更新至第4集/共37集</span>
                <div><span>主演：小西几，加进来。先建立</span><span>展开</span></div>
             </div>
          </div>


         
            <!-- <div class="index-titleLine">
              <span>资源列表</span>
            </div>
            <div class="index-tuijian" v-if="List.length>0">
              <ul>
                <li v-for="(item,index) in List" :key="index">
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
            </div> -->
          

  </div>
</template>

<script>
import {IMService} from '../service/RiziServices.js'
import MescrollVue from 'mescroll.js/mescroll.vue'
import {Tab, Tabs} from 'vant';



export default {
  name: 'details',
  components:{
     [Tab.name]: Tab,
     [Tabs.name]: Tabs,
     MescrollVue // 注册mescroll组件
  },
  data () {
    return {
      
      
      
      
    }
  },
  created(){
    
  },
  mounted(){
    
    
  },
  methods:{
    gobackFun(){
       this.$router.go(-1);
     },
    
  }
}
</script>

<style lang='less'>
  .details{
     
      

      

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
 
</style>
