<template>
  <v-card>
    <v-card-title>
      <v-btn block :to="{ name: 'ServantCash', params: { tableId: this.$route.params.tableId } }">Zum Kassieren</v-btn>
    </v-card-title>
    <v-card-text>
      <v-list three-line>
        <v-list-item v-for="orderedItem in orderedItems" :key="'notServed/OI/' + orderedItem.id" v-touch="{
          left: () => removeOI(orderedItem),
          right: () => addOI(orderedItem)
        }">
          <v-list-item-content>
            <v-list-item-title v-text="orderedItem.item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="orderedItem.extensions.map(ext => ext.name).join(', ')" v-if="orderedItem.extensions.length > 0"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="orderedItem.table.name + '/' + orderedItem.id + ', by ' + orderedItem.waiter"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            {{ orderedItem.served !== undefined ? orderedItem.quantity - orderedItem.served - orderedItem.selected : orderedItem.quantity - orderedItem.served }}
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ServantServe',
  props: [],
  components: {},
  data () {
    return {}
  },
  created: function () {},
  mounted: function () {},
  methods: {
    ...mapActions('ordered-items', {
      fetchOrderedItems: 'find'
    }),
    ...mapMutations('servant', [
      'addOrderedItem',
      'clearOrderedItems',
      'increaseServeOI',
      'decreaseServeOI'
    ]),
    ...mapActions('servant', [
      'updateSelection'
    ]),
    addOI: function (item) {
      this.addOrderedItem(item)
      this.increaseServeOI(item.id)
    },
    removeOI: function (item) {
      this.decreaseServeOI(item.id)
    }
  },
  computed: {
    ...mapGetters('ordered-items', {
      findOrderedItems: 'find'
    }),
    tableId: function () {
      return this.$route.params.tableId
    },
    orderedItems: function () {
      return this.findOrderedItems({
        query: {
          tableId: this.tableId
        }
      }).data.filter(({ served, quantity, finished }) => finished === quantity && served < quantity)
    }
  },
  filters: {
    quantity: function (item) {
      if (item.selected === undefined) return item.quantity - item.served
      return item.quantity - item.served - item.selected
    }
  }
}
</script>
