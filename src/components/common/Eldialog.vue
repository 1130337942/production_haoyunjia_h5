<!--
    使用自定义组件弹框

---->
<template>
    <div class="dialog-box ">
        <div class="bg-fixed"></div> 
        <div class="dialog-cont animated" > <!--:class="isShow?'zoomOut':'zoomIn'"-->
            <slot name="title">
                <div class="title">提示</div>
            </slot>
            <slot name="content">
                <van-field v-model="value" placeholder="请输入用户名" />
            </slot>
            <slot name="button" ></slot>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value:""
        }
    },
    props:{
        isEldialogShow:{
            type:Boolean,
            default:false
        }
    },
    created(){
        console.log(this.isShow)
    },
    mounted(){

    },
    methods:{
      
    }
}
</script>
<style lang="scss" scoped>
    @import "@/style/public.scss";
    %width90{
        width: 90%;
        margin: 0 auto;
    }
    @-webkit-keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    .zoomIn {
        -webkit-animation-name: zoomIn;
        animation-name: zoomIn;
    }
    @-webkit-keyframes zoomOut {
        from {
            opacity: 1;
        }

        50% {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        to {
            opacity: 0;
        }
    }

    @keyframes zoomOut {
        from {
            opacity: 1;
        }

        50% {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        to {
            opacity: 0;
        }
    }
    .zoomOut {
        -webkit-animation-name: zoomOut;
        animation-name: zoomOut;
    }
    .animated {
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    .fadeOut {
        -webkit-animation-name: fadeOut;
        animation-name: fadeOut;
    }
    @media (print), (prefers-reduced-motion: reduce) {
        .animated {
            -webkit-animation-duration: 1ms !important;
            animation-duration: 1ms !important;
            -webkit-transition-duration: 1ms !important;
            transition-duration: 1ms !important;
            -webkit-animation-iteration-count: 1 !important;
            animation-iteration-count: 1 !important;
        }
    }
    .dialog-box{
        
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 10000;
        top: 0px;
        left: 0px;
        .bg-fixed{
            background: rgba(0,0,0,.6);
            width: 100%;
            height: 100%;
            position: fixed;
        }
        .dialog-cont{
            position: fixed;
            width: 85%;
            // left: -50%;
            left: calc(50% - 42.5%);
            top: 25%;
            background: #ffffff;
            text-align: center;
            border-radius: 16px;
            overflow: hidden;
            
        }
       
        .title{
            margin-top: 24px;
            font-size: 20px;
        }
        .content{
            @extend %width90;
            margin-top:15px;
            margin-bottom: 26px;
        }
        .cont_test{
            width: 70%;
            margin: 0 auto;
            font-size: 14px;
            color: #999999;
            line-height: 22px;
        }
        .but{
            @extend %width90;
            border-radius:47px;
            height:47px;
            line-height: 47px;
            color: #FFF;
            &:nth-child(1){
                margin-top: 30px;
            }
            &:last-child{
                margin-top: 10px;
                margin-bottom: 24px;
            }
        }
        
        .confirm{
            background: $color1;
        }
        .cancel{
            border: solid 1px #DEDEDE;
            color: #999999;
        }
        .del{
            background: #EE382B;
        }
        
    }
    
    .show{
        display: block;
        .dialog-cont{
            @extend .zoomIn;
        }
    }
    .hide{
        display: none;
        .dialog-cont{
            @extend .fadeOut;
        }
    }
</style>