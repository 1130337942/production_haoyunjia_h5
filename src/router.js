import Vue from 'vue'//引入Vue
import Router from 'vue-router'//引入vue-router
Vue.use(Router);//Vue全局使用Router

export default new Router({
   // mode: "history",
    // base: '/hot/', 
    routes: [
        {
            path: '/',
            redirect: '/unauthorized',
        },
        {
            path: '/Login',
            name: 'Login',
            meta:{
                title:'一招盈零工平台'
            },
            component: () => import ('@/components/Login/Login')
        },
        // {
        //     path: '/upgrade', //系统升级中
        //     name: 'upgrade',
        //     meta:{
        //         title:'一招盈零工平台'
        //     },
        //     component: () => import ('@/components/Login/upgrade')
        // },
        {
            path: '/SignThePo',
            name: 'SignThePo',
            meta:{
                title:'电子合同'
            },
            component: () => import ('@/components/SignThePo/SignThePo')
        },
        {
            path: '/liberalProfessions',
            name: 'liberalProfessions',
            meta:{
                title:'自由职业者'
            },
            component: () => import ('@/components/liberalProfessions/liberalProfessions')
        },
        {
            path: '/Autonym',
            name: 'Autonym',
            meta:{
                title:'实名认证'
            },
            component: () => import ('@/components/Autonym/Autonym')
        },
        {
            path: '/unauthorized', //未授权
            name: 'unauthorized',
            component: () => import ('@/components/Login/unauthorized')
        }
    ]

})
