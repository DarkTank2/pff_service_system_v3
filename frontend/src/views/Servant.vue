<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-list v-if="tables.length > 0">
          <template v-for="table in tables">
            <v-list-item :key="'servant/listItem/tables/' + table.id" :to="{ name: 'ServantBase', params: { tableId: table.id } }">
              {{ table | display }}
            </v-list-item>
            <v-divider :key="'servant/divider/tables/' + table.id"></v-divider>
          </template>
        </v-list>
        <v-alert v-if="tables.length === 0" outlined color="primary">Derzeit keine Tische zum bearbeiten verfügbar</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Servant',
  props: [],
  components: {},
  data () {
    return {
      selectedTables: [],
      finishedSelection: []
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchOrderedItems()
    this.fetchTables()
  },
  methods: {
    ...mapActions('ordered-items', {
      fetchOrderedItems: 'find'
    }),
    ...mapActions('tables', {
      fetchTables: 'find'
    }),
    toggle () {
      this.$nextTick(() => {
        if (this.tables.length === this.selectedTables.length && this.selectedTables.length > 0) {
          this.selectedTables = []
        } else {
          this.selectedTables = [...this.tables.map(({ id }) => id)]
        }
      })
    }
  },
  watch: {},
  computed: {
    ...mapGetters('ordered-items', {
      rawOrderedItems: 'list'
    }),
    ...mapGetters('tables', {
      allTables: 'list',
      findTables: 'find'
    }),
    filteredOrderedItems: function () {
      return this.rawOrderedItems.filter(({ cashed, served, quantity, finished }) => quantity === finished && (cashed < quantity || served < quantity))
    },
    tableFilteredOrderedItems: function () {
      return this.filteredOrderedItems.filter(({ tableId }) => this.selectedTables.includes(tableId))
    },
    finishedOrderedItems: function () {
      return this.tableFilteredOrderedItems.filter(({ quantity, served }) => quantity > served)
    },
    servedOrderedItems: function () {
      return this.tableFilteredOrderedItems.filter(({ quantity, served, cashed }) => quantity > cashed && cashed < served)
    },
    allText: function () {
      if (this.tables.length === this.selectedTables.length && this.selectedTables.length > 0) return 'Alles Abwählen'
      return 'Alles Auswählen'
    },
    tables: function () {
      let ids = []
      this.filteredOrderedItems.forEach(({ tableId }) => {
        if (!ids.includes(tableId)) ids.push(tableId)
      })
      return this.findTables({
        query: {
          id: {
            $in: ids
          }
        }
      }).data
    }
  },
  filters: {
    display: function ({ name }) {
      return 'Tisch Nr.: ' + name
    }
  }
}
</script>
