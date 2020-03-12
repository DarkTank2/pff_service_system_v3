<template>
  <v-card>
    <v-card-title>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-btn block @click="handleCash">{{ selectedIds.length === 0 ? 'Zum Kassieren' : 'Servieren/Zum Kassieren' }}</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn block @click="handleSelection">{{ selectedIds.length === 0 ? 'Alles auswählen' : 'Alles abwählen' }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text>
      <v-list three-line rounded>
        <v-list-item-group v-model="selection" color="primary" multiple>
          <v-list-item v-for="orderedItem in orderedItems" :key="'notServed/OI/' + orderedItem.id" @click="handleItem(orderedItem)">
            <v-list-item-content>
              <v-list-item-title v-text="orderedItem.item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="orderedItem.extensions.map(ext => ext.name).join(', ')" v-if="orderedItem.extensions.length > 0"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="orderedItem.table.name + '/' + orderedItem.id + ', by ' + orderedItem.waiter"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              {{ orderedItem | quantity }}
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ServantServe',
  props: [],
  components: {},
  data () {
    return {
      selection: [],
      selectedIds: []
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchOrderedItems()
  },
  methods: {
    ...mapActions('ordered-items', {
      fetchOrderedItems: 'find',
      updateOrderedItem: 'update'
    }),
    handleItem: function ({ id: itemId }) {
      if (this.selectedIds.includes(itemId)) {
        this.selectedIds = this.selectedIds.filter(id => id !== itemId)
      } else {
        this.selectedIds.push(itemId)
      }
    },
    handleCash: function () {
      let promises = []
      if (this.selectedIds.length !== 0) {
        this.orderedItems
          .filter(({ id }) => this.selectedIds.includes(id))
          .forEach(orderedItem => {
            promises.push(this.updateOrderedItem([orderedItem.id, { ...orderedItem, served: orderedItem.quantity }, {}]))
          })
      }
      Promise.all(promises).then(() => {
        this.$router.push({ name: 'ServantCash', params: { tableId: this.tableId } })
        // :to="{ name: 'ServantCash', params: { tableId: this.$route.params.tableId } }"
      })
    },
    handleSelection: function () {
      if (this.selectedIds.length === 0) {
        this.orderedItems.forEach(({ id }, index) => {
          this.selection.push(index)
          this.selectedIds.push(id)
        })
      } else {
        this.selection = []
        this.selectedIds = []
      }
    }
  },
  computed: {
    ...mapGetters('ordered-items', {
      findOrderedItems: 'find'
    }),
    tableId: function () {
      return parseInt(this.$route.params.tableId)
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
      return item.quantity - item.served
    }
  }
}
</script>
