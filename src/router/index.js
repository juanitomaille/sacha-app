import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes =     routes: [
        {
            path: '/home',
            name: 'Chaudière',
            component: Heater,
        },
        {
            path: '/stats',
            name: 'stats',
            component: Stats,
        },{
            path: '/settings',
            name: 'Settings',
            component: Settings,
        },
        {
            path:'*',
            redirect: '/home'
        }]

const router = new VueRouter({
  routes
})

export default router
