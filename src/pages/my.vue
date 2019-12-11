<template>
  <div class="my">  
     <Footer></Footer>
  </div>
</template>

<script>
import { Button } from 'vant';
import Footer from '../components/footer.vue'
export default {
  name: 'my',
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
  .my{
    
  }
 
</style>
