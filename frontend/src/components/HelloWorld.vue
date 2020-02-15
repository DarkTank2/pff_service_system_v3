<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm=4>
        <v-card>
          <v-card-title>Hello </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  data: () => ({

  }),
  created: function () {
    this.fetchTables()
    this.fetchCategories()
  },
  methods: {
    ...mapActions('tables', {
      fetchTables: 'find'
    }),
    ...mapActions('categories', {
      fetchCategories: 'find'
    })
  }
}
</script>
