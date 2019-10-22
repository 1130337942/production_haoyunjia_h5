<template>
    <div class="unauthorized">
        <div class="cont-box">{{cont}}</div>
    </div>
</template>
<script>
import { getByOrgAndCompanyId } from "@/api/api";
export default {
    name: 'unauthorized',
    data(){
        return{
            cont:''
        }
    },
    created() {
        this.personalizedFn()
    },
    methods:{
        personalizedFn(){
            let param = {
                param: JSON.stringify({
                    org: window.location.host,
                })
            };
            getByOrgAndCompanyId(param).then(res=>{
                // console.log(res)
                if(res.code * 1 === 0){
                    sessionStorage.setItem('title', res.data.title)
                    document.title = res.data.title
                    this.faviconFn(res.data.logoImage);
                    this.$router.push('/login')
                   
                }else{
                    //  this.$toast.fail('系统错误');
                    this.cont = res.message
                }
                
            
            }).catch(err=>{
                console.log(err)
            })
        },
        faviconFn(faviconUrl){
            var link = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = faviconUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }
}
</script>
<style lang="scss" scoped>
    .unauthorized{
        display: -webkit-flex;
        height: 100%;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
    }
</style>