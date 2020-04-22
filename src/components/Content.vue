<template>
    <div>
       <Cell v-for="r in rests" :key="r.restaurant.id" :rest="r.restaurant"></Cell>
    </div>
</template>
<script>
import axios from "axios"
import Cell from "./Cell"
export default {
    name:"Content",
    data(){
        return {
            rests:null
        }
    },
    components:{
        Cell
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData(){
            axios.get("/restapi/shopping/v3/restaurants")
            .then((res)=>{
                console.log(res)
                this.rests = res.data.items;
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }
}
</script>
<style scoped>

</style>