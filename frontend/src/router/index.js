import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Waiter from '../views/Waiter.vue'
import WaiterItem from '../views/WaiterItem.vue'
import WaiterCategory from '../views/WaiterCategory.vue'
import Configurator from '../views/Configurator.vue'
import Buffet from '../views/Buffet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/waiter',
    name: 'waiter',
    component: Waiter
  },
  {
    path: '/waiter/:categoryId',
    name: 'waiterCategory',
    component: WaiterCategory
  },
  {
    path: '/waiter/:categoryId/:itemId',
    name: 'waiterItem',
    component: WaiterItem
  },
  {
    path: '/configurator',
    name: 'configurator',
    component: Configurator
  },
  {
    path: '/buffet',
    name: 'buffet',
    component: Buffet
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
