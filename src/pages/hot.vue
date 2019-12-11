<template>
  <div class="hot">  
     <Footer></Footer>
  </div>
</template>

<script>
import { Button } from 'vant';
import Footer from '../components/footer.vue'
export default {
  name: 'hot',
  components:{
     [Button.name]: Button,
     Footer
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style lang='less' >
  .hot{
    
  }
 
</style>
