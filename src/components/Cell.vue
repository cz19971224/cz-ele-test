<template>
    <div class='item'>
  <div class='top'>
    <div class='left'>
      <img :src='rest.image_path | urlFormatter' class='restIcon'></img>
    </div>
    <div class='right'>
      <div>
        <div class='title'>{{rest.name}}</div>
        <div class='supports'>
          <span class='support' v-for=" s in rest.supports" :key="s.id">{{s.icon_name}}</span>
        </div>
      </div>
      <div class='rating'>
        <Rate :rate="rest.rating"></Rate>
        <span>{{rest.rating}}</span>
        <span class='orderNum'>月售{{rest.recent_order_num}}单</span>
      </div>
      <div>
        <div class='delivery'>
          <span>￥{{rest.float_minimum_order_amount}}起送</span>
          <span class='seperator'>|</span>
          <span>配送费￥{{rest.float_delivery_fee}}</span>
        </div>
        <div class='time'>
          <span>{{rest.distance}}km</span>
          <span class='seperator'>|</span>
          <span class='minute'>{{rest.order_lead_time}}分钟</span>
        </div>
      </div>
    </div>
  </div>
  <div class='middle'>
    <div :class='rest.activities.length > 2 ? "acLeft":""'>
      <div v-if="rest.isOpen">
        <div class='activity' v-for="a in rest.activities" :key="a.id">
          <span class='iconName' :style='"background-color:#" + item.icon_color'>{{a.icon_name}}</span>
          <span class='description'>{{item.description}}</span>
        </div>
      </div>
      <div v-else>
        <div class='activity'>
          <span class='iconName' :style='"background-color:#" + rest.activities[0].icon_color'>{{rest.activities[0].icon_name}}</span>
          <span class='description'>{{rest.activities[0].description}}</span>
        </div>
        <div class='activity'>
          <span class='iconName' :style='"background-color:#" + rest.activities[1].icon_color'>{{rest.activities[1].icon_name}}</span>
          <span class='description'>{{rest.activities[1].description}}</span>
        </div>
      </div>

    </div>

    <div class='acRight' v-if="rest.activities.length>2" @click.capture="changeIsOpen">
      <span>{{rest.activities.length}}个活动</span>
    </div>
  </div>
  <div class='bottom'>

  </div>
</div>
</template>
<script>
import Rate from "./Rate"
export default{
    name:"Cell",
    props:["rest"],
    data(){
        return {
            isOpen:false
        }
    },
    components:{
        Rate
    },
    methods: {
        changeIsOpen() {
            console.log("点击活动");
            this.isOpen = !this.isOpen;
        }
    },
    filters:{
        urlFormatter(oldValue){
            const first = "https://fuss10.elemecdn.com/";
            const second = oldValue.slice(0,1);
            const third = oldValue.slice(1,3);
            const forth = oldValue.slice(3);
            const fifth = ".png?imageMogr/thumbnail/!130x130r/gravity/Center/crop/130x130/";
            return `${first}${second}/${third}/${forth}${fifth}`;
        }
    }
}
</script>
<style>
.item{
  padding: 15px 15px;
  border-bottom: 1px solid #f4f4f4;
}

.left{
  width: 20%;
  display: inline-block;
}
.restIcon{
  width: 90%;
  height: 90%;
}

.right{
  width: 80%;
  display: inline-block;
  vertical-align: top;
}

.title{
  display: inline;
  vertical-align: top;
}
.supports{
  float: right;
  font-size: 1rem;
  width: 18%;
  text-align: right;
}
.support{
  border: 1px solid #f4f4f4;
  vertical-align: top;
  margin-right: 5px;
}

.rating{
  font-size: 1rem;
}

.orderNum{
  margin-left: 10px;
}
.delivery{
  font-size: 1rem;
  display: inline-block;
}
.time{
  float: right;
  font-size: 1rem;
  position: relative;
  top: 8px;
}
.minute{
  color: #0085ff;
}
.top{
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 5px;
}
.seperator{
  margin: 0 5px;
}

.middle{
  font-size: 1rem;
  padding-top: 5px;
}

.acLeft{
  display: inline-block;
  width: 86%;
}
.iconName{
  color: white;
  margin-right: 5px;
  border-radius: 2px;
}
.activity{
  margin-bottom: 5px;
}


.acRight{
  display: inline-block;
  width: 14%;
  vertical-align: top;
}
</style>