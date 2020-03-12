<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-app-bar-nav-icon>
      <span class="font-weight-light">{{title}}</span>
      <v-spacer></v-spacer>
      <FinalizeButton v-if="$route.path.includes('waiter')"/>
      <v-switch v-model="darkMode" label="Darkmode" @change="$vuetify.theme.dark = darkMode" hide-details></v-switch>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <Sidebar :drawer="drawer" v-on:update-drawer="updateDrawer"/>
    <BottomNav />
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import BottomNav from './components/BottomNav.vue'
import FinalizeButton from './components/waiter/finalizeButton'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Sidebar,
    FinalizeButton,
    BottomNav
  },

  data: () => ({
    darkMode: true,
    drawer: false
  }),
  created: function () {
    this.$vuetify.theme.dark = this.darkMode
  },
  computed: {
    ...mapState('base', ['title'])
  },
  methods: {
    updateDrawer: function (newVal) {
      this.drawer = newVal
    }
  }
}
</script>
