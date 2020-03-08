const addOrderedItem = (state, payload) => {
  if (state.selection.map(({ id }) => id).includes(payload.id)) return
  state.selection.push(payload)
}

const clearOrderedItems = state => {
  state.selection = []
}

const increaseServeOI = (state, id) => {
  state.selection.forEach(item => {
    item.selected = item.selected === undefined ? 0 : item.selected
    if (item.id === id) {
      if (item.quantity > (item.served + item.selected)) item.selected++
    }
  })
}

const decreaseServeOI = (state, id) => {
  state.selection.forEach(item => {
    item.selected = item.selected === undefined ? 0 : item.selected
    if (item.id === id) {
      if (item.selected > 0) item.selected--
    }
  })
}

const increaseCashedOI = (state, id) => {
  state.selection.forEach(item => {
    item.selected = item.selected === undefined ? 0 : item.selected
    if (item.id === id) {
      if (item.quantity > (item.cashed + item.selected)) item.selected++
    }
  })
}

const decreaseCashedOI = (state, id) => {
  state.selection.forEach(item => {
    item.selected = item.selected === undefined ? 0 : item.selected
    if (item.id === id) {
      if (item.selected > 0) item.selected--
    }
  })
}

export default {
  addOrderedItem,
  clearOrderedItems,
  increaseServeOI,
  decreaseServeOI,
  increaseCashedOI,
  decreaseCashedOI
}
