<template>
    <div>
        <span class="rating">
            <span class="dark">
                <img src="../assets/star2.svg" alt="">
            </span>
            <span class="light" :style="{width}">
                <img src="../assets/star.svg" alt="">
            </span> 
        </span>
    </div>
</template>
<script>
export default {
    name:"Rate",
    props:["rate"],
    computed: {
        width(){
            return this.rate / 5 * 60 + "px";
        }
    },
}
</script>
<style>
 .rating{
     width:60px;
        height:30px;
        display:inline-block;
        position:relative;
 }
 .light,.dark{
    display: inline-block;
    width: 60px;
    height: 30px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 30px;
 }
</style>