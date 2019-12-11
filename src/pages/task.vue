<template>
  <div class="task">  
     <Footer></Footer>
  </div>
</template>

<script>
import { Button } from 'vant';
import Footer from '../components/footer.vue'
export default {
  name: 'task',
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
  .task{
    
  }
 
</style>
