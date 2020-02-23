<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-select v-model="tableModel" :items="filteredTables" return-object item-text="name" item-value="id" label="Tische" clearable clear-icon="close"></v-select>
            </v-col>
            <v-col cols="2">
                <v-dialog v-model="tableDialog" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn dark v-on="on" block>
                        CRUD
                        </v-btn>
                    </template>
                    <v-card>
                        <FeathersVuexFormWrapper :item="selectedTable" watch>
                            <template v-slot="{ clone, save, reset, remove }">
                                <TableForm
                                    :item="clone"
                                    @save="save()"
                                    @reset="reset"
                                    @remove="remove"
                                ></TableForm>
                            </template>
                        </FeathersVuexFormWrapper>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2">
                <v-select v-model="catModel" :items="filteredCategories" return-object item-text="name" item-value="id" label="Kategorien" clearable clear-icon="close"></v-select>
            </v-col>
            <v-col cols="2">
                <v-dialog v-model="categoryDialog" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn dark v-on="on" block>
                        CRUD
                        </v-btn>
                    </template>
                    <v-card>
                        <FeathersVuexFormWrapper :item="selectedCategory" watch>
                            <template v-slot="{ clone, save, reset, remove }">
                                <CategoryForm
                                    :item="clone"
                                    @save="save()"
                                    @reset="reset"
                                    @remove="remove"
                                ></CategoryForm>
                            </template>
                        </FeathersVuexFormWrapper>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2">
                <v-select v-model="typeModel" :items="filteredTypes" return-object item-text="name" item-value="id" label="Typen" clearable clear-icon="close"></v-select>
            </v-col>
            <v-col cols="2">
                <v-dialog v-model="typeDialog" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn dark v-on="on" block>
                        CRUD
                        </v-btn>
                    </template>
                    <v-card>
                        <FeathersVuexFormWrapper :item="selectedType" watch>
                            <template v-slot="{ clone, save, reset, remove }">
                                <TypeForm
                                    :item="clone"
                                    @save="save()"
                                    @reset="reset"
                                    @remove="remove"
                                ></TypeForm>
                            </template>
                        </FeathersVuexFormWrapper>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2">
                <v-select v-model="extensionModel" :items="filteredExtensions" return-object item-text="name" item-value="id" label="Erweiterungen" clearable clear-icon="close"></v-select>
            </v-col>
            <v-col cols="2">
                <v-dialog v-model="extensionDialog" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn dark v-on="on" block>
                        CRUD
                        </v-btn>
                    </template>
                    <v-card>
                        <FeathersVuexFormWrapper :item="selectedExtension" watch>
                            <template v-slot="{ clone, save, reset, remove }">
                                <ExtensionForm
                                    :item="clone"
                                    @save="save()"
                                    @reset="reset"
                                    @remove="remove"
                                ></ExtensionForm>
                            </template>
                        </FeathersVuexFormWrapper>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2">
                <v-select v-model="itemModel" :items="filteredItems" return-object item-text="name" item-value="id" label="Items" clearable clear-icon="close"></v-select>
            </v-col>
            <v-col cols="2">
                <v-dialog v-model="itemDialog" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn dark v-on="on" block>
                        CRUD
                        </v-btn>
                    </template>
                    <v-card>
                        <FeathersVuexFormWrapper :item="selectedItem" watch>
                            <template v-slot="{ clone, save, reset, remove }">
                                <ItemForm
                                    :item="clone"
                                    @save="save()"
                                    @reset="reset"
                                    @remove="remove"
                                ></ItemForm>
                            </template>
                        </FeathersVuexFormWrapper>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
// ToDo: Remove the 'remove'-functionality due to the fact, that deleted references my cause intteruption in use, remove functionality after finishing the project
import { FeathersVuexFormWrapper } from 'feathers-vuex'
import { mapGetters, mapActions } from 'vuex'
import TableForm from '../components/configurator/forms/tableForm.vue'
import CategoryForm from '../components/configurator/forms/categoryForm.vue'
import TypeForm from '../components/configurator/forms/typeForm.vue'
import ExtensionForm from '../components/configurator/forms/extensionForm.vue'
import ItemForm from '../components/configurator/forms/itemForm.vue'
export default {
  name: 'Configurator',
  props: [],
  components: {
    TableForm,
    CategoryForm,
    TypeForm,
    ExtensionForm,
    ItemForm,
    FeathersVuexFormWrapper
  },
  data () {
    return {
      tableModel: undefined,
      catModel: undefined,
      typeModel: undefined,
      extensionModel: undefined,
      itemModel: undefined,
      tableDialog: null,
      categoryDialog: null,
      typeDialog: null,
      extensionDialog: null,
      itemDialog: null
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchTables()
    this.fetchCategories()
    this.fetchItems()
    this.fetchTypes()
    this.fetchExtensions()
    this.fetchItemsExtensionsMap()
  },
  methods: {
    ...mapActions('tables', {
      fetchTables: 'find'
    }),
    ...mapActions('categories', {
      fetchCategories: 'find'
    }),
    ...mapActions('items', {
      fetchItems: 'find'
    }),
    ...mapActions('types', {
      fetchTypes: 'find'
    }),
    ...mapActions('extensions', {
      fetchExtensions: 'find'
    }),
    ...mapActions('items-can-have-extensions', {
      fetchItemsExtensionsMap: 'find'
    })
  },
  computed: {
    ...mapGetters('tables', {
      tables: 'list',
      getTable: 'get'
    }),
    ...mapGetters('categories', {
      categories: 'list',
      getCategory: 'get'
    }),
    ...mapGetters('items', {
      items: 'list',
      getItem: 'get'
    }),
    ...mapGetters('types', {
      types: 'list',
      getType: 'get'
    }),
    ...mapGetters('extensions', {
      extensions: 'list',
      getExtension: 'get'
    }),
    ...mapGetters('items-can-have-extensions', {
      itemsExtensionsMap: 'list'
    }),
    filteredTables: function () {
      return this.tables.filter(table => table.id !== 0)
    },
    filteredCategories: function () {
      return this.categories.filter(cat => cat.id !== 0)
    },
    filteredTypes: function () {
      return this.types.filter(type => type.id !== 0)
    },
    filteredExtensions: function () {
      return this.extensions.filter(ext => ext.id !== 0)
    },
    filteredItems: function () {
      return this.items.filter(item => item.id !== 0)
    },
    selectedTable: function () {
      const { Tables } = this.$FeathersVuex.api
      return this.tableModel === undefined ? new Tables() : this.getTable(this.tableModel.id)
    },
    selectedCategory: function () {
      const { Categories } = this.$FeathersVuex.api
      return this.catModel === undefined ? new Categories() : this.getCategory(this.catModel.id)
    },
    selectedType: function () {
      const { Types } = this.$FeathersVuex.api
      return this.typeModel === undefined ? new Types() : this.getType(this.typeModel.id)
    },
    selectedExtension: function () {
      const { Extensions } = this.$FeathersVuex.api
      return this.extensionModel === undefined ? new Extensions() : this.getExtension(this.extensionModel.id)
    },
    selectedItem: function () {
      const { Items } = this.$FeathersVuex.api
      return this.itemModel === undefined ? new Items() : this.getItem(this.itemModel.id)
    }
  }
}
</script>
