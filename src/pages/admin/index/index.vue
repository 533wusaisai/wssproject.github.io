<template>
    <div>
        <div :class="{left:true,slide:!isLeftShow}">
            <div class="logo">后台管理</div>
            <div class="column-wrap">
                <LeftColumn :columns="columns" @goPage="goPage($event)" @getColumnName="getColumnName($event)"></LeftColumn>
            </div>
        </div>
        <div :class="{main:true,full:!isLeftShow}">
            <div class="header">
                <div :class="{'slider-icon':true,rotate:!isLeftShow}" @click="changeLeft()">
                    <div class="line"></div>
                </div>
                <div class="nav-position">
                    首页 {{positionName}}
                </div>
                <div class="out-login" @click="outLogin()">安全退出</div>
            </div>
            <div class="nav" v-if="tags.length>1">
                <div class="arrow" @click="moveLeft()">&lt;</div>
                <div class="tags" ref="tags">
                    <div class="tags-data" ref="tags-data" :style="{left:moveVal+'px'}">
                        <div v-for="(item,index) in tags" :key="index" :class="{item:true ,active:item.isLnkActive}" @click="goTabgsPage(item.path,index)">{{item.title}}<div class="close"  v-show="index>0" @click.stop="closeTags(index)">X</div></div>
                    </div>
                </div>
                <div class="arrow" @click="moveRight()">&gt;</div>
            </div>
            <div style="width:100%;height:87vh;overflow:hidden;">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import LeftColumn from '../../../components/leftcolumn';
    export default {
        data(){
            return {
               isLeftShow:true,
                columns:[
                    {
                        title:"栏目管理",
                        path:"/admin/column",
                        isActive:false,//点击后的颜色
                        isLnkActive:false//点击链接后的颜色
                    },
                    {
                        title:"会员管理",
                        isActive:false,
                        isLnkActive:false,
                        children:[
                            {
                                title:"查看",
                                path:"/admin/user",
                                isActive:false,
                                isLnkActive:false
                            },
                            {
                                title:"添加",
                                path:"/admin/add_user",
                                isActive:false,
                                isLnkActive:false
                            }
                        ]
                    },
                    {
                        title:"订单管理",
                        isActive:false,
                        isLnkActive:false,
                        children:[
                            {
                                title:"查看",
                                path:"/admin/order",
                                isActive:false,
                                isLnkActive:false
                            },
                        ]
                    },
                    {
                        title:"百度",
                        isActive:false,
                        isLnkActive:false,
                        isLink:true,//是否外链
                        path:"http://www.baidu.com"
                    },
                    {
                        title:"统计",
                        isActive:false,
                        isLnkActive:false,
                        children:[
                            {
                                title:"营销统计",
                                isActive:false,
                                isLnkActive:false,
                                children:[
                                    {
                                        title:"课程统计",
                                        isActive:false,
                                        isLnkActive:false,
                                        path:"#/admin/tongji",
                                        isLink:true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                positionName:"",
                tags:[
                    {
                        title:"首页",
                        path:"/admin/column",
                        isLnkActive:true
                    }
                ],
                moveVal:0,
                columnStr:""
            }
        },
        components:{
            LeftColumn
        },
        created(){
            this.changeColumnPathStyle(this.$route.path);
        },
        methods:{
            goPage(data){
                if(data.isLink){//如果是外链
                    window.open(data.path,'_blank');
                }else {
                    this.$router.replace(data.path);
                    this.clearColumnStyle();
                    this.changeColumnPathStyle(data.path);
                }
            },
            getColumnName(name){
                this.changeColumnStyle(name)
            },
            changeColumnPathStyle(path,parentData,data){
                data=data || this.columns;
                if(data && data.length>0){
                    for(let i=0;i<data.length;i++){
                        if(data[i].path==path){
                            if(!data[i].children || data[i].children.length<=0){
                                this.positionName="";
                                data[i].isLnkActive=true;
                                if(parentData) {
                                    parentData.isActive=true;
                                    this.positionName +=" / "+ parentData.title + " / " + data[i].title;
                                }else{
                                    this.positionName=" / "+data[i].title;
                                }
                                //添加tags标签
                                this.addTags({
                                    title:data[i].title,
                                    path:data[i].path,
                                    isLnkActive:data[i].isLnkActive
                                })
                            }
                            break;
                        }
                        if(data[i].children && data[i].children.length>0){
                            this.changeColumnPathStyle(path,data[i],data[i].children);
                        }
                    }
                }

            },
            //添加tags数据
            addTags(data){
                let isSame=false;
                if(this.tags.length>0){
                    for(let key in this.tags){
                        if(this.tags[key].isLnkActive){
                            this.tags[key].isLnkActive=false;
                        }
                    }
                    for(let key in this.tags){
                        if(this.tags[key].path===data.path){
                            isSame=true;
                            this.tags[key].isLnkActive=true;
                            break;
                        }
                    }
                }
                if(!isSame){
                    this.tags.push(data)
                }
            },
            //关闭tags数据
            closeTags(index){
                let prevPath=this.tags[index-1].path;
                this.tags[index-1].isLnkActive=true;
                this.$set(this.tags,index-1,this.tags[index-1]);
                this.clearColumnStyle();
                this.changeColumnPathStyle(prevPath);
                this.$router.replace(prevPath);
                this.tags.splice(index,1);
            },
            //点击便签切换页面
            goTabgsPage(path,index){
                this.clearColumnStyle();
                this.changeColumnPathStyle(path);
                if(this.tags.length>0){
                    for(let key in this.tags){
                        if(this.tags[key].isLnkActive){
                            this.tags[key].isLnkActive=false;
                            break;
                        }
                    }
                }
                this.tags[index].isLnkActive=true;
                this.$set(this.tags,index,this.tags[index]);
                this.$router.replace(path);
            },
            clearColumnStyle(data){
                data=data || this.columns;
                for(let i=0;i<data.length;i++){
                    if(data[i].isLnkActive==true){
                        data[i].isLnkActive=false;
                        break;
                    }
                    if(data[i].children && data[i].children.length>0){
                        this.clearColumnStyle(data[i].children);
                    }
                }
            },
            changeColumnStyle(name,parentName,data){
                data=data || this.columns;
                if(data.length>0){
                    this.clearColumnStyle();
                        for(let i=0;i<data.length;i++){
                            //data[i].isLnkActive=false;
                            if(data[i].title==name){
                                data[i].isActive=!data[i].isActive;
                                if(!data[i].children || data[i].children.length<=0){
                                    this.positionName="";
                                    data[i].isLnkActive=true;
                                    if(parentName) {
                                        this.positionName +=" / "+ parentName + " / " + data[i].title;
                                    }else{
                                        this.positionName=" / "+name;
                                    }
                                }
                                break;
                            }
                            if(data[i].children && data[i].children.length>0){
                                this.changeColumnStyle(name,data[i].title,data[i].children);
                            }
                        }
                }
            },
            outLogin(){
                this.$store.commit("admin/OUT_LOGIN");
                this.$router.replace("/");
            },
            changeLeft(){
                this.isLeftShow=!this.isLeftShow;
            },
            moveRight(){
                let tags=this.$refs['tags'];
                let tagsData=this.$refs['tags-data'];
                let offsetVal=Math.abs(parseInt(tagsData.style.left));
                if(tagsData.offsetWidth>tags.offsetWidth && offsetVal<tags.offsetWidth){
                    this.moveVal+=-300;
                }
            },
            moveLeft(){
                let tagsData=this.$refs['tags-data'];
                let offsetVal=parseInt(tagsData.style.left);
                if(offsetVal<0){
                    this.moveVal-=-300;
                }
            }
        }
    }
</script>

<style scoped>
    .left{width:270px;min-height:100%;position: fixed;z-index: 1;left:0;top:0;background-color:#001529;overflow: auto;transition: width .3s;}
    .left.slide{width:0px;}
    .left .logo{width:60%;height:40px;margin:0 auto;background-color:#2d8cf0;margin-top:20px;border-radius: 5px;font-size:18px;color:#FFFFFF;line-height:40px;text-align:center;font-weight: bold;}
    .left .column-wrap{width:100%;}

    .main{width:auto;min-height:100vh;overflow-y: auto;margin-left:270px;}
    .main.full{width:100%;margin-left:0px;}
    .main .header{width:auto;height:60px;display:flex;align-items: center;padding-left:50px;position: relative;z-index:1;}
    .main .slider-icon{width:30px;height:auto;cursor:pointer;transition: transform 1s;}
    .main .slider-icon.rotate{transform: rotate(90deg);}
    .main .slider-icon .line{width:100%;height:4px;background-color:#5C6B77;margin-bottom:5px;}
    .main .slider-icon:before{width:100%;height:4px;background-color:#5C6B77;content:'';display:block;margin-bottom:5px;}
    .main .slider-icon:after{width:100%;height:4px;background-color:#5C6B77;content:'';display:block;}
    .main .header .nav-position{margin-left:20px;font-size:16px;}
    .main .out-login{width:auto;height:auto;position: absolute;right:40px;top:25px;cursor: pointer}

    .main .nav{width:100%;height:50px;background-color:#F0F0F0;display:flex;}
    .main .nav .arrow{width:30px;height:100%;background-color:#FFFFFF;font-size:20px;text-align:center;line-height:50px;cursor:pointer;}
    .main .nav .tags{width:auto;height:100%;flex:1;position: relative;z-index:1;overflow:hidden;}
    .main .nav .tags .item{width:auto;height:auto;background-color:#FFFFFF;font-size:16px;padding:8px 20px;margin-top:6px;margin-left:5px;margin-right:5px;position:relative;z-index:1;cursor:pointer;}
    .main .nav .tags .item.active{color:#2d8cf0}
    .main .nav .tags .item .close{width:auto;height:auto;position: absolute;right:5px;top:5px;z-index:1;font-size:12px;}
    .main .nav .tags .tags-data{width:auto;height:100%;position: absolute;z-index:1;left:0;top:0;display:-webkit-box;transition: left 1s;}
</style>
