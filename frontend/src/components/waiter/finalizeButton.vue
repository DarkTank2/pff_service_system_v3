<template>
  <v-dialog v-model="dialog" scrollable>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">
        <v-icon>send</v-icon>
        Send
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Bestellung</v-card-title>
      <v-card-text>
        <v-list two-line>
          <v-list-item v-for="(oi, index) in order" :key="'listItem/' + index">
            <v-list-item-content>
              <v-list-item-title>{{ name(oi) }}</v-list-item-title>
              <v-list-item-subtitle>{{ oi.extensions.map(ext => ext.name).join(', ') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>{{ oi.quantity }}</v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="finalizeOrder"><v-icon>send</v-icon>Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'FinalizeButton',
  props: [],
  components: {},
  data () {
    return { dialog: false }
  },
  created: function () {},
  mounted: function () {},
  methods: {
    ...mapActions('waiter', {
      sendOrder: 'finalizeOrder'
    }),
    finalizeOrder: function () {
      this.sendOrder().then(() => { this.dialog = false })
    },
    name: function ({ itemId }) {
      return this.getItem(itemId).name
    }
  },
  watch: {},
  computed: {
    ...mapGetters('waiter', ['order']),
    ...mapGetters('items', {
      getItem: 'get'
    })
  }
}
</script>
