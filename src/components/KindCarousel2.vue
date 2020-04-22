<template>
    <!-- 当在组件的js中需要使用到某个标签时，可以给标签添加ref属性，然后在js中通过this.$refs取出这个标签  -->
    <v-touch @swipeleft="swipeHandle" @swiperight="swipeHandle">
    <div class="kind" :style="{height:height+20 + 'px'}" v-if="entries"> 
            <section class="page"  :key="0"  :style="calcLeft(0)">
                <div class="cell" v-for="e in pageData(pages)" >
                    <img :src="e.image_hash | urlFormatter" alt=""> <br>
                    <span>{{e.name}}</span>
                </div>
            </section>
            <section ref="page" class="page" v-for="n in pages" :key="n"  :style="calcLeft(n)">
                <div class="cell" v-for="e in pageData(n)" >
                    <img :src="e.image_hash | urlFormatter" alt=""> <br>
                    <span>{{e.name}}</span>
                </div>
            </section>
            <section  class="page"  :key="pages+1"  :style="calcLeft(pages+1)">
                <div class="cell" v-for="e in pageData(1)" >
                    <img :src="e.image_hash | urlFormatter" alt=""> <br>
                    <span>{{e.name}}</span>
                </div>
            </section>
        <section class="tip">
            <span v-for="n in pages" :class="n==index?'active':''"></span>
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
            // 记录显示轮播图页面的索引;
            index:1,
            // 是否重置索引
            isResetIndex:false
        }       
    },
    mounted() {
        // 窗口变化时，重新计算高度；
        window.onresize = this.calcHeight;
        this.getKindsData();
    },
    /**
          1       2       3       4       5 
index=0 ; 0       100%*1  100%*2  100%*3  100%*4
index=1 ; 100%*-1 100%*0  100%*1  100%*2  100%*3 
index=2 ; 100%*-2 100%*-1 100%*0  100%*1  100%*2  
index=4;  100%-4  100%*-3 100%*-2  100%*-1 100%*0
    延迟1s，将 n = 1 的left   变为 100*1 
index=5;  100%*0  100%*-4 100%*-3  100%*-2 100%*-1
    延迟1s，将n = 2 的left 变为 100%*1 
   left = ( n - 1 - index ) * 100% ;
         
     */ 
    methods: {
        getKindsData(){
            axios.get("/restapi/shopping/v2/entries").then((res)=>{
                console.log(res);
                this.entries = res.data[0].entries;
                this.pages = Math.ceil(this.entries.length/4);
                // 获取数据后，延迟一段时间，等待数据展示到页面上后，计算这一格的高度。
                setTimeout(this.calcHeight,500);
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        pageData(num){
            // num 1   0~9   (num-1)*10  
            // num 2   10~19 
            return this.entries.slice((num-1)*4,num*4);
        },
        calcHeight(){
            console.log(this.$refs);
            const ele = this.$refs.page[0];
            console.log(ele);
            console.log(ele.offsetHeight);
            this.height = ele.offsetHeight;
        },
        swipeHandle(event){
            console.log(event);
            if(event.type=="swipeleft"){
                // 左滑
                this.index += 1;
            }
             if(event.type=="swiperight"){
                // 右滑
                this.index -= 1;
             }
        },
        calcLeft(n){
            console.log(this.index);
            console.log(this.isResetIndex);
            // 判断是否是重置索引，是的话，瞬间变换，不需要动画
        
            if(this.isResetIndex){
                return {
                    left: + ( n - this.index  ) * 100  + '%',
                    transition:'none'
                }
            }else{
                return {
                    left: + ( n - this.index  ) * 100  + '%',
                    transition:'left 1s'
                }
            }
        }
    },
    watch:{
        index:function(newValue,oldValue){
            // 右边界 临界；  6 
            if(newValue == this.pages+1){
                // 延迟1s，保证动画完成
               setTimeout(()=>{
                    this.isResetIndex = true;
                    this.index = 1 ;
               },1000)
            }

            // 左边界: 0
            if(newValue == 0){
                setTimeout(()=>{
                    this.isResetIndex = true ;
                    this.index = this.pages ;
                },1000)
            }

            //中间部分，不是重置索引，将isResetIndex修改为false
            if(newValue > 1  && newValue < this.pages  ){
                this.isResetIndex = false;
            }

            // 修复 从5 --6 无动画的问题
            if(oldValue == this.pages && newValue == this.pages+1){
                this.isResetIndex = false;
            }
            // 修复 从1-->0 无动画问题
            if(oldValue == 1 && newValue == 0){
                this.isResetIndex = false;
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
}
.page .cell{
    width:50%;
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

