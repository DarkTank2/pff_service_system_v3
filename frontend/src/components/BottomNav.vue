<template>
  <v-bottom-navigation v-if="$route.name === 'ServantCash'" app>
    <v-btn disabled>{{ 'Summe: ' + sum }}</v-btn>
    <v-btn @click="handleCash">
      <span>Kassieren</span>
    </v-btn>
    <v-btn @click="clearOrderedItems">
      <span>Zurücksetzten</span>
    </v-btn>
    <v-snackbar v-model="snackbar">
      {{ snackText }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-bottom-navigation>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'BottomNavigation',
  props: [],
  components: {},
  data () {
    return {
      snackbar: false,
      snackText: 'Erfolgreich Kassiert!'
    }
  },
  created: function () {},
  mounted: function () {},
  methods: {
    ...mapActions('servant', {
      cashSelection: 'updateSelection'
    }),
    ...mapMutations('servant', ['clearOrderedItems', 'setSum']),
    handleCash: function () {
      this.cashSelection('cashed').then(() => {
        this.setSum()
        this.snackbar = true
        setTimeout(() => { this.snackbar = false }, 2000)
      })
    }
  },
  watch: {},
  computed: {
    ...mapState('servant', ['sum'])
  }
}
</script>
