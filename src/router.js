import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router=new Router({
    mode:"hash", //1、hash哈希：有#号。2、history历史：没有#号
    base:process.env.BASE_URL,
    //记录滚动的位置解决白屏问题，必须配合keep-alive
    scrollBehavior (to, from, savedPosition){
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes:[
        {
            path:"/",
            name:"main",
            component:()=>import("./pages/home/index/index")
        },
        {
            path:"/admin",
            name:"admin",
            component:()=>import("./pages/admin/index/index"),
            redirect:"/admin/column",
            meta:{auth:true},
            children:[
                {
                    path:'column',
                    name:"栏目管理",
                    component:()=>import("./pages/admin/column/index"),
                    meta:{auth:true,keepAlive:false}
                },
                {
                    path:'user',
                    name:"查看会员",
                    component:()=>import("./pages/admin/user/index"),
                    meta:{auth:true,keepAlive:false}
                },
                {
                    path:"add_user",
                    name:"添加会员",
                    component:()=>import("./pages/admin/user/add"),
                    meta:{auth:true,keepAlive:false}
                },
                {
                    path:"order",
                    name:"订单管理",
                    component:()=>import("./pages/admin/order/index"),
                    meta:{auth:true,keepAlive:false}
                },
                {
                    path:"tongji",
                    name:"统计",
                    component:()=>import("./pages/admin/tongji/index"),
                    meta:{auth:true,keepAlive:false}
                }
            ]
        }
    ]
});

router.beforeEach((to,from,next)=>{
    if(to.meta.auth){
        if(Boolean(localStorage['isLogin'])){
            next();
        }else{
            next("/");
        }
    }else {
        next();
    }
});

export default router;
