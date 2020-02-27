<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select :items="tables" v-model="selectedTables" multiple item-text="name" clearable item-value="id" label="Tischauswahl">
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 2">
              {{ item.name }}
            </v-chip>
            <span v-if="index === 3">(+{{ selectedTables.length - 3 }} weitere Tische)</span>
          </template>
          <template v-slot:prepend-item>
            <v-list-item
              ripple
              @click="toggle"
            >
              <v-list-item-content>
                <v-list-item-title>{{ allText }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list three-line>
          <v-list-item-group v-model="finishedSelection" multiple>
            <template v-for="orderedItem in finishedOrderedItems">
              <v-list-item :key="'finishedOI/' + orderedItem.id" :value="orderedItem">
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-action>
                    <v-checkbox
                      on-icon="checkbox-marked"
                      off-icon="checkbox-blank-outline"
                      :input-value="active"
                      :true-value="orderedItem"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="orderedItem.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="orderedItem.extensions.map(ext => ext.name).join(', ')"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="orderedItem.table.name + '/' + orderedItem.id + ', by ' + orderedItem.waiter"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar>
                    {{ orderedItem.quantity - orderedItem.served }}
                  </v-list-item-avatar>
                </template>
              </v-list-item>
              <v-divider :key="'OIDivider/' + orderedItem.id"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
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
      tables: 'list'
    }),
    filteredOrderedItems: function () {
      return this.rawOrderedItems.filter(({ cashed, served, quantity, finished }) => quantity === finished).filter(({ tableId }) => this.selectedTables.includes(tableId))
    },
    finishedOrderedItems: function () {
      return this.filteredOrderedItems.filter(({ quantity, served }) => quantity > served)
    },
    servedOrderedItems: function () {
      return this.filteredOrderedItems.filter(({ quantity, served, cashed }) => quantity > cashed && cashed < served)
    },
    allText: function () {
      if (this.tables.length === this.selectedTables.length && this.selectedTables.length > 0) return 'Alles Abwählen'
      return 'Alles Auswählen'
    }
  }
}
</script>
