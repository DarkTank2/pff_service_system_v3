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
      <v-col cols="12" sm="12">
        <v-list>
          <v-list-item-group v-model="selection" multiple return-object>
            <template v-for="extension in this.itemExtensions">
              <v-list-item :key="extension.name" :value="extension">
                <template v-slot:default="{ active, toggle }">
                <v-list-item-content>
                  {{ extension.name }}
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    :true-value="extension"
                    color="deep-purple accent-4"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-textarea v-model="comment" label="Kommentar" hint="Maximal 255 Zeichen!"></v-textarea>
      </v-col>
      <v-col cols="12" sm="12">
        <v-text-field v-model="quantity" type="number" label="Anzahl"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-btn block @click="sendOrderedItem"><v-icon>add</v-icon>Hinzufügen</v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackText }}
      <v-btn text @click="closeSnack">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'waiterItem',
  props: [],
  components: {},
  data () {
    return {
      selection: [],
      comment: '',
      quantity: 1,
      snackbar: false,
      snackText: ''
    }
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
    }),
    ...mapActions('ordered-items', {
      createOrderedItem: 'create'
    }),
    ...mapMutations('waiter', {
      addOrderedItemToOrder: 'addOrderedItem'
    }),
    sendOrderedItem: function () {
      this.quantity = parseInt(this.quantity)
      if (this.name === '' || this.name === undefined) {
        this.showSnack('Du hast keinen Namen!')
        return
      }
      if (!(this.tableId > 0)) {
        this.showSnack('Kein Tisch ausgewählt!')
        return
      }
      if (!(this.quantity > 0)) {
        this.showSnack('Kein Anzahl eingegeben!')
        return
      }
      this.comment = this.comment.length > 255 ? this.comment.substring(0, 255) : this.comment
      let orderedItem = {
        itemId: this.item.id,
        quantity: this.quantity,
        waiter: this.name,
        comment: this.comment,
        tableId: this.tableId,
        extensions: this.selection.map(ext => ({ id: ext.id, name: ext.name }))
      }
      this.addOrderedItemToOrder(orderedItem)
      this.quantity = 1
      this.selection = []
      this.comment = ''
      this.showSnack('Zu Bestellung hinzugefügt!')
      // this.createOrderedItem(orderedItem).then((item) => {
      //   this.quantity = 1
      //   this.selection = []
      //   this.comment = ''
      //   this.showSnack(item.id + ': Erfolgreich!')
      // }).catch(err => alert(JSON.stringify(err)))
    },
    showSnack: function (text) {
      this.snackText = text
      this.snackbar = true
      setTimeout(this.closeSnack, 2000)
    },
    closeSnack: function () {
      this.snackbar = false
      this.snackText = ''
    }
  },
  computed: {
    ...mapState('base', ['name', 'tableId']),
    ...mapGetters('items', {
      getItem: 'get'
    }),
    ...mapGetters('categories', {
      getCategory: 'get'
    }),
    item: function () {
      return this.getItem(parseInt(this.$route.params.itemId))
    },
    itemExtensions: function () {
      if (this.item === null) return []
      return this.item.extensions
    },
    category: function () {
      return this.getCategory(parseInt(this.$route.params.categoryId))
    },
    breadcrumbs: function () {
      if (this.category === null) return []
      if (this.item === null) return []
      return [{
        text: 'Kategorien',
        disabled: false,
        to: { name: 'waiter' },
        exact: true
      },
      {
        text: this.category.name,
        to: { name: 'waiterCategory', params: { categoryId: this.category.id } },
        disabled: false,
        exact: true
      },
      {
        text: this.item.name,
        disabled: true
      }]
    }
  },
  watch: {}
}
</script>
