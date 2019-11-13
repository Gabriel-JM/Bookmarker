const fs = require('fs')

class BookmarkerController {

	constructor(filePath) {
		this.filePath = filePath
	}

	getBookmarkers() {
	 	const fileContent = fs.readFileSync(this.filePath)

	    return fileContent
	}

	postBookmarker(bookmarker, res) {
		const fileContent = this.getBookmarkers()
	    let bookMarkerArray = JSON.parse(fileContent.toString())

	    bookMarkerArray = [...bookMarkerArray, bookmarker]
	    const bookMarkers = JSON.stringify(bookMarkerArray)

	    fs.writeFileSync(this.filePath, bookMarkers)
	    
	    return bookmarker
	}
}

module.exports = BookmarkerController