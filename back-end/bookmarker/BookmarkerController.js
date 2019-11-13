const fs = require('fs')

class BookmarkerController {

	constructor(filePath) {
		this.filePath = filePath
	}

	getAll() {
	 	const fileContent = fs.readFileSync(this.filePath)

	    return JSON.parse(fileContent)
	}

	postOne(bookmarker) {
		const fileContent = this.getAll()
	    let bookMarkerArray = fileContent

	    bookMarkerArray = [...bookMarkerArray, bookmarker]
	    const bookMarkers = JSON.stringify(bookMarkerArray)

	    fs.writeFileSync(this.filePath, bookMarkers)
	    
	    return bookmarker
	}

	putOne(bookmarkerToAlter) {
		const { id, siteName, siteUrl } = bookmarkerToAlter
		const bookmarkerArray = this.getAll()

		const bookmarker = bookmarkerArray.find(bookmarker => {
			return bookmarker.id === id
		})

		bookmarker.siteName = siteName
		bookmarker.siteUrl = siteUrl

		return this.rePostAll(bookmarkerArray)
	}

	rePostAll(bookmarkersArray) {
		const bookmarkers = JSON.stringify(bookmarkersArray)

		fs.writeFileSync(this.filePath, bookmarkers)

		return this.getAll()
	}
}

module.exports = BookmarkerController