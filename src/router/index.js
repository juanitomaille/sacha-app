import Vue from 'vue'
import VueRouter from 'vue-router'
import Heater from '../views/Heater.vue'
//import Stats from '../views/Stats.vue'
//import Settings from '../views/Settings.vue'


import store from '@/store' // vuex store

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}


Vue.use(VueRouter)

const routes =  [
    {
        path: '/',
        name: 'Chaudière',
        component: Heater,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/stats',
        name: 'stats',
        component: () => import(/* webpackChunkName: "Stats" */ '../views/Stats.vue'),
        beforeEnter: ifAuthenticated,
    },{
        path: '/calendar',
        name: 'Calendrier',
        component: () => import(/* webpackChunkName: "Stats" */ '../views/Calendar.vue'),
        beforeEnter: ifAuthenticated,
    },{
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "Settings" */ '../views/Settings.vue'),
        beforeEnter: ifAuthenticated,
    },{
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Settings" */ '../views/Login.vue'),
        beforeEnter: ifNotAuthenticated,
    }]

const router = new VueRouter({
  routes
})

export default router
