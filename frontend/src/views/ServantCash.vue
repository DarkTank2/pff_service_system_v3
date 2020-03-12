<template>
  <v-card>
    <v-card-title>
      <v-btn block @click="selectAll">Alles Auswählen</v-btn>
    </v-card-title>
    <v-card-text>
      <v-list three-line rounded>
        <v-list-item v-for="orderedItem in orderedItems" :key="'notCashed/OI/' + orderedItem.id" @click="handleClick(orderedItem)">
          <v-list-item-content>
            <v-list-item-title v-text="orderedItem.item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="orderedItem.extensions.map(ext => ext.name).join(', ')" v-if="orderedItem.extensions.length > 0"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="orderedItem.table.name + '/' + orderedItem.id + ', by ' + orderedItem.waiter"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            {{ orderedItem.selected + '/' + (orderedItem.quantity - orderedItem.cashed) }}
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'ServantCash',
  props: [],
  components: {},
  data () {
    return {
      orderedItems: []
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchOrderedItems()
  },
  methods: {
    ...mapActions('ordered-items', {
      fetchOrderedItems: 'find'
    }),
    ...mapMutations('servant', ['addOrderedItem', 'setSum', 'clearOrderedItems']),
    handleClick: function (item) {
      item.selected = item.quantity > (item.cashed + item.selected) ? item.selected + 1 : item.selected
      this.addOrderedItem(item)
      this.setSum()
    },
    selectAll: function () {
      this.clearOrderedItems()
      this.orderedItems.forEach(item => {
        const { quantity, cashed } = item
        item.selected = quantity - cashed
        this.addOrderedItem(item)
      })
      this.setSum()
    }
  },
  computed: {
    ...mapGetters('ordered-items', {
      findOrderedItems: 'find'
    }),
    ...mapState('servant', ['selection']),
    tableId: function () {
      return parseInt(this.$route.params.tableId)
    },
    filteredOrderedItems: function () {
      return this.findOrderedItems({
        query: {
          tableId: this.tableId
        }
      }).data
        .filter(({ served, quantity, finished, cashed }) => finished === quantity && served === quantity && cashed < quantity)
        .map(item => {
          return {
            ...item,
            selected: 0
          }
        })
    }
  },
  watch: {
    filteredOrderedItems: {
      handler: function () {
        if (this.filteredOrderedItems.length === 0) {
          this.$router.push({ name: 'servant' })
        }
        // add new ordered items if necessarry and update cashed property if needed
        this.filteredOrderedItems.forEach(item => {
          const { id: itemId } = item
          if (!this.orderedItems.map(({ id }) => id).includes(itemId)) {
            this.orderedItems.push(JSON.parse(JSON.stringify(item)))
          } else {
            let orderedItem = this.orderedItems.find(({ id }) => id === itemId)
            orderedItem.cashed = item.cashed
          }
        })
        // also look for already cashed items still in the list and remove them
        let ids = []
        this.orderedItems.forEach(item => {
          const { id: itemId } = item
          if (!this.filteredOrderedItems.map(({ id }) => id).includes(itemId)) {
            ids.push(itemId)
          }
        })
        this.orderedItems = this.orderedItems.filter(({ id }) => !ids.includes(id))
        // still bug where removed ordereditems still remain in the selection of the state, maybe intorduce clean-mutation where old entries get deleted, or provide array with removed ids
        // this.cleanSelection(ids)
      },
      immediate: true
    }
  }
}
</script>
