<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
   beforeMount(){
      var $cookie = this.$cookie; //这里通过判断手机号是否存在来控制页面刷新时去那个页面
      if(!this.$cookie.get('intermediary')){
        this.$router.push('/Login')
      }else{
        this.$router.push('/SignThePo')
      } 
    }
}
</script>