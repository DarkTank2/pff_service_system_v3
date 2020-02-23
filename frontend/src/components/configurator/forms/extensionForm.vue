<template>
  <v-form @submit.prevent="$emit('save')">
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="item.name"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="item.priceModifier" type="number" @change="item.priceModifier = parseFloat(item.priceModifier)"></v-text-field>
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
export default {
  name: 'ExtensionForm',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
