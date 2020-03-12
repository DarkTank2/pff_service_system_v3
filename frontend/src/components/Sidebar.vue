<template>
  <v-navigation-drawer v-model="drawerModel" app>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <span>Service</span>
          <span class="font-weight-light">Tool</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-text-field label="Dein Name" v-model="nameModel" clearable @change="handleName"></v-text-field>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-select :items="tables" @change="setTable" return-object item-text="name" label="Tisch-Nummer:"></v-select>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn :to="{ name: 'home' }" block>
            <span>Home</span>
            <v-icon>home</v-icon>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="additionalButton">
        <v-list-item-content>
          <v-btn block :to="additionalButton.to">
            <span>{{ additionalButton.text }}</span>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn block @click="refresh">
            <v-icon>refresh</v-icon>
            <span>Refresh</span>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Sidebar',
  props: ['drawer'],
  components: {

  },
  data () {
    return {
      randomNames: ['Starshine', 'Pumpkinface', 'Boo Hoo', 'Tarzan', 'Toto'],
      drawerModel: false,
      nameModel: ''
    }
  },
  created: function () {

  },
  mounted: function () {
    this.fetchName()
    this.fetchTables()
    this.drawerModel = this.drawer
    this.nameModel = this.getName
  },
  methods: {
    ...mapMutations('base', ['setName', 'fetchName', 'setTableId']),
    ...mapActions('tables', {
      fetchTables: 'find'
    }),
    ...mapActions('items', {
      fetchitems: 'find'
    }),
    ...mapActions('extensions', {
      fetchextensions: 'find'
    }),
    ...mapActions('types', {
      fetchtypes: 'find'
    }),
    ...mapActions('categories', {
      fetchcategories: 'find'
    }),
    ...mapActions('ordered-items', {
      fetchordereditems: 'find'
    }),
    ...mapActions('items-can-have-extensions', {
      fetchitemscanhaveextensions: 'find'
    }),
    handleName: function (newName) {
      if (newName === null) newName = ''
      if (newName.length > 20) newName = newName.slice(0, 20)
      this.setName(newName)
      this.nameModel = this.getName
    },
    setTable: function (table) {
      this.setTableId(table.id)
    },
    refresh: function () {
      this.fetchTables()
      this.fetchitemscanhaveextensions()
      this.fetchordereditems()
      this.fetchcategories()
      this.fetchtypes()
      this.fetchextensions()
      this.fetchitems()
    }
  },
  computed: {
    ...mapGetters('base', ['getName']),
    ...mapGetters('tables', {
      tables: 'list'
    }),
    path: function () {
      return this.$route.path
    },
    additionalButton: function () {
      let data = {
        to: {},
        text: ''
      }
      if (this.path.includes('waiter')) {
        data.to = { name: 'servant' }
        data.text = 'Zum Servieren'
      } else if (this.path.includes('servant')) {
        data.to = { name: 'waiter' }
        data.text = 'Zum Kellnern'
      } else {
        data = undefined
      }
      return data
    }
  },
  watch: {
    drawer: function (newVal) {
      this.drawerModel = newVal
    },
    drawerModel: function (newVal) {
      this.$emit('update-drawer', newVal)
    }
  }
}
</script>
