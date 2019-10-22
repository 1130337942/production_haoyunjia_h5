<template>
  <div id="app">
    <router-view ></router-view>
    <!-- <router-view v-wechat-title="title"></router-view> -->
  </div>
</template>

<script>
import { getByOrgAndCompanyId } from "@/api/api";
export default {
  name: 'app',
  
  //  beforeMount(){
  //     var $cookie = this.$cookie; //这里通过判断手机号是否存在来控制页面刷新时去那个页面
  //     if(!this.$cookie.get('intermediary')){
  //       this.$router.push('/Login')
  //     }else{
  //       this.$router.push('/SignThePo')
  //     } 
  //   }
  
}
</script>
<style lang="scss">
  @import "@/Style/public.scss";
  .personalized{
    /deep/ .van-button--default{
      background-color: $color1
    }
  }
</style>