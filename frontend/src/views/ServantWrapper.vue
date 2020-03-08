<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ServantWrapper',
  props: [],
  components: {},
  data () {
    return {}
  },
  created: function () {},
  mounted: function () {
    this.fetchTables()
  },
  methods: {
    ...mapActions('tables', {
      fetchTables: 'find'
    })
  },
  watch: {},
  computed: {
    ...mapGetters('tables', {
      getTable: 'get'
    }),
    tableId: function () {
      return this.$route.params.tableId
    },
    table: function () {
      return this.getTable(this.tableId)
    },
    routeName: function () {
      return this.$route.name
    },
    breadcrumbs: function () {
      let data = []
      data.push({
        text: 'Tische',
        exact: true,
        to: { name: 'servant' }
      })
      if (this.table !== null && this.table !== undefined) {
        data.push({
          text: 'Tisch Nr.: ' + this.table.name || '',
          exact: true,
          to: { name: 'ServantBase', params: { tableId: this.tableId } }
        })
      }
      if (this.routeName === 'ServantServe') {
        data.push({
          text: 'Servieren',
          exact: true
        })
      }
      if (this.routeName === 'ServantCash') {
        data.push({
          text: 'Kassieren',
          exact: true
        })
      }
      return data
    }
  }
}
</script>
