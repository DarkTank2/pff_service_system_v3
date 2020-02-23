<template>
  <v-form @submit.prevent="$emit('save')">
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="item.name"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="item.price" type="number" @change="item.price = parseFloat(item.price)"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-select :items="categories" item-value="id" item-text="name" v-model="item.categoryId" label="Kategorie"></v-select>
            </v-col>
            <v-col cols="12">
                <v-select :items="types" item-value="id" item-text="name" v-model="item.typeId" label="Typ"></v-select>
            </v-col>
            <v-col cols="12">
                <v-select :items="extensions" item-value="id" item-text="name" v-model="item.extensions" label="Erweiterungen" return-object multiple chips></v-select>
            </v-col>
            <v-col cols="4">
                <v-btn type="submit">Save</v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn @click="$emit('reset')">Reset</v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn @click="$emit('remove')">Delete</v-btn>
            </v-col>
        </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ItemForm',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters('categories', {
      categories: 'list'
    }),
    ...mapGetters('types', {
      types: 'list'
    }),
    ...mapGetters('extensions', {
      extensions: 'list'
    })
  }
}
</script>
