<template>
  <div class="buyhistory">
    <div class="startTime">
      <img src="../assets/img/date_search.png"/>
      <van-field v-model="starttime" placeholder="请输入开始时间" readonly @focus="start"/>
    </div>
    <div class="zhi">至</div>
    <div class="startTime">
      <img src="../assets/img/date_search.png"/>
      <van-field v-model="stoptime" placeholder="请输入开始时间" readonly @focus="stop"/>
    </div>
    <div class="startTime sureBtn">确定</div>
    <ul class="list_head">
      <li>
        <div>单号</div>
        <div>购买物品</div>
        <div>购买时间</div>
      </li>
    </ul>
    <ul class="list_data">
      <li>
        <div>20190902201</div>
        <div>超级vip包年</div>
        <div>2019-9-2</div>
      </li>
      <li>
        <div>20190902201</div>
        <div>超级vip包年</div>
        <div>2019-9-2</div>
      </li>
    </ul>
    <!-- 开始时间控件 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
        @cancel="cancel"
        :formatter="formatter"
      />
    </van-popup>
    <!-- 结束时间控件 -->
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        v-model="currentDate1"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm1"
        @cancel="cancel"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
import { Field, DatetimePicker, Popup } from 'vant'
export default {
  data () {
    return {
      starttime: '2017-12-12', // 开始时间
      stoptime: '2019-12-12', // 结束时间
      show: false,
      show1: false,
      minDate: new Date(),
      maxDate: new Date(2020, 11, 31),
      currentDate: new Date(), // 开始标准时间
      currentDate1: new Date() // 开始标准时间
    }
  },
  components: {
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  methods: {
    // 选择开始时间
    start () {
      this.show = true
    },
    // 选择结束时间
    stop () {
      this.show1 = true
    },
    // 点击确定
    confirm () {
      this.show = false
      this.starttime = this.currentDate.getFullYear() + '-' +
        (Number(this.currentDate.getMonth()) + 1) + '-' +
        this.currentDate.getDate()
      // this.starttime1 = new Date(this.currentDate).getTime() / 1000
    },
    confirm1 () {
      this.show1 = false
      this.stoptime = this.currentDate1.getFullYear() + '-' +
        (Number(this.currentDate1.getMonth()) + 1) + '-' +
        this.currentDate1.getDate()
    },
    // 点击取消
    cancel () {
      this.show = false
      this.show1 = false
    },
    // 处理控件显示的时间格式
    formatter (type, value) {
      // 格式化选择器日期
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value
    }
  }
}

</script>

<style lang="less">
  .buyhistory{
    width: 100%;
    padding-top: 85px;
    font-size: 22px;
    .startTime{
      position: relative;
      float: left;
      width: 246px;
      height: 70px;
      margin: 10px 19px 21px 19px;
      background: #161C2C;
      border-radius: 10px;
      .van-cell{
        padding: 0 25px;
        line-height: 70px;
        background: none;
        .van-field__control{
          color: #D5D5D5!important;
          font-size: 22px;
        }
      }
      img{
        position: absolute;
        right: 35px;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 38px;
      }
    }
    .startTime:nth-child(2){
      margin-left: 19px;
    }
    .zhi{
      float: left;
      line-height: 90px;
    }
    .sureBtn{
      width: 118px;
      line-height: 70px;
    }
    .van-hairline--top-bottom{
      height: 80px;
    }
    .list_head,.list_data{
      float: left;
      width: 100%;
      line-height: 88px;
      li{
        height: 88px;
        border-top: 1px solid #3E3F4A;
        div{
          float: left;
          width: calc(100%/3);
        }
      }
    }
    .list_head{
      font-size: 30px;
    }
  }
</style>
