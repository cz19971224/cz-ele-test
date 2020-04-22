<template>
    <div class="bar" >
        <ul class="kind" v-if="shopInfo">
            <li @click="showSortHandle" :style="sortStyle">
                {{sortName}}
                <img src="../assets/arrow.png" alt="" srcset="">
            </li>
            <li v-for="o in  shopInfo.outside.outside_sort_filter">{{o.name}}</li>
            <li @click="showFilterHandle">筛选<img src="../assets/select.png" alt=""></li>
        </ul>

        <ul class="sort" :class="showSort" @click="hideHandle" v-if="shopInfo">
            <li v-for="o in shopInfo.outside.inside_sort_filter" @click="sortHandle(o.name)" :class="o.name==sortName?'selected':''">
                {{o.name}}
            </li>
        </ul>

        <div class="filter"  :class="showFilter" @click.self="hideFilterHandle" v-if="shopInfo"> 
            <section>
                <p>商家服务(可多选)</p>
                <ul>
                    <li v-for="s in shopInfo.bar.supports" @click="serviceHandle(s.id)" :style="serviceStyleHandle(s.id)">{{s.name}}</li>
                    <li style="background-color:white;"></li>
                </ul>
            </section>
            <section v-if="shopInfo">
                <p>优惠活动(单选)</p>
                <ul>
                    <li v-for="a in shopInfo.bar.activity_types" @click="activityHandle(a.id)" :style="activityStyleHandle(a.id)">{{a.name}}</li>
                </ul>
            </section>
            <section>
                <span @click="clearHandle">清空</span>
                <span @click="hideFilterHandle">确定</span>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios"

 export default  {
    data(){
        return {
                showSort: "hide",
                sortName: "综合排序",
                showFilter:"hide",
                services:[],
                activity:'',
                shopInfo:null
                }
    },
    computed: {
        sortStyle() {
            return this.showSort == "hide" ? {color:"black"} : {color:"blue"};
        }
    },
    mounted() {
        console.log(window);
        this.resizeHandle();
        window.onresize = this.resizeHandle;
        this.getData();
    },
    methods: {
        getData(){
            axios.get("/pizza/shopping/restaurants/batch_filter")
            .then((res)=>{
                console.log(res);
                this.shopInfo = res.data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        showSortHandle() {
            this.showSort = this.showSort == "hide" ? "show" : "hide";
            this.showFilter = "hide";
        },
        sortHandle(name) {
            this.sortName = name;
            this.showSort = "hide";
        },
        hideHandle() {
            this.showSort = "hide";
        },

        showFilterHandle(){
            this.showFilter = this.showFilter == "hide"?"show":"hide";
            this.showSort = "hide";
        },

        serviceStyleHandle(id){
            return this.services.indexOf(id)==-1?
            {
                backgroundColor:"#f4f4f4",
                color:"black"
            }:
            {
                backgroundColor:"#edf5ff",
                color:"#3190e8"
            }
        },

        serviceHandle(id){
            const index = this.services.indexOf(id);
            if(index == -1){
                // 没有，添加
                this.services.push(id);
            }else{
                // 有，删除
                this.services.splice(index,1);
            }
        },

        activityHandle(id){
            if( this.activity === id){
                // 说明之前这个已经选中，需要取消；
                this.activity = '';
            }else{
                // 说明之前这个没有选中，需要选中。
                this.activity = id;
            }
        },
        activityStyleHandle(id){
            return this.activity !== id ?
            {
                backgroundColor:"#f4f4f4",
                color:"black"
            }:
            {
                backgroundColor:"#edf5ff",
                color:"#3190e8"
            }
        },
        clearHandle(){
            this.activity = '';
            this.services = [];
        },
        
        hideFilterHandle(){
            this.showFilter = "hide";
        },


        resizeHandle(){
            console.log("窗口大小变化了");
            console.log(window.innerWidth);
            // < 375px 16px ;
            // >375px < 768px  16 * width/375 ;
            // >768   32.768px 
            const html = document.querySelector("html");
            if(window.innerWidth < 375){
                html.style.fonSize = "16px";
            }else if(window.innerWidth < 768){
                html.style.fontSize = `${16*window.innerWidth/375}px`;
            }else{
                html.style.fontSize = "32.768px";
            }
        }
    }
}
</script>

<style scoped>
ul {
    margin: 0;
}

ul>li {
    list-style: none;
}

.bar {
    position: relative;
    background-color:white;
}

.kind {
    display: flex;
    line-height: 50px;
    padding: 0 10px;
    justify-content: space-around;
}

.kind li {
    text-align: center;
}

.kind li:nth-child(1) {
    font-weight: bold;
}

.kind li img {
    height: 20px;
    vertical-align: middle;
}

.sort {
    border-top: 1px solid gray;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: calc(100vh - 50px);
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0;
}

.sort li {
    line-height: 40px;
    background-color: white;
    padding: 0 20px;
}

.hide {
    display: none;
}

.show {
    display: block;
}

.selected {
    background-image: url(../assets/right.png);
    background-position: 92% center;
    background-repeat: no-repeat;
    background-size: auto 80%;
    color: blue;
}

.filter{
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 50px;
    height: calc(100vh - 50px);
}
.filter section{
    padding: 0 10px;
    background-color: white;
}
.filter section p{
    margin: 0;
    padding: 10px 0;
}
.filter ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    line-height: 2.5rem;
    padding: 0;
}
.filter ul li{
    width: 31%;
    background-color: #f4f4f4;
    text-align: center;
    margin: 10px 0 ;
    font-size: 1rem;
}

.filter section:nth-child(3) {
    display: flex;
    box-shadow:0px -1px 1px #aaaaaa;
    padding: 0;
}
.filter section:nth-child(3) span{
    width: 50%;
    line-height: 3rem;
    text-align: center;
}
.filter section:nth-child(3) span:nth-child(1){
    background-color: #f4f4f4;
    color: gray;
}
.filter section:nth-child(3) span:nth-child(2){
    background-color: green;
    color: white;
}
    </style>