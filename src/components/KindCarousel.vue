<template>
    <!-- 当在组件的js中需要使用到某个标签时，可以给标签添加ref属性，然后在js中通过this.$refs取出这个标签  -->
     <v-touch @swipeleft="swipeHandle" @swiperight="swipeHandle">
        <div class="kind" :style="{height:height+20+'px'}">
            <section ref="page" class="page" v-for="n in pages" :key="n" :style="{left:(n-1-index)*100 + '%'}">
                <div class="cell" v-for="e in pageData(n)">
                    <img :src="e.image_hash | urlFormatter" alt=""> <br>
                    <span>{{e.name}}</span>
                </div>
            </section>
        <section class="tip">
            <span v-for="n in pages" :class="index==(n-1)?'active':''"></span>
        </section>
    </div>
     </v-touch>
</template>

<script>
import axios from 'axios'
export default {
    name:"KindCarousel",
    data(){
        return {
            entries:null,
            pages:0,
            height:0,
            index:0
        }
    },
    mounted() {
        // 窗口变化时，重新计算高度；
        window.onresize = this.calcHeight;
        this.getKindsData();
    },
    /**
          0       1       2       3       4 
index=0 ; 0       100%*1  100%*2  100%*3  100%*4
index=1 ; 100%*-1 100%*0  100%*1  100%*2  100%*3 
index=2 ; 100%*-2 100%*-1 100%*0  100%*1 100%*2  
   left = ( n - index ) * 100% ;
     */ 
    methods: {
        getKindsData(){
            axios.get("/restapi/shopping/v2/entries").then((res)=>{
                console.log(res);
                this.entries = res.data[0].entries;
                this.pages = Math.ceil(this.entries.length/10);
                // 获取数据后，延迟一段时间，等待数据展示到页面上后，计算这一格的高度。
                setTimeout(this.calcHeight,1000);
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        pageData(num){
            // num 1   0~9   (num-1)*10  
            // num 2   10~19 
            return this.entries.slice((num-1)*10,num*10);
        },
        calcHeight(){
            console.log(this.$refs);
            const ele = this.$refs.page[0];
            console.log(ele);
            this.height = ele.offsetHeight ;
        },
        swipeHandle(event){
            console.log(event);
            if(event.type=="swipeleft"){
                // 左滑
                this.index +=1;
            }
             if(event.type=="swiperight"){
                // 右滑
                this.index -= 1;
            }

            //越界
            if(this.index > 1){
                this.index = 0 ;
            }
            if(this.index < 0){
                this.index = 1 ;
            }
        }
    },
    filters:{
        // 7d8a867c870b22bc74c87c348b75528djpeg
        // https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/
        urlFormatter(oldValue){
            const first = "https://fuss10.elemecdn.com/";
            const second = oldValue.slice(0,1);
            const third = oldValue.slice(1,3);
            const forth = oldValue.slice(3);
            const fifth = ".jpeg?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/";
            return `${first}${second}/${third}/${forth}${fifth}`;
        }
    }
}

// 手势操作
</script>
<style lang="" scoped>
.kind{
    position:relative;
}
.page{
    display:flex;
    justify-content:space-start;
    align-items:center;
    flex-wrap:wrap;
    padding:10px;
    position:absolute;
    left:0;
    width:100%;
    transition: left 1s;
}
.page:nth-of-type(2){
    left:100%;
}
.page .cell{
    width:20%;
    text-align:center;
}
.page .cell img{
    width:80%;
}
.tip{
    text-align:center;
    position:absolute;
    left:0;
    width:100%;
    bottom:10px;
}
.tip span{
    display:inline-block;
    width:15px;
    height:2px;
    background-color:gray;
    margin:0 5px;
}
.tip .active{
    background-color:red;
}
</style>

