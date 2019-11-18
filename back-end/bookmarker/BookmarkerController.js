const fs = require('fs')

class BookmarkerController {

	constructor(filePath) {
		this.filePath = filePath
	}

	getAll() {
	 	const fileContent = fs.readFileSync(this.filePath)

	    return JSON.parse(fileContent)
	}

	getOne(id) {
		const bookmarkers = this.getAll()

		const theOne = bookmarkers.find(bookmarker => {
			return bookmarker.id == id
		})

		return theOne || this.returnMessage('Not found!')
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
			return bookmarker.id == id
		})

		if(bookmarker) {
			bookmarker.siteName = siteName
			bookmarker.siteUrl = siteUrl

			return bookmarker
		}

		return this.returnMessage('Id not found!')
	}

	rePostAll(bookmarkersArray) {
		const bookmarkers = JSON.stringify(bookmarkersArray)

		fs.writeFileSync(this.filePath, bookmarkers)

		return this.getAll()
	}

	deleteOne(id) {
		const bookmarkerArray = this.getAll()

		const bookmarkerExists = bookmarkerArray.some(bookmarker => {
			return bookmarker.id == id
		})

		const newBookmarkerArray = bookmarkerArray.filter(bookmarker => {
			return bookmarker.id != id
		})

		this.rePostAll(newBookmarkerArray)

		if(bookmarkerExists) {
			return this.returnMessage('Successful delete!')
		} else {
			return this.returnMessage('Not found!')
		}
	}

	returnMessage(text) {
		return {
			message: text
		}
	}
}

module.exports = BookmarkerController