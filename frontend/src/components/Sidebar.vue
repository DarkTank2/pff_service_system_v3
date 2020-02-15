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
            <!-- <v-list-item>
                <v-list-item-content>
                    <div class="pa-2">
                        <v-btn @click="handleHome" block>
                            <span>Home</span>
                            <v-icon>home</v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item> -->
            <!-- <v-list-item v-if="$route.fullPath.includes('/servant')">
                <v-list-item-content>
                    <div class="pa-2">
                        <v-btn block @click="handleRoleChange('/waiter')">
                            <span>Kellner/In</span>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$route.fullPath.includes('/waiter')">
                <v-list-item-content>
                    <div class="pa-2">
                        <v-btn block @click="handleRoleChange('/servant')">
                            <span>Servierer/In</span>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item> -->
            <!-- <v-list-item>
                <v-list-item-content>
                    <div class="pa-2">
                        <v-btn block @click="handleRefreshClick">
                            <span>Refresh</span>
                            <v-icon>refresh</v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item> -->
            <!-- <v-list-item v-if="$route.fullPath.includes('/waiter')">
                <v-list-item-content>
                    <div class="pa-2">
                        <v-btn block @click="handleLogOut">
                            <span>Abmelden</span>
                            <v-icon>logout</v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item> -->
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
    handleName: function (newName) {
      if (newName === null) newName = ''
      if (newName.length > 20) newName = newName.slice(0, 20)
      this.setName(newName)
      this.nameModel = this.getName
    },
    setTable: function (table) {
      this.setTableId(table.id)
    }
    // handleLogOut: function () {
    //     EventBus.$emit('change-title', '')
    //     window.localStorage.removeItem('waiterName')
    //     EventBus.$emit('reset-tables')
    //     this.$router.push('/')
    // },
    // handleRefreshClick: function () {
    //     EventBus.$emit('refresh')
    // },
    // handleHome: function () {
    //     EventBus.$emit('change-title', '')
    //     this.$router.push('/')
    // },
    // handleRoleChange: function (to) {
    //     EventBus.$emit('change-title', '')
    //     this.$router.push(to)
    // }
  },
  computed: {
    ...mapGetters('base', ['getName']),
    ...mapGetters('tables', {
      tables: 'list'
    })
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
