
import globalState from '@/lib/rizi/globalstate.js'

export default {
  base64ImgtoFile(dataurl, filename = 'file') {
    let arr = dataurl.split(',')
    console.log(dataurl.split(','));
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
      type: mime
    })
  },
  getBaseUrl: function () {
    return window.location.origin.toString()
  },

  getPageUrl: function(){
    return document.location.toString().split('#')[0]
  },

  getUrlParam: function (name) {
    var after = window.location.search.substr(1) || window.location.hash.split("?")[1];
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = after.match(reg)// search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null
  },

  getCookie: function (name) {
    var reg = new RegExp('(^|; )' + name + '=([^;]*)')
    var r = document.cookie.match(reg)
    if (r != null) return unescape(r[2]); return null
  },
  setcookie: function(c_name,value,expiredays)
  { 
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
  },

 

  // 封装的时间戳转换为日期
  timestampToDate:function(dateV,hours){
    // var date = new Date(1398250549490);13位转换日期
    // var date =Math.round(new Date() / 1000); 将13位转换为10位
    var dateVal=dateV*1000;
    var date = new Date(dateVal);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10? '0'+date.getDate()+' ': date.getDate()+' ';
    var h = date.getHours()<10?'0'+date.getHours() + ':': date.getHours() + ':';
    var m = date.getMinutes()<10?'0'+date.getMinutes() + ':': date.getMinutes();
    var s = date.getSeconds()<10?'0'+date.getSeconds(): date.getSeconds() ;
    // console.log(Y+M+D+h+m+s);
    if(hours=='D'){
      return (Y+M+D);
    }else if(hours=='H'){
      return (Y+M+D+h+m);
    }
  },

  // 将日期转换为时间戳(10位)
  dateToTimestamp:function(date){
    // var str = '2013-08-30'; // 日期字符串
    var str = date;
    str = str.replace(/-/g,'/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
    var time = date.getTime();
    return time/1000;
  },

  // 计算两个时间相差的天数
  datedifference:function(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
    var dateSpan,
        tempDate,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
},

  // 手机号码验证
  regMobile(tel){
    var regMobile = /^1[345789]\d{9}$/;
    if (!regMobile.test(tel)) {
       return false;
    }else{
      return true;
    }
  },
  
  //邮箱验证
  sendEmail(email){
    var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!regEmail.test(email)){
     return false;
    }else{
     return true;
    }
  },

  //  身份证验证
  regCardId(cardId){
    let regCardId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(!regCardId.test(cardId)){
      return false;
    }else{
      return true;
    }
  },


 
  

  // 比较两个数组取相同的值
  inArray: function(array1,array2){
    var array3 = [];
    for(var i = 0 ; i <array1.length ; i++){
      var pattern = RegExp(array1[i]);
      if(pattern.test(array2) ==true && array1[i]!==undefined)
        array3.push(array1[i])
      }
    return array3.sort();
  },

  // 比较两个数组取不相同的值
  inArrayNO: function(array1,array2){
    var array3 = [];
    for(var i = 0 ; i <array1.length ; i++){
      var pattern = RegExp(array1[i]);
      if(pattern.test(array2) ==false)
        var tmp={index:i,value:array1[i]};
        array3.push(tmp)
      }
      var array4=[];
      array3.forEach(function(item,index){
         console.log(item);
         if(item!=undefined){
          array4.push(item);
         }
         
      })
    return array4;
  },

  // 获取当前时间
  getNowFormatDate:function(){
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hours=date.getHours();
      var minutes=date.getMinutes();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      var currentdate = month + seperator1 + strDate+' '+hours+':'+minutes;
      return currentdate;
  },

  // 比较两个时分钟（时间）
  compareTime:function(time){
    
      let hours1=parseInt(time.split(':')[0]);
      let minute1=parseInt(time.split(':')[1]);
      let nowTime=this.getNowFormatDate();
      let nowTimeArr=nowTime.split(' ')[1];
      let nowHours=parseInt(nowTimeArr.split(':')[0]);
      let nowMinute=parseInt(nowTimeArr.split(':')[1]);
      var returnData=2;
      console.log('时间比较：'+(nowMinute-minute1));
      console.log(hours1==nowHours);
      if(hours1==nowHours&&(nowMinute-minute1)>5){
        returnData= 1; 
       alert();
      }else if((nowHours-hours1)>0){
        let num=60+nowMinute;
        if((num-minute1)>5){
          returnData=1;
        }
      }
      return returnData;
  },
  //转意符换成普通字符
  escape2Html:function(str) {  
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"','\\':''};  
    return str.replace(/&(lt|gt|nbsp|amp|quot|\\);/ig,function(all,t){return arrEntities[t];});  
   }  

}
