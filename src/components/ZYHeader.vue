<template>
    <div class="header">
        <p v-if="address">
        <img src="../assets/address.png" alt="地址图标">
        {{address.address}}
        </p> 
        <section :class="isFixed?'fixed':''">
            <div>
                <img src="../assets/search.png" alt="搜索图标">
                <span>搜索饿了么商家、商品名称</span>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"zyheader",
    props:['isFixed'],
    data(){
        return {
            address:null 
        }
    },
    mounted() {
        axios.get("/restapi/member/v2/users/14547420/location")
        .then((res)=>{
            console.log(res);

            this.address = res.data.addresses[0];
        }).catch((error)=>{
            console.log(error);
        })
    },
}
</script>

<style lang="" scoped>
.fixed{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index : 100;
}
.header{
    padding:10px;
    background:linear-gradient(to right,lightblue,blue);
}
p{
    line-height:30px;
    color:white;
    font-size:20px;
}
p img,section img{
    height:30px;
    vertical-align:bottom;
    margin:0;
}

section {
    color:gray;
    line-height:40px;
    text-align:center;
    background:linear-gradient(to right,lightblue,blue);
    padding:15px;
}
section div{
    background-color:white;
}
</style>