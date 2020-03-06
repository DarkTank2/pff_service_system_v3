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
            :dx="dx(item, index)"
            dy="5"
            :text-anchor="textAnchor(item, index)"
            stroke="#1E1E1E"
            :x="item.y"
            :y="item.x"
            >{{ item.data.name }}</text>
          <text
            v-for="(ext, ind) in extensionHierarchy"
            :key="'ext/text/' + ind"
            dx="6"
            dy="5"
            text-anchor="start"
            stroke="#1e1e1e"
            :x="ext.y"
            :y="ext.x"
            >
              {{ ext.name }}
            </text>
        </g>
         <g
          fill="none"
          stroke="#999"
          stroke-opacity="0.4"
          stroke-width="1.5"
          >
          <path
            v-for="(link, index) in [...root.links(), ...extensionPaths]"
            :key="'path/' + index"
            :d="linkGenerator([link.source, link.target])"
            />
        </g>
        <g>
          <circle
            v-for="(item, index) in root.descendants()"
            :key="'circle/' + index"
            :fill="fill(item)"
            r="5"
            :cx="item.y"
            :cy="item.x"
            />
          <circle
            v-for="(ext, ind) in extensionHierarchy"
            :key="'ext/circle/' + ind"
            fill="#555"
            r="5"
            :cx="ext.y"
            :cy="ext.x"
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
      width: 800,
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
        x: source.y + 200,
        y: source.x
      }
      let destination = {
        x: target.y,
        y: target.x
      }
      let destination2 = {
        x: target.y - 200,
        y: target.x
      }
      let d = 'M'
      d += origin.x + ',' + origin.y
      d += 'C'
      d += origin2.x + ',' + origin2.y
      d += ',' + destination2.x + ',' + destination2.y
      d += ',' + destination.x + ',' + destination.y
      return d
    },
    dx: function (item, index) {
      if (index === 0) return '6'
      if (item.children && item.children.length > 0) return '-6'
      if (item.data.extensions && item.data.extensions.length > 0) return '-6'
      return '6'
    },
    textAnchor: function (item, index) {
      if (index === 0) return 'start'
      if (item.children && item.children.length > 0) return 'end'
      if (item.data.extensions && item.data.extensions.length > 0) return 'end'
      return 'start'
    },
    fill: function (item) {
      if (item.children && item.children.length > 0) return '#555'
      if (item.data.extensions && item.data.extensions.length > 0) return '#555'
      return '#999'
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
      })
      return data
    },
    hierarchy: function () {
      return d3.hierarchy(this.data)
        .sort((a, b) => d3.ascending(a.data.name, b.data.name))
    },
    layout: function () {
      return d3.tree()
        .size([this.height, this.width])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)
    },
    root: function () {
      return this.layout(this.hierarchy)
    },
    linkGenerator: function () {
      return (val) => this.calcPath(val)
    },
    lowestChilds: function () {
      return this.root.descendants()
        .filter(({ height }) => height === 0)
    },
    extensionHierarchy: function () {
      let allExtensions = []
      this.lowestChilds.forEach(({ data: { extensions } }) => {
        if (!extensions) return // case: inotial state, nothing has been loaded yet, hierarchy consists of only on element without data
        extensions.forEach(({ id: extId, name }) => {
          if (!allExtensions.map(({ id }) => id).includes(extId)) allExtensions.push({ id: extId, name })
        })
      })
      let part = this.height / (allExtensions.length + 1)
      allExtensions.forEach((ext, index) => {
        ext.y = this.width * 1.8
        ext.x = (index + 1) * part
      })
      return allExtensions
    },
    extensionPaths: function () {
      let paths = []
      this.lowestChilds.forEach(item => {
        let { data: { extensions } } = item
        let source = {
          x: item.x,
          y: item.y
        }
        if (!extensions) return // case: inotial state, nothing has been loaded yet, hierarchy consists of only on element without data
        extensions.forEach(({ id: extId }) => {
          let extension = this.extensionHierarchy.find(({ id }) => id === extId)
          let target = {
            x: extension.x,
            y: extension.y
          }
          paths.push({ source, target })
        })
      })
      return paths
    }
  }
}
</script>
