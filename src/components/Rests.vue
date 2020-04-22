<template>
    <div>
        <p>——推荐商家——</p>
        <Sort @click.native="clickHandle" :class="(isFixed || sortFixed)?'fixed':''"></Sort>
        <Content></Content>
    </div>
</template>
<script>
import Sort from './Sort'
import Content from "./Content"
export default {
    name:"Rests",
    props:["sortFixed"],
    data(){
        return {
            isFixed:false
        }
    },
    watch:{
        sortFixed(newValue){
            if(newValue==false){
                this.isFixed = false;
            }
        }
    },

    components:{
        Sort,
        Content
    },
    methods: {
        clickHandle(){
            console.log("click");
            this.isFixed = true ;
            //子组件向父组件传值；告诉父组件进行滚动，让筛选条定位到最上面
            this.$emit("sorttotop");
        }
    },
}
</script>

<style lang="" scoped>
p{
    text-align:center;
} 
.fixed{
    position:fixed !important;
    left:0;
    top:70px;
    width:100%;
    z-index:100;
}
</style>