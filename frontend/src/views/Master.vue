<template>
  <v-card>
    <v-card-title>
      <v-range-slider v-model="range" :min="1" :max="max">
        <template v-slot:prepend>
          <v-text-field
            :value="range[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="$set(range, 0, $event)"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="range[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="$set(range, 1, $event)"
          ></v-text-field>
        </template>
      </v-range-slider>
    </v-card-title>
    <v-card-text>
      <v-list>
        <template v-for="orderedItem in filteredOrderedItems">
          <v-list-item :key="'master/oi/' + orderedItem.id">
            <FeathersVuexFormWrapper :item="orderedItem" watch>
              <template v-slot="{ clone, save }">
                <ItemForm :item="clone" @save="save()"></ItemForm>
              </template>
            </FeathersVuexFormWrapper>
          </v-list-item>
          <v-divider :key="'master/divider/' + orderedItem.id"></v-divider>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { FeathersVuexFormWrapper } from 'feathers-vuex'
import ItemForm from '../components/master/Form'
import Vue from 'vue'
export default {
  name: 'Master',
  props: [],
  components: {
    FeathersVuexFormWrapper,
    ItemForm
  },
  data () {
    return {
      range: []
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchOrderedItems().then(data => {
      Vue.set(this.range, 0, 1)
      Vue.set(this.range, 1, data.pop().id)
    })
  },
  methods: {
    ...mapActions('ordered-items', {
      fetchOrderedItems: 'find'
    })
  },
  watch: {},
  computed: {
    ...mapGetters('ordered-items', {
      orderedItems: 'list'
    }),
    max: function () {
      if (this.orderedItems.length === 0) return 1
      return this.orderedItems[this.orderedItems.length - 1].id
    },
    filteredOrderedItems: function () {
      return this.orderedItems.filter(({ id }) => id >= this.range[0] && id <= this.range[1])
    }
  }
}
</script>
