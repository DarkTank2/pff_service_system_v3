const updateSelection = ({ dispatch, commit, state }) => {
	return new Promise((resolve, reject) => {
		let promises = []
		state.selection.forEach(OI => {
			promises.push(dispatch('ordered-items/update', [OI.id, OI, {}], { root: true }))
		})
		Promise.all(promises).then((data) => {
			resolve(data)
		}).catch(err => {
			reject(err)
		})
	})
}

export default {
	serveSelection
}