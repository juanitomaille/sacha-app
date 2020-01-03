import Vue from 'vue'
import VueRouter from 'vue-router'
import Heater from '../views/Heater.vue'
//import Stats from '../views/Stats.vue'
//import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes =  [
    {
        path: '/',
        name: 'Chaudière',
        component: Heater,
    },
    {
        path: '/stats',
        name: 'stats',
        component: () => import(/* webpackChunkName: "Stats" */ '../views/Stats.vue'),
    },{
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "Settings" */ '../views/Settings.vue'),
    },
    {
        path:'*',
        redirect: '/home'
    }]

const router = new VueRouter({
  routes
})

export default router
