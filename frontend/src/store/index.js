import Vue from 'vue'
import Vuex from 'vuex'
import { FeathersVuex } from '../feathers-client'
import baseMutations from './base/mutations'
import baseGetters from './base/getters'
import baseActions from './base/actions'

Vue.use(Vuex)
Vue.use(FeathersVuex)

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

const base = {
  namespaced: true,
  state: {
    name: '',
    title: '',
    tableId: 0
  },
  mutations: baseMutations,
  getters: baseGetters,
  actions: baseActions
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    base
  },
  plugins: [...servicePlugins]
})
