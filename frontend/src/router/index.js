import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Waiter from '../views/Waiter.vue'
import WaiterItem from '../views/WaiterItem.vue'
import WaiterCategory from '../views/WaiterCategory.vue'
import Configurator from '../views/Configurator.vue'
import Buffet from '../views/Buffet.vue'
import Servant from '../views/Servant.vue'
import Master from '../views/Master.vue'
import Hierarchy from '../views/Hierarchy.vue'
import Scoreboard from '../views/Scoreboard.vue'
import ServantWrapper from '../views/ServantWrapper.vue'
import ServantBase from '../views/ServantBase.vue'
import ServantServe from '../views/ServantServe.vue'
import ServantCash from '../views/ServantCash.vue'

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
    path: '/servant',
    name: 'servant',
    component: Servant
  },
  {
    path: '/servant/:tableId',
    component: ServantWrapper,
    children: [
      {
        path: '',
        component: ServantBase,
        name: 'ServantBase'
      },
      {
        path: 'serve',
        name: 'ServantServe',
        component: ServantServe
      },
      {
        path: 'cash',
        name: 'ServantCash',
        component: ServantCash
      }
    ]
  },
  {
    path: '/master',
    name: 'master',
    component: Master
  },
  {
    path: '/hierarchy',
    name: 'hierarchy',
    component: Hierarchy
  },
  {
    path: '/scoreboard',
    name: 'scoreboard',
    component: Scoreboard
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
