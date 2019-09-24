<template>
  <div>
      <ul>
        <li>
           <img src="./../../assets/upgrade.png" alt="">   
        </li>   
        <li>系统升级中！</li>
        <li>请稍后再试！</li>
        <li>给您带来的不便，我们深感歉意！</li>
      </ul>
  </div>
</template>

<script>

export default {
  name: "upgrade",
  // components: {

  // },
  // data() {

  // },
  // methods: {

  // },
  // created(){
      
  // }
};
</script>
<style lang="scss" scoped>
ul{
    text-align: center;
    padding-top:50%;
}
ul li:nth-child(1){
    //width:500px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
}
ul li:nth-child(1) img {
    width: auto;
    height: auto;
    max-width: 60%;
    max-height: 60%;
}
ul li:nth-child(2){
    font-size:18px;
    font-family:PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin: 30px 0 5px 0;
}
ul li:nth-child(3), ul li:nth-child(4){
    margin-bottom: 2px;
    font-size:13px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
}
</style>
