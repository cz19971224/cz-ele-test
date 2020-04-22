<template>
  <div id="app">
    <ul class="tabbar">
      <li class="bar-item"> 
        <router-link to="/home">首页</router-link>
      </li>
      <li class="bar-item">
        <router-link to="/find">发现</router-link>
      </li>
      <li class="bar-item">
        <router-link to="/order">订单</router-link>
      </li>
      <li class="bar-item">
        <router-link to="/person">我的</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>

//默认导出 组件对象

// name:给组件起名。
// components:注册局部组件。
export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
*{
  box-sizing:border-box;
}
html{
  height:100%;
}
body{
  margin:0;
  height:100%;
  overflow:hidden;
}
h1{
  margin:0;
}
#app{
  height:100%;
}
.tabbar{
  position:fixed;
  left:0;
  bottom:0;
  width:100%;
  display:flex;
  z-index : 100;
  background-color:#f4f4f4;
  line-height:55px;
  margin:0;
  padding:0;
}
.bar-item{
  list-style:none;
  width:25%;
  text-align:center;
}
.bar-item a{
   text-decoration:none;
   color:black;
}
.bar-item a.router-link-active{
   color:blue;
}
</style>
