<template>
  <v-container>
    <v-row>
      <v-col cols='1'>
        <v-dialog v-model='configModel' width='500'>
          <template v-slot:activator='{ on }'>
            <v-btn dark v-on='on' block>CONFIGURIEREN</v-btn>
          </template>
          <v-card>
            <v-container>
              <v-row>
                <v-col cols='12'>
                  <v-select
                    chips
                    label='Items'
                    :items='items'
                    multiple
                    v-model='itemSelection'
                    item-text='name'
                    item-value='id'
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols='12'>
                  <v-select
                    chips
                    label='Kategorien'
                    :items='categories'
                    multiple
                    v-model='categorySelection'
                    item-text='name'
                    item-value='id'
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols='12'>
                  <v-select
                    chips
                    label='Typen'
                    :items='types'
                    multiple
                    v-model='typeSelection'
                    item-text='name'
                    item-value='id'
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols='12'>
                  <v-btn block dark>CLOSE</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
        <v-col cols="4" v-for="(cluster, index) in clusteredOrderedItems" :key="'cluster-' + index">
            <Cluster :cluster="cluster"/>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Cluster from '../components/buffet/Cluster.vue'
export default {
  name: 'Buffet',
  props: [],
  components: {
    Cluster
  },
  data () {
    return {
      configModel: null,
      categorySelection: [],
      typeSelection: [],
      itemSelection: []
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchItems()
    this.fetchCategories()
    this.fetchTypes()
    this.fetchOrderedItems()
  },
  methods: {
    ...mapActions('items', {
      fetchItems: 'find'
    }),
    ...mapActions('categories', {
      fetchCategories: 'find'
    }),
    ...mapActions('types', {
      fetchTypes: 'find'
    }),
    ...mapActions('ordered-items', {
      fetchOrderedItems: 'find'
    })
  },
  watch: {},
  computed: {
    ...mapGetters('items', {
      items: 'list',
      findItems: 'find'
    }),
    ...mapGetters('categories', {
      categories: 'list'
    }),
    ...mapGetters('types', {
      types: 'list'
    }),
    ...mapGetters('ordered-items', {
      findOrderedItems: 'find',
      orderedItems: 'list'
    }),
    clusteredOrderedItems: function () {
      let typeItems = []
      let categoryItems = []
      let items = []
      let orderedItems = []
      if (this.typeSelection.length > 0) {
        typeItems = this.findItems({
          query: {
            typeId: {
              $in: this.typeSelection.map(type => type.id)
            }
          }
        }).data.map(item => item.id)
      }
      if (this.categorySelection.length > 0) {
        categoryItems = this.findItems({
          query: {
            categoryId: {
              $in: this.categorySelection.map(cat => cat.id)
            }
          }
        }).data.map(item => item.id)
      }
      items = [...this.itemSelection.map(item => item.id), ...typeItems, ...categoryItems]
      if (items.length === 0) {
        orderedItems = this.orderedItems
      } else {
        orderedItems = this.findOrderedItems({
          query: {
            itemId: {
              $in: items
            }
          }
        }).data
      }
      let cluster = {
        orderedItems: [],
        table: {}
      }
      let clusters = []
      orderedItems.forEach(OI => {
        if (cluster.orderedItems.length === 0) {
          // new cluster
          cluster.orderedItems.push(OI)
          cluster.table = OI.table
        } else {
          if (cluster.table.id === OI.tableId) {
            cluster.orderedItems.push(OI)
          } else {
            clusters.push(JSON.parse(JSON.stringify(cluster)))
            cluster.orderedItems = [OI]
            cluster.table = OI.table
          }
        }
      })
      if (cluster.orderedItems.length > 0) {
        clusters.push(cluster)
      }
      return clusters
    }
  }
}
</script>
