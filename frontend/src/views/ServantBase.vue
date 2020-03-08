<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn block :to="{ name: 'ServantServe', params: { tableId: this.$route.params.tableId } }">Servieren</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn block :to="{ name: 'ServantCash', params: { tableId: this.$route.params.tableId } }">Kassieren</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'ServantBase',
  props: [],
  components: {},
  data () {
    return {}
  },
  created: function () {},
  mounted: function () {},
  methods: {},
  watch: {},
  computed: {}
}
</script>
