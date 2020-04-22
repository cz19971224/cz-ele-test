import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Find from '../pages/Find'
import Order from '../pages/Order'
import Person from '../pages/Person'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/home"
        },
        {
            path:"/home",
            component:Home
        },
        {
            path:"/find",
            component:Find
        },
        {
            path:"/order",
            component:Order
        },
        {
            path:"/person",
            component:Person
        }
    ]
})