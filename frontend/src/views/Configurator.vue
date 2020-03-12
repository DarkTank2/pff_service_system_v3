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
        <v-row>
          <v-col cols="2">
            <v-btn block @click="exportConfig">
              <v-icon>file_download</v-icon>
              Export configuration
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-file-input v-model="uploadedFile" label="File input" accept=".json" clearable clear-icon="close"></v-file-input>
          </v-col>
          <v-col cols="2">
            <v-btn :disabled="uploadedFile === null || uploadedFile === undefined" @click="readFile">
              Validate and save
            </v-btn>
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
import { EqualityChecker } from '../services/equalityService'
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
      itemDialog: null,
      uploadedFile: null,
      fileContent: null
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
      fetchTables: 'find',
      createTable: 'create'
    }),
    ...mapActions('categories', {
      fetchCategories: 'find',
      createCategory: 'create'
    }),
    ...mapActions('items', {
      fetchItems: 'find',
      createItem: 'create'
    }),
    ...mapActions('types', {
      fetchTypes: 'find',
      createType: 'create'
    }),
    ...mapActions('extensions', {
      fetchExtensions: 'find',
      createExtension: 'create'
    }),
    ...mapActions('items-can-have-extensions', {
      fetchItemsExtensionsMap: 'find',
      createMap: 'create'
    }),
    exportConfig: function () {
      let path = 'config.json'
      let data = {
        tables: this.filteredTables.map(({ id, name }) => ({ id, name })),
        categories: this.filteredCategories.map(({ id, name }) => ({ id, name })),
        items: this.filteredItems.map(({ id, name, category, type, price, extensions }) => ({ id, name, category, type, price, extensions })),
        types: this.filteredTypes.map(({ id, name }) => ({ id, name })),
        extensions: this.filteredExtensions.map(({ id, name, priceModifier }) => ({ id, name, priceModifier })),
        itemsCanHaveExtensions: this.itemsExtensionsMap.map(({ extensionId, itemId }) => ({ extensionId, itemId }))
      }
      let e = document.createElement('a')
      e.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)))
      e.setAttribute('download', path)
      e.style.display = 'none'
      document.body.appendChild(e)
      e.click()
      document.body.removeChild(e)
    },
    readFile: function () {
      if (!this.uploadedFile) return
      let reader = new FileReader()
      let that = this
      reader.onload = e => {
        let l = e && e.target && e.target.result
        if (l) {
          that.fileContent = JSON.parse(l)
          this.crossCheckContent()
        }
      }
      reader.onerror = e => {
        reader.abort()
      }
      reader.readAsText(this.uploadedFile)
    },
    crossCheckContent: function () {
      const { tables, items, categories, extensions, types } = this.fileContent
      let promises = []
      tables.forEach(table => {
        let foundTable = this.tables.find(existingTable => this.tableChecker.compare(existingTable, table))
        if (!foundTable) {
          this.createTable(table)
        }
      })
      types.forEach(type => {
        let foundType = this.types.find(existingType => this.typeChecker.compare(type, existingType))
        if (!foundType) {
          promises.push(this.createType(type).then(data => {
            type.newId = data.id
            return { type }
          }))
        }
      })
      categories.forEach(cat => {
        let foundCat = this.categories.find(existingCat => this.categoryChecker.compare(cat, existingCat))
        if (!foundCat) {
          promises.push(this.createCategory(cat).then(data => {
            cat.newId = data.id
            return { category: cat }
          }))
        }
      })
      extensions.forEach(ext => {
        let foundExt = this.extensions.find(existingExt => this.extensionChecker.compare(ext, existingExt))
        if (!foundExt) {
          promises.push(this.createExtension(ext).then(data => {
            ext.newId = data.id
            return { extension: ext }
          }))
        }
      })

      Promise.all(promises).then(data => {
        items.forEach(item => {
          let foundItem = this.items.find(existingItem => this.itemChecker.compare(item, existingItem))
          if (!foundItem) {
            let type = this.types.find(type => this.typeChecker.compare(type, item.type))
            let category = this.categories.find(cat => this.categoryChecker.compare(cat, item.category))
            let extensions = []
            item.extensions.forEach(ext => {
              extensions.push(this.extensions.find(existingExt => this.extensionChecker.compare(ext, existingExt)))
            })
            item.categoryId = category.id
            item.typeId = type.id
            item.extensions = extensions.map(ext => ({ id: ext.id }))
            this.createItem(item)
          }
        })
      })

      // not needed since the map is already created in backend
      // itemsCanHaveExtensions.forEach(map => {
      //   let foundMap = this.itemsExtensionsMap.find(existingMap => this.mapperChecker.compare(map, existingMap))
      //   if (!foundMap) {
      //   }
      // })
    }
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
    },
    tableChecker: function () {
      return new EqualityChecker()
        .addCheck(v => v.name)
    },
    categoryChecker: function () {
      return new EqualityChecker()
        .addCheck(v => v.name)
    },
    extensionChecker: function () {
      return new EqualityChecker()
        .addCheck(v => v.name)
        .addCheck(v => v.priceModifier)
    },
    mapperChecker: function () {
      return new EqualityChecker()
        .addForeignKeyChecker(v => v.extensionId, this.extensionChecker, this.fileContent.extensions, this.extensions, 'id')
        .addForeignKeyChecker(v => v.itemId, this.itemChecker, this.fileContent.items, this.items, 'id')
    }, // not working since the ids might differ, foreign id checker!! or linked checkers
    itemChecker: function () {
      return new EqualityChecker()
        .addCheck(v => v.name)
        .addCheck(v => v.price)
        .addLinkedChecker(v => v.category, this.categoryChecker)
        .addLinkedChecker(v => v.type, this.typeChecker)
        .addArrayCheck(v => v.extensions, this.extensionChecker)
    },
    typeChecker: function () {
      return new EqualityChecker()
        .addCheck(v => v.name)
    }
  }
}
</script>
