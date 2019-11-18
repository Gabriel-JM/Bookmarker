const BookmarkerController = require('./BookmarkerController')

class Bookmarker {

	constructor(sitename, siteurl) {
		this.id = this.generateId()
		this.siteName = sitename
		this.siteUrl = siteurl
	}

	generateId() {
		let result = null
		const bookmarkerController = new BookmarkerController('./files/bookmarkerList.json')
		const ids = bookmarkerController.getAll().map(({ id }) => id)

		ids.forEach((elem, index) => {
			const existId = ids.some(id => {
				return id === index + 1
			})

			if(!existId) {
				result = index + 1
			}
		})

		return result ? result : ids.length + 1
	}
}

module.exports = Bookmarker