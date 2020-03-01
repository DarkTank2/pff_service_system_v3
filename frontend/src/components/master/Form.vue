<template>
  <v-form @submit.prevent="$emit('save')">
    <v-container>
        <v-row>
            <v-col cols="1">
              <v-text-field v-model="item.id" disabled label="Item ID"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field v-model="item.item.name" disabled label="Item Name"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field v-model="item.waiter" label="Kellner"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field v-model="item.comment" label="Kommentar"></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-text-field v-model="item.quantity" type="number" label="#Anzahl"></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-text-field v-model="item.finished" type="number" label="#Fertig"></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-text-field v-model="item.served" type="number" label="#Serviert"></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-text-field v-model="item.cashed" type="number" label="#Kassiert"></v-text-field>
            </v-col>
            <v-col cols="1">
                <v-btn type="submit">Save</v-btn>
            </v-col>
        </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
  name: 'OrderedItemForm',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  mounted: function () {},
  computed: {},
  methods: {}
}
</script>
