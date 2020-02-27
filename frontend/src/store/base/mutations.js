const fetchName = (state) => {
  state.name = window.localStorage.getItem('waiterName')
}

const setName = (state, payload) => {
  window.localStorage.setItem('waiterName', payload)
  state.name = payload
}

const setTitle = (state, payload) => {
  state.title = payload
}

const setTableId = (state, payload) => {
  state.tableId = payload
}

const addOrderedItem = (state, payload) => {
  state.order.push(payload)
}

const removeIndexedOrderedItem = (state, index) => {
  state.order = state.order.filter((item, i) => i !== index)
}

const clearOrder = state => {
  state.order = []
}

export default {
  fetchName,
  setName,
  setTitle,
  setTableId,
  addOrderedItem,
  removeIndexedOrderedItem,
  clearOrder
}
