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
      <v-col cols="12">
        <v-text-field clearable clear-icon="close" v-model="filter" label="Filter" @click:clear="filter = ''"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12' sm='3' v-for="cat in categories" :key="cat.name">
        <v-card :to="{ name: 'waiterCategory', params: {categoryId: cat.id} }">
          <v-card-title>{{ cat.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'waiter',
  props: [],
  components: {},
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Kategorien',
          disabled: true
        }
      ],
      filter: ''
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchCategories()
  },
  methods: {
    ...mapActions('categories', {
      fetchCategories: 'find'
    })
  },
  computed: {
    ...mapGetters('categories', {
      listCategories: 'list',
      findcategories: 'find'
    }),
    categories: function () {
      return this.listCategories.filter(cat => cat.name.toLowerCase().includes(this.filter.toLowerCase()))
    }
  },
  watch: {}
}
</script>
