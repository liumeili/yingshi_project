<template>
    <div class="Footer">
        <ul class="Footer-Ul">
            <li v-for="(item,index) in title" :key="index"  :style="item.selected?'color:#27FCB9':''" @click="navChoice(item.id,item.name)">
                <img :src="item.selected ? item.icon_y : item.icon_n" alt="">
                <p>{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selected:"chat",
            title:[
                {
                    id:1,
                    title:'首页',
                    selected:true,
                    icon_y:require('../assets/img/index_Y.png'),
                    icon_n:require('../assets/img/index_N.png'),
                    name:'index'
                },
                {
                    id:2,
                    title:'热点',
                    selected:false,
                    icon_y:require('../assets/img/hot_Y.png'),
                    icon_n:require('../assets/img/hot_N.png'),
                    name:'hot'
                },
                {
                    id:3,
                    title:'任务',
                    selected:false,
                    icon_y:require('../assets/img/task_Y.png'),
                    icon_n:require('../assets/img/task_N.png'),
                    name:'task'
                },
                {
                    id:4,
                    title:'我的',
                    selected:false,
                    icon_y:require('../assets/img/my_Y.png'),
                    icon_n:require('../assets/img/my_N.png'),
                    name:'my'
                },
               
            ]
        }
    },
    mounted(){
      let url= document.location.toString().split('#')[1];
      console.log("取地址栏地址");
      console.log(url);
      let id='';
      if(url=='/'){
         id=1;
      }else if(url=='/hot'){
         id=2;
      }else if(url=='/task'){
         id=3;
      }else if(url=='/my'){
         id=4;
      }
      console.log(id);
       let title=this.title;
       title.forEach(function(item,index){
           if(item.id==id){
                item.selected=true;
            }else{
                item.selected=false;
            }  
       })
    },
    methods:{
        navChoice:function(id,name){
            let that=this;
            let title=this.title;
            title.forEach(function(item,index){
                if(item.id==id){
                   item.selected=true;
                }else{
                   item.selected=false;
                }  
            });
            that.$router.push({name:name})
           
        },
    },
    
}

</script>

<style scoped>
    .Footer{
        width:100%;
        margin: auto;
        font-size:18px;
        text-align: center;
        background: #161C2C;
        position: fixed;
        bottom: 0;
        color: rgb(165, 165, 165);
        height: 108px;
        left: 0;
        z-index: 9999;
    }
    .Footer-Ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .Footer-Ul li{
        text-align: center;
    }
    .Footer-Ul img{
       width: 54px;
       height: 54px;
       display: block;
       margin: auto;
       margin-top:10px;
    }
    
    .Footer-Ul p{
      margin:0.05rem  0 0.15rem 0;
    }

</style>
