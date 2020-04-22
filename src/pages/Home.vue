<template>
    <div class="home" @scroll="scrollHandle" ref="home">
       <ZYHeader  ref="header" :isFixed="isFixed"></ZYHeader>
       <KindCarousel ref="carousel"></KindCarousel>
       <Rests  @sorttotop="sortToTopHandle" :sortFixed="sortFixed"></Rests>
    </div> 
</template>

<script>
import ZYHeader from '../components/ZYHeader'
import KindCarousel from '../components/KindCarousel2'

import Rests from '../components/Rests'
export default {
    name:"Home",
    components:{
        ZYHeader,
        KindCarousel,
        Rests
    },
    data(){
        return {
            isFixed:false,
            sortFixed:false
        }
    },
    methods: {
        scrollHandle(event){
            const scrollTop = event.target.scrollTop;
            console.log(event.target.scrollTop);
            if(scrollTop > 80){
                this.isFixed = true ;
            }else{
                this.isFixed = false ;
            }

            
            const height = this.getHeight();
            if(scrollTop>height){
                this.sortFixed = true;
            }else{
                this.sortFixed = false;
            }
        },
        sortToTopHandle(){
            console.log("父组件接收到消息了 sortToTop");
            this.isFixed = true;
            //计算滚动高度;
            const height = this.getHeight();
            this.$refs.home.scroll(0,height);
        },
        getHeight(){
            // 当ref所在的标签是组件标签时，this.$refs.名字得到的是组件对象，需要打点获取$el元素，也就是组件的根标签。
            const header = this.$refs.header.$el;
            const carousel = this.$refs.carousel.$el;
            console.log(header);

            const height = header.offsetHeight + carousel.offsetHeight + 60;
            console.log(height);
            return height;
        }
    },
}
</script>

<style lang="" scoped>
div.home{
    height:100%;
    overflow:scroll;
}
</style>