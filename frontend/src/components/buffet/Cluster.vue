<template>
    <v-card @click="$emit('chosen')">
        <v-card-title :class="cluster.chosen === true ? 'red--text headline' : 'green--text headline'">
            {{ title }}
        </v-card-title>
        <v-card-text>
          <v-list subheader>
            <template v-for="orderedItem in cluster.orderedItems">
              <v-subheader :key="'subheader/' + orderedItem.id">{{ orderedItem | subheader }}</v-subheader>
              <v-list-item :key="'comment/' + orderedItem.id" v-if="orderedItem.comment !== ''">
                <v-list-item-title class="red--text">{{ orderedItem.comment }}</v-list-item-title>
              </v-list-item>
              <v-list-group value="true"  :key="'list-group/' + orderedItem.id" no-action>
                <template v-slot:activator>
                  <v-list-item-title @click="finalizeSingleOrderedItem(orderedItem)" :class="orderedItem.item.name.match(/[Gg]las/) || orderedItem.item.name.match(/[Ww]asser/) ? 'blue--text headline' : 'white--text headline'">
                    {{ orderedItem | itemTitle }}
                  </v-list-item-title>
                </template>
                <v-list-item v-for="(extension, index) in orderedItem.extensions" :key="'extension/' + orderedItem.id + '/' + index">
                  <v-list-item-title>{{ extension.name }}</v-list-item-title>
                </v-list-item>
              </v-list-group>
              <v-divider :key="'divider/' + orderedItem.id"></v-divider>
            </template>
          </v-list>
          <v-card-actions>
            <v-btn block @click="finalizeAll">Fertigstellen</v-btn>
          </v-card-actions>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex'
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
    ...mapActions('ordered-items', {
      updateOrderedItem: 'update'
    }),
    finalizeAll: function () {
      this.cluster.orderedItems.forEach(OI => {
        this.finalizeSingleOrderedItem(OI)
      })
    },
    finalizeSingleOrderedItem: function (orderedItem) {
      let obj = {
        ...orderedItem
      }
      obj.finished = obj.quantity
      this.updateOrderedItem([obj.id, obj, {}])
    }
  },
  computed: {
    title: function () {
      let orderTitle = this.cluster.orderedItems.length > 1 ? this.cluster.orderedItems[0].id + '-' + this.cluster.orderedItems[this.cluster.orderedItems.length - 1].id : this.cluster.orderedItems[0].id
      return this.cluster.table.name + '/' + orderTitle
    }
  },
  filters: {
    subheader: function (orderedItem) {
      return orderedItem.waiter + ' mit ' + orderedItem.table.name + '/' + orderedItem.id
    },
    itemTitle: function ({ item: { name = '' }, quantity = 0 }) {
      return name + ' x ' + quantity
    }
  }
}
</script>
