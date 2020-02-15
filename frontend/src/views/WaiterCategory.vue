<template>
  <v-container>
    <v-row>
      <v-col>
        <v-breadcrumbs divider=">" :items="breadcrumbs">
          <template v-slot:item="props">
            <v-breadcrumbs-item
            :to="props.item.to"
            :disabled="props.item.disabled"
            :exact="props.item.exact">
              {{props.item.text}}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12' sm='3' v-for="item in filteredItems" :key="item.name">
        <v-card :to="{ name: 'waiterItem', params: {categoryId: $route.params.categoryId, itemId: item.id} }">
          <v-card-title>{{ item.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'waiterCategory',
  props: [],
  components: {},
  data () {
    return {}
  },
  created: function () {},
  mounted: function () {
    this.fetchItems()
    this.fetchCategories()
  },
  methods: {
    ...mapActions('items', {
      fetchItems: 'find'
    }),
    ...mapActions('categories', {
      fetchCategories: 'find'
    })
  },
  computed: {
    ...mapGetters('items', {
      findItems: 'find'
    }),
    ...mapGetters('categories', {
      getCategory: 'get'
    }),
    filteredItems: function () {
      return this.findItems({
        query: {
          categoryId: parseInt(this.$route.params.categoryId)
        }
      }).data
    },
    category: function () {
      return this.getCategory(parseInt(this.$route.params.categoryId))
    },
    breadcrumbs: function () {
      if (this.category === null) return []
      return [{
        text: 'Kategorien',
        disabled: false,
        to: { name: 'waiter' },
        exact: true
      },
      {
        text: this.category.name || '',
        disabled: true
      }]
    }
  },
  watch: {}
}
</script>
