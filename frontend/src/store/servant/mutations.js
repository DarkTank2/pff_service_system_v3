const addOrderedItem = (state, payload) => {
	if (state.selection.map(({ id }) => id).includes(payload.id)) return 
	state.selection.push(payload)
}

const clearOrderedItems = state => {
	state.selection = []
}

const increaseServeOI = (state, id) => {
	state.selection.forEach(({ id: OIId, quantity, served }) => {
		if (OIId === id) {
			if (quantity > served) served++
		}
	})
}

const decreaseServeOI = (state, id) => {
	state.selection.forEach(({ id: OIId, served }) => {
		if (OIId === id) {
			if (served > 0) served--
		}
	})
}

const increaseCashedOI = (state, id) => {
	state.selection.forEach(({ id: OIId, quantity, cashed }) => {
		if (OIId === id) {
			if (quantity > cashed) cashed++
		}
	})
}

const decreaseCashedOI = (state, id) => {
	state.selection.forEach(({ id: OIId, cashed }) => {
		if (OIId === id) {
			if (cashed > 0) cashed--
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