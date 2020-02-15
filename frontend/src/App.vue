<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-app-bar-nav-icon>
      <span class="font-weight-light">{{title}}</span>
      <v-spacer></v-spacer>
      <v-switch v-model="darkMode" label="Darkmode" @change="$vuetify.theme.dark = darkMode" hide-details></v-switch>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <Sidebar :drawer="drawer" v-on:update-drawer="updateDrawer"/>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',

  components: {
    Sidebar
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
