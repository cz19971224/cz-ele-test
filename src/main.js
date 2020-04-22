// ES6 模块化方法  采用import进行模块导入;采用export进行模块导出。
// import 模块名 from '模块名' ；
// 默认从node_modules文件夹下找模块
import Vue from 'vue'

// 从当前路径下导入 App。文件后缀为vue时，默认缺省。
import App from './App'

import router  from "./router/index"
// vue-touch是vue的插件，支持手势操作
// 使用步骤：
// 1）安装  npm install vue-touch@next --save
// 2)在入口文件main.js中导入，采用Vue.use说明使用这个插件
// 3）会多一个组件v-touch,可以在这个组件上监听手势事件
import VueTouch from "vue-touch"

Vue.use(VueTouch,{name:"v-touch"});

//vue配置说明；生产环境下不要提示。
Vue.config.productionTip = false

// 新建Vue对象
// el:说明vue的使用范围
// components:注册局部组件；这里注册了一个外部导入的App组件
// template:视图模板;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
