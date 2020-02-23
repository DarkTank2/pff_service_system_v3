<template>
    <v-card>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-text>
            {{ JSON.stringify(cluster.orderedItems.map(OI => OI.id)) }}
        </v-card-text>
    </v-card>
</template>
<script>
export default {
  name: 'Cluster',
  props: ['cluster'],
  components: {},
  data () {
    return {}
  },
  created: function () {

  },
  mounted: function () {

  },
  methods: {

  },
  computed: {
    title: function () {
      if (this.cluster && this.cluster.table) return this.cluster.table.name + '/' + this.cluster.orderedItems[0].id + '-' + this.cluster.orderedItems[this.cluster.orderedItems.length - 1].id
      return ''
    }
  }
}
</script>
