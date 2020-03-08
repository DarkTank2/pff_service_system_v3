<template>
  <v-card>
    <v-card-title>SCOREBOARD</v-card-title>
    <v-card-text>
      <svg height="1000" width="100%">
        <!-- <circle
          v-for="(item, index) in root.descendants()"
          :key="index"
          :r="item.r"
          :cx="item.x"
          :cy="item.y"
          fill="none"
          stroke="white"
          />
        <g
          font-family="sans-serif"
          font-size="20"
          stroke-linejoin="round"
          stroke-width="1"
          fill="white"
          font-weight="900">
          <text
            v-for="(item, index) in root.descendants().filter(v => v.depth === 1)"
            :key="'text/' + index"
            text-anchor="middle"
            stroke="#1E1E1E"
            :x="item.y"
            :y="item.x">
            {{ item.data.key }}
          </text>
        </g> -->
      </svg>
    </v-card-text>
  </v-card>
</template>
<script>
import * as d3 from 'd3'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Scoreboard',
  props: [],
  components: {},
  data () {
    return {
      width: 1000,
      height: 1000
    }
  },
  created: function () {},
  mounted: function () {
    this.fetchOrderedItems()
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
    nester: function () {
      return d3.nest()
        .key(d => d.waiter)
        .key(d => d.table.name)
        .key(d => d.item.name)
    },
    nestedData: function () {
      return {
        key: 'root',
        values: this.nester.entries(this.orderedItems)
      }
    },
    hierarchy: function () {
      return d3.hierarchy(this.nestedData, v => v.values)
        .sum(v => v.quantity)
        .sort((a, b) => d3.ascending(a.quantity, b.quantity))
    },
    layout: function () {
      return d3.pack()
        .size([this.width, this.height])
        .padding(2)
    },
    root: function () {
      return this.layout(this.hierarchy)
    },
    showData: function () {
      const svg = d3.select('svg')
      svg.append('g')
        .selectAll('circle')
        .data(this.root.descendants())
        .join('circle')
        .attr('fill', 'none')
        .attr('r', v => v.r)
        .attr('cx', v => v.x)
        .attr('cy', v => v.y)
        .attr('stroke', 'white')
      return svg.node()
    }
  }
}
</script>
