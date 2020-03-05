<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-select label="Typen" :items="types" item-text="name" item-value="id" v-model="typeModel"></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text>
      <svg height="1000px" width="100%">
        <g
          font-family="sans-serif"
          font-size="20"
          stroke-linejoin="round"
          stroke-width="1"
          fill="white"
          font-weight="900"
          >
          <text
            v-for="(item, index) in root.descendants()"
            :key="'text/' + index"
            :dx="item.children && item.children.length > 0 && index > 0 ? '-6' : '6'"
            dy="5"
            :text-anchor="item.children && item.children.length > 0 && index > 0 ? 'end' : 'start'"
            stroke="#1E1E1E"
            :x="item.y"
            :y="item.x"
            >{{ item.data.name }}</text>
          </g>
          <g
            fill="none"
            stroke="#999"
            stroke-opacity="0.4"
            stroke-width="1.5"
            >
            <path
              v-for="(link, index) in root.links()"
              :key="'path/' + index"
              :d="linkGenerator([link.source, link.target])"
              />
          </g>
          <g>
            <circle
              v-for="(item, index) in root.descendants()"
              :key="'circle/' + index"
              :fill="item.children && item.children.length > 0 ? '#555' : '#999'"
              r="5"
              :cx="item.y"
              :cy="item.x"
              />
          </g>
      </svg>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import * as d3 from 'd3'
export default {
  name: 'Hierarchy',
  props: [],
  components: {},
  data () {
    return {
      typeModel: undefined,
      width: 1000,
      height: 1000
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchItems()
    this.fetchTypes()
  },
  methods: {
    ...mapActions('items', {
      fetchItems: 'find'
    }),
    ...mapActions('types', {
      fetchTypes: 'find'
    }),
    calcPath: function ([source, target]) {
      let origin = {
        x: source.y,
        y: source.x
      }
      let origin2 = {
        x: source.y + 100,
        y: source.x
      }
      let destination = {
        x: target.y,
        y: target.x
      }
      let destination2 = {
        x: target.y - 100,
        y: target.x
      }
      let d = 'M'
      d += origin.x + ',' + origin.y
      d += 'C'
      d += origin2.x + ',' + origin2.y
      d += ',' + destination2.x + ',' + destination2.y
      d += ',' + destination.x + ',' + destination.y
      return d
    }
  },
  watch: {},
  computed: {
    ...mapGetters('items', {
      findItems: 'find'
    }),
    ...mapGetters('types', {
      types: 'list',
      getType: 'get'
    }),
    data: function () {
      if (this.typeModel === undefined) return {}
      let { name, id: typeId } = this.getType(this.typeModel)
      let data = {
        name,
        children: []
      }
      let items = this.findItems({
        query: {
          typeId
        }
      }).data
      items.forEach(({ category }) => {
        if (!data.children.map(({ id }) => id).includes(category.id)) data.children.push({ ...category, children: [] })
      })
      data.children.forEach(category => {
        category.children = items.filter(({ categoryId }) => {
          return categoryId === category.id
        })
          .map(({ name, extensions }) => {
            return { name, children: extensions }
          })
      })
      return data
    },
    hierarchy: function () {
      return d3.hierarchy(this.data)
        .sort((a, b) => d3.ascending(a.data.name, b.data.name))
    },
    layout: function () {
      return d3.tree()
        .size([this.width, this.height])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)
    },
    root: function () {
      return this.layout(this.hierarchy)
    },
    linkGenerator: function () {
      return (val) => this.calcPath(val)
    }
  }
}
</script>
